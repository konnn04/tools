import Dexie, { type EntityTable } from "dexie";

/**
 * This tool's own IndexedDB database. Every tool keeps a separate database
 * (named in ../meta.ts), so deleting one never touches another tool's data.
 */

/**
 * Image Editor — docs/roadmap/07-image-editor.md §1/§5. Same split as
 * Whiteboard's `boards`/`boardFiles`: `fabricJson` here never embeds a raw
 * `data:` URL for a pasted image, only an `asset://<id>` placeholder — the
 * actual (often large) base64 image lives one row per asset in
 * `imageAssets`, swapped back in only when a project is opened.
 */
export interface ImageLayerRow {
  id: string;
  /** matches the FabricObject's own custom `layerId` property */
  fabricObjectId: string;
  name: string;
  kind: "image" | "rect" | "ellipse" | "line" | "text" | "path" | "blur";
  visible: boolean;
  locked: boolean;
}

export interface ImageProjectRow {
  id: string;
  name: string;
  canvasWidth: number;
  canvasHeight: number;
  /** fabric Canvas#toObject(["layerId"]) output, with image `src` replaced by `asset://<id>` */
  fabricJson: unknown;
  layers: ImageLayerRow[];
  thumbnail: string;
  updatedAt: number;
}

export interface ImageAssetRow {
  id: string;
  projectId: string;
  dataURL: string;
  mimeType: string;
  createdAt: number;
}

export const DB_NAME = "konnn-tools-image-editor";

export const db = new Dexie(DB_NAME) as Dexie & {
  imageProjects: EntityTable<ImageProjectRow, "id">;
  imageAssets: EntityTable<ImageAssetRow, "id">;
};

db.version(1).stores({
  imageProjects: "id, updatedAt",
  imageAssets: "id, projectId",
});
