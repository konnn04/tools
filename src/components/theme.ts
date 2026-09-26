"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { THEME_KEY } from "@/lib/site";

export type ThemePreference = "system" | "light" | "dark";

/**
 * Runs inline in <head> before first paint, so a dark-mode visitor never
 * sees a light flash. Kept in sync with `apply()` below.
 */
export const THEME_SCRIPT = `(function(){try{var p=localStorage.getItem(${JSON.stringify(THEME_KEY)})||"system";var d=p==="dark"||(p!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.colorMode=d?"dark":"light";}catch(e){}})();`;

const listeners = new Set<() => void>();

function read(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function apply(pref: ThemePreference): void {
  const dark = pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.colorMode = dark ? "dark" : "light";
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function useThemePreference(): [ThemePreference, (pref: ThemePreference) => void] {
  const pref = useSyncExternalStore(subscribe, read, () => "system" as ThemePreference);

  const setPref = useCallback((next: ThemePreference) => {
    try {
      if (next === "system") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the choice still applies for this page view */
    }
    apply(next);
    listeners.forEach((l) => l());
  }, []);

  // follow the OS while on "System"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => read() === "system" && apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return [pref, setPref];
}
