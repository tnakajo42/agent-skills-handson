import React from "react";
import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { SceneFade } from "./parts";
import { Scene1, Scene2, Scene3, Scene4, Scene5 } from "./scenes";
import { C, FONT, SCENE_SECONDS } from "./theme";

// 機能説明動画（声なし・字幕だけ）。場面表 scenes.md の順。受講者の動く紙芝居と同じ5場面・30秒
export const FeatureVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5];
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT }}>
      <Series>
        {scenes.map((S, i) => (
          <Series.Sequence key={i} durationInFrames={SCENE_SECONDS[i] * fps} name={`場面${i + 1}`}>
            <SceneFade>
              <S />
            </SceneFade>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};

export const FEATURE_VIDEO_SECONDS = SCENE_SECONDS.reduce((a, b) => a + b, 0);
