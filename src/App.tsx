import { BibliographySection } from "./components/bibliography/BibliographySection";
import { CollaborationPage } from "./pages/CollaborationPage";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { HeroSection } from "./components/sections/HeroSection";
import { OverviewSection } from "./components/sections/OverviewSection";
import { ResponsiveMotionProvider } from "./motion/ResponsiveMotionProvider";

function App() {
  const isCollaboration = window.location.pathname === "/collaboration";

  return (
    <ResponsiveMotionProvider>
      <main>
        <SiteHeader />
        <article>
          {isCollaboration ? (
            <CollaborationPage />
          ) : (
            <>
              <HeroSection />
              <OverviewSection />
              <BibliographySection />
            </>
          )}
        </article>
        <SiteFooter />
      </main>
    </ResponsiveMotionProvider>
  );
}

export default App;
