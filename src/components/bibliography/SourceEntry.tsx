import { useState, useEffect } from "react";
import type {
  BibliographySectionContent,
  BibliographySource,
} from "../../types/thesis";
import { formatIndex } from "../../utils/format";
import { Reveal } from "../ui/Reveal";
// import { ArtifactPreview } from "./ArtifactPreview";
import { AnimatePresence, motion } from "motion/react";

function renderApaCitation(source: BibliographySource) {
  if (typeof source.apa === "string") return source.apa;

  const kind =
    source.apa.citationKind ??
    (source.type.toLowerCase().includes("book") ? "book" : "webArticle");

  if (kind === "journalArticle") {
    return (
      <>
        {source.apa.prefix} {source.apa.title}{" "}
        <em>
          {source.apa.journal}
          {source.apa.volume ? `, ${source.apa.volume}` : ""}
        </em>
        {source.apa.pages ? `, ${source.apa.pages}.` : "."}
        {source.apa.url ? (
          <>
            {" "}
            <a href={source.apa.url} target="_blank" rel="noopener noreferrer">
              {source.apa.url}
            </a>
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      {source.apa.prefix}{" "}
      {kind === "book" ? <em>{source.apa.title}</em> : source.apa.title}{" "}
      {source.apa.suffix}
      {source.apa.url ? (
        <>
          {" "}
          <a href={source.apa.url} target="_blank" rel="noopener noreferrer">
            {source.apa.url}
          </a>
        </>
      ) : null}
    </>
  );
}

export function SourceEntry({
  // artifactLabels,
  source,
  index,
  labels,
}: {
  artifactLabels: BibliographySectionContent["artifactLabels"];
  source: BibliographySource;
  index: number;
  labels: BibliographySectionContent["sourceLabels"];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    <>
      <Reveal
        aria-labelledby={`${source.id}-title`}
        as="article"
        className="source-entry source-card"
        delay={index === 0 ? 0.06 : 0}
        id={source.id}
      >
        <span className="source-number">{formatIndex(index)}</span>

        <button
          className="source-card-button"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`View full annotation for ${source.title}`}
        >
          <div className="annotation-column"></div>
          <div className="source-content">
            <h3 id={`${source.id}-title`}>{source.title}</h3>
            <p className="source-author">{source.author}</p>
            <p className="source-citation">{renderApaCitation(source)}</p>
            <p className="source-meta">
              {labels.sourceType}: {source.type} <span>·</span> {labels.year}:{" "}
              {source.year}
            </p>

            <div className="source-card-preview">
              <div>
                <h4>{labels.finding}</h4>
                <p>{source.finding}</p>
              </div>
              {/* <span className="source-card-cta">View annotation ↗</span> */}
            </div>
          </div>
        </button>
        <div className="annotation-column">
          <button
            className="source-card-cta"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`View full annotation for ${source.title}`}
          >
            View annotation ↗
          </button>
        </div>
        {/* <ArtifactPreview
          artifact={source.artifact}
          artifactId={`${source.id}-artifact`}
          labels={artifactLabels}
        /> */}
      </Reveal>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="source-modal-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.article
              className="source-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${source.id}-modal-title`}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="source-modal-close"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close annotation"
              >
                Close
              </button>

              <div className="source-modal-header">
                {/* <span className="source-number">{formatIndex(index)}</span> */}
                <div>
                  <span className="source-modal-number">
                    {formatIndex(index)}
                  </span>
                  <h3 id={`${source.id}-modal-title`}>{source.title}</h3>
                  <p className="source-author">{source.author}</p>
                  <p className="source-citation">{renderApaCitation(source)}</p>
                  <p className="source-meta">
                    {labels.sourceType}: {source.type} <span>·</span>{" "}
                    {labels.year}: {source.year}
                  </p>
                </div>
              </div>

              {/* <div className="source-modal-body">
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
                </div> */}

              <div className="source-modal-body">
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

                <div className="source-modal-insights">
                  {designFields.map((field) => (
                    <div key={field.key}>
                      <h4>{field.label}</h4>
                      <p>{source[field.key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
