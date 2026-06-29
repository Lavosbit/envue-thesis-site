// src/pages/CollaborationPage.tsx

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CheckSquare, MessageSquare, Sliders } from "react-feather";
import { motion } from "motion/react";
import content from "../content/collaboration.json";
import entries from "../content/collaboration-entries.json";
import { SourceIndex } from "../components/bibliography/SourceIndex";
import { Reveal } from "../components/ui/Reveal";
import { Lightbox, type LightboxImage } from "../components/ui/Lightbox";
import type { CollaborationEntry } from "../types/thesis";
import { formatIndex } from "../utils/format";

const icons = [MessageSquare, Sliders, CheckSquare];

type EvidenceItem = {
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

export function CollaborationPage() {
  const typedEntries = entries as CollaborationEntry[];

  return (
    <>
      <section
        aria-labelledby="collaboration-page-title"
        className="hero page-shell"
        id="top"
      >
        <div className="hero-copy">
          <Reveal as="h1" id="collaboration-page-title">
            {content.hero.title}
          </Reveal>

          <Reveal as="p" className="hero-summary" delay={0.08}>
            {content.hero.summary}
          </Reveal>

          <Reveal as="dl" className="page-meta" delay={0.16}>
            {content.hero.meta.map((item) => (
              <div key={item.id}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="video-module">
            <div className="youtube-embed-shell">
              <iframe
                className="youtube-embed"
                src={content.hero.video.embedUrl}
                title={content.hero.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="video-copy">
              <p className="module-label">{content.hero.video.label}</p>
              <h2>{content.hero.video.title}</h2>
              <p>{content.hero.video.description}</p>
              <span className="media-meta">{content.hero.video.meta}</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        aria-labelledby="overview-title"
        className="overview page-shell"
        id="overview"
      >
        <Reveal>
          <div className="section-heading">
            <span>{content.overview.number}</span>
            <h2 id="overview-title">{content.overview.title}</h2>
          </div>
        </Reveal>

        <Reveal as="p" className="overview-intro" delay={0.08}>
          {content.overview.body}
        </Reveal>

        <ol className="evidence-path" aria-label={content.overview.pathLabel}>
          {content.overview.steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <PathStep
                body={step.body}
                icon={<Icon aria-hidden="true" />}
                index={index}
                key={step.id}
                title={step.title}
              />
            );
          })}
        </ol>
      </section>

      <section className="collaboration-section page-shell" id="collaboration">
        <div className="sources-intro">
          <Reveal>
            <div className="section-heading">
              <span>{content.collaboration.number}</span>
              <h2>{content.collaboration.title}</h2>
            </div>
          </Reveal>

          <Reveal as="p" delay={0.08}>
            {content.collaboration.intro}
          </Reveal>
        </div>

        <div className="sources-layout">
          <Reveal as="aside" className="source-index" delay={0.05}>
            <SourceIndex
              ariaLabel={content.collaboration.indexAriaLabel}
              label={content.collaboration.indexLabel}
              items={typedEntries.map((entry) => ({
                id: entry.id,
                title: entry.title,
                meta: entry.type,
              }))}
            />
          </Reveal>

          <div className="collaboration-list">
            {typedEntries.map((entry, index) => (
              <CollaborationEntryArticle
                entry={entry}
                index={index}
                key={entry.id}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CollaborationEntryArticle({
  entry,
  index,
}: {
  entry: CollaborationEntry;
  index: number;
}) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const evidence = useMemo(() => {
    if (!("evidence" in entry) || !Array.isArray(entry.evidence)) return [];

    return entry.evidence.filter((item): item is EvidenceItem =>
      Boolean(item?.src),
    );
  }, [entry]);

  const lightboxImages = evidence.map((item, evidenceIndex) => ({
    src: item.src,
    alt: item.label ?? `${entry.title} evidence ${evidenceIndex + 1}`,
    type:
      item.type ??
      (item.src.toLowerCase().endsWith(".mp4") ? "video" : "image"),
  }));

  const openEvidence = useCallback(
    (evidenceIndex: number) => {
      setLightbox({
        images: lightboxImages,
        index: evidenceIndex,
        layoutId: `collaboration-evidence-${entry.id}-${evidenceIndex}-image`,
        enableSharedLayout: true,
      });
    },
    [entry.id, lightboxImages],
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
        as="article"
        className="collaboration-entry"
        id={entry.id}
        aria-labelledby={`${entry.id}-title`}
        delay={index === 0 ? 0.06 : 0}
      >
        <span className="source-number">{formatIndex(index)}</span>

        <div className="collaboration-entry-content">
          <header className="collaboration-entry-header">
            <div>
              <h3 id={`${entry.id}-title`}>{entry.title}</h3>
              <p className="source-meta">
                {content.collaboration.entryLabels.entryType}: {entry.type}{" "}
                <span>·</span> {content.collaboration.entryLabels.focus}:{" "}
                {entry.focus}
              </p>
            </div>

            {entry.status ? (
              <span className={`entry-status entry-status-${entry.status}`}>
                {entry.status === "accepted" ? "Accepted" : "Rejected"}
              </span>
            ) : null}
          </header>

          {(entry.images?.before || entry.images?.after) && (
            <div className="comparison-panel">
              <ComparisonImage
                src={entry.images?.before}
                label={content.collaboration.comparisonLabels.before}
              />

              <ComparisonImage
                src={entry.images?.after}
                label={content.collaboration.comparisonLabels.after}
              />
            </div>
          )}

          <div className="collaboration-entry-body">
            <div className="collaboration-left-column">
              <TextBlock
                label={content.collaboration.entryLabels.context}
                body={entry.context}
              />

              <TextBlock
                label={
                  entry.status === "rejected"
                    ? "Decision Rationale"
                    : content.collaboration.entryLabels.revision
                }
                body={entry.revision}
              />
            </div>

            <section className="entry-text-block entry-assessment-block">
              <h4>{content.collaboration.entryLabels.assessment}</h4>
              <p>{entry.assessment}</p>

              {evidence.length > 0 ? (
                <div className="collaboration-evidence-block">
                  <h4>Evidence</h4>

                  <div className="collaboration-evidence-grid">
                    {evidence.map((item, evidenceIndex) => {
                      const isVideo =
                        item.type === "video" ||
                        item.src.toLowerCase().endsWith(".mp4");

                      return (
                        <button
                          className="collaboration-evidence-thumb"
                          type="button"
                          key={`${item.src}-${evidenceIndex}`}
                          onClick={() => openEvidence(evidenceIndex)}
                          aria-label={`Open evidence ${
                            evidenceIndex + 1
                          } for ${entry.title}`}
                        >
                          {isVideo ? (
                            <video
                              className="collaboration-evidence-media"
                              src={item.src}
                              poster={item.poster}
                              muted
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <motion.img
                              className="collaboration-evidence-media"
                              src={item.src}
                              alt=""
                              loading="lazy"
                              layoutId={`collaboration-evidence-${entry.id}-${evidenceIndex}-image`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </section>

            <section className="entry-source-reference">
              <h4>{content.collaboration.entryLabels.source}</h4>

              {entry.source
                .filter((source) => source.reference)
                .map((source, index) => (
                  <p key={`${entry.id}-source-${index}`}>
                    {source.reference}{" "}
                    {source.url ? (
                      <a
                        className="source-url"
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.url}
                      </a>
                    ) : null}
                  </p>
                ))}
            </section>
          </div>
        </div>
      </Reveal>

      {lightbox ? (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          layoutId={`collaboration-evidence-${entry.id}-${lightbox.index}-image`}
          enableSharedLayout={lightbox.enableSharedLayout}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      ) : null}
    </>
  );
}

function PathStep({
  icon,
  title,
  body,
  index,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <>
      {index > 0 ? (
        <Reveal>
          <span aria-hidden="true" className="path-arrow">
            →
          </span>
        </Reveal>
      ) : null}

      <Reveal as="li" className="path-step" delay={index * 0.1}>
        <span className="step-number">{index + 1}</span>
        <span className="step-icon">{icon}</span>
        <div>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      </Reveal>
    </>
  );
}

function TextBlock({ label, body }: { label: string; body: string }) {
  return (
    <section className="entry-text-block">
      <h4>{label}</h4>
      <p>{body}</p>
    </section>
  );
}

function ComparisonImage({ src, label }: { src?: string; label: string }) {
  if (!src) {
    return (
      <div className="comparison-image is-empty">
        <span>{label}</span>
        <p>No image added yet</p>
      </div>
    );
  }

  return (
    <figure className="comparison-image">
      <img src={src} alt={`${label} design comparison`} />
      <figcaption>{label}</figcaption>
    </figure>
  );
}
