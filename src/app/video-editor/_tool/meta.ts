import { Clapperboard } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "video-editor",
  path: "/video-editor",
  name: "Video Editor",
  tagline: "Trim, join and crop video clips, export MP4/WebM.",
  description:
    "Free online video editor: trim, cut, join and crop clips, add text and music, extract audio and export MP4, WebM or GIF. Everything runs in your browser.",
  nameVi: "Chỉnh sửa video online",
  descriptionVi:
    "Trình chỉnh sửa video miễn phí: cắt, ghép, crop video, chèn chữ và nhạc nền, tách âm thanh, xuất MP4/WebM/GIF ngay trên trình duyệt.",
  keywords: [
    "video editor", "online video editor", "free video editor", "trim video", "cut video", "merge videos",
    "crop video", "video to gif", "extract audio from video", "mp4 editor",
    "chỉnh sửa video", "cắt video online", "ghép video online", "edit video miễn phí", "tách nhạc từ video", "làm gif từ video",
  ],
  features: ["Multi-track timeline", "Trim, split and crop", "Text and audio overlays", "Extract audio", "Export MP4 / WebM / GIF"],
  icon: Clapperboard,
  category: "media",
  fullBleed: true,
  dbName: "konnn-tools-video-editor",
};
