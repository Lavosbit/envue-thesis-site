import { useEffect, useState } from "react";
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
  const [activeId, setActiveId] = useState(sources[0]?.id ?? "");

  useEffect(() => {
    const updateActiveSource = () => {
      const scrollPosition = window.scrollY + 140;

      const currentSource = sources
        .map((source) => document.getElementById(source.id))
        .filter((element): element is HTMLElement => Boolean(element))
        .filter((element) => element.offsetTop <= scrollPosition)
        .at(-1);

      if (currentSource) {
        setActiveId(currentSource.id);
      }
    };

    updateActiveSource();

    window.addEventListener("scroll", updateActiveSource, { passive: true });
    window.addEventListener("resize", updateActiveSource);

    return () => {
      window.removeEventListener("scroll", updateActiveSource);
      window.removeEventListener("resize", updateActiveSource);
    };
  }, [sources]);

  return (
    <nav aria-label={ariaLabel}>
      <p className="module-label">{label}</p>
      <ol>
        {sources.map((source, index) => {
          const isActive = activeId === source.id;

          return (
            <li key={source.id}>
              <a
                href={`#${source.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  setActiveId(source.id);
                  window.setTimeout(() => {
                    const element = document.getElementById(source.id);
                    if (element) setActiveId(element.id);
                  }, 250);
                }}
              >
                <span>{formatIndex(index)}</span>
                <strong>{source.title}</strong>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
