import type { ReactNode } from "react";
import { BookOpen, FileText, Sliders } from "react-feather";
import { getBibliographySection } from "../../content";
import type { OverviewIconId } from "../../types/thesis";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const overviewIcons: Record<OverviewIconId, ReactNode> = {
  book: <BookOpen aria-hidden="true" />,
  sliders: <Sliders aria-hidden="true" />,
  file: <FileText aria-hidden="true" />,
};

export function OverviewSection() {
  const content = getBibliographySection("overview");

  return (
    <section
      aria-labelledby="overview-title"
      className="overview page-shell"
      id="overview"
    >
      <Reveal>
        <SectionHeading
          headingId="overview-title"
          number={content.number}
          title={content.title}
        />
      </Reveal>
      <Reveal as="p" className="overview-intro" delay={0.08}>
        {content.body}
      </Reveal>
      <ol className="evidence-path" aria-label={content.pathLabel}>
        {content.steps.map((step, index) => (
          <PathStep
            body={step.body}
            index={index}
            key={step.id}
            title={step.title}
            icon={overviewIcons[step.icon]}
          />
        ))}
      </ol>
    </section>
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
