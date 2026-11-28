/** localStorage seguro (modo privado, cuotas): nunca rompe la UI. */
export const store = {
  get<T>(k: string, d: T): T {
    try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d; } catch { return d; }
  },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k: string) { try { localStorage.removeItem(k); } catch {} },
  keys(prefix: string): string[] {
    try { return Object.keys(localStorage).filter((k) => k.startsWith(prefix)); } catch { return []; }
  },
};

/** Tarjetas personales creadas desde el menú de selección (por curso). */
export type UserCard = { id: string; front: string; back: string; topic?: string; created: number };
export const userCardsKey = (mod: string) => `tk-cards:${mod}`;
