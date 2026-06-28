import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const TEST_CONFIG: Record<string, { accent: string; bg: string; glow: string; label: string; labelColor: string; labelBg: string; labelBorder: string }> = {
  renai: {
    accent: "#e91e8c",
    bg: "linear-gradient(135deg, #1a0a2e 0%, #0d0618 50%, #12041f 100%)",
    glow: "rgba(233,30,140,0.12)",
    label: "💘 恋愛偏差値テスト",
    labelColor: "#f472b6",
    labelBg: "rgba(233,30,140,0.15)",
    labelBorder: "rgba(233,30,140,0.3)",
  },
  commu: {
    accent: "#0ea5e9",
    bg: "linear-gradient(135deg, #0a1628 0%, #060e1c 50%, #060b15 100%)",
    glow: "rgba(14,165,233,0.12)",
    label: "💬 コミュ力偏差値テスト",
    labelColor: "#38bdf8",
    labelBg: "rgba(14,165,233,0.15)",
    labelBorder: "rgba(14,165,233,0.3)",
  },
  inka: {
    accent: "#a855f7",
    bg: "linear-gradient(135deg, #120826 0%, #08051a 50%, #060318 100%)",
    glow: "rgba(168,85,247,0.12)",
    label: "🌙 陰キャ偏差値テスト",
    labelColor: "#c084fc",
    labelBg: "rgba(168,85,247,0.15)",
    labelBorder: "rgba(168,85,247,0.3)",
  },
  jiatama: {
    accent: "#10b981",
    bg: "linear-gradient(135deg, #051a12 0%, #03100b 50%, #061a13 100%)",
    glow: "rgba(16,185,129,0.12)",
    label: "🧠 地頭偏差値テスト",
    labelColor: "#34d399",
    labelBg: "rgba(16,185,129,0.15)",
    labelBorder: "rgba(16,185,129,0.3)",
  },
  shukatsu: {
    accent: "#3b82f6",
    bg: "linear-gradient(135deg, #0a0e1a 0%, #060810 50%, #0c1020 100%)",
    glow: "rgba(59,130,246,0.12)",
    label: "💼 就活偏差値テスト（文系）",
    labelColor: "#60a5fa",
    labelBg: "rgba(59,130,246,0.15)",
    labelBorder: "rgba(59,130,246,0.3)",
  },
  "shukatsu-it": {
    accent: "#059669",
    bg: "linear-gradient(135deg, #031209 0%, #020c06 50%, #041510 100%)",
    glow: "rgba(5,150,105,0.12)",
    label: "💻 就活偏差値テスト（IT系）",
    labelColor: "#34d399",
    labelBg: "rgba(5,150,105,0.15)",
    labelBorder: "rgba(5,150,105,0.3)",
  },
  money: {
    accent: "#d97706",
    bg: "linear-gradient(135deg, #1a0f00 0%, #110900 50%, #1c1000 100%)",
    glow: "rgba(217,119,6,0.12)",
    label: "💰 お金リテラシー偏差値テスト",
    labelColor: "#fbbf24",
    labelBg: "rgba(217,119,6,0.15)",
    labelBorder: "rgba(217,119,6,0.3)",
  },
  "saki-nobashi": {
    accent: "#f59e0b",
    bg: "linear-gradient(135deg, #1a1200 0%, #100d00 50%, #1a1500 100%)",
    glow: "rgba(245,158,11,0.12)",
    label: "🛋️ 先延ばし偏差値テスト",
    labelColor: "#fcd34d",
    labelBg: "rgba(245,158,11,0.15)",
    labelBorder: "rgba(245,158,11,0.3)",
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviation = searchParams.get("d") ?? "50";
  const rank = searchParams.get("r") ?? "標準的";
  const emoji = searchParams.get("e") ?? "📊";
  const type = searchParams.get("type") ?? "renai";

  const cfg = TEST_CONFIG[type] ?? TEST_CONFIG.renai;

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
          background: cfg.bg,
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
            background: cfg.glow,
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
            background: "rgba(124,58,237,0.08)",
            filter: "blur(50px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: cfg.labelBg,
            border: `1px solid ${cfg.labelBorder}`,
            borderRadius: "100px",
            padding: "8px 24px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "16px", color: cfg.labelColor, fontWeight: 700, letterSpacing: "0.1em" }}>
            {cfg.label}
          </span>
        </div>

        <div
          style={{
            fontSize: "160px",
            fontWeight: 900,
            color: cfg.accent,
            lineHeight: 1,
            marginBottom: "12px",
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
