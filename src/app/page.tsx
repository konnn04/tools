import { HomeTools } from "@/components/HomeTools";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}${t.path}`,
    })),
  },
];

export default function Home() {
  return (
    <div className="site__page">
      <JsonLd data={jsonLd} />
      <div className="home">
        <div>
          <h1 className="home__title">{SITE_NAME}</h1>
          <p className="home__sub">Free tools that run entirely in your browser — no sign-up, no upload.</p>
        </div>

        <HomeTools />

        <section className="home__about">
          <h2>Free, private, in your browser</h2>
          <p>
            Edit audio and video, mark up images, pull text out of PDFs (with OCR), turn Markdown into PDF, make QR
            codes and sketch on a whiteboard. Files never leave your device; your work is saved in this browser.
          </p>
          <p lang="vi">
            Công cụ online miễn phí: chỉnh sửa âm thanh, chỉnh sửa video, chỉnh sửa ảnh, chuyển PDF sang văn bản (OCR
            tiếng Việt), chuyển Markdown sang PDF, tạo mã QR và bảng trắng vẽ tay. Không cần đăng ký, không tải file
            lên máy chủ.
          </p>
        </section>
      </div>
    </div>
  );
}
