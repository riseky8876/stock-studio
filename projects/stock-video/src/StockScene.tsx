import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export type StockSceneProps = {
  from: string;
  to: string;
  accent: string;
};

// Higher-quality motion background: animated gradient + drifting glowing orbs.
// Motion is periodic over the frame range so the clip loops seamlessly.
export function StockScene({ from, to, accent }: StockSceneProps) {
  const frame = useCurrentFrame();

  const angle = interpolate(frame, [0, 150], [0, 360], {
    extrapolateRight: "extend",
  });
  const glow = interpolate(frame, [0, 75, 150], [0.2, 0.5, 0.2], {
    extrapolateRight: "extend",
  });

  const orb1X = interpolate(frame, [0, 75, 150], [0.08, 0.5, 0.08]);
  const orb1Y = interpolate(frame, [0, 75, 150], [0.2, 0.75, 0.2]);
  const orb1R = interpolate(frame, [0, 75, 150], [140, 300, 140]);
  const orb1O = interpolate(frame, [0, 75, 150], [0.2, 0.5, 0.2]);

  const orb2X = interpolate(frame, [0, 75, 150], [0.7, 0.3, 0.7]);
  const orb2Y = interpolate(frame, [0, 75, 150], [0.75, 0.25, 0.75]);
  const orb2R = interpolate(frame, [0, 75, 150], [90, 220, 90]);
  const orb2O = interpolate(frame, [0, 75, 150], [0.15, 0.35, 0.15]);

  return (
    <AbsoluteFill style={{ backgroundColor: from, overflow: "hidden" }}>
      <AbsoluteFill
        style={{ background: `linear-gradient(${angle}deg, ${from}, ${to})` }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}55 0%, transparent ${
            Math.round(30 + glow * 40)
          }%)`,
          opacity: glow,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: accent,
          top: `${orb1Y * 100}%`,
          left: `${orb1X * 100}%`,
          width: orb1R,
          height: orb1R,
          borderRadius: orb1R / 2,
          opacity: orb1O,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: accent,
          top: `${orb2Y * 100}%`,
          left: `${orb2X * 100}%`,
          width: orb2R,
          height: orb2R,
          borderRadius: orb2R / 2,
          opacity: orb2O,
        }}
      />
    </AbsoluteFill>
  );
}
