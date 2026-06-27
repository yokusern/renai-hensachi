import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "恋愛偏差値テスト｜あなたの恋愛力を数値化する",
  description:
    "25問に答えるだけで、あなたの恋愛偏差値がわかる。コミュニケーション力・自己理解度・行動力・メンタル安定度を5軸で診断。",
  metadataBase: new URL("https://renai-hensachi.vercel.app"),
  openGraph: {
    title: "恋愛偏差値テスト｜あなたの恋愛力を数値化する",
    description:
      "25問に答えるだけで、あなたの恋愛偏差値がわかる。コミュニケーション力・行動力・メンタル安定度を5軸で診断。",
    url: "https://renai-hensachi.vercel.app",
    siteName: "恋愛偏差値テスト",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/api/og?d=62&r=%E6%81%8B%E6%84%9B%E4%B8%8A%E6%89%8B",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "恋愛偏差値テスト",
    description: "25問で恋愛力を数値化。あなたの偏差値は？",
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
