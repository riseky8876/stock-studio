// Remotion config — tuned for headless CI rendering of stock clips.
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // let Remotion pick; override with --concurrency in CI if needed
Config.setChromiumOpenGlRenderer("swangle"); // software GL, safe on CI (no GPU)
Config.setCodec("h264");
Config.setCrf(18);