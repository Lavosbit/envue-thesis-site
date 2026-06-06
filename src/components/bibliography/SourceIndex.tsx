import type { BibliographySource } from "../../types/thesis";
import { formatIndex } from "../../utils/format";

export function SourceIndex({
  ariaLabel,
  label,
  sources,
}: {
  ariaLabel: string;
  label: string;
  sources: BibliographySource[];
}) {
  return (
    <nav aria-label={ariaLabel}>
      <p className="module-label">{label}</p>
      <ol>
        {sources.map((source, index) => (
          <li key={source.id}>
            <a href={`#${source.id}`}>
              <span>{formatIndex(index)}</span>
              <span>
                {source.title} · {source.author}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
