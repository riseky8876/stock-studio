import { AbsoluteFill, interpolate, useCurrentFrame, Text } from "remotion";

export type StockSceneProps = {
  from: string;
  to: string;
  accent: string;
  caption?: string;
};

// A clean, loopable animated gradient + optional caption — generic stock look,
// upgraded per-niche via `generate-variations.mjs`.
export function StockScene({ from, to, accent, caption }: StockSceneProps) {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, 150], [0, 360], {
    extrapolateRight: "extend",
  });
  const glow = interpolate(frame, [0, 75, 150], [0.2, 0.5, 0.2], {
    extrapolateRight: "extend",
  });

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
      {caption ? (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 80,
          }}
        >
          <Text
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {caption}
          </Text>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
}
