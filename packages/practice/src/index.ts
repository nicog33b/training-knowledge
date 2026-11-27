/**
 * Planificador de repaso PROVISIONAL (cajas de Leitner con intervalos crecientes + relearning).
 * Sin dependencias: corre en el navegador con las marcas Sí / Más o menos / No del lab y las tarjetas.
 *   - "No"          → vuelve a la caja 0: se repasa en esta sesión y mañana (relearning sucesivo).
 *   - "Más o menos" → se queda en su caja, se repasa pronto.
 *   - "Sí"          → sube de caja: el intervalo crece (1, 3, 7, 16, 35, 80 días).
 * Sustituible por FSRS (T-015) sin cambiar la UI: misma firma `review(card, rating, now)`.
 * Decisiones: repeticion-espaciada-fsrs, practica-de-recuperacion.
 */
export type Rating = 'si' | 'casi' | 'no';
export interface CardState {
  box: number;
  /** próxima fecha (ms). */
  due: number;
  last: number;
  reps: number;
  lapses: number;
}

export const INTERVAL_DAYS = [0, 1, 3, 7, 16, 35, 80];
const DAY = 86_400_000;

export function review(card: CardState | undefined, rating: Rating, now = Date.now()): CardState {
  const c = card ?? { box: 0, due: now, last: now, reps: 0, lapses: 0 };
  let box = c.box;
  if (rating === 'si') box = Math.min(box + 1, INTERVAL_DAYS.length - 1);
  else if (rating === 'no') box = 0;
  const days = rating === 'no' ? 0 : rating === 'casi' ? Math.max(1, Math.round(INTERVAL_DAYS[box] / 2)) : INTERVAL_DAYS[box];
  // "No": se repasa en 10 minutos (misma sesión) — relearning.
  const due = rating === 'no' ? now + 10 * 60_000 : now + days * DAY;
  return { box, due, last: now, reps: c.reps + 1, lapses: c.lapses + (rating === 'no' ? 1 : 0) };
}

export const isDue = (c: CardState | undefined, now = Date.now()) => !c || c.due <= now;

/** Ordena para la sesión: primero vencidas (las más atrasadas), luego nuevas; intercala por grupo. */
export function sessionOrder<T extends { key: string; group: string }>(items: T[], states: Record<string, CardState>, now = Date.now(), limit = 20): T[] {
  const due = items.filter((i) => states[i.key] && states[i.key].due <= now).sort((a, b) => states[a.key].due - states[b.key].due);
  const fresh = items.filter((i) => !states[i.key]);
  return interleave([...due, ...fresh].slice(0, limit));
}

/** Evita dos seguidas del mismo grupo (subtema) cuando se puede: intercalado de conceptos vecinos. */
export function interleave<T extends { group: string }>(xs: T[]): T[] {
  const out: T[] = [];
  const pool = [...xs];
  while (pool.length) {
    const i = pool.findIndex((x) => x.group !== out[out.length - 1]?.group);
    out.push(...pool.splice(i < 0 ? 0 : i, 1));
  }
  return out;
}

/** Retención estimada muy simple para el panel: proporción de tarjetas en caja ≥ 2. */
export function summary(states: Record<string, CardState>, now = Date.now()) {
  const all = Object.values(states);
  return {
    total: all.length,
    due: all.filter((c) => c.due <= now).length,
    solid: all.filter((c) => c.box >= 3).length,
    learning: all.filter((c) => c.box < 3).length,
  };
}
