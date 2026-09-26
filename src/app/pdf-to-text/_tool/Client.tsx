"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "@/components/ToolSkeleton";
import { meta } from "./meta";

// Browser-only (IndexedDB, canvas, Web Audio…), and heavy — loaded after the page shell.
const PdfToText = dynamic(() => import("./PdfToText"), {
  ssr: false,
  loading: () => <ToolSkeleton name={meta.name} tagline={meta.tagline} />,
});

export default function Client() {
  return <PdfToText />;
}
