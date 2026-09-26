import Dexie, { type EntityTable } from "dexie";

/**
 * This tool's own IndexedDB database. Every tool keeps a separate database
 * (named in ../meta.ts), so deleting one never touches another tool's data.
 */

/**
 * Video Editor — docs/roadmap/08-video-editor.md §1. Split the same way as
 * every other media tool in this project: `videoProjects` is a small tree of
 * clip cut-points, `videoSources` holds the (large, sometimes multi-hundred-MB)
 * original file blobs, read once and never decoded-and-kept — see that doc's
 * §1 on why video, unlike audio, cannot use a shared-decoded-buffer model.
 */
export interface VideoClipRow {
  id: string;
  sourceId: string;
  offset: number;
  duration: number;
  crop?: { left: number; top: number; width: number; height: number };
  rotate: 0 | 90 | 180 | 270;
  keepOwnAudio: boolean;
}

/** Voiceover/background-music lane — free positions, unlike the video sequence. Absent on rows written before this existed, so readers default it to []. */
export interface AudioOverlayTrackRow {
  id: string;
  name: string;
  clips: Array<{
    id: string;
    sourceId: string;
    start: number;
    offset: number;
    duration: number;
    gainDb: number;
    fadeIn: number;
    fadeOut: number;
  }>;
  muted: boolean;
  volumeDb: number;
}

/**
 * The timeline as N typed tracks of freely-positioned items — the shape that
 * replaced `clips` + `audioTracks`. Rows written under the old shape are
 * converted on read (video-editor/engine/migrate.ts), so BOTH sets of fields
 * are declared optional here and neither is ever written alongside the other.
 * The row is deliberately loose about an item's contents: the item union is
 * the editor's business, and duplicating it here would mean two definitions
 * to keep in step.
 */
export interface TimelineTrackRow {
  id: string;
  kind: "video" | "audio" | "text" | "effect";
  name: string;
  items: unknown[];
  muted: boolean;
  hidden: boolean;
  locked: boolean;
  volumeDb: number;
}

export interface VideoProjectRow {
  id: string;
  name: string;
  tracks?: TimelineTrackRow[];
  /** legacy shape, read-only — see migrate.ts */
  clips?: VideoClipRow[];
  /** legacy shape, read-only */
  audioTracks?: AudioOverlayTrackRow[];
  outputWidth: number;
  outputHeight: number;
  /** true once the user has picked a frame size */
  frameChosen?: boolean;
  thumbnail: string;
  updatedAt: number;
}

export interface VideoSourceRow {
  id: string;
  projectId: string;
  blob: Blob;
  fileName: string;
  /** absent on rows written before the media bin existed, which only ever held video */
  mediaKind?: "video" | "audio" | "image";
  duration: number;
  width: number;
  height: number;
  /** whether the file carries any audio at all — decides if audio controls are offered */
  hasAudio?: boolean;
}

export const DB_NAME = "konnn-tools-video-editor";

export const db = new Dexie(DB_NAME) as Dexie & {
  videoProjects: EntityTable<VideoProjectRow, "id">;
  videoSources: EntityTable<VideoSourceRow, "id">;
};

db.version(1).stores({
  videoProjects: "id, updatedAt",
  videoSources: "id, projectId",
});
