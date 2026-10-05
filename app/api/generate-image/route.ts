import { NextResponse } from "next/server";
import { generateImageWithDrawThings } from "@/lib/drawthings";
import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

const DEFAULT_OPENAI_IMAGE_MODEL = "gpt-image-2.5-flare";

function buildVisualPrompt(concept: string) {
  return [
    "Create a clean, premium square social-media visual for a Data Engineering creator.",
    "VISUAL ONLY.",
    "Absolutely no text, no words, no letters, no numbers, no captions, no labels, no logos, no UI text, no watermarks, no code snippets.",
    "Do not create a poster, presentation slide, infographic with written content, or typography-based design.",
    "Use simple visual storytelling with objects, shapes, systems, paths, layers, databases, cloud/data-flow elements, or an engineering workspace.",
    "Modern, professional, minimal, balanced composition, low clutter.",
    `Visual concept: ${concept.trim()}`,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const { concept } = await request.json();

    if (!concept?.trim()) {
      return NextResponse.json(
        { error: "Image concept is required." },
        { status: 400 }
      );
    }

    const provider = (process.env.IMAGE_PROVIDER || "drawthings").toLowerCase();
    const visualPrompt = buildVisualPrompt(concept);

    if (provider === "drawthings") {
      const { imageUrl } = await generateImageWithDrawThings({
        prompt: visualPrompt,
        width: 1024,
        height: 1024,
      });

      return NextResponse.json({ imageUrl, provider });
    }

    if (provider === "openai") {
      const model =
        process.env.OPENAI_IMAGE_MODEL || DEFAULT_OPENAI_IMAGE_MODEL;
      const client = getOpenAI();

      const result = await client.images.generate({
        model,
        prompt: visualPrompt,
        size: "1536x1024",
      });

      const first = result.data?.[0];
      const imageUrl = first?.b64_json
        ? `data:image/png;base64,${first.b64_json}`
        : first?.url ?? null;

      if (!imageUrl) {
        throw new Error("No image payload was returned.");
      }

      return NextResponse.json({ imageUrl, provider });
    }

    return NextResponse.json(
      { error: `Unsupported IMAGE_PROVIDER: ${provider}` },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Image generation failed.",
      },
      { status: 500 }
    );
  }
}
