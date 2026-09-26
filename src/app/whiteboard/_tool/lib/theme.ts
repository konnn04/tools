import { useSyncExternalStore } from "react";

/**
 * The site's resolved color mode, read from `<html data-color-mode>` (set by
 * the root layout's theme script) so Excalidraw follows the site theme.
 */

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-color-mode"] });
  return () => observer.disconnect();
}

const read = (): "light" | "dark" =>
  document.documentElement.dataset.colorMode === "dark" ? "dark" : "light";

export function useResolvedColorMode(): "light" | "dark" {
  return useSyncExternalStore(subscribe, read, () => "light");
}
