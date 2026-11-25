import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { Bot, Sparkles, TrendingUp } from "lucide-react";
import { Text } from "remotion";

const FPS = 30;
const DURATION = 360; // 12s
const HOOK_END = 90;
const CONTENT_END = 270;
const CTA_END = 360;
const BG = "#0B0F19";
const ACCENT1 = "#6366F1";
const ACCENT2 = "#3B82F6";
const TEXTC = "#FFFFFF";
const TITLE = "3 Alasan AI";

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

  const titleSpring = spring({
    frame,
    fps: FPS,
    duration: 0.9,
    config: { damping: 50, stiffness: 100, mass: 1 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const c1y = interpolate(frame, [90, 120], [80, 0]);
  const c1o = interpolate(frame, [90, 120], [0, 1]);
  const c2y = interpolate(frame, [150, 180], [80, 0]);
  const c2o = interpolate(frame, [150, 180], [0, 1]);
  const c3y = interpolate(frame, [210, 240], [80, 0]);
  const c3o = interpolate(frame, [210, 240], [0, 1]);

  const ctaO = interpolate(frame, [270, 300], [0, 1]);
  const ctaGlow = interpolate(frame, [270, 330], [0.4, 1]);

  const showHook = frame < HOOK_END;
  const showContent = frame >= HOOK_END && frame < CONTENT_END;
  const showCta = frame >= CTA_END - 90;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      <AbsoluteFill
        style={{ background: `linear-gradient(135deg, ${BG}, ${ACCENT1}, ${ACCENT2})` }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT1}55 0%, transparent 60%)`,
          opacity: 0.6,
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

      {showHook ? (
        <AbsoluteFill
          style={{ top: 560, left: 0, right: 0, bottom: 560, justifyContent: "center", alignItems: "center", padding: 80 }}
        >
          <Text fontSize={96} fontWeight="bold" color={TEXTC} opacity={titleOpacity}>
            {TITLE}
          </Text>
        </AbsoluteFill>
      ) : null}

      {showContent ? (
        <>
          <AbsoluteFill
            style={{
              top: c1y + 80,
              left: 60,
              right: 60,
              height: 260,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.12)",
              opacity: c1o,
            }}
          >
            <AbsoluteFill
              style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}
            >
              <Bot width={44} height={44} color={ACCENT1} />
              <Text fontSize={56} fontWeight="bold" color={TEXTC}>{`01`}</Text>
              <Text fontSize={36} color={TEXTC}>Otomasi Tugas Repetitif</Text>
            </AbsoluteFill>
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              top: c2y + 80,
              left: 60,
              right: 60,
              height: 260,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.12)",
              opacity: c2o,
            }}
          >
            <AbsoluteFill
              style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}
            >
              <Sparkles width={44} height={44} color={ACCENT2} />
              <Text fontSize={56} fontWeight="bold" color={TEXTC}>{`02`}</Text>
              <Text fontSize={36} color={TEXTC}>Augmentasi Kreativitas</Text>
            </AbsoluteFill>
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              top: c3y + 80,
              left: 60,
              right: 60,
              height: 260,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.12)",
              opacity: c3o,
            }}
          >
            <AbsoluteFill
              style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}
            >
              <TrendingUp width={44} height={44} color={ACCENT2} />
              <Text fontSize={56} fontWeight="bold" color={TEXTC}>{`03`}</Text>
              <Text fontSize={36} color={TEXTC}>Kecepatan Keputusan</Text>
            </AbsoluteFill>
          </AbsoluteFill>
        </>
      ) : null}

      {showCta ? (
        <AbsoluteFill
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            padding: 80,
            backgroundColor: ACCENT2,
          }}
        >
          <Text fontSize={64} fontWeight="bold" color={TEXTC} opacity={ctaO} style={{ textAlign: "center" }}>
            Follow untuk tips AI harian!
          </Text>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
}
