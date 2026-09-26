import { PenTool } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "whiteboard",
  path: "/whiteboard",
  name: "Whiteboard",
  tagline: "Hand-drawn style drawing, multiple boards, PNG/SVG export.",
  description:
    "Free online whiteboard: sketch diagrams and ideas in a hand-drawn style, keep multiple boards saved in your browser, and export PNG or SVG.",
  nameVi: "Bảng trắng online",
  descriptionVi:
    "Bảng vẽ trực tuyến miễn phí phong cách vẽ tay: phác thảo sơ đồ, ý tưởng, lưu nhiều bảng trên trình duyệt và xuất PNG/SVG.",
  keywords: [
    "online whiteboard", "free whiteboard", "drawing board", "diagram tool", "sketch online", "excalidraw",
    "bảng trắng online", "bảng vẽ online", "vẽ sơ đồ online", "vẽ tay online",
  ],
  features: ["Hand-drawn style", "Multiple boards", "Shapes, arrows and text", "Paste images", "Export PNG / SVG"],
  icon: PenTool,
  category: "other",
  fullBleed: true,
  dbName: "konnn-tools-whiteboard",
};
