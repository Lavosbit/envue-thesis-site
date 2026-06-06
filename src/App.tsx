import { BibliographySection } from "./components/bibliography/BibliographySection";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { HeroSection } from "./components/sections/HeroSection";
import { OverviewSection } from "./components/sections/OverviewSection";
import { ResponsiveMotionProvider } from "./motion/ResponsiveMotionProvider";

function App() {
  return (
    <ResponsiveMotionProvider>
      <main>
        <SiteHeader />
        <article>
          <HeroSection />
          <OverviewSection />
          <BibliographySection />
        </article>
        <SiteFooter />
      </main>
    </ResponsiveMotionProvider>
  );
}

export default App;
