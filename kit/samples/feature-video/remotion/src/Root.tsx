import { Composition } from "remotion";
import { FeatureVideo, FEATURE_VIDEO_SECONDS } from "./FeatureVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FeatureVideo"
      component={FeatureVideo}
      durationInFrames={FEATURE_VIDEO_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
