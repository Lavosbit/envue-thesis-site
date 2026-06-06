import { MotionConfig } from "motion/react";
import type { UseInViewOptions } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  motionEase,
  ResponsiveMotionContext,
  type ResponsiveMotionContextValue,
} from "./responsiveMotion";

export function ResponsiveMotionProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 820px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const value = useMemo<ResponsiveMotionContextValue>(() => {
    const viewport: UseInViewOptions = isMobile
      ? { once: true, amount: 0.2, margin: "0px 0px -22% 0px" }
      : { once: true, amount: 0.24, margin: "0px 0px -12% 0px" };

    return {
      isMobile,
      viewport,
      reveal: (delay = 0) => ({
        hidden: { opacity: 0, y: isMobile ? 12 : 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: isMobile ? Math.min(delay, 0.04) : delay,
            duration: isMobile ? 0.48 : 0.68,
            ease: motionEase,
          },
        },
      }),
    };
  }, [isMobile]);

  return (
    <ResponsiveMotionContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ResponsiveMotionContext.Provider>
  );
}
