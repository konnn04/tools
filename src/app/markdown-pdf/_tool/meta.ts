import { FileEdit } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "markdown-pdf",
  path: "/markdown-pdf",
  name: "Markdown to PDF",
  tagline: "Write Markdown with a live preview, export a PDF with selectable text.",
  description:
    "Free Markdown to PDF converter: write Markdown with a live preview, pick paper size and margins, and export a clean PDF with selectable text.",
  nameVi: "Chuyển Markdown sang PDF",
  descriptionVi:
    "Viết Markdown có xem trước trực tiếp, chọn khổ giấy và xuất PDF chữ chọn được — miễn phí, chạy trên trình duyệt.",
  keywords: [
    "markdown to pdf", "md to pdf", "markdown editor", "online markdown editor", "markdown preview", "convert markdown",
    "chuyển markdown sang pdf", "markdown sang pdf", "trình soạn thảo markdown", "xuất pdf từ markdown",
  ],
  features: ["Live preview", "Formatting toolbar", "Paper size and margins", "PDF with selectable text", "Multiple documents"],
  icon: FileEdit,
  category: "text",
  fullBleed: true,
  dbName: "konnn-tools-markdown-pdf",
  localStorageKeys: ["markdown-pdf:split-ratio"],
};
