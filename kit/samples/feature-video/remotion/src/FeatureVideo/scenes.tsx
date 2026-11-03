import React from "react";
import { Appear, AppBar, Heading, Mask, Pc, Phone, SideCard, Subtitle, TopBar, useAfter } from "./parts";
import { C } from "./theme";

// 場面表 scenes.md の5場面。画面の中の値（現場の名前・作業内容）は見本。数字は灰色の帯で伏せる

const Card: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div
    style={{
      width: 480,
      background: C.paper,
      border: `2px solid ${C.line}`,
      borderTop: `8px solid ${C.red}`,
      borderRadius: 16,
      padding: "28px 32px",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontSize: 44, fontWeight: 700, color: C.ink }}>{title}</div>
    <div style={{ fontSize: 30, color: C.sub, marginTop: 12 }}>{body}</div>
  </div>
);

// 1. 題名と、いまの困りごと3つ（5秒）
export const Scene1: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 120, top: 150 }}>
      <div style={{ fontSize: 36, color: C.blue, fontWeight: 700 }}>青葉建設（架空）様向け 機能説明</div>
      <div style={{ fontSize: 104, fontWeight: 700, color: C.ink, marginTop: 12 }}>現場日報をスマホで</div>
    </div>
    <div style={{ position: "absolute", left: 120, top: 470, display: "flex", gap: 48 }}>
      <Appear at={0.7}>
        <Card title="紙に手書き" body="職長が毎日夕方に書く" />
      </Appear>
      <Appear at={1.1}>
        <Card title="写真が流れる" body="チャットで後から探せない" />
      </Appear>
      <Appear at={1.5}>
        <Card title="承認が遅れる" body="所長が現場を回ると2〜3日" />
      </Appear>
    </div>
    <Subtitle text="青葉建設（架空）の現場日報をスマホにします" />
  </>
);

// 選ぶだけの入力欄（大きな文字）
const Select: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ padding: "12px 24px" }}>
    <div style={{ fontSize: 22, color: C.sub, fontWeight: 700 }}>{label}</div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 38,
        fontWeight: 700,
        color: C.ink,
        border: `2px solid ${C.line}`,
        borderRadius: 12,
        padding: "10px 18px",
        marginTop: 6,
      }}
    >
      <span>{value}</span>
      <span style={{ color: C.sub }}>▾</span>
    </div>
  </div>
);

// 写真の見本（山の形の図形だけ）
const Photo: React.FC = () => (
  <div
    style={{
      width: 170,
      height: 116,
      borderRadius: 10,
      background: "#dfe7f1",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 22,
        bottom: -10,
        width: 0,
        height: 0,
        borderLeft: "62px solid transparent",
        borderRight: "62px solid transparent",
        borderBottom: "84px solid #9fb3cc",
      }}
    />
    <div style={{ position: "absolute", right: 22, top: 18, width: 26, height: 26, borderRadius: 13, background: "#f2c14e" }} />
  </div>
);

// 2. 機能1: 職長がスマホで日報を書き、写真を付ける（7秒）
export const Scene2: React.FC = () => {
  const pressed = useAfter(1.6);
  return (
    <>
      <TopBar />
      <Heading label="機能1 職長" title="スマホで日報を書く" />
      <Phone left={1180} top={140}>
        <AppBar title="きょうの日報" sub="職長の入力画面（試作）" />
        <Select label="現場" value="現場A" />
        <Select label="作業内容" value="型枠" />
        <div
          style={{
            margin: "18px 24px 0",
            textAlign: "center",
            fontSize: 34,
            fontWeight: 700,
            borderRadius: 14,
            padding: "14px 0",
            border: `3px solid ${C.blue}`,
            color: pressed ? "#fff" : C.blue,
            background: pressed ? C.blue : C.paper,
          }}
        >
          写真を付ける
        </div>
        <div style={{ display: "flex", gap: 16, margin: "18px 24px 0" }}>
          <Appear at={2.1}>
            <Photo />
          </Appear>
          <Appear at={2.4}>
            <Photo />
          </Appear>
        </div>
        <Appear at={2.4}>
          <div style={{ fontSize: 20, color: C.sub, margin: "8px 24px 0" }}>この日の日報に写真が2枚付きました</div>
        </Appear>
      </Phone>
      <div style={{ position: "absolute", left: 120, top: 330, display: "flex", flexDirection: "column", gap: 28 }}>
        <Appear at={0.8}>
          <SideCard title="入力は少なく、文字は大きく" sub="現場と作業内容は選ぶだけ" />
        </Appear>
        <Appear at={2.4}>
          <SideCard title="写真はその日の日報に付く" sub="チャットに流さない" />
        </Appear>
      </div>
      <Subtitle text="職長はスマホで短く書き、写真も付けます" />
    </>
  );
};

// 3. 機能2: 所長がスマホで承認する（7秒）
export const Scene3: React.FC = () => {
  const tapping = useAfter(2.0);
  const done = useAfter(2.5);
  const rows = ["現場A", "現場B", "現場C"];
  return (
    <>
      <TopBar />
      <Heading label="機能2 所長" title="現場からスマホで承認" />
      <Phone left={1180} top={140}>
        <AppBar title="承認待ちの日報" sub="所長の画面（試作）" />
        {rows.map((r, i) => {
          const ok = done && i === 0;
          const tap = tapping && !done && i === 0;
          return (
            <div
              key={r}
              style={{
                margin: "18px 20px 0",
                padding: "18px 20px",
                border: `2px solid ${ok ? C.green : C.line}`,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                whiteSpace: "nowrap",
                background: ok ? "#eef7ee" : C.paper,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: C.ink }}>{r}</span>
                <Mask w={56} />
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#fff",
                  background: ok ? C.green : C.blue,
                  borderRadius: 10,
                  padding: "8px 18px",
                  boxShadow: tap ? "0 0 0 8px rgba(31,95,191,0.30)" : "none",
                }}
              >
                {ok ? "承認済み" : "承認"}
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 22, color: C.sub, margin: "20px 24px 0" }}>
          {done ? "承認待ち 2件" : "承認待ち 3件"}
        </div>
      </Phone>
      <div style={{ position: "absolute", left: 120, top: 330, display: "flex", flexDirection: "column", gap: 28 }}>
        <Appear at={0.8}>
          <SideCard title="現場を回りながら承認" sub="紙の押印を待たない" />
        </Appear>
        <Appear at={3.0}>
          <SideCard title="承認待ちは本社からも見える" sub="たまっている現場がすぐ分かる" tone="ok" />
        </Appear>
      </div>
      <Subtitle text="所長は現場にいても、スマホで承認できます" />
    </>
  );
};

// 4. 機能3: パソコンに週の集計が自動で出る（6秒）。項目名と数字は伏せる
export const Scene4: React.FC = () => {
  const widths = [220, 220, 220, 220];
  const cell: React.CSSProperties = { height: 72, padding: "0 20px", boxSizing: "border-box", display: "flex", alignItems: "center" };
  return (
    <>
      <TopBar />
      <Heading label="機能3 事務の方" title="週の集計が自動で出る" />
      <Pc left={120} top={290} title="週の集計（自動）・試作">
        <div style={{ display: "flex", background: "#eef1f5", borderBottom: `2px solid ${C.line}` }}>
          <div style={{ ...cell, width: widths[0], fontSize: 30, fontWeight: 700, color: C.sub }}>現場</div>
          {widths.slice(1).map((w, i) => (
            <div key={i} style={{ ...cell, width: w }}>
              <Mask w={w - 80} />
            </div>
          ))}
        </div>
        {["現場A", "現場B", "現場C"].map((name, r) => (
          <Appear key={name} at={0.6 + r * 0.3}>
            <div style={{ display: "flex", borderBottom: `2px solid ${C.line}` }}>
              <div style={{ ...cell, width: widths[0], fontSize: 30, fontWeight: 700, color: C.ink }}>{name}</div>
              {widths.slice(1).map((w, i) => (
                <div key={i} style={{ ...cell, width: w }}>
                  <Mask w={w - 100} />
                </div>
              ))}
            </div>
          </Appear>
        ))}
        <div style={{ fontSize: 24, color: C.sub, marginTop: 16 }}>
          項目は、いまの表計算の見本に合わせる（見本が届いてから）
        </div>
      </Pc>
      <div
        style={{
          position: "absolute",
          left: 1200,
          top: 330,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Appear at={1.6}>
          <SideCard title="月曜の打ち直し" sub="日報から自動で集計" />
        </Appear>
        <Appear at={2.0}>
          <div style={{ fontSize: 64, fontWeight: 700, color: C.blue, lineHeight: 1 }}>↓</div>
        </Appear>
        <Appear at={2.2}>
          <SideCard title="不要" sub="事務の方は確かめるだけ" tone="ok" />
        </Appear>
      </div>
      <Subtitle text="週の集計は自動で出ます。打ち直しは不要です" />
    </>
  );
};

const Step: React.FC<{ who: string; what: string; note: string }> = ({ who, what, note }) => (
  <div
    style={{
      width: 440,
      height: 236,
      background: C.paper,
      border: `3px solid ${C.blue}`,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontSize: 34, color: C.sub, fontWeight: 700 }}>{who}</div>
    <div style={{ fontSize: 60, fontWeight: 700, color: C.ink, marginTop: 4 }}>{what}</div>
    <div style={{ fontSize: 26, color: C.sub, marginTop: 6 }}>{note}</div>
  </div>
);

const Arrow: React.FC = () => (
  <div style={{ fontSize: 72, color: C.blue, fontWeight: 700, margin: "0 24px" }}>→</div>
);

// 5. 導入後の一日（流れの図）と、まず1現場で3か月（5秒）
export const Scene5: React.FC = () => (
  <>
    <TopBar />
    <Heading label="まとめ" title="導入後の一日" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Appear at={0.3}>
        <Step who="職長" what="書く" note="夕方、スマホで" />
      </Appear>
      <Appear at={0.6}>
        <Arrow />
      </Appear>
      <Appear at={0.8}>
        <Step who="所長" what="承認" note="現場から" />
      </Appear>
      <Appear at={1.1}>
        <Arrow />
      </Appear>
      <Appear at={1.3}>
        <Step who="本社と事務の方" what="見る" note="集計は自動" />
      </Appear>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 636, display: "flex", justifyContent: "center" }}>
      <Appear at={2.0}>
        <div
          style={{
            background: "#eef7ee",
            border: `3px solid ${C.green}`,
            borderRadius: 20,
            padding: "22px 64px",
            fontSize: 64,
            fontWeight: 700,
            color: C.ink,
          }}
        >
          まず<span style={{ color: C.red }}>1現場で3か月</span>
        </div>
      </Appear>
    </div>
    <Subtitle text="まず1現場で3か月、試してみませんか" />
  </>
);
