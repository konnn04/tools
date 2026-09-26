import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export const alt = `${SITE_NAME} — free online tools`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(160deg, #0b1622 0%, #0e2a3f 45%, #14506b 100%)",
          color: "#e8f1f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 36, marginTop: 16, color: "#38bdf8" }}>Free tools that run in your browser</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 56 }}>
          {TOOLS.map((t) => (
            <div
              key={t.id}
              style={{
                fontSize: 26,
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid rgba(232,241,248,0.25)",
              }}
            >
              {t.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
