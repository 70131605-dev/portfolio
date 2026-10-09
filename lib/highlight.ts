/**
 * Minimal JS/TS tokenizer for the decorative code panels. Not a full parser —
 * just enough to colour short, hand-written snippets without a 50kB dependency.
 */
export type Token = { t: "key" | "var" | "prop" | "str" | "pun" | "com" | "fn" | "txt"; v: string };

const KEYWORDS = new Set([
  "const", "let", "return", "export", "import", "from", "async", "await", "function", "new", "type", "interface", "if", "else", "true", "false", "null",
]);

const RE = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$"'`]+)/gm;

export function tokenizeLine(line: string): Token[] {
  const out: Token[] = [];
  let m: RegExpExecArray | null;
  RE.lastIndex = 0;
  while ((m = RE.exec(line))) {
    const [, com, str, ident, ws, pun] = m;
    if (com) out.push({ t: "com", v: com });
    else if (str) out.push({ t: "str", v: str });
    else if (ident) {
      const rest = line.slice(RE.lastIndex);
      if (KEYWORDS.has(ident)) out.push({ t: "key", v: ident });
      else if (/^\s*:/.test(rest) && !/^\s*::/.test(rest)) out.push({ t: "prop", v: ident });
      else if (/^\s*(\(|=\s*(async\s*)?\()/.test(rest)) out.push({ t: "fn", v: ident });
      else out.push({ t: "var", v: ident });
    } else if (ws) out.push({ t: "txt", v: ws });
    else if (pun) out.push({ t: "pun", v: pun });
  }
  return out;
}

export const tokenize = (code: string) => code.replace(/\n$/, "").split("\n").map(tokenizeLine);
