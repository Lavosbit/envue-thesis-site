export type ArtifactVariant = "narrative" | "system" | "principles";
export type OverviewIconId = "book" | "sliders" | "file";

export type Artifact = {
  label: string;
  title: string;
  detail: string;
  variant: ArtifactVariant;
};

export type BibliographySource = {
  id: string;
  title: string;
  author: string;

  apa:
    | string
    | {
        prefix: string;
        title: string;
        suffix: string;
        url?: string;
        citationKind?: "book" | "webArticle" | "journalArticle";
        journal?: string;
        volume?: string;
        pages?: string;
      };

  type: string;
  year: string;
  summary: string;
  evaluation: string;
  reflection: string;
  finding: string;
  decision: string;
  artifact: Artifact;
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  active?: boolean;
};

export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type PageMetaItem = {
  id: string;
  label: string;
  value: string;
};

export type HeroSectionContent = {
  id: "hero";
  title: string;
  summary: string;
  meta: PageMetaItem[];
  video: {
    label: string;
    title: string;
    description: string;
    meta: string;
    status: { idle: string; playing: string };
    controls: {
      play: string;
      pause: string;
      showTranscript: string;
      hideTranscript: string;
    };
    transcript: { label: string; body: string };
  };
};

export type OverviewSectionContent = {
  id: "overview";
  number: string;
  title: string;
  body: string;
  pathLabel: string;
  steps: Array<{
    id: string;
    icon: OverviewIconId;
    title: string;
    body: string;
  }>;
};

export type BibliographySectionContent = {
  id: "bibliography";
  number: string;
  title: string;
  intro: string;
  indexLabel: string;
  indexAriaLabel: string;
  sourceLabels: {
    sourceType: string;
    year: string;
    analysis: string;
    summary: string;
    evaluation: string;
    reflection: string;
    finding: string;
    decision: string;
  };
  artifactLabels: {
    related: string;
    view: string;
    mark: string;
  };
  sources: BibliographySource[];
};

export type SiteContent = {
  title: string;
  subtitle: string;
  navigationLabel: string;
  menuLabels: { open: string; close: string };
  navigation: NavigationItem[];
  footer: { copyright: string; links: FooterLink[] };
};

export type BibliographyPageContent = {
  pageKey: "bibliography-page";
  hero: HeroSectionContent;
  overview: OverviewSectionContent;
  bibliography: Omit<BibliographySectionContent, "sources">;
};
