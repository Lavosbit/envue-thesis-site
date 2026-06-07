import siteJson from "./site.json";
import bibliographyPageJson from "./pages/bibliography.json";
import bibliographySourcesJson from "./bibliography-sources.json";
import type {
  BibliographyPageContent,
  BibliographySource,
  SiteContent,
} from "../types/thesis";

export const siteContent = siteJson as SiteContent;
export const bibliographyPageContent =
  bibliographyPageJson as unknown as BibliographyPageContent;
export const bibliographySources =
  bibliographySourcesJson as unknown as BibliographySource[];

export function getBibliographySection<
  Id extends keyof Omit<BibliographyPageContent, "pageKey">,
>(id: Id) {
  return bibliographyPageContent[id];
}
