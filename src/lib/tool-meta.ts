import type { LucideIcon } from "lucide-react";

export type ToolCategory = "media" | "text" | "other";

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  media: "Media",
  text: "Documents",
  other: "Utilities",
};

/** Everything the site shell knows about a tool. The tool's own code never reads this. */
export interface ToolMeta {
  id: string;
  /** route, e.g. "/audio-editor" */
  path: string;
  name: string;
  /** one line, shown on the home card */
  tagline: string;
  /** meta description — English, ~150 chars */
  description: string;
  /** Vietnamese name + description, for Vietnamese search queries */
  nameVi: string;
  descriptionVi: string;
  keywords: string[];
  features: string[];
  icon: LucideIcon;
  category: ToolCategory;
  /** the tool paints its own full-height layout (editors); false = normal scrolling page */
  fullBleed: boolean;
  /** IndexedDB database this tool owns, for the storage manager */
  dbName?: string;
  /** localStorage keys this tool owns, for the storage manager */
  localStorageKeys?: string[];
}
