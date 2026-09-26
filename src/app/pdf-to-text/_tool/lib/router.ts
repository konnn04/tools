import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Routing inside this tool. `/tool-name/<id>` is served by the tool's
 * optional catch-all page, so switching documents is a shallow
 * history.pushState — Next keeps usePathname/useSearchParams in sync with it
 * without refetching the page.
 */

export interface Route {
  /** always starts with "/" */
  path: string;
  /** "/whiteboard/abc" → ["whiteboard", "abc"] */
  segments: string[];
  query: Record<string, string>;
}

export function navigate(path: string, opts?: { replace?: boolean }): void {
  const url = path.startsWith("/") ? path : `/${path}`;
  if (opts?.replace) window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);
}

/** Absolute URL for a route of this site, for "open in new tab". */
export function siteUrl(route = "/"): string {
  return new URL(route, window.location.origin).href;
}

export function useRoute(): Route & { navigate: typeof navigate; back: () => void } {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const route = useMemo<Route>(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const query: Record<string, string> = {};
    searchParams?.forEach((v, k) => (query[k] = v));
    return { path, segments: path.split("/").filter(Boolean), query };
  }, [pathname, searchParams]);

  const back = useCallback(() => {
    if (window.history.length > 1) window.history.back();
    else navigate("/", { replace: true });
  }, []);

  return { ...route, navigate, back };
}
