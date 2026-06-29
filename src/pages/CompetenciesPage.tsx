import { useCallback, useState } from "react";
import content from "../content/competencies.json";
import { SourceIndex } from "../components/bibliography/SourceIndex";
import { Reveal } from "../components/ui/Reveal";
import { Lightbox, type LightboxImage } from "../components/ui/Lightbox";
import { motion } from "motion/react";

type CompetencySection = {
  id: string;
  title: string;
  body: string;
  image?: LightboxImage;
  gallery?: LightboxImage[];
};

type LightboxState = {
  images: LightboxImage[];
  index: number;
  layoutId: string;
  enableSharedLayout: boolean;
} | null;

export function CompetenciesPage() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const sections = content.competencies.sections as CompetencySection[];

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
      if (!current || current.index === current.images.length - 1)
        return current;

      return {
        ...current,
        index: current.index + 1,
        enableSharedLayout: false,
      };
    });
  }, []);

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

      <section className="project-section page-shell" id="competencies">
        <Reveal className="sources-intro">
          <div className="section-heading">
            <span>04</span>
            <h2>{content.competencies.title}</h2>
          </div>
          <p>{content.competencies.intro}</p>
        </Reveal>

        <div className="sources-layout">
          <Reveal as="aside" className="source-index" delay={0.05}>
            <SourceIndex
              ariaLabel={content.competencies.indexAriaLabel}
              label={content.competencies.indexLabel}
              items={sections.map((section) => ({
                id: section.id,
                title: section.title,
              }))}
            />
          </Reveal>

          <div className="competencies-list">
            {sections.map((section) => {
              const gallery =
                section.gallery && section.gallery.length > 0
                  ? section.gallery
                  : section.image
                    ? [section.image]
                    : [];

              const heroImage = gallery[0];

              return (
                <Reveal
                  as="article"
                  className="competency-entry"
                  id={section.id}
                  key={section.id}
                >
                  <div className="competency-entry-content">
                    <header className="competency-entry-header">
                      <p className="module-label">Professional Competency</p>
                      <h3>{section.title}</h3>
                    </header>

                    <div className="competency-entry-layout">
                      <div className="competency-artifacts">
                        {heroImage ? (
                          <figure className="project-media-card competency-media-card">
                            <button
                              className="competency-image-button"
                              type="button"
                              onClick={() =>
                                setLightbox({
                                  images: gallery,
                                  index: 0,
                                  layoutId: `competency-image-${section.id}`,
                                  enableSharedLayout: true,
                                })
                              }
                              aria-label={`Open ${heroImage.title ?? heroImage.alt}`}
                            >
                              <motion.img
                                src={heroImage.src}
                                alt={heroImage.alt}
                                loading="lazy"
                                layoutId={`competency-image-${section.id}`}
                              />
                            </button>

                            <figcaption>
                              {heroImage.caption ?? heroImage.title}
                            </figcaption>
                          </figure>
                        ) : null}
                      </div>

                      <section className="competency-copy">
                        <h4>Competency Reflection</h4>
                        <p>{section.body}</p>
                      </section>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {lightbox ? (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          layoutId={lightbox.layoutId}
          enableSharedLayout={lightbox.enableSharedLayout}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      ) : null}
    </>
  );
}
