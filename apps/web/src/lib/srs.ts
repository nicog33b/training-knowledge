/** Estado de repaso espaciado por curso (localStorage 'tk-srs:<curso>'), compartido por lab, tarjetas y /repaso/. */
import { review, type CardState, type Rating } from '@tk/practice';
import { store } from './store.ts';

export const srsKey = (mod: string) => `tk-srs:${mod}`;
export const loadSrs = (mod: string) => store.get<Record<string, CardState>>(srsKey(mod), {});
export function recordReview(mod: string, key: string, rating: Rating) {
  const all = loadSrs(mod);
  all[key] = review(all[key], rating);
  store.set(srsKey(mod), all);
  return all[key];
}
