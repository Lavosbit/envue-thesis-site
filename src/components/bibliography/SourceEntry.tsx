import { useCallback, useMemo, useState } from "react";
import type {
  BibliographySectionContent,
  BibliographySource,
} from "../../types/thesis";
import { formatIndex } from "../../utils/format";
import { Reveal } from "../ui/Reveal";
import { motion } from "motion/react";
import { Lightbox, type LightboxImage } from "../ui/Lightbox";

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

type ArtifactWithSrc = {
  src: string;
  label?: string;
  type?: "image" | "video";
  poster?: string;
};

type LightboxState = {
  images: LightboxImage[];
  index: number;
  layoutId: string;
  enableSharedLayout: boolean;
} | null;

export function SourceEntry({
  source,
  index,
  labels,
}: {
  artifactLabels: BibliographySectionContent["artifactLabels"];
  source: BibliographySource;
  index: number;
  labels: BibliographySectionContent["sourceLabels"];
}) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const annotatedAnalysis = [
    { key: "summary", label: labels.summary },
    { key: "evaluation", label: labels.evaluation },
    { key: "reflection", label: labels.reflection },
  ] as const;

  const designFields = [
    { key: "finding", label: labels.finding },
    { key: "decision", label: labels.decision },
  ] as const;

  const artifacts = useMemo(() => {
    const legacyArtifact =
      source.artifact && "src" in source.artifact && source.artifact.src
        ? [source.artifact as ArtifactWithSrc]
        : [];

    const artifactGallery =
      "artifacts" in source &&
      Array.isArray(source.artifacts) &&
      source.artifacts.length > 0
        ? (source.artifacts.filter((artifact): artifact is ArtifactWithSrc =>
            Boolean(artifact?.src),
          ) as ArtifactWithSrc[])
        : [];

    return artifactGallery.length > 0 ? artifactGallery : legacyArtifact;
  }, [source]);

  const lightboxImages = artifacts.map((artifact, artifactIndex) => ({
    src: artifact.src,
    alt: artifact.label ?? `${source.title} artifact ${artifactIndex + 1}`,
    type: artifact.src.endsWith(".mp4") ? "video" : "image",
  }));

  const openArtifact = useCallback(
    (artifactIndex: number) => {
      setLightbox({
        images: lightboxImages,
        index: artifactIndex,
        layoutId: `bibliography-artifact-${source.id}-${artifactIndex}`,
        enableSharedLayout: true,
      });
    },
    [lightboxImages, source.id],
  );

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setLightbox((current) => {
      if (!current || current.index === 0) return current;

      return {
        ...current,
        index: current.index - 1,
        enableSharedLayout: false,
      };
    });
  }, []);

  const showNextImage = useCallback(() => {
    setLightbox((current) => {
      if (!current || current.index === current.images.length - 1) {
        return current;
      }

      return {
        ...current,
        index: current.index + 1,
        enableSharedLayout: false,
      };
    });
  }, []);

  return (
    <>
      <Reveal
        aria-labelledby={`${source.id}-title`}
        as="article"
        className="source-entry source-inline"
        delay={index === 0 ? 0.06 : 0}
        id={source.id}
      >
        <header className="source-inline-header">
          <span className="source-number">{formatIndex(index)}</span>

          <div className="source-heading">
            <h3 id={`${source.id}-title`}>{source.title}</h3>
            <p className="source-author">{source.author}</p>
            <p className="source-citation">{renderApaCitation(source)}</p>
            <p className="source-meta">
              {labels.sourceType}: {source.type} <span>·</span> {labels.year}:{" "}
              {source.year}
            </p>
          </div>
        </header>

        <div className="source-inline-body">
          <section className="annotated-analysis">
            <h4>{labels.analysis}</h4>

            {annotatedAnalysis.map((field) =>
              source[field.key] ? (
                <div className="analysis-part" key={field.key}>
                  <h5>{field.label}</h5>
                  <p>{source[field.key]}</p>
                </div>
              ) : null,
            )}
          </section>

          <aside className="source-inline-insights">
            {designFields.map((field) =>
              source[field.key] ? (
                <div className="source-insight-block" key={field.key}>
                  <h4>{field.label}</h4>
                  <p>{source[field.key]}</p>
                </div>
              ) : null,
            )}

            {artifacts.length > 0 ? (
              <div className="source-artifact-block">
                <h4>Envue Artifact</h4>

                <div className="bibliography-artifact-grid">
                  {artifacts.map((artifact, artifactIndex) => {
                    const isVideo =
                      "type" in artifact
                        ? artifact.type === "video"
                        : artifact.src.toLowerCase().endsWith(".mp4");

                    return (
                      <button
                        className="bibliography-artifact-thumb"
                        type="button"
                        key={`${artifact.src}-${artifactIndex}`}
                        onClick={() => openArtifact(artifactIndex)}
                        aria-label={`Open artifact ${artifactIndex + 1} for ${source.title}`}
                      >
                        {isVideo ? (
                          <video
                            src={artifact.src}
                            muted
                            playsInline
                            preload="metadata"
                            className="bibliography-artifact-media"
                          />
                        ) : (
                          <motion.img
                            src={artifact.src}
                            alt=""
                            loading="lazy"
                            className="bibliography-artifact-media"
                            layoutId={`bibliography-artifact-${source.id}-${artifactIndex}-image`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </Reveal>

      {lightbox ? (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          layoutId={`bibliography-artifact-${source.id}-${lightbox.index}-image`}
          enableSharedLayout={lightbox.enableSharedLayout}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      ) : null}
    </>
  );
}
