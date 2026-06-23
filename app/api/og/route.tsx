import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviation = searchParams.get("d") ?? "50";
  const rank = searchParams.get("r") ?? "標準的な恋愛力";
  const emoji = searchParams.get("e") ?? "💙";
  const type = searchParams.get("type") ?? "renai";

  const isCommu = type === "commu";
  const isInka = type === "inka";

  const accentColor = isCommu ? "#0ea5e9" : isInka ? "#a855f7" : "#e91e8c";
  const bgGradient = isCommu
    ? "linear-gradient(135deg, #0a1628 0%, #060e1c 50%, #060b15 100%)"
    : isInka
    ? "linear-gradient(135deg, #120826 0%, #08051a 50%, #060318 100%)"
    : "linear-gradient(135deg, #1a0a2e 0%, #0d0618 50%, #12041f 100%)";
  const glowColor = isCommu ? "rgba(14,165,233,0.12)" : isInka ? "rgba(168,85,247,0.12)" : "rgba(233,30,140,0.12)";
  const labelColor = isCommu ? "#38bdf8" : isInka ? "#c084fc" : "#f472b6";
  const labelBg = isCommu ? "rgba(14,165,233,0.15)" : isInka ? "rgba(168,85,247,0.15)" : "rgba(233,30,140,0.15)";
  const labelBorder = isCommu ? "rgba(14,165,233,0.3)" : isInka ? "rgba(168,85,247,0.3)" : "rgba(233,30,140,0.3)";
  const testLabel = isCommu ? "💬 コミュ力偏差値テスト" : isInka ? "🌙 陰キャ偏差値テスト" : "💘 恋愛偏差値テスト";
  const urlLabel = "renai-hensachi.vercel.app";

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
          background: bgGradient,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: glowColor,
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: labelBg,
            border: `1px solid ${labelBorder}`,
            borderRadius: "100px",
            padding: "8px 24px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "16px", color: labelColor, fontWeight: 700, letterSpacing: "0.1em" }}>
            {testLabel}
          </span>
        </div>

        <div
          style={{
            fontSize: "160px",
            fontWeight: 900,
            color: accentColor,
            lineHeight: 1,
            marginBottom: "12px",
            textShadow: `0 0 80px ${glowColor}`,
          }}
        >
          {deviation}
        </div>

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

        <div style={{ fontSize: "18px", color: "#4a6a7a" }}>
          {urlLabel}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
