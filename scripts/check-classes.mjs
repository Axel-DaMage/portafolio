#!/usr/bin/env node
/**
 * check-classes.mjs — audits that every class token referenced in `className`
 * attributes across src/**​/*.tsx has a matching selector in the hand-rolled
 * utility layer (src/styles/*.css + src/index.css). Exits non-zero on misses.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = join(process.cwd(), 'src');

// Legacy components not imported by any live view (pending removal).
const EXCLUDED_FILES = new Set([
  'Box.tsx', 'Button.tsx', 'WindowPanel.tsx', 'GlitchText.tsx',
  'CorruptedBlock.tsx', 'Typewriter.tsx', 'Cursor.tsx', 'Separator.tsx',
]);

// String fragments evaluated as JS, not emitted as CSS classes.
const IGNORE_TOKENS = new Set(['vim', 'normal', 'w-']);

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.tsx')) yield path;
  }
}

// Extracts every string literal / template-literal static chunk inside a JS
// span, recursing into ${...} interpolations.
function extractLiterals(code) {
  const chunks = [];
  const n = code.length;

  const readString = (i, quote) => {
    let j = i + 1, buf = '';
    while (j < n && code[j] !== quote) {
      if (code[j] === '\\') j++;
      else buf += code[j];
      j++;
    }
    chunks.push(buf);
    return j + 1;
  };

  const readExpr = (i) => {
    let depth = 1;
    while (i < n && depth > 0) {
      const c = code[i];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      else if (c === '"' || c === "'") { i = readString(i, c); continue; }
      else if (c === '`') { i = readTemplate(i); continue; }
      i++;
    }
    return i;
  };

  const readTemplate = (i) => {
    let j = i + 1, buf = '';
    while (j < n && code[j] !== '`') {
      if (code[j] === '\\') { j += 2; continue; }
      if (code[j] === '$' && code[j + 1] === '{') {
        chunks.push(buf);
        buf = '';
        j = readExpr(j + 2);
        continue;
      }
      buf += code[j];
      j++;
    }
    chunks.push(buf);
    return j + 1;
  };

  let i = 0;
  while (i < n) {
    const c = code[i];
    if (c === '"' || c === "'") i = readString(i, c);
    else if (c === '`') i = readTemplate(i);
    else i++;
  }
  return chunks;
}

// Returns the className attribute expressions of a tsx source.
function classNameSpans(code) {
  const spans = [];
  const re = /className\s*=\s*/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const start = m.index + m[0].length;
    const ch = code[start];
    if (ch === '"' || ch === "'") {
      const end = code.indexOf(ch, start + 1);
      spans.push(code.slice(start, end + 1));
    } else if (ch === '{') {
      let depth = 0, j = start;
      while (j < code.length) {
        if (code[j] === '{') depth++;
        else if (code[j] === '}' && --depth === 0) break;
        j++;
      }
      spans.push(code.slice(start, j + 1));
    }
  }
  return spans;
}

// Collects classes defined in the stylesheet layer (unescapes CSS selectors).
function collectDefined() {
  const files = [join(SRC, 'index.css')];
  for (const f of readdirSync(join(SRC, 'styles'))) {
    if (f.endsWith('.css')) files.push(join(SRC, 'styles', f));
  }
  const defined = new Set();
  for (const file of files) {
    const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of css.matchAll(/\.((?:\\.|[-\w])+)/g)) {
      const name = m[1].replace(/\\(.)/g, '$1');
      const prev = css[m.index - 1];
      if (/^[0-9]/.test(name)) continue;              // .15s timing fragments
      if (prev && /[0-9.]/.test(prev)) continue;      // decimal points 0.25
      defined.add(name);
    }
  }
  return defined;
}

const defined = collectDefined();
const missing = new Map();

for (const file of walk(SRC)) {
  if (EXCLUDED_FILES.has(file.split('/').pop())) continue;
  const code = readFileSync(file, 'utf8');
  for (const span of classNameSpans(code)) {
    for (const chunk of extractLiterals(span)) {
      for (const token of chunk.split(/\s+/)) {
        if (!token || IGNORE_TOKENS.has(token)) continue;
        if (!defined.has(token)) {
          if (!missing.has(token)) missing.set(token, new Set());
          missing.get(token).add(relative(process.cwd(), file));
        }
      }
    }
  }
}

if (missing.size === 0) {
  console.log('check-classes: OK — every className token has a CSS definition.');
  process.exit(0);
}

console.error(`check-classes: ${missing.size} undefined class token(s):`);
for (const [token, files] of [...missing].sort()) {
  console.error(`  ${token}  <-  ${[...files].join(', ')}`);
}
process.exit(1);
