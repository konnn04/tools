import { QrCode } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "qr-generator",
  path: "/qr-generator",
  name: "QR Code Generator",
  tagline: "Styled QR codes with patterns, gradients, logos, frames and hi-res export.",
  description:
    "Free QR code generator: create QR codes for links, Wi-Fi, text, email or contacts with custom colors, gradients, logo and frames. Export PNG or SVG.",
  nameVi: "Tạo mã QR miễn phí",
  descriptionVi:
    "Tạo mã QR cho link, Wi-Fi, văn bản, email, danh bạ với màu sắc, gradient, logo và khung tuỳ chỉnh, xuất PNG/SVG chất lượng cao.",
  keywords: [
    "qr code generator", "free qr code generator", "qr code with logo", "custom qr code", "wifi qr code", "qr code svg",
    "tạo mã qr", "tạo qr code miễn phí", "tạo mã qr có logo", "mã qr wifi", "tạo qr online",
  ],
  features: ["Link, Wi-Fi, text, email, contact", "Dot patterns and gradients", "Custom logo", "Frames", "Export PNG / SVG"],
  icon: QrCode,
  category: "other",
  fullBleed: false,
  localStorageKeys: ["konnns_qr_saved_configs"],
};
