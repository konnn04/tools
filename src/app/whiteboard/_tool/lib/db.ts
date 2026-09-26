import Dexie, { type EntityTable } from "dexie";

/**
 * This tool's own IndexedDB database. Every tool keeps a separate database
 * (named in ../meta.ts), so deleting one never touches another tool's data.
 */

/**
 * Whiteboard — docs/roadmap/03-whiteboard.md §1. Split the same way the audio
 * tables are: `boards` is the small elements/appState tree the board-picker
 * grid reads for every board at once, `boardFiles` is the (potentially many
 * MB per image) pasted-image blobs, read only for the one board being opened.
 */
export interface BoardRow {
  id: string;
  name: string;
  /** small PNG data URL for the board-picker grid */
  thumbnail: string;
  elements: unknown;
  appState: unknown;
  fileIds: string[];
  elementCount: number;
  updatedAt: number;
}

export interface BoardFileRow {
  /** Excalidraw's own fileId */
  id: string;
  boardId: string;
  dataURL: string;
  mimeType: string;
  createdAt: number;
}

export const DB_NAME = "konnn-tools-whiteboard";

export const db = new Dexie(DB_NAME) as Dexie & {
  boards: EntityTable<BoardRow, "id">;
  boardFiles: EntityTable<BoardFileRow, "id">;
};

db.version(1).stores({
  boards: "id, updatedAt",
  boardFiles: "id, boardId",
});
