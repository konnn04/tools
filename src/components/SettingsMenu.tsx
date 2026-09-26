"use client";

import { useEffect, useRef, useState } from "react";
import { HardDrive, Settings } from "lucide-react";
import { Field, Segmented } from "@/shared/ui";
import { formatBytes } from "@/lib/storage";
import { StorageManager } from "./StorageManager";
import { useThemePreference, type ThemePreference } from "./theme";

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);
  const [usage, setUsage] = useState<number | null>(null);
  const [theme, setTheme] = useThemePreference();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    navigator.storage?.estimate?.().then((e) => setUsage(e.usage ?? 0), () => setUsage(null));
    const close = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div className="site__settings" ref={boxRef}>
      <button
        type="button"
        className={`site__rail-item ${open ? "site__rail-item--active" : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Settings"
        onClick={() => setOpen((v) => !v)}
      >
        <Settings size={18} />
        <span className="site__rail-label">Settings</span>
      </button>

      {open && (
        <div className="site__settings-pop" role="dialog" aria-label="Settings">
          <Field label="Theme">
            <Segmented
              value={theme}
              onChange={(v) => setTheme(v as ThemePreference)}
              options={[
                { value: "system", label: "System" },
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
            />
          </Field>

          <div className="site__menu-sep" />

          <button
            type="button"
            className="site__menu-item"
            onClick={() => {
              setOpen(false);
              setStorageOpen(true);
            }}
          >
            <HardDrive size={16} />
            Manage storage
            {usage !== null && <span className="site__menu-item-hint">{formatBytes(usage)}</span>}
          </button>

          <p className="site__settings-note">
            Everything you create is saved in this browser only — nothing is uploaded.
          </p>
        </div>
      )}

      {storageOpen && <StorageManager onClose={() => setStorageOpen(false)} />}
    </div>
  );
}
