/**
 * Mini-lenguaje de reglas para recetas de simulación. Seguro: no usa eval ni Function.
 * Soporta: números, variables (snake_case), + - * / %, < <= > >= == !=, && || !, paréntesis
 * y funciones puras de una lista cerrada (FUNCS: min, max, ceil, floor, round, abs, sqrt, pow, log2, log10).
 * Sin dependencias: lo usan tanto la validación (Node) como el navegador.
 */
export type Ast =
  | { k: 'num'; v: number }
  | { k: 'var'; name: string }
  | { k: 'not'; e: Ast }
  | { k: 'neg'; e: Ast }
  | { k: 'bin'; op: string; a: Ast; b: Ast }
  | { k: 'call'; fn: string; args: Ast[] };

/** Funciones permitidas (lista cerrada; nada de acceso a objetos ni a globals). */
export const FUNCS: Record<string, { arity: [number, number]; f: (...a: number[]) => number }> = {
  min: { arity: [2, 8], f: Math.min },
  max: { arity: [2, 8], f: Math.max },
  ceil: { arity: [1, 1], f: Math.ceil },
  floor: { arity: [1, 1], f: Math.floor },
  round: { arity: [1, 1], f: Math.round },
  abs: { arity: [1, 1], f: Math.abs },
  sqrt: { arity: [1, 1], f: Math.sqrt },
  pow: { arity: [2, 2], f: Math.pow },
  log2: { arity: [1, 1], f: Math.log2 },
  log10: { arity: [1, 1], f: Math.log10 },
};

const TOKEN = /\s*(\d+(?:\.\d+)?|[a-z_][a-z0-9_]*|<=|>=|==|!=|&&|\|\||[-+*/%<>()!,])/y;

function tokenize(src: string): string[] {
  const out: string[] = [];
  TOKEN.lastIndex = 0;
  let pos = 0;
  while (pos < src.length) {
    if (/^\s*$/.test(src.slice(pos))) break;
    TOKEN.lastIndex = pos;
    const m = TOKEN.exec(src);
    if (!m) throw new Error(`carácter inesperado en "${src.slice(pos).trim()}"`);
    out.push(m[1]);
    pos = TOKEN.lastIndex;
  }
  return out;
}

const PREC: Record<string, number> = { '||': 1, '&&': 2, '==': 3, '!=': 3, '<': 4, '<=': 4, '>': 4, '>=': 4, '+': 5, '-': 5, '*': 6, '/': 6, '%': 6 };

export function parseRule(src: string): Ast {
  const t = tokenize(src);
  let i = 0;
  const peek = () => t[i];
  const next = () => t[i++];
  function primary(): Ast {
    const tok = next();
    if (tok === undefined) throw new Error('expresión incompleta');
    if (tok === '(') {
      const e = expr(0);
      if (next() !== ')') throw new Error('falta ")"');
      return e;
    }
    if (tok === '!') return { k: 'not', e: primary() };
    if (tok === '-') return { k: 'neg', e: primary() };
    if (/^\d/.test(tok)) return { k: 'num', v: Number(tok) };
    if (/^[a-z_]/.test(tok)) {
      if (peek() !== '(') return { k: 'var', name: tok };
      const fn = FUNCS[tok];
      if (!fn) throw new Error(`función desconocida "${tok}" (permitidas: ${Object.keys(FUNCS).join(', ')})`);
      next();
      const args: Ast[] = [];
      if (peek() !== ')') {
        args.push(expr(0));
        while (peek() === ',') { next(); args.push(expr(0)); }
      }
      if (next() !== ')') throw new Error(`falta ")" en ${tok}(…)`);
      if (args.length < fn.arity[0] || args.length > fn.arity[1]) throw new Error(`${tok} espera ${fn.arity.join('–')} argumentos`);
      return { k: 'call', fn: tok, args };
    }
    throw new Error(`token inesperado "${tok}"`);
  }
  function expr(min: number): Ast {
    let a = primary();
    while (peek() !== undefined && PREC[peek()] !== undefined && PREC[peek()] > min) {
      const op = next();
      a = { k: 'bin', op, a, b: expr(PREC[op]) };
    }
    return a;
  }
  const ast = expr(0);
  if (i < t.length) throw new Error(`sobra "${t.slice(i).join(' ')}"`);
  return ast;
}

export function ruleVars(ast: Ast, acc = new Set<string>()): Set<string> {
  if (ast.k === 'var') acc.add(ast.name);
  else if (ast.k === 'not' || ast.k === 'neg') ruleVars(ast.e, acc);
  else if (ast.k === 'bin') (ruleVars(ast.a, acc), ruleVars(ast.b, acc));
  else if (ast.k === 'call') ast.args.forEach((a) => ruleVars(a, acc));
  return acc;
}

export function evalRule(ast: Ast, vars: Record<string, number>): number {
  switch (ast.k) {
    case 'num': return ast.v;
    case 'var': {
      if (!(ast.name in vars)) throw new Error(`variable desconocida "${ast.name}"`);
      return vars[ast.name];
    }
    case 'not': return evalRule(ast.e, vars) ? 0 : 1;
    case 'neg': return -evalRule(ast.e, vars);
    case 'call': return FUNCS[ast.fn].f(...ast.args.map((a) => evalRule(a, vars)));
    case 'bin': {
      const a = evalRule(ast.a, vars);
      if (ast.op === '&&') return a ? evalRule(ast.b, vars) : 0;
      if (ast.op === '||') return a ? a : evalRule(ast.b, vars);
      const b = evalRule(ast.b, vars);
      switch (ast.op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? NaN : a / b;
        case '%': return b === 0 ? NaN : a % b;
        case '<': return +(a < b);
        case '<=': return +(a <= b);
        case '>': return +(a > b);
        case '>=': return +(a >= b);
        case '==': return +(a === b);
        case '!=': return +(a !== b);
      }
    }
  }
  throw new Error('nodo desconocido');
}

/** Primer resultado cuya regla se cumple (o undefined). */
export function pickOutcome<T extends { when: string }>(outcomes: T[], vars: Record<string, number>): T | undefined {
  return outcomes.find((o) => !!evalRule(parseRule(o.when), vars));
}
