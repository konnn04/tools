import strings from "./strings.json";

/**
 * A few-line stand-in for react-i18next: this site is English-only, but the
 * tool's code still addresses its text by key. Supports what the tool uses —
 * `{{name}}` interpolation, `_one`/`_other` plurals on `count`, and a string
 * fallback as the second argument.
 */

type Params = Record<string, unknown> & { count?: number };

const plural = new Intl.PluralRules("en");

function lookup(key: string): unknown {
  let node: unknown = strings;
  for (const part of key.split(".")) {
    if (node == null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

export function t(key: string, arg?: Params | string): string {
  const params = typeof arg === "object" ? arg : undefined;
  let text: unknown;
  if (typeof params?.count === "number") {
    text = lookup(`${key}_${plural.select(params.count)}`) ?? lookup(`${key}_other`);
  }
  text ??= lookup(key);
  if (typeof text !== "string") return typeof arg === "string" ? arg : key;
  if (!params) return text;
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) => String(params[name] ?? ""));
}

export function useTranslation() {
  return { t };
}
