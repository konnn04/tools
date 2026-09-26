import Dexie, { type EntityTable } from "dexie";

/**
 * This tool's own IndexedDB database. Every tool keeps a separate database
 * (named in ../meta.ts), so deleting one never touches another tool's data.
 */

/**
 * Saved audio projects — docs/site/01-audio-editor.md §6.
 *
 * Split in two on purpose. The tree is a few KB of JSON and gets rewritten on
 * every edit; the sources are tens of megabytes and are IMMUTABLE, so they
 * are written once. Storing them together would mean rewriting the audio
 * every time a clip moved.
 */
export interface AudioProjectRow {
  id: string;
  name: string;
  /** serialized Track[] — clips reference sources by id */
  tracks: unknown;
  /** serialized EffectInstance[] for the master bus */
  masterEffects?: unknown;
  sampleRate: number;
  duration: number;
  updatedAt: number;
}

export interface AudioSourceRow {
  id: string;
  projectId: string;
  /**
   * Either the original imported file (mp3, flac…) or, for audio this editor
   * produced itself, a 32-bit float WAV so the working master loses nothing.
   * `encoded` says which, because the two are read back differently.
   */
  blob: Blob;
  sampleRate: number;
  /** true when `blob` is the original compressed file rather than WAV */
  encoded?: boolean;
}

export const DB_NAME = "konnn-tools-audio-editor";

export const db = new Dexie(DB_NAME) as Dexie & {
  audioProjects: EntityTable<AudioProjectRow, "id">;
  audioSources: EntityTable<AudioSourceRow, "id">;
};

db.version(1).stores({
  audioProjects: "id, updatedAt",
  audioSources: "id, projectId",
});

export async function estimateStorage(): Promise<{ usage: number; quota: number } | null> {
  try {
    const { usage = 0, quota = 0 } = (await navigator.storage.estimate()) ?? {};
    return { usage, quota };
  } catch {
    return null;
  }
}
