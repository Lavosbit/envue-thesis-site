import type { UseInViewOptions, Variants } from "motion/react";
import { createContext, useContext } from "react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export type ResponsiveMotionContextValue = {
  isMobile: boolean;
  reveal: (delay?: number) => Variants;
  viewport: UseInViewOptions;
};

export const ResponsiveMotionContext = createContext<ResponsiveMotionContextValue | null>(null);

export function useResponsiveMotion() {
  const context = useContext(ResponsiveMotionContext);

  if (!context) {
    throw new Error("useResponsiveMotion must be used within ResponsiveMotionProvider");
  }

  return context;
}
