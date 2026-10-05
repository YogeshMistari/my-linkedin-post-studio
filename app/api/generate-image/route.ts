import { NextResponse } from "next/server";
import { generateImageWithDrawThings } from "@/lib/drawthings";
import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

const DEFAULT_OPENAI_IMAGE_MODEL = "gpt-image-2.5-flare";

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

    if (provider === "drawthings") {
      const { imageUrl } = await generateImageWithDrawThings({
        prompt: concept.trim(),
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
        prompt: [
          "Create a premium social-media visual for a Data Engineering creator.",
          "Clean, modern, professional, human-designed feel, low clutter, strong hierarchy.",
          "Avoid generic AI people, random laptops, cyberpunk neon, and tiny unreadable text.",
          `Concept: ${concept.trim()}`,
        ].join("\n"),
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
