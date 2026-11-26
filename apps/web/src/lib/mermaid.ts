/**
 * Diagramas Mermaid en el navegador: se carga la librería solo si hay algún diagrama en pantalla.
 * Uso: <div class="tk-mermaid" data-src="mindmap\n  root((X))"></div> y luego renderMermaid(contenedor).
 * Tema claro/oscuro según los tokens de la página; vuelve a pintar si cambia el tema.
 */
let lib: Promise<typeof import('mermaid').default> | undefined;
let n = 0;

function isDark() {
  const t = document.documentElement.dataset.theme;
  return t === 'dark' || (t !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
}

async function load() {
  lib ??= import('mermaid').then((m) => m.default);
  const mermaid = await lib;
  const css = getComputedStyle(document.documentElement);
  const v = (k: string) => css.getPropertyValue(k).trim();
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict', // sin HTML ni clics: el texto viene de contenido o de la IA
    theme: 'base',
    fontFamily: 'system-ui, sans-serif',
    themeVariables: {
      darkMode: isDark(),
      background: v('--bg'),
      primaryColor: v('--card'),
      primaryTextColor: v('--fg'),
      primaryBorderColor: v('--accent'),
      lineColor: v('--muted'),
      secondaryColor: v('--card'),
      tertiaryColor: v('--bg'),
      clusterBkg: v('--card'),
      clusterBorder: v('--line'),
      fontSize: '15px',
    },
  });
  return mermaid;
}

export async function renderMermaid(root: ParentNode = document) {
  const els = [...root.querySelectorAll<HTMLElement>('.tk-mermaid[data-src]')];
  if (!els.length) return;
  const mermaid = await load();
  for (const el of els) {
    const src = el.dataset.src!;
    try {
      const { svg } = await mermaid.render(`tkmm${++n}`, src);
      el.innerHTML = svg;
      el.dataset.ok = '1';
      el.querySelector('svg')?.setAttribute('role', 'img');
      if (el.dataset.label) el.querySelector('svg')?.setAttribute('aria-label', el.dataset.label);
    } catch (e) {
      el.innerHTML = '';
      const p = document.createElement('p');
      p.className = 'tk-mermaid-err';
      p.textContent = 'No se pudo dibujar el diagrama (revisa la sintaxis).';
      const pre = document.createElement('pre');
      pre.textContent = src;
      el.append(p, pre);
    }
  }
}

/** Repinta los diagramas ya dibujados (p. ej. al cambiar tema o tamaño de letra). */
export function watchTheme() {
  new MutationObserver(() => {
    document.querySelectorAll<HTMLElement>('.tk-mermaid[data-ok]').forEach((el) => delete el.dataset.ok);
    renderMermaid();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-contrast'] });
}
