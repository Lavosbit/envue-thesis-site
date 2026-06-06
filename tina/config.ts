import { defineConfig, type TinaField } from "tinacms";

const stringField = (name: string, label: string, required = true): TinaField => ({
  type: "string",
  name,
  label,
  required,
});

const textField = (name: string, label: string, required = true): TinaField => ({
  type: "string",
  name,
  label,
  required,
  ui: { component: "textarea" },
});

const artifactFields: TinaField[] = [
  stringField("label", "Label"),
  stringField("title", "Title"),
  textField("detail", "Detail"),
  {
    type: "string",
    name: "variant",
    label: "Visual Variant",
    required: true,
    options: [
      { label: "Narrative", value: "narrative" },
      { label: "System", value: "system" },
      { label: "Principles", value: "principles" },
    ],
  },
];

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site Settings",
        path: "src/content",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          stringField("title", "Site Title"),
          stringField("subtitle", "Site Subtitle"),
          stringField("navigationLabel", "Navigation ARIA Label"),
          {
            type: "object",
            name: "menuLabels",
            label: "Menu Labels",
            fields: [stringField("open", "Open Label"), stringField("close", "Close Label")],
          },
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Navigation Item" }) },
            fields: [
              stringField("id", "ID"),
              stringField("label", "Label"),
              stringField("href", "Link"),
              { type: "boolean", name: "enabled", label: "Enabled" },
              { type: "boolean", name: "active", label: "Current Page" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              stringField("copyright", "Copyright"),
              {
                type: "object",
                name: "links",
                label: "Links",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "Footer Link" }) },
                fields: [stringField("id", "ID"), stringField("label", "Label"), stringField("href", "Link")],
              },
            ],
          },
        ],
      },
      {
        name: "bibliographyPage",
        label: "Bibliography Page",
        path: "src/content/pages",
        format: "json",
        match: { include: "bibliography" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          stringField("pageKey", "Page Key"),
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              stringField("id", "Section ID"),
              stringField("title", "Title"),
              textField("summary", "Summary"),
              {
                type: "object",
                name: "meta",
                label: "Metadata",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "Metadata" }) },
                fields: [stringField("id", "ID"), stringField("label", "Label"), stringField("value", "Value")],
              },
              {
                type: "object",
                name: "video",
                label: "Video Synopsis",
                fields: [
                  stringField("label", "Label"),
                  stringField("title", "Title"),
                  textField("description", "Description"),
                  stringField("meta", "Duration / Type"),
                  {
                    type: "object",
                    name: "status",
                    label: "Status Labels",
                    fields: [stringField("idle", "Idle"), stringField("playing", "Playing")],
                  },
                  {
                    type: "object",
                    name: "controls",
                    label: "Control Labels",
                    fields: [
                      stringField("play", "Play"),
                      stringField("pause", "Pause"),
                      stringField("showTranscript", "Show Transcript"),
                      stringField("hideTranscript", "Hide Transcript"),
                    ],
                  },
                  {
                    type: "object",
                    name: "transcript",
                    label: "Transcript",
                    fields: [stringField("label", "Label"), textField("body", "Body")],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "overview",
            label: "Research Framework",
            fields: [
              stringField("id", "Section ID"),
              stringField("number", "Section Number"),
              stringField("title", "Title"),
              textField("body", "Body"),
              stringField("pathLabel", "Process ARIA Label"),
              {
                type: "object",
                name: "steps",
                label: "Process Steps",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Process Step" }) },
                fields: [
                  stringField("id", "ID"),
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon",
                    required: true,
                    options: ["book", "sliders", "file"],
                  },
                  stringField("title", "Title"),
                  textField("body", "Body"),
                ],
              },
            ],
          },
          {
            type: "object",
            name: "bibliography",
            label: "Annotated Sources Section",
            fields: [
              stringField("id", "Section ID"),
              stringField("number", "Section Number"),
              stringField("title", "Title"),
              textField("intro", "Introduction"),
              stringField("indexLabel", "Index Label"),
              stringField("indexAriaLabel", "Index ARIA Label"),
              {
                type: "object",
                name: "sourceLabels",
                label: "Source Labels",
                fields: [
                  stringField("sourceType", "Source Type"),
                  stringField("year", "Publication Year"),
                  stringField("analysis", "Annotated Analysis"),
                  stringField("summary", "Summary"),
                  stringField("evaluation", "Evaluation"),
                  stringField("reflection", "Reflection"),
                  stringField("finding", "Key Finding"),
                  stringField("decision", "Design Decision"),
                ],
              },
              {
                type: "object",
                name: "artifactLabels",
                label: "Artifact Labels",
                fields: [
                  stringField("related", "Related Label"),
                  stringField("view", "View Label"),
                  stringField("mark", "Mark"),
                ],
              },
            ],
          },
        ],
      },
      {
        name: "bibliographySources",
        label: "Bibliography Sources",
        path: "src/content",
        format: "json",
        match: { include: "bibliography-sources" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "sources",
            label: "Sources",
            list: true,
            ui: {
              min: 12,
              max: 12,
              itemProps: (item) => ({ label: item?.title || "Bibliography Source" }),
            },
            fields: [
              stringField("id", "ID"),
              stringField("title", "Title"),
              stringField("author", "Author"),
              stringField("year", "Publication Year"),
              stringField("type", "Source Type"),
              textField("apa", "APA Citation"),
              textField("summary", "Summary"),
              textField("evaluation", "Evaluation"),
              textField("reflection", "Reflection"),
              textField("finding", "Key Finding"),
              textField("decision", "Design Decision Influenced"),
              { type: "object", name: "artifact", label: "Project Artifact", fields: artifactFields },
            ],
          },
        ],
      },
    ],
  },
});
