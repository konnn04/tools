import { FileText } from "lucide-react";
import type { ToolMeta } from "@/lib/tool-meta";

export const meta: ToolMeta = {
  id: "pdf-to-text",
  path: "/pdf-to-text",
  name: "PDF to Text",
  tagline: "Extract text from a PDF, view/copy per page, OCR for scans.",
  description:
    "Free PDF to text converter: extract text from any PDF page by page, copy or export TXT/Markdown, and OCR scanned PDFs in English or Vietnamese.",
  nameVi: "Chuyển PDF sang văn bản",
  descriptionVi:
    "Trích xuất chữ từ PDF theo từng trang, sao chép hoặc xuất TXT, nhận dạng chữ (OCR) cho PDF scan tiếng Việt và tiếng Anh — miễn phí.",
  keywords: [
    "pdf to text", "extract text from pdf", "pdf ocr", "ocr online", "scanned pdf to text", "pdf text extractor", "copy text from pdf",
    "chuyển pdf sang text", "lấy chữ từ pdf", "ocr tiếng việt", "chuyển pdf scan sang văn bản", "trích xuất văn bản pdf",
  ],
  features: ["Page-by-page text", "OCR for scanned pages (English / Vietnamese)", "Copy or export", "Password-protected PDFs", "No upload"],
  icon: FileText,
  category: "text",
  fullBleed: true,
};
