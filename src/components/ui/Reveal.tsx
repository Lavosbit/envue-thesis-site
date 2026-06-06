import { motion, useInView } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useRef } from "react";
import { useResponsiveMotion } from "../../motion/responsiveMotion";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  ...props
}: RevealProps<T>) {
  const { reveal, viewport } = useResponsiveMotion();
  const elementRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef, viewport);
  const MotionElement = motion.create(as ?? "div");

  return (
    <MotionElement
      animate={isInView ? "visible" : "hidden"}
      initial="hidden"
      ref={elementRef}
      variants={reveal(delay)}
      {...props}
    >
      {children}
    </MotionElement>
  );
}
