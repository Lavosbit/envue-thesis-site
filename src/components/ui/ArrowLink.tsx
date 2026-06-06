import { ArrowUpRight } from "react-feather";
import type { AriaAttributes, MouseEventHandler, ReactNode } from "react";

type ArrowLinkProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-controls"?: AriaAttributes["aria-controls"];
  "aria-expanded"?: AriaAttributes["aria-expanded"];
};

export function ArrowLink({ children, className = "", href, onClick, ...ariaProps }: ArrowLinkProps) {
  const classes = `text-link ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} {...ariaProps}>
        {children} <ArrowUpRight aria-hidden="true" size={14} />
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button" {...ariaProps}>
      {children} <ArrowUpRight aria-hidden="true" size={14} />
    </button>
  );
}
