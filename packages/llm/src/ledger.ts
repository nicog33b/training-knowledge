/**
 * Contador de gasto de IA: cada respuesta suma sus tokens y su costo (precio del modelo que
 * respondió, tabla PRICES) por modelo y por día. Se guarda en .data/gasto.json (no versionado).
 * No es el saldo de la cuenta: los proveedores no lo exponen por API y la cuenta puede usarse
 * fuera de esta app. Decisión: research/decisions/proveedores-llm-y-contador-de-gasto.md
 */
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PRICES, PROVIDERS, modelName, type Price, type ProviderId, type Usage } from './models.ts';

export interface ModelSpend {
  provider: ProviderId;
  model: string;
  turnos: number;
  /** turnos cuyo precio no se conocía (se cuentan los tokens, no el costo). */
  sinPrecio: number;
  tokens: Usage;
  usd: number;
}
export interface Ledger {
  version: 2;
  /** desde cuándo cuenta (creación o último reinicio). */
  desde: string;
  modelos: Record<string, ModelSpend>;
  /** USD por día local (YYYY-MM-DD). */
  dias: Record<string, number>;
}

const file = (root: string) => join(root, '.data', 'gasto.json');
const fresh = (): Ledger => ({ version: 2, desde: new Date().toISOString(), modelos: {}, dias: {} });
/** Fecha local YYYY-MM-DD (el "hoy" del usuario, no UTC). */
export const localDay = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const round = (n: number) => Math.round(n * 1e8) / 1e8;

export async function readLedger(root: string): Promise<Ledger> {
  try {
    const l = JSON.parse(await readFile(file(root), 'utf8'));
    return l?.version === 2 ? l : fresh();
  } catch {
    return fresh();
  }
}

// Escrituras en serie dentro del proceso + escritura atómica (tmp + rename).
let chain: Promise<unknown> = Promise.resolve();
function update(root: string, fn: (l: Ledger) => Ledger | void): Promise<Ledger> {
  const run = chain.then(async () => {
    let l = await readLedger(root);
    l = fn(l) ?? l;
    await mkdir(join(root, '.data'), { recursive: true });
    const tmp = `${file(root)}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(l, null, 2) + '\n');
    await rename(tmp, file(root));
    return l;
  });
  chain = run.catch(() => {});
  return run;
}

/** Suma una respuesta. `usd` null = precio desconocido (solo tokens). */
export function addUsage(root: string, provider: ProviderId, model: string, usage: Usage, usd: number | null, when = new Date()) {
  return update(root, (l) => {
    const key = `${provider}/${model}`;
    const m = (l.modelos[key] ??= { provider, model, turnos: 0, sinPrecio: 0, tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, usd: 0 });
    m.turnos++;
    for (const k of ['input', 'output', 'cacheRead', 'cacheWrite'] as const) m.tokens[k] += usage[k] ?? 0;
    if (usd === null) m.sinPrecio++;
    else {
      m.usd = round(m.usd + usd);
      const day = localDay(when);
      l.dias[day] = round((l.dias[day] ?? 0) + usd);
    }
  });
}

/** Pone el contador a cero (empieza a contar desde ahora). */
export const resetLedger = (root: string) => update(root, () => fresh());

export interface SpendSummary {
  desde: string;
  hoy: number;
  mes: number;
  total: number;
  /** modelos usados + los disponibles aún sin uso, con su precio. */
  modelos: (Omit<ModelSpend, 'tokens'> & { name: string; providerLabel: string; tokens: number; price: Price | null; usado: boolean })[];
}

/** Resumen para la UI/CLI. `available`: modelos configurados ahora (aparecen aunque no se hayan usado). */
export function summarize(l: Ledger, available: { provider: ProviderId; model: string }[] = [], now = new Date()): SpendSummary {
  const today = localDay(now);
  const month = today.slice(0, 7);
  const sum = (pred: (d: string) => boolean) => round(Object.entries(l.dias).filter(([d]) => pred(d)).reduce((a, [, v]) => a + v, 0));
  const rows = new Map(Object.entries(l.modelos));
  for (const a of available) {
    const key = `${a.provider}/${a.model}`;
    if (!rows.has(key)) rows.set(key, { provider: a.provider, model: a.model, turnos: 0, sinPrecio: 0, tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, usd: 0 });
  }
  return {
    desde: l.desde,
    hoy: sum((d) => d === today),
    mes: sum((d) => d.startsWith(month)),
    total: round(Object.values(l.modelos).reduce((a, m) => a + m.usd, 0)),
    modelos: [...rows.values()]
      .map((m) => ({
        ...m,
        name: modelName(m.model),
        providerLabel: PROVIDERS[m.provider]?.label ?? m.provider,
        tokens: m.tokens.input + m.tokens.output + m.tokens.cacheRead + m.tokens.cacheWrite,
        price: PROVIDERS[m.provider]?.free ? { input: 0, output: 0, cacheRead: 0 } : (PRICES[m.model] ?? null),
        usado: m.turnos > 0,
      }))
      .sort((a, b) => b.usd - a.usd || b.turnos - a.turnos || a.name.localeCompare(b.name)),
  };
}
