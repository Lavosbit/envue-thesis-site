import { getBibliographySection } from "../../content";
import { Reveal } from "../ui/Reveal";
import { VideoSynopsis } from "./VideoSynopsis";

export function HeroSection() {
  const content = getBibliographySection("hero");

  return (
    <section aria-labelledby="bibliography-page-title" className="hero page-shell" id="top">
      <div className="hero-copy">
        <Reveal as="h1" id="bibliography-page-title">
          {content.title}
        </Reveal>
        <Reveal as="p" className="hero-summary" delay={0.08}>
          {content.summary}
        </Reveal>
        <Reveal as="dl" className="page-meta" delay={0.16}>
          {content.meta.map((item) => (
            <div key={item.id}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
      <Reveal delay={0.12}>
        <VideoSynopsis content={content.video} />
      </Reveal>
    </section>
  );
}
