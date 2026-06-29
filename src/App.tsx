import { BibliographySection } from "./components/bibliography/BibliographySection";
import { CollaborationPage } from "./pages/CollaborationPage";
import { ProjectPage } from "./pages/ProjectPage";
import { CompetenciesPage } from "./pages/CompetenciesPage";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { HeroSection } from "./components/sections/HeroSection";
import { OverviewSection } from "./components/sections/OverviewSection";
import { ResponsiveMotionProvider } from "./motion/ResponsiveMotionProvider";

function App() {
  const pathname = window.location.pathname;
  const isCollaboration = pathname === "/collaboration";
  const isProject = pathname === "/project";
  const isCompetencies = pathname === "/competencies";

  return (
    <ResponsiveMotionProvider>
      <main>
        <SiteHeader />
        <article>
          {isProject ? (
            <ProjectPage />
          ) : isCollaboration ? (
            <CollaborationPage />
          ) : isCompetencies ? (
            <CompetenciesPage />
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
