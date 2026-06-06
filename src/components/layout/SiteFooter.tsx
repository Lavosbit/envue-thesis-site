import { motion } from "motion/react";
import { siteContent } from "../../content";
import { motionEase } from "../../motion/responsiveMotion";

export function SiteFooter() {
  return (
    <motion.footer
      className="page-shell"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: motionEase }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <FooterContent />
    </motion.footer>
  );
}

export function FooterContent() {
  return (
    <>
      <p>{siteContent.footer.copyright}</p>
      <div>
        {siteContent.footer.links.map((link) => (
          <a href={link.href} key={link.id}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
