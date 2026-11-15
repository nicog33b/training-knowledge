import { resolve } from 'node:path';
import { FsContentSource, loadAll } from '@tk/content';

// La web solo conoce el puerto de contenido; la raíz del repo se resuelve aquí.
const ROOT = process.env.TK_ROOT ?? resolve(process.cwd(), '../..');

let cache: ReturnType<typeof loadAll> | undefined;
export const getData = () => (cache ??= loadAll(new FsContentSource(ROOT)));
