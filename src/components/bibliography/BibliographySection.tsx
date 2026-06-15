import { bibliographySources, getBibliographySection } from "../../content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SourceEntry } from "./SourceEntry";
import { SourceIndex } from "./SourceIndex";

export function BibliographySection() {
  const content = getBibliographySection("bibliography");

  return (
    <section
      aria-labelledby="bibliography-title"
      className="sources page-shell"
      id="bibliography"
    >
      <Reveal className="sources-intro">
        <SectionHeading
          headingId="bibliography-title"
          number={content.number}
          title={content.title}
        />
        <p>{content.intro}</p>
      </Reveal>
      <div className="sources-layout">
        <Reveal as="aside" className="source-index" delay={0.05}>
          <SourceIndex
            ariaLabel={content.indexAriaLabel}
            label={content.indexLabel}
            items={bibliographySources.map((source) => ({
              id: source.id,
              title: source.title,
            }))}
          />
        </Reveal>
        <div className="source-list">
          {bibliographySources.map((source, index) => (
            <SourceEntry
              artifactLabels={content.artifactLabels}
              index={index}
              key={source.id}
              labels={content.sourceLabels}
              source={source}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
