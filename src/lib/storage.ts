import Dexie from "dexie";

/**
 * Storage accounting for the settings menu. Each tool owns its own IndexedDB
 * database (see each tool's `lib/db.ts`), opened here schema-less so the shell
 * never imports tool code. IndexedDB has no size API, so sizes are measured by
 * walking the rows: Blob sizes are exact, everything else is an estimate.
 */

export function sizeOf(value: unknown): number {
  if (value == null) return 0;
  if (typeof Blob !== "undefined" && value instanceof Blob) return value.size;
  if (value instanceof ArrayBuffer) return value.byteLength;
  if (ArrayBuffer.isView(value)) return value.byteLength;
  switch (typeof value) {
    case "string":
      return value.length;
    case "number":
      return 8;
    case "boolean":
      return 4;
    case "object": {
      let n = 0;
      if (Array.isArray(value)) for (const v of value) n += sizeOf(v);
      else for (const [k, v] of Object.entries(value)) n += k.length + sizeOf(v);
      return n;
    }
    default:
      return 0;
  }
}

export async function measureDatabase(name: string): Promise<number> {
  if (!(await Dexie.exists(name))) return 0;
  const db = new Dexie(name);
  try {
    await db.open();
    let bytes = 0;
    for (const table of db.tables) await table.each((row) => (bytes += sizeOf(row)));
    return bytes;
  } finally {
    db.close();
  }
}

export function measureLocalStorage(keys: readonly string[]): number {
  let n = 0;
  try {
    for (const key of keys) n += (key.length + (localStorage.getItem(key)?.length ?? 0)) * 2; // UTF-16
  } catch {
    /* blocked */
  }
  return n;
}

export async function clearToolData(dbName: string | undefined, keys: readonly string[] = []): Promise<void> {
  if (dbName) await Dexie.delete(dbName);
  try {
    for (const key of keys) localStorage.removeItem(key);
  } catch {
    /* blocked */
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}
