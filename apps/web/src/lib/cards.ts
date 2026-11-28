import { termId } from '@tk/contracts';
import type { LoadedModule } from '@tk/content';
import { renderMarkdown } from '@tk/render';
import type { Card } from '../components/Flashcards.astro';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Tarjetas de un curso: términos propios + preguntas del lab con respuesta (claves compartidas con StudyModes). */
export async function courseCards(m: LoadedModule): Promise<Card[]> {
  const terms: Card[] = m.ownGlossary.map((g) => ({ key: `t:${termId(g.term)}`, front: esc(g.term), back: `<p>${esc(g.definition)}</p>`, group: 'glosario', label: 'Término' }));
  const qs: Card[] = [];
  for (const t of m.topics)
    for (const q of t.lab.questions)
      if (q.a) qs.push({ key: `q:${t.id}:${q.q}`, front: esc(q.q), back: (await renderMarkdown(q.a, m.glossary)).html, group: t.id, label: t.title });
  return [...qs, ...terms];
}
