// src/pages/CollaborationPage.tsx

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckSquare, MessageSquare, Sliders } from "react-feather";
import content from "../content/collaboration.json";
import entries from "../content/collaboration-entries.json";
import { Reveal } from "../components/ui/Reveal";
import type { CollaborationEntry } from "../types/thesis";
import { formatIndex } from "../utils/format";
import { SourceIndex } from "../components/bibliography/SourceIndex";

const icons = [MessageSquare, Sliders, CheckSquare];

export function CollaborationPage() {
  const typedEntries = entries as CollaborationEntry[];
  const [activeEntryId, setActiveEntryId] = useState(typedEntries[0]?.id ?? "");

  useEffect(() => {
    const sections = typedEntries
      .map((entry) => document.getElementById(entry.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visibleEntry = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          )[0];

        if (visibleEntry?.target.id) {
          setActiveEntryId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [typedEntries]);

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
              ariaLabel={content.indexAriaLabel}
              label={content.indexLabel}
              items={typedEntries.map((entry) => ({
                id: entry.id,
                title: entry.title,
                meta: entry.type,
              }))}
            />
          </Reveal>

          <div className="collaboration-list">
            {typedEntries.map((entry, index) => (
              <Reveal
                as="article"
                className="collaboration-entry"
                id={entry.id}
                key={entry.id}
                aria-labelledby={`${entry.id}-title`}
                delay={index === 0 ? 0.06 : 0}
              >
                <span className="source-number">{formatIndex(index)}</span>

                <div className="collaboration-entry-content">
                  <header className="collaboration-entry-header">
                    <div>
                      <h3 id={`${entry.id}-title`}>{entry.title}</h3>
                      <p className="source-meta">
                        {content.collaboration.entryLabels.entryType}:{" "}
                        {entry.type} <span>·</span>{" "}
                        {content.collaboration.entryLabels.focus}: {entry.focus}
                      </p>
                    </div>

                    {entry.status ? (
                      <span
                        className={`entry-status entry-status-${entry.status}`}
                      >
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
                    <TextBlock
                      label={content.collaboration.entryLabels.context}
                      body={entry.context}
                    />

                    <TextBlock
                      label={content.collaboration.entryLabels.assessment}
                      body={entry.assessment}
                    />

                    <TextBlock
                      label={
                        entry.status === "rejected"
                          ? "Decision Rationale"
                          : content.collaboration.entryLabels.revision
                      }
                      body={entry.revision}
                    />

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
            ))}
          </div>
        </div>
      </section>
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
