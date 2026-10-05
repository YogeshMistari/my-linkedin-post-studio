import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

const DEFAULT_IMAGE_MODEL = "gpt-image-2.5-flare";

export async function POST(request: Request) {
  try {
    const provider = (process.env.IMAGE_PROVIDER || "").toLowerCase();

    if (provider !== "openai") {
      return NextResponse.json(
        {
          error:
            "Local Ollama is handling text only. For V1, use Upload mine or set IMAGE_PROVIDER=openai with API credits.",
        },
        { status: 503 }
      );
    }

    const { concept } = await request.json();

    if (!concept?.trim()) {
      return NextResponse.json({ error: "Image concept is required." }, { status: 400 });
    }

    const model = process.env.OPENAI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL;
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
    const imageUrl =
      first?.b64_json
        ? `data:image/png;base64,${first.b64_json}`
        : first?.url ?? null;

    if (!imageUrl) {
      throw new Error("No image payload was returned.");
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "Image generation failed. For the free local V1, use Upload mine.",
      },
      { status: 500 }
    );
  }
}
