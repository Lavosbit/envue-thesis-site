import content from "../content/project.json";
import { SourceIndex } from "../components/bibliography/SourceIndex";
import { Reveal } from "../components/ui/Reveal";

export function ProjectPage() {
  return (
    <>
      <section className="hero page-shell" id="top">
        <div className="hero-copy">
          <Reveal as="h1">{content.hero.title}</Reveal>
          <Reveal as="p" className="hero-summary" delay={0.08}>
            {content.hero.summary}
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

      <section className="project-section page-shell" id="project">
        <Reveal className="sources-intro">
          <div className="section-heading">
            <span>{content.project.number}</span>
            <h2>{content.project.title}</h2>
          </div>
          <p>{content.project.intro}</p>
        </Reveal>

        <div className="sources-layout">
          <Reveal as="aside" className="source-index" delay={0.05}>
            <SourceIndex
              ariaLabel={content.project.indexAriaLabel}
              label={content.project.indexLabel}
              items={content.project.sections.map((section) => ({
                id: section.id,
                title: section.title,
                meta: section.meta,
              }))}
            />
          </Reveal>

          <div className="project-list">
            {content.project.sections.map((section, index) => (
              <Reveal
                as="article"
                className="project-entry"
                id={section.id}
                key={section.id}
                delay={index === 0 ? 0.06 : 0}
              >
                <span className="source-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="project-entry-content">
                  <header className="project-entry-header">
                    <div>
                      <p className="module-label">{section.meta}</p>
                      <h3>{section.title}</h3>
                    </div>
                  </header>

                  {section.images?.length ? (
                    <div
                      className={`project-media-grid project-media-${section.images.length}`}
                    >
                      {section.images.map((image) => (
                        <figure className="project-media-card" key={image.src}>
                          <img src={image.src} alt={image.alt} />
                          {image.caption ? (
                            <figcaption>{image.caption}</figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}

                  <div className="project-entry-body">
                    <TextBlock
                      label="Development Rationale"
                      body={section.body}
                    />

                    {section.source?.length ? (
                      <section className="entry-source-reference">
                        <h4>Supporting Source</h4>

                        {section.source
                          .filter((source) => source.reference)
                          .map((source, sourceIndex) => (
                            <p key={`${section.id}-source-${sourceIndex}`}>
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
                    ) : null}
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

function TextBlock({ label, body }: { label: string; body: string }) {
  return (
    <section className="entry-text-block">
      <h4>{label}</h4>
      <p>{body}</p>
    </section>
  );
}
