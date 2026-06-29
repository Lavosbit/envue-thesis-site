import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export type LightboxImage = {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  type?: "image" | "video";
};

export type LightboxState = {
  images: LightboxImage[];
  index: number;
  layoutId: string;
  enableSharedLayout: boolean;
} | null;

export type OpenLightboxOptions = {
  images: LightboxImage[];
  index?: number;
  layoutId: string;
  enableSharedLayout?: boolean;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number;
  layoutId: string;
  enableSharedLayout: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function useLightbox() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = useCallback(
    ({
      images,
      index = 0,
      layoutId,
      enableSharedLayout = true,
    }: OpenLightboxOptions) => {
      setLightbox({ images, index, layoutId, enableSharedLayout });
    },
    [],
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

  return {
    lightbox,
    openLightbox,
    closeLightbox,
    showPreviousImage,
    showNextImage,
  };
}

export function Lightbox({
  images,
  index,
  layoutId,
  enableSharedLayout,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const image = images[index];
  const hasMultipleImages = images.length > 1;
  const canGoPrevious = hasMultipleImages && index > 0;
  const canGoNext = hasMultipleImages && index < images.length - 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && canGoPrevious) {
        onPrevious();
      }

      if (event.key === "ArrowRight" && canGoNext) {
        onNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canGoNext, canGoPrevious, onClose, onPrevious, onNext]);

  if (!image) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          className="lightbox-backdrop"
          type="button"
          aria-label="Close image preview"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.figure className="lightbox-panel">
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close image preview"
            onClick={onClose}
          >
            ×
          </button>

          {hasMultipleImages ? (
            <button
              className="lightbox-nav lightbox-prev"
              type="button"
              aria-label="Previous image"
              onClick={onPrevious}
              disabled={!canGoPrevious}
            >
              ‹
            </button>
          ) : null}

          {image.type === "video" ? (
            <motion.video
              key={image.src}
              src={image.src}
              controls
              autoPlay
              playsInline
              layoutId={
                enableSharedLayout && index === 0 ? layoutId : undefined
              }
              initial={{ opacity: enableSharedLayout && index === 0 ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.18 },
                layout: { type: "spring", stiffness: 260, damping: 30 },
              }}
            />
          ) : (
            <motion.img
              key={image.src}
              src={image.src}
              alt={image.alt}
              layoutId={
                enableSharedLayout && index === 0 ? layoutId : undefined
              }
              initial={{ opacity: enableSharedLayout && index === 0 ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.18 },
                layout: { type: "spring", stiffness: 260, damping: 30 },
              }}
            />
          )}

          {(image.title || image.caption) && (
            <figcaption>
              {image.title ? <strong>{image.title}</strong> : null}
              {image.caption ? <span>{image.caption}</span> : null}
            </figcaption>
          )}

          {hasMultipleImages ? (
            <button
              className="lightbox-nav lightbox-next"
              type="button"
              aria-label="Next image"
              onClick={onNext}
              disabled={!canGoNext}
            >
              ›
            </button>
          ) : null}
        </motion.figure>
      </motion.div>
    </AnimatePresence>
  );
}
