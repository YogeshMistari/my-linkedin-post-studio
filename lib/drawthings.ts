import { execFile } from "node:child_process";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const DEFAULT_BIN = "draw-things-cli";
const DEFAULT_MODEL = "flux_2_klein_4b_q8p.ckpt";
const DEFAULT_STEPS = 4;

export async function generateImageWithDrawThings({
  prompt,
  width = 1024,
  height = 1024,
}: {
  prompt: string;
  width?: number;
  height?: number;
}) {
  const bin = process.env.DRAWTHINGS_BIN || DEFAULT_BIN;
  const model = process.env.DRAWTHINGS_MODEL || DEFAULT_MODEL;
  const steps = Number(process.env.DRAWTHINGS_STEPS || DEFAULT_STEPS);
  const modelsDir = process.env.DRAWTHINGS_MODELS_DIR;

  const outputPath = path.join(
    os.tmpdir(),
    `post-studio-${crypto.randomUUID()}.png`
  );

  const args = [
    "generate",
    ...(modelsDir ? ["--models-dir", modelsDir] : []),
    "--prompt",
    prompt,
    "--model",
    model,
    "--width",
    String(width),
    "--height",
    String(height),
    "--steps",
    String(steps),
    "--output",
    outputPath,
  ];

  try {
    await execFileAsync(bin, args, {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 10 * 60 * 1000,
    });

    const file = await fs.readFile(outputPath);
    const imageUrl = `data:image/png;base64,${file.toString("base64")}`;

    await fs.unlink(outputPath).catch(() => {});

    return { imageUrl };
  } catch (error) {
    await fs.unlink(outputPath).catch(() => {});

    const err = error as NodeJS.ErrnoException;
    const message = error instanceof Error ? error.message : "Unknown error";

    if (err.code === "ENOENT") {
      throw new Error(
        "draw-things-cli was not found. Check DRAWTHINGS_BIN or reinstall Draw Things CLI."
      );
    }

    if (
      message.toLowerCase().includes("model") &&
      (message.toLowerCase().includes("not found") ||
        message.toLowerCase().includes("missing"))
    ) {
      throw new Error(
        `Draw Things model is missing. Run: draw-things-cli models ensure --model "${model}"`
      );
    }

    throw new Error(`Draw Things generation failed: ${message}`);
  }
}
