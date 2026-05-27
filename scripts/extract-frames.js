const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

ffmpeg.setFfmpegPath(ffmpegPath);

// ffprobe lives alongside ffmpeg in ffmpeg-static
// On Windows, it's the same binary directory
const ffprobePath = ffmpegPath.replace("ffmpeg.exe", "ffprobe.exe").replace(/ffmpeg$/, "ffprobe");
console.log("ffmpeg path:", ffmpegPath);
console.log("ffprobe path attempt:", ffprobePath);

// Try setting ffprobe if it exists, otherwise use ffmpeg to probe
if (fs.existsSync(ffprobePath)) {
  ffmpeg.setFfprobePath(ffprobePath);
} else {
  // Use ffmpeg itself to probe (works with -i flag)
  console.log("ffprobe not found separately, using ffmpeg for probing...");
}

const ROOT = path.join(__dirname, "..");
const inputVideo = path.join(ROOT, "public", "final vid ice.mp4");
const outputDir = path.join(ROOT, "public", "frames");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get duration + fps using ffmpeg directly via execSync
console.log("🎬 Probing video with ffmpeg...");
let duration, fps, width, height;

try {
  const probeOut = execSync(
    `"${ffmpegPath}" -i "public/final vid ice.mp4" 2>&1 || true`,
    { cwd: ROOT, encoding: "utf8", stdio: "pipe" }
  );
  console.log("Probe output:", probeOut.substring(0, 1000));

  // Parse duration
  const durMatch = probeOut.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (durMatch) {
    duration = parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3]);
  }

  // Parse fps
  const fpsMatch = probeOut.match(/(\d+(?:\.\d+)?)\s*fps/);
  if (fpsMatch) fps = parseFloat(fpsMatch[1]);

  // Parse resolution
  const resMatch = probeOut.match(/(\d{3,4})x(\d{3,4})/);
  if (resMatch) {
    width = parseInt(resMatch[1]);
    height = parseInt(resMatch[2]);
  }
} catch (e) {
  // execSync throws on non-zero exit; ffmpeg -i always exits non-zero without output
  const output = e.stdout || e.stderr || e.message || "";
  const durMatch = output.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (durMatch) {
    duration = parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3]);
  }
  const fpsMatch = output.match(/(\d+(?:\.\d+)?)\s*fps/);
  if (fpsMatch) fps = parseFloat(fpsMatch[1]);
  const resMatch = output.match(/(\d{3,4})x(\d{3,4})/);
  if (resMatch) { width = parseInt(resMatch[1]); height = parseInt(resMatch[2]); }
}

if (!duration) { duration = 10; fps = 30; width = 1920; height = 1080; }
if (!fps) fps = 30;
if (!width) { width = 1920; height = 1080; }

const totalFrames = Math.ceil(duration * fps);
const outputHeight = Math.round((height / width) * 1280);

console.log(`📊 Duration: ${duration.toFixed(2)}s | FPS: ${fps} | ~${totalFrames} frames`);
console.log(`📐 Original: ${width}x${height} → Output: 1280x${outputHeight}`);
console.log(`🖼️  Extracting frames...`);

// Extract every frame
ffmpeg(inputVideo)
  .outputOptions([
    `-vf scale=1280:-2`,
    `-q:v 3`,
    `-vsync 0`,
  ])
  .output(path.join(outputDir, "frame_%04d.jpg"))
  .on("progress", (p) => {
    process.stdout.write(`\r⏳ Frame: ${p.frames || "?"}`);
  })
  .on("end", () => {
    const files = fs.readdirSync(outputDir).filter((f) => f.endsWith(".jpg"));
    console.log(`\n✅ Extracted ${files.length} frames!`);

    const manifest = {
      totalFrames: files.length,
      fps: Math.round(fps),
      duration: parseFloat(duration.toFixed(3)),
      width: 1280,
      height: outputHeight,
    };
    fs.writeFileSync(path.join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2));
    console.log("📄 manifest.json:", manifest);
  })
  .on("error", (err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  })
  .run();
