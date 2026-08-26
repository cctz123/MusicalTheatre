function inline(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

export function Markdown({ content }: { content: string }) {
  const normalized = content.replace(/●\s+/g, "\n- ");
  const blocks = normalized.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="prose-museum">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="section-title">
              {block.replace(/^## /, "")}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="mb-3 mt-8 font-medium tracking-[0.04em] text-ink">
              {block.replace(/^### /, "")}
            </h3>
          );
        }
        const lines = block.split("\n");
        if (lines.every((line) => line.trim().startsWith("- "))) {
          return (
            <ul key={index}>
              {lines.map((line, lineIndex) => (
                <li
                  key={lineIndex}
                  dangerouslySetInnerHTML={{ __html: inline(line.replace(/^- /, "")) }}
                />
              ))}
            </ul>
          );
        }
        const html = inline(lines.join(" "));
        return <p key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}
