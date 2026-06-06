import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Pause, Play } from "react-feather";
import { motionEase } from "../../motion/responsiveMotion";
import type { HeroSectionContent } from "../../types/thesis";
import { ArrowLink } from "../ui/ArrowLink";

export function VideoSynopsis({ content }: { content: HeroSectionContent["video"] }) {
  const [playing, setPlaying] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  return (
    <div className="video-module">
      <button
        aria-label={playing ? content.controls.pause : content.controls.play}
        aria-pressed={playing}
        className={playing ? "video-frame is-playing" : "video-frame"}
        onClick={() => setPlaying((value) => !value)}
        type="button"
      >
        <span className="video-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <motion.span
          animate={{ scale: playing ? 0.94 : 1 }}
          className="play-control"
          transition={{ duration: 0.22, ease: motionEase }}
          whileHover={{ scale: 1.06 }}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </motion.span>
        <span className="video-status">{playing ? content.status.playing : content.status.idle}</span>
      </button>
      <div className="video-copy">
        <p className="module-label">{content.label}</p>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        <span className="media-meta">{content.meta}</span>
        <ArrowLink
          aria-controls="video-transcript"
          aria-expanded={transcriptOpen}
          onClick={() => setTranscriptOpen((open) => !open)}
        >
          {transcriptOpen ? content.controls.hideTranscript : content.controls.showTranscript}
        </ArrowLink>
      </div>
      <AnimatePresence initial={false}>
        {transcriptOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="transcript"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            id="video-transcript"
            aria-labelledby="video-transcript-label"
            role="region"
            transition={{ duration: 0.38, ease: motionEase }}
          >
            <p className="module-label" id="video-transcript-label">
              {content.transcript.label}
            </p>
            <p>{content.transcript.body}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
