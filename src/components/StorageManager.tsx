"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { Button, IconButton, Modal } from "@/shared/ui";
import { TOOLS } from "@/lib/tools";
import { clearToolData, formatBytes, measureDatabase, measureLocalStorage } from "@/lib/storage";

const DATA_TOOLS = TOOLS.filter((t) => t.dbName || t.localStorageKeys?.length);

interface Usage {
  tools: Record<string, number>;
  total: number;
  quota: number;
}

async function measureAll(): Promise<Usage> {
  const [estimate, ...sizes] = await Promise.all([
    navigator.storage?.estimate?.().catch(() => undefined),
    ...DATA_TOOLS.map(async (t) =>
      (t.dbName ? await measureDatabase(t.dbName).catch(() => 0) : 0) + measureLocalStorage(t.localStorageKeys ?? []),
    ),
  ]);
  return {
    tools: Object.fromEntries(DATA_TOOLS.map((t, i) => [t.id, sizes[i]])),
    total: estimate?.usage ?? 0,
    quota: estimate?.quota ?? 0,
  };
}

export function StorageManager({ onClose }: { onClose: () => void }) {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [scanning, setScanning] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const load = useCallback(async () => {
    try {
      const [snapshot, isPersisted] = await Promise.all([measureAll(), navigator.storage?.persisted?.()]);
      setUsage(snapshot);
      setPersisted(isPersisted ?? null);
    } finally {
      setScanning(false);
    }
  }, []);

  const scan = () => {
    setScanning(true);
    void load();
  };

  useEffect(() => {
    void load();
  }, [load]);

  const clear = async (ids: string[], label: string) => {
    if (!window.confirm(`Delete all saved data for ${label}? This cannot be undone.`)) return;
    setBusy(ids.length > 1 ? "all" : ids[0]);
    setMsg(null);
    try {
      for (const tool of DATA_TOOLS.filter((t) => ids.includes(t.id))) {
        await clearToolData(tool.dbName, tool.localStorageKeys);
      }
      setMsg({ text: `Deleted data for ${label}.` });
    } catch {
      setMsg({ text: "Could not delete — close the tool in other tabs and try again.", error: true });
    } finally {
      setBusy(null);
      scan();
    }
  };

  const requestPersist = async () => {
    const ok = (await navigator.storage?.persist?.()) ?? false;
    setPersisted(ok);
    setMsg(ok ? { text: "Storage is now persistent." } : { text: "The browser declined persistent storage.", error: true });
  };

  const measured = usage ? Object.values(usage.tools).reduce((a, b) => a + b, 0) : 0;
  const maxTool = Math.max(1, ...Object.values(usage?.tools ?? {}));
  const quotaPct = usage && usage.quota > 0 ? (usage.total / usage.quota) * 100 : 0;

  return (
    <Modal open onClose={onClose} title="Storage" width="min(92vw, 560px)">
      <div className="sset">
        <div className="sset__head">
          <span className="sset__size">
            {usage
              ? `${formatBytes(usage.total)} used${usage.quota ? ` of ${formatBytes(usage.quota)} available` : ""}`
              : "Measuring…"}
          </span>
          <IconButton label="Rescan" onClick={scan} disabled={scanning}>
            <RefreshCw size={15} className={scanning ? "sset__spin" : undefined} />
          </IconButton>
        </div>

        <div className="sset__bar" aria-hidden>
          <span className="sset__bar-seg" style={{ width: `${Math.min(100, quotaPct)}%`, background: "var(--accent)" }} />
        </div>

        {msg && <div className={`sset__msg ${msg.error ? "sset__msg--error" : ""}`}>{msg.text}</div>}

        <div className="sset__apps">
          {DATA_TOOLS.map((tool) => {
            const bytes = usage?.tools[tool.id] ?? 0;
            return (
              <div key={tool.id} className="sset__app">
                <span className="sset__app-icon">
                  <tool.icon size={16} />
                </span>
                <div className="sset__app-main">
                  <div className="sset__app-top">
                    <Link href={tool.path} className="sset__app-name" onClick={onClose}>
                      {tool.name}
                    </Link>
                    <span className="sset__size">{usage ? formatBytes(bytes) : "…"}</span>
                  </div>
                  <div className="sset__app-bar">
                    <span style={{ width: `${(bytes / maxTool) * 100}%` }} />
                  </div>
                </div>
                <IconButton
                  label={`Delete ${tool.name} data`}
                  disabled={!bytes || busy !== null}
                  onClick={() => void clear([tool.id], tool.name)}
                >
                  <Trash2 size={15} />
                </IconButton>
              </div>
            );
          })}
        </div>

        <p className="sset__note">
          Tool data measured: {formatBytes(measured)}. The browser total also counts cached site files and database
          overhead.
        </p>

        <div className="sset__head">
          {persisted ? (
            <span className="sset__size">
              <ShieldCheck size={14} style={{ verticalAlign: "-2px" }} /> Persistent — the browser won&apos;t evict it
            </span>
          ) : (
            <Button size="sm" onClick={() => void requestPersist()}>
              <ShieldCheck size={14} /> Keep data persistent
            </Button>
          )}
          <Button
            size="sm"
            variant="danger"
            disabled={!measured || busy !== null}
            onClick={() => void clear(DATA_TOOLS.map((t) => t.id), "all tools")}
          >
            <Trash2 size={14} /> Delete all
          </Button>
        </div>
      </div>
    </Modal>
  );
}
