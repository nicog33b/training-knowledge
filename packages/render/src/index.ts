/** Markdown -> HTML con términos del glosario subrayados. Sin dependencia de ningún framework web. */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { GlossaryTerm } from '@tk/contracts';
import { rehypeGlossary } from '@tk/glossary';

export async function renderMarkdown(
  markdown: string,
  terms: GlossaryTerm[],
  opts: { mode?: 'first' | 'all' } = {},
): Promise<{ html: string; usedTerms: string[] }> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeGlossary as any, { terms, mode: opts.mode })
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(file), usedTerms: (file.data.glossaryUsed as string[]) ?? [] };
}
