import type { BibliographySectionContent, BibliographySource } from "../../types/thesis";
import { formatIndex } from "../../utils/format";
import { Reveal } from "../ui/Reveal";
import { ArtifactPreview } from "./ArtifactPreview";

export function SourceEntry({
  artifactLabels,
  source,
  index,
  labels,
}: {
  artifactLabels: BibliographySectionContent["artifactLabels"];
  source: BibliographySource;
  index: number;
  labels: BibliographySectionContent["sourceLabels"];
}) {
  const annotatedAnalysis = [
    { key: "summary", label: labels.summary },
    { key: "evaluation", label: labels.evaluation },
    { key: "reflection", label: labels.reflection },
  ] as const;

  const designFields = [
    { key: "finding", label: labels.finding },
    { key: "decision", label: labels.decision },
  ] as const;

  return (
    <Reveal
      aria-labelledby={`${source.id}-title`}
      as="article"
      className="source-entry"
      delay={index === 0 ? 0.06 : 0}
      id={source.id}
    >
      <span className="source-number">{formatIndex(index)}</span>
      <div className="source-content">
        <h3 id={`${source.id}-title`}>{source.title}</h3>
        <p className="source-author">{source.author}</p>
        <p className="source-citation">{source.apa}</p>
        <p className="source-meta">
          {labels.sourceType}: {source.type} <span>·</span> {labels.year}: {source.year}
        </p>
        <div className="source-analysis">
          <div className="annotated-analysis">
            <h4>{labels.analysis}</h4>
            {annotatedAnalysis.map((field) =>
              source[field.key] ? (
                <div className="analysis-part" key={field.key}>
                  <h5>{field.label}</h5>
                  <p>{source[field.key]}</p>
                </div>
              ) : null,
            )}
          </div>
          {designFields.map((field) => (
            <div key={field.key}>
              <h4>{field.label}</h4>
              <p>{source[field.key]}</p>
            </div>
          ))}
        </div>
      </div>
      <ArtifactPreview artifact={source.artifact} artifactId={`${source.id}-artifact`} labels={artifactLabels} />
    </Reveal>
  );
}
