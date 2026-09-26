import Dexie, { type EntityTable } from "dexie";

/**
 * This tool's own IndexedDB database. Every tool keeps a separate database
 * (named in ../meta.ts), so deleting one never touches another tool's data.
 */

/** Markdown → PDF — docs/roadmap/02-markdown-pdf.md §1. A doc is small; no source/blob split needed. */
export interface MarkdownDocRow {
  id: string;
  title: string;
  source: string;
  updatedAt: number;
}

export const DB_NAME = "konnn-tools-markdown-pdf";

export const db = new Dexie(DB_NAME) as Dexie & {
  markdownDocs: EntityTable<MarkdownDocRow, "id">;
};

db.version(1).stores({
  markdownDocs: "id, updatedAt",
});
