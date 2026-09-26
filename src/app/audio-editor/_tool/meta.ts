import { AudioWaveform } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "audio-editor",
  path: "/audio-editor",
  name: "Audio Editor",
  tagline: "Cut, split, fade, enhance and export WAV/MP3 right in the browser.",
  description:
    "Free online audio editor: cut, trim, split and merge audio, add fades and effects, record voice and export MP3 or WAV. Runs in your browser — no upload.",
  nameVi: "Chỉnh sửa âm thanh online",
  descriptionVi:
    "Công cụ chỉnh sửa âm thanh miễn phí: cắt, ghép, tách nhạc, thêm hiệu ứng fade, thu âm và xuất MP3/WAV ngay trên trình duyệt, không cần tải lên.",
  keywords: [
    "audio editor", "online audio editor", "free audio editor", "cut mp3", "trim audio", "merge audio",
    "mp3 cutter", "audio joiner", "record audio online", "wav to mp3",
    "chỉnh sửa âm thanh", "cắt nhạc online", "cắt mp3", "ghép nhạc online", "chỉnh sửa audio miễn phí", "thu âm online",
  ],
  features: ["Multi-track timeline", "Cut, split, fade and gain", "Built-in effects and enhance", "Voice recording", "Export WAV / MP3"],
  icon: AudioWaveform,
  category: "media",
  fullBleed: true,
  dbName: "konnn-tools-audio-editor",
};
