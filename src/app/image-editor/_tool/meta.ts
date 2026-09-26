import { ImageIcon } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "image-editor",
  path: "/image-editor",
  name: "Image Editor",
  tagline: "Paste a screenshot, mark it up, annotate it, export PNG/JPEG.",
  description:
    "Free online image editor: paste a screenshot, crop, annotate with arrows, shapes and text, blur sensitive info, use layers and export PNG or JPEG.",
  nameVi: "Chỉnh sửa ảnh online",
  descriptionVi:
    "Công cụ chỉnh sửa ảnh miễn phí: dán ảnh chụp màn hình, cắt ảnh, vẽ mũi tên, chèn chữ, làm mờ thông tin nhạy cảm và xuất PNG/JPEG.",
  keywords: [
    "image editor", "online image editor", "free photo editor", "annotate screenshot", "crop image", "blur image",
    "add text to image", "screenshot markup",
    "chỉnh sửa ảnh", "chỉnh ảnh online", "cắt ảnh online", "làm mờ ảnh", "chèn chữ vào ảnh", "ghi chú ảnh chụp màn hình",
  ],
  features: ["Paste from clipboard", "Layers", "Arrows, shapes and text", "Crop and blur / redact", "Export PNG / JPEG"],
  icon: ImageIcon,
  category: "media",
  fullBleed: true,
  dbName: "konnn-tools-image-editor",
};
