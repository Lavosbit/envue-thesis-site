import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "react-feather";
import { siteContent } from "../../content";
import { motionEase, useResponsiveMotion } from "../../motion/responsiveMotion";
import { FooterContent } from "./SiteFooter";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useResponsiveMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const menuButton = menuButtonRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !navigationRef.current) return;

      const focusable = [menuButtonRef.current, ...navigationRef.current.querySelectorAll<HTMLElement>("a[href]")].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <motion.div
        animate={{ opacity: 1 }}
        className="header-inner"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: motionEase }}
      >
        <a className="wordmark" href="#top">
          <strong>{siteContent.title}</strong>
          <span>{siteContent.subtitle}</span>
        </a>
        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? siteContent.menuLabels.close : siteContent.menuLabels.open}
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <AnimatePresence>
          {(!isMobile || menuOpen) && (
            <motion.nav
              animate={{ opacity: 1 }}
              aria-label={siteContent.navigationLabel}
              className={menuOpen ? "primary-nav is-open" : "primary-nav"}
              exit={{ opacity: 0 }}
              initial={isMobile ? { opacity: 0 } : false}
              id="primary-navigation"
              ref={navigationRef}
              transition={{ duration: 0.24, ease: motionEase }}
            >
              <div className="mobile-nav-links">
                {siteContent.navigation.map((item, index) => (
                  item.enabled ? (
                    <motion.a
                      animate={{ opacity: 1, y: 0 }}
                      aria-current={item.active ? "page" : undefined}
                      className={item.active ? "active" : ""}
                      href={item.href}
                      initial={isMobile ? { opacity: 0, y: 12 } : false}
                      key={item.id}
                      onClick={() => setMenuOpen(false)}
                      transition={{ delay: isMobile ? index * 0.045 : 0, duration: 0.35, ease: motionEase }}
                    >
                      {item.label}
                    </motion.a>
                  ) : (
                    <motion.span
                      animate={{ opacity: 1, y: 0 }}
                      aria-disabled="true"
                      className="nav-item-disabled"
                      initial={isMobile ? { opacity: 0, y: 12 } : false}
                      key={item.id}
                      title={`${item.label} is not available yet`}
                      transition={{ delay: isMobile ? index * 0.045 : 0, duration: 0.35, ease: motionEase }}
                    >
                      {item.label}
                    </motion.span>
                  )
                ))}
              </div>
              {isMobile ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="mobile-menu-footer"
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.35, ease: motionEase }}
                >
                  <FooterContent />
                </motion.div>
              ) : null}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
