import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const FPS = 30;
const DURATION = 360; // 12s
const HOOK_END = 90;
const CONTENT_END = 270;
const CTA_END = 360;
const BG = "#0B0F19";
const ACCENT1 = "#6366F1";
const ACCENT2 = "#3B82F6";

export function AiWorkflow() {
  const frame = useCurrentFrame();

  const angle = interpolate(frame, [0, 180, 360], [0, 360, 720], {
    extrapolateRight: "extend",
  });
  const orb1X = interpolate(frame, [0, 180, 360], [0.15, 0.8, 0.15]);
  const orb1Y = interpolate(frame, [0, 180, 360], [0.2, 0.75, 0.2]);
  const orb1R = interpolate(frame, [0, 180, 360], [180, 420, 180]);
  const orb1O = interpolate(frame, [0, 180, 360], [0.35, 0.6, 0.35]);
  const orb2X = interpolate(frame, [0, 180, 360], [0.8, 0.25, 0.8]);
  const orb2Y = interpolate(frame, [0, 180, 360], [0.75, 0.25, 0.75]);
  const orb2R = interpolate(frame, [0, 180, 360], [120, 260, 120]);
  const orb2O = interpolate(frame, [0, 180, 360], [0.25, 0.45, 0.25]);

  const showCta = frame >= CTA_END - 90;

  const bg = showCta ? ACCENT2 : BG;

  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{ background: `linear-gradient(135deg, ${bg}, ${ACCENT1}, ${ACCENT2})` }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT1}55 0%, transparent 60%)`,
          opacity: showCta ? 0.9 : 0.6,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: ACCENT1,
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
          backgroundColor: ACCENT2,
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
