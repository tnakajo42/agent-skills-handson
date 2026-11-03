import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, TITLE } from "./theme";

// 場面の入りと終わりだけ薄く切り替える（画面は揺らさない）
export const SceneFade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const f = Math.round(0.3 * fps);
  const opacity = interpolate(
    frame,
    [0, f, durationInFrames - f, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity, background: C.bg, fontFamily: FONT }}>{children}</AbsoluteFill>;
};

// 場面の中で、指定の秒から薄く現れる（位置は動かさない）
export const Appear: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [at * fps, at * fps + 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity }}>{children}</div>;
};

// 指定の秒を過ぎたかどうか（ボタンを押した後の表示に使う）
export const useAfter = (at: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame >= at * fps;
};

// 下に固定の字幕（1場面1文・25字まで）
export const Subtitle: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 56,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        border: `2px solid ${C.line}`,
        borderRadius: 16,
        padding: "18px 44px",
        fontSize: 52,
        fontWeight: 700,
        color: C.ink,
        fontFamily: FONT,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  </div>
);

// 上の帯: 左に題名、右に「画面はイメージ（架空）」
export const TopBar: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 48, top: 36, fontSize: 26, fontWeight: 700, color: C.sub }}>
      {TITLE}
    </div>
    <div style={{ position: "absolute", right: 48, top: 38, fontSize: 24, color: C.sub }}>画面はイメージ（架空）</div>
  </>
);

// 場面の左上の見出し
export const Heading: React.FC<{ label: string; title: string }> = ({ label, title }) => (
  <div style={{ position: "absolute", left: 120, top: 110 }}>
    <div style={{ fontSize: 30, color: C.blue, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 64, color: C.ink, fontWeight: 700, marginTop: 8 }}>{title}</div>
  </div>
);

// 横に置く説明の札（見出しと小さな補足）
export const SideCard: React.FC<{ title: string; sub?: string; tone?: "plain" | "ok" }> = ({
  title,
  sub,
  tone = "plain",
}) => (
  <div
    style={{
      width: 640,
      background: tone === "ok" ? "#eef7ee" : C.paper,
      border: `2px solid ${tone === "ok" ? C.green : C.line}`,
      borderLeft: `10px solid ${tone === "ok" ? C.green : C.blue}`,
      borderRadius: 16,
      padding: "22px 30px",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontSize: 42, fontWeight: 700, color: C.ink }}>{title}</div>
    {sub ? <div style={{ fontSize: 28, color: C.sub, marginTop: 8 }}>{sub}</div> : null}
  </div>
);

// スマホの枠（実在の機種に似せない、角丸の四角だけ）
export const Phone: React.FC<{ children: React.ReactNode; left: number; top: number }> = ({
  children,
  left,
  top,
}) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width: 460,
      height: 740,
      borderRadius: 48,
      background: "#30343b",
      padding: 18,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 34,
        background: C.paper,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  </div>
);

// パソコンの枠（画面と台だけ。実在の機種に似せない）
export const Pc: React.FC<{ children: React.ReactNode; left: number; top: number; title: string }> = ({
  children,
  left,
  top,
  title,
}) => (
  <div style={{ position: "absolute", left, top, width: 1000 }}>
    <div
      style={{
        background: "#30343b",
        borderRadius: 24,
        padding: 16,
      }}
    >
      <div style={{ background: C.paper, borderRadius: 12, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#e8edf4",
            padding: "12px 18px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: C.mask }} />
          ))}
          <div style={{ marginLeft: 12, fontSize: 24, fontWeight: 700, color: C.sub }}>{title}</div>
        </div>
        <div style={{ padding: "24px 28px 28px" }}>{children}</div>
      </div>
    </div>
    <div style={{ width: 220, height: 34, background: "#30343b", margin: "0 auto" }} />
    <div style={{ width: 380, height: 14, background: "#30343b", borderRadius: 7, margin: "0 auto" }} />
  </div>
);

// アプリの上の帯（架空の日報アプリ）
export const AppBar: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <div
    style={{
      background: C.blue,
      color: "#fff",
      padding: "26px 24px 18px",
    }}
  >
    <div style={{ fontSize: 32, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 20, opacity: 0.85, marginTop: 4 }}>{sub}</div>
  </div>
);

// 数字や項目名を伏せる灰色の帯
export const Mask: React.FC<{ w: number }> = ({ w }) => (
  <div style={{ width: w, height: 22, borderRadius: 11, background: C.mask, display: "inline-block" }} />
);
