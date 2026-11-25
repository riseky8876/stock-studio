import { Composition } from "remotion";
import { StockScene, type StockSceneProps } from "./StockScene";

// Default props; overridden per-clip via `--props` during batch render.
const defaultProps: StockSceneProps = {
  from: "#0ea5e9",
  to: "#1e3a8a",
  accent: "#ffffff",
};

const DURATION = 150; // 5s @ 30fps, seamless loop

export function RemotionRoot() {
  return (
    <Composition
      id="StockScene"
      component={StockScene}
      durationInFrames={DURATION}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
    />
  );
}