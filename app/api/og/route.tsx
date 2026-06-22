import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviation = searchParams.get("d") ?? "50";
  const rank = searchParams.get("r") ?? "標準的な恋愛力";
  const emoji = searchParams.get("e") ?? "💙";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a0a2e 0%, #0d0618 50%, #12041f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 装飾 円 */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(233,30,140,0.12)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "100px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(124,58,237,0.1)",
            filter: "blur(50px)",
          }}
        />

        {/* ラベル */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(233,30,140,0.15)",
            border: "1px solid rgba(233,30,140,0.3)",
            borderRadius: "100px",
            padding: "8px 24px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#f472b6", fontWeight: 700, letterSpacing: "0.1em" }}>
            💘 恋愛偏差値テスト
          </span>
        </div>

        {/* 偏差値 */}
        <div
          style={{
            fontSize: "160px",
            fontWeight: 900,
            color: "#e91e8c",
            lineHeight: 1,
            marginBottom: "12px",
            textShadow: "0 0 80px rgba(233,30,140,0.5)",
          }}
        >
          {deviation}
        </div>

        {/* ランク */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "14px 36px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "36px" }}>{emoji}</span>
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#f0e8ff" }}>
            {rank}
          </span>
        </div>

        {/* URL */}
        <div style={{ fontSize: "18px", color: "#6b5b7b" }}>
          renai-hensachi.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
