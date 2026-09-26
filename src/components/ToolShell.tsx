import type { ReactNode } from "react";
import { toolJsonLd } from "@/lib/seo";
import type { ToolMeta } from "@/lib/tool-meta";
import { JsonLd } from "./JsonLd";

/**
 * Server-rendered frame around a (client-only) tool. The tool itself renders
 * nothing on the server, so the heading, description and feature list are
 * emitted here for crawlers and screen readers, in English and Vietnamese.
 */
export function ToolShell({ meta, children }: { meta: ToolMeta; children: ReactNode }) {
  return (
    <>
      <JsonLd data={toolJsonLd(meta)} />
      <section className="sr-only">
        <h1>{meta.name} — free online tool</h1>
        <p>{meta.description}</p>
        <ul>
          {meta.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <h2 lang="vi">{meta.nameVi}</h2>
        <p lang="vi">{meta.descriptionVi}</p>
      </section>
      <div className={meta.fullBleed ? "site__tool" : "site__page"}>{children}</div>
    </>
  );
}
