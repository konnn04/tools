import type { Metadata } from "next";
import { ToolShell } from "@/components/ToolShell";
import { toolMetadata } from "@/lib/seo";
import Client from "../_tool/Client";
import { meta } from "../_tool/meta";

// prerender the tool's landing page; "/<tool>/<id>" (a document in the visitor's browser) renders on demand
export function generateStaticParams() {
  return [{ slug: [] }];
}

export async function generateMetadata({ params }: PageProps<"/image-editor/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  return toolMetadata(meta, { isDocument: Boolean(slug?.length) });
}

export default function Page() {
  return (
    <ToolShell meta={meta}>
      <Client />
    </ToolShell>
  );
}
