/**
 * Servidor local del tutor para la web (apps/web): chat flotante + contador de gasto de IA.
 * Solo escucha en 127.0.0.1. Las claves viven aquí (.env), nunca en el navegador.
 *   pnpm dev            → web (4321) + tutor (4322) con los proveedores que tengan clave
 *   pnpm dev:fake       → igual, pero el tutor responde sin llamar a ninguna API (probar la UI gratis)
 * Proveedores: Claude, ChatGPT, Gemini, Ollama y compatibles (ver .env.example y @tk/llm).
 */
import { createServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FsContentSource, loadAll, type Loaded } from '@tk/content';
import { addUsage, availableProviders, createClient, loadDotEnv, readLedger, resetLedger, type ProviderId, type Usage } from '@tk/llm';
import { fakeClient, handleChat, spendView, type ProviderSlot } from './handler.ts';

const ROOT = process.env.TK_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
loadDotEnv(ROOT);
const PORT = Number(process.env.TUTOR_PORT ?? 4322);
/** carpeta donde vive .data/gasto.json (por defecto la raíz del repo). */
const DATA_ROOT = process.env.TK_DATA_ROOT ?? ROOT;
const ORIGINS = (process.env.TUTOR_ORIGIN ?? 'http://localhost:4321,http://127.0.0.1:4321').split(',').map((s) => s.trim());
const MAX_BODY = 200_000;
const FAKE = process.env.TUTOR_FAKE === '1' || process.argv.includes('--fake');
const RATE_PER_MIN = 30;

// Contenido: se recarga como mucho cada 5 s para ver cambios de lab/ sin reiniciar.
let cached: { at: number; data: Promise<Loaded> } | undefined;
const load = () => {
  if (!cached || Date.now() - cached.at > 5000) cached = { at: Date.now(), data: loadAll(new FsContentSource(ROOT)) };
  return cached.data;
};

const providers = new Map<ProviderId, ProviderSlot>();
if (FAKE) providers.set('anthropic', { client: fakeClient, model: 'prueba', label: 'Modo prueba' });
else
  for (const p of availableProviders('tutor')) {
    try {
      const { client, model } = await createClient(p.id, 'tutor');
      providers.set(p.id, { client, model, label: p.label });
    } catch (e: any) {
      console.warn(`⚠ ${p.label}: ${e.message}`);
    }
  }
const onSpend = FAKE ? undefined : (p: ProviderId, model: string, u: Usage, usd: number | null) => addUsage(DATA_ROOT, p, model, u, usd);

const hits: number[] = [];
const limited = () => {
  const now = Date.now();
  while (hits.length && now - hits[0] > 60_000) hits.shift();
  hits.push(now);
  return hits.length > RATE_PER_MIN;
};

createServer(async (req, res) => {
  const origin = req.headers.origin ?? '';
  const send = (status: number, body: unknown) => {
    res.writeHead(status, {
      'content-type': 'application/json; charset=utf-8',
      ...(ORIGINS.includes(origin) ? { 'access-control-allow-origin': origin, vary: 'origin' } : {}),
    });
    res.end(JSON.stringify(body));
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, ORIGINS.includes(origin) ? {
      'access-control-allow-origin': origin,
      'access-control-allow-methods': 'POST, GET',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '600',
    } : {});
    return res.end();
  }
  if (origin && !ORIGINS.includes(origin)) return send(403, { error: 'origen no permitido' });
  const route = `${req.method} ${req.url}`;
  if (route === 'GET /health')
    return send(200, { ok: true, mode: FAKE ? 'fake' : providers.size ? 'api' : 'sin-clave', providers: [...providers].map(([id, s]) => ({ id, label: s.label, model: s.model })) });
  if (route === 'GET /gasto') return send(200, spendView(await readLedger(DATA_ROOT), providers));
  if (route === 'POST /gasto/reset') return send(200, spendView(await resetLedger(DATA_ROOT), providers));
  if (route !== 'POST /chat') return send(404, { error: 'no encontrado' });
  if (route === 'POST /chat' && limited()) return send(429, { error: `máx. ${RATE_PER_MIN} preguntas por minuto` });

  let size = 0;
  const chunks: Buffer[] = [];
  for await (const c of req) {
    size += c.length;
    if (size > MAX_BODY) return send(413, { error: 'petición demasiado grande' });
    chunks.push(c);
  }
  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return send(400, { error: 'JSON inválido' });
  }
  const r = await handleChat(body, { load, providers, onSpend });
  send(r.status, r.body);
}).listen(PORT, '127.0.0.1', () => {
  const list = [...providers.values()].map((s) => `${s.label} (${s.model})`).join(', ');
  console.log(`tutor en http://127.0.0.1:${PORT} · ${FAKE ? 'modo prueba (sin IA)' : list || 'SIN CLAVES (responde 503)'} · orígenes: ${ORIGINS.join(', ')}`);
});
