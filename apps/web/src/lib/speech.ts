/**
 * Leer en voz alta con la Web Speech API del navegador (gratis, sin red en la mayoría de sistemas).
 * Lee por bloques (párrafos, ítems) y marca el bloque que suena con la clase .tk-reading.
 * Decisión: research/decisions/accesibilidad-con-evidencia.md (texto a voz, d≈0,35 en comprensión con dificultades lectoras).
 */
import { store } from './store.ts';

type Prefs = { rate?: number; voice?: string };
export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

let queue: HTMLElement[] = [];
let active = false;
const listeners = new Set<(on: boolean) => void>();
export const onSpeech = (f: (on: boolean) => void) => listeners.add(f);
const emit = () => listeners.forEach((f) => f(active));

function voiceFor(lang: string) {
  const prefs = store.get<Prefs>('tk-voice', {});
  const vs = speechSynthesis.getVoices();
  return vs.find((v) => v.name === prefs.voice) ?? vs.find((v) => v.lang.startsWith(lang)) ?? vs.find((v) => v.lang.startsWith('es'));
}

function utter(text: string, lang = 'es') {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'en' ? 'en-US' : 'es-ES';
  const v = voiceFor(lang);
  if (v) u.voice = v;
  u.rate = store.get<Prefs>('tk-voice', {}).rate ?? 1;
  return u;
}

function clearMark() { document.querySelectorAll('.tk-reading').forEach((e) => e.classList.remove('tk-reading')); }

function next() {
  clearMark();
  const el = queue.shift();
  if (!el) { active = false; emit(); return; }
  const text = el.innerText.trim();
  if (!text) return next();
  el.classList.add('tk-reading');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  const u = utter(text, el.closest('[lang]')?.getAttribute('lang')?.slice(0, 2) ?? 'es');
  u.onend = next;
  u.onerror = () => { active = false; clearMark(); emit(); };
  speechSynthesis.speak(u);
}

/** Lee los bloques de un contenedor (artículo) desde el principio o desde `from`. */
export function readBlocks(container: Element, from?: Element) {
  stop();
  const blocks = [...container.querySelectorAll<HTMLElement>('h2, h3, h4, p, li, td, blockquote')].filter((b) => !b.closest('li li'));
  const i = from ? Math.max(0, blocks.findIndex((b) => b.contains(from) || from.contains(b))) : 0;
  queue = blocks.slice(i);
  active = true; emit();
  next();
}

export function readText(text: string) {
  stop();
  active = true; emit();
  const u = utter(text);
  u.onend = u.onerror = () => { active = false; emit(); };
  speechSynthesis.speak(u);
}

export function stop() {
  queue = [];
  if (speechSupported()) speechSynthesis.cancel();
  clearMark();
  if (active) { active = false; emit(); }
}
export const isSpeaking = () => active;
