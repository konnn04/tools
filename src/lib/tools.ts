import { meta as audioEditor } from "@/app/audio-editor/_tool/meta";
import { meta as imageEditor } from "@/app/image-editor/_tool/meta";
import { meta as markdownPdf } from "@/app/markdown-pdf/_tool/meta";
import { meta as pdfToText } from "@/app/pdf-to-text/_tool/meta";
import { meta as qrGenerator } from "@/app/qr-generator/_tool/meta";
import { meta as videoEditor } from "@/app/video-editor/_tool/meta";
import { meta as whiteboard } from "@/app/whiteboard/_tool/meta";
import { CATEGORY_LABELS, type ToolCategory, type ToolMeta } from "./tool-meta";

/**
 * Every tool on the site, in display order. Adding a tool = a new
 * `src/app/<id>/` folder with `_tool/meta.ts` + one line here.
 */
export const TOOLS: ToolMeta[] = [audioEditor, videoEditor, imageEditor, pdfToText, markdownPdf, qrGenerator, whiteboard];

export function groupTools(tools: ToolMeta[]): Array<[ToolCategory, string, ToolMeta[]]> {
  return (Object.keys(CATEGORY_LABELS) as ToolCategory[])
    .map((c) => [c, CATEGORY_LABELS[c], tools.filter((t) => t.category === c)] as [ToolCategory, string, ToolMeta[]])
    .filter(([, , list]) => list.length > 0);
}

export function toolByPath(pathname: string): ToolMeta | undefined {
  return TOOLS.find((t) => pathname === t.path || pathname.startsWith(`${t.path}/`));
}
