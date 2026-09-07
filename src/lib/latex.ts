export type LatexBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

const cleanInline = (input: string) =>
  input
    .replace(/\\(textbf|textit|emph|underline|textsc|texttt|mbox|href\{[^}]*\})\{([^{}]*)\}/g, "$2")
    .replace(/\\\\/g, " ")
    .replace(/\\(newline|hfill|vfill|noindent|centering|bigskip|medskip|smallskip)\b/g, " ")
    .replace(/\\[a-zA-Z]+\*?(\[[^\]]*\])?(\{([^{}]*)\})?/g, (_m, _o, _b, inner) => inner ?? "")
    .replace(/[{}]/g, "")
    .replace(/~/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Convert a LaTeX document into simple display blocks. */
export function parseLatex(source: string): LatexBlock[] {
  const body = source.includes("\\begin{document}")
    ? source.slice(source.indexOf("\\begin{document}") + "\\begin{document}".length)
    : source;

  const lines = body
    .replace(/\\end\{document\}[\s\S]*$/, "")
    .split("\n")
    .map((l) => l.replace(/(^|[^\\])%.*$/, "$1"))
    .map((l) => l.trim());

  const blocks: LatexBlock[] = [];
  let listItems: string[] = [];
  let paragraph: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };
  const flushParagraph = () => {
    const text = cleanInline(paragraph.join(" "));
    paragraph = [];
    if (text) blocks.push({ type: "paragraph", text });
  };

  for (const line of lines) {
    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^\\(title|section|subsection|subsubsection)\*?\{([\s\S]*)\}/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1] === "title" ? 1 : heading[1] === "section" ? 2 : 3;
      const text = cleanInline(heading[2]);
      if (text) blocks.push({ type: "heading", level: level as 1 | 2 | 3, text });
      continue;
    }

    if (/^\\begin\{(itemize|enumerate|description)\}/.test(line)) {
      flushParagraph();
      continue;
    }
    if (/^\\end\{(itemize|enumerate|description)\}/.test(line)) {
      flushList();
      continue;
    }
    if (line.startsWith("\\item")) {
      flushParagraph();
      const text = cleanInline(line.replace(/^\\item\s*(\[[^\]]*\])?/, ""));
      if (text) listItems.push(text);
      continue;
    }
    if (/^\\(begin|end)\{/.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}
