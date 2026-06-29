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
  "sns-addiction": {
    accent: "#ff3b5c",
    bg: "linear-gradient(135deg, #1a0007 0%, #0f0004 50%, #180008 100%)",
    glow: "rgba(255,59,92,0.12)",
    label: "📱 SNS中毒度偏差値テスト",
    labelColor: "#ff7090",
    labelBg: "rgba(255,59,92,0.15)",
    labelBorder: "rgba(255,59,92,0.3)",
  },
  "seikaku-warusa": {
    accent: "#be123c",
    bg: "linear-gradient(135deg, #140005 0%, #0d0003 50%, #180006 100%)",
    glow: "rgba(190,18,60,0.12)",
    label: "😈 性格の悪さ偏差値テスト",
    labelColor: "#fb7185",
    labelBg: "rgba(190,18,60,0.15)",
    labelBorder: "rgba(190,18,60,0.3)",
  },
  "oshi-kakin": {
    accent: "#f97316",
    bg: "linear-gradient(135deg, #1a0a00 0%, #120700 50%, #1c0c00 100%)",
    glow: "rgba(249,115,22,0.12)",
    label: "💸 推し課金偏差値テスト",
    labelColor: "#fdba74",
    labelBg: "rgba(249,115,22,0.15)",
    labelBorder: "rgba(249,115,22,0.3)",
  },
  dokuoya: {
    accent: "#0d9488",
    bg: "linear-gradient(135deg, #001614 0%, #000f0d 50%, #001a17 100%)",
    glow: "rgba(13,148,136,0.12)",
    label: "🩹 毒親育ち偏差値テスト",
    labelColor: "#2dd4bf",
    labelBg: "rgba(13,148,136,0.15)",
    labelBorder: "rgba(13,148,136,0.3)",
  },
  "dopa-gaki": {
    accent: "#84cc16",
    bg: "linear-gradient(135deg, #061000 0%, #040b00 50%, #081200 100%)",
    glow: "rgba(132,204,22,0.12)",
    label: "🧠⚡ ドパガキ偏差値テスト",
    labelColor: "#bef264",
    labelBg: "rgba(132,204,22,0.15)",
    labelBorder: "rgba(132,204,22,0.3)",
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviation = searchParams.get("d") ?? "50";
  const rank = searchParams.get("r") ?? "標準的";
  const emoji = searchParams.get("e") ?? "📊";
  const type = searchParams.get("type") ?? "renai";

  // Hub OG: white background with 8-test grid
  if (type === "hub") {
    return new ImageResponse(
      (
        <div style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#f9f9ff",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background decoration */}
          <div style={{
            position: "absolute",
            right: "80px",
            top: "50px",
            width: "360px",
            height: "360px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Simulated radar chart with nested circles */}
            <div style={{
              width: "300px", height: "300px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.06)", background: "rgba(233,30,140,0.03)",
              position: "absolute", display: "flex",
            }} />
            <div style={{
              width: "200px", height: "200px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.07)", background: "rgba(14,165,233,0.04)",
              position: "absolute", display: "flex",
            }} />
            <div style={{
              width: "100px", height: "100px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.08)", background: "rgba(168,85,247,0.05)",
              position: "absolute", display: "flex",
            }} />
            {/* Axis lines */}
            <div style={{ position: "absolute", width: "1px", height: "300px", background: "rgba(0,0,0,0.05)", display: "flex" }} />
            <div style={{ position: "absolute", width: "300px", height: "1px", background: "rgba(0,0,0,0.05)", display: "flex" }} />
            {/* Color dots on radar */}
            <div style={{ position: "absolute", top: "30px", left: "150px", width: "12px", height: "12px", borderRadius: "50%", background: "#e91e8c", display: "flex" }} />
            <div style={{ position: "absolute", top: "90px", right: "40px", width: "12px", height: "12px", borderRadius: "50%", background: "#0ea5e9", display: "flex" }} />
            <div style={{ position: "absolute", bottom: "60px", right: "60px", width: "12px", height: "12px", borderRadius: "50%", background: "#a855f7", display: "flex" }} />
            <div style={{ position: "absolute", bottom: "40px", left: "130px", width: "12px", height: "12px", borderRadius: "50%", background: "#10b981", display: "flex" }} />
            <div style={{ position: "absolute", top: "90px", left: "40px", width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", display: "flex" }} />
          </div>

          {/* "8 TESTS" badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "100px",
            padding: "8px 22px",
            marginBottom: "28px",
          }}>
            <span style={{ fontSize: "14px", color: "#444444", fontWeight: 700, letterSpacing: "0.1em" }}>
              心理学論文ベース × 8 TESTS
            </span>
          </div>

          {/* Title */}
          <div style={{
            fontSize: "70px",
            fontWeight: 900,
            color: "#0a0a0a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            display: "flex",
          }}>
            偏差値テストシリーズ
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: "24px",
            color: "#666666",
            fontWeight: 500,
            marginBottom: "40px",
            display: "flex",
          }}>
            自分を数値化する。25問×5軸スコア。
          </div>

          {/* Test tags - row 1 */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <div style={{ background: "rgba(233,30,140,0.08)", border: "1px solid rgba(233,30,140,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#c0185a", fontWeight: 600, display: "flex" }}>💘 恋愛</div>
            <div style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#0878b0", fontWeight: 600, display: "flex" }}>💬 コミュ力</div>
            <div style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#7c36c0", fontWeight: 600, display: "flex" }}>🌙 陰キャ</div>
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#0a8c60", fontWeight: 600, display: "flex" }}>🧠 地頭</div>
          </div>
          {/* Test tags - row 2 */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#1e4fb0", fontWeight: 600, display: "flex" }}>💼 就活（文系）</div>
            <div style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#065f46", fontWeight: 600, display: "flex" }}>💻 就活（IT系）</div>
            <div style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#924d00", fontWeight: 600, display: "flex" }}>💰 お金</div>
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "8px 14px", fontSize: "15px", color: "#8a5500", fontWeight: 600, display: "flex" }}>🛋️ 先延ばし</div>
          </div>

          {/* Domain */}
          <div style={{
            position: "absolute",
            bottom: "44px",
            right: "80px",
            fontSize: "17px",
            color: "#cccccc",
            display: "flex",
          }}>
            renai-hensachi.vercel.app
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

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
