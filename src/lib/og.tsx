import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

let cache: Promise<{ fraunces: Buffer; dmSans: Buffer; photo: string }> | null = null;

function assets() {
  if (!cache) {
    const root = process.cwd();
    cache = Promise.all([
      readFile(path.join(root, "src/assets/fonts/fraunces-600.woff")),
      readFile(path.join(root, "src/assets/fonts/dm-sans-500.woff")),
      readFile(path.join(root, "public/images/chad-denie-square.jpg")),
    ]).then(([fraunces, dmSans, photo]) => ({
      fraunces,
      dmSans,
      photo: `data:image/jpeg;base64,${photo.toString("base64")}`,
    }));
  }
  return cache;
}

/** Renders a 1200x630 social preview card: page title on the left, Chad's photo on the right. */
export async function ogImage({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const { fraunces, dmSans, photo } = await assets();
  const titleSize = title.length > 70 ? 44 : title.length > 45 ? 52 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#faf6f0",
          fontFamily: "DM Sans",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "#f7e4dc",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 700,
            padding: "60px 24px 56px 68px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 999,
                background: "#c2553a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Fraunces",
                fontSize: 24,
              }}
            >
              CD
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Fraunces", fontSize: 28, color: "#2a211c" }}>{site.name}</span>
              <span style={{ fontSize: 14, letterSpacing: 3, color: "#8a7b70", textTransform: "uppercase" }}>
                {site.title}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {eyebrow && (
              <span
                style={{
                  fontSize: 18,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "#c2553a",
                  marginBottom: 20,
                }}
              >
                {eyebrow}
              </span>
            )}
            <span style={{ fontFamily: "Fraunces", fontSize: titleSize, lineHeight: 1.1, color: "#2a211c" }}>
              {title}
            </span>
          </div>
          <span style={{ fontSize: 20, color: "#55483f" }}>
            {site.contact.phone} · {site.contact.email}
          </span>
        </div>
        <div style={{ position: "absolute", right: 64, top: 64, width: 400, height: 502, display: "flex" }}>
          <div
            style={{
              position: "absolute",
              left: -18,
              top: -18,
              width: 400,
              height: 502,
              borderRadius: 36,
              background: "#c2553a",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            width={400}
            height={502}
            style={{ borderRadius: 36, objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 500, style: "normal" },
      ],
    },
  );
}
