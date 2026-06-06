import { motion, useReducedMotion } from "motion/react";
import type { Artifact, BibliographySectionContent } from "../../types/thesis";
import { motionEase } from "../../motion/responsiveMotion";
import { ArrowLink } from "../ui/ArrowLink";
import { Reveal } from "../ui/Reveal";

export function ArtifactPreview({
  artifact,
  artifactId,
  labels,
}: {
  artifact: Artifact;
  artifactId: string;
  labels: BibliographySectionContent["artifactLabels"];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal as="aside" className="artifact-column" delay={0.08}>
      <p className="module-label">{labels.related}</p>
      <motion.div
        aria-labelledby={`${artifactId}-title`}
        className={`artifact-preview ${artifact.variant}`}
        id={artifactId}
        role="group"
        transition={{ duration: 0.35, ease: motionEase }}
        whileHover={reduceMotion ? undefined : { y: -4, scale: 1.012 }}
      >
        <div aria-hidden="true" className="artifact-mark">
          {labels.mark}
        </div>
        <span>{artifact.label}</span>
        <strong id={`${artifactId}-title`}>{artifact.title}</strong>
        <p>{artifact.detail}</p>
        <ArtifactDecoration variant={artifact.variant} />
      </motion.div>
      <ArrowLink className="artifact-link" href={`#${artifactId}`}>
        {labels.view}
      </ArrowLink>
    </Reveal>
  );
}

function ArtifactDecoration({ variant }: { variant: Artifact["variant"] }) {
  if (variant === "system") {
    return (
      <div className="system-nodes" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    );
  }

  return variant === "principles" ? <div className="orbit" aria-hidden="true" /> : null;
}
