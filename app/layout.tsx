import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://renai-hensachi.vercel.app"),
  title: "偏差値テストシリーズ — 自分を数値化する",
  description: "心理学論文ベースの25問×5軸。恋愛・コミュ力・陰キャ・地頭・就活・お金・先延ばし",
  openGraph: {
    title: "偏差値テストシリーズ — 自分を数値化する",
    description: "心理学論文ベースの25問×5軸。恋愛・コミュ力・陰キャ・地頭・就活・お金・先延ばし",
    url: "https://renai-hensachi.vercel.app",
    siteName: "偏差値テストシリーズ",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/api/og?type=hub", width: 1200, height: 630, alt: "偏差値テストシリーズ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "偏差値テストシリーズ — 自分を数値化する",
    description: "心理学論文ベースの25問×5軸。恋愛・コミュ力・陰キャ・地頭・就活・お金・先延ばし",
    images: ["/api/og?type=hub"],
    creator: "@Yoko_ai_dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&family=Noto+Sans+JP:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
