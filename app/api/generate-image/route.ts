import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

const DEFAULT_IMAGE_MODEL = "gpt-image-2.5-flare";

export async function POST(request: Request) {
  try {
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

    const message =
      error instanceof Error && error.message.includes("OPENAI_API_KEY")
        ? "OPENAI_API_KEY is not configured. Add it to .env.local and restart the dev server."
        : "Image generation failed. Check your OpenAI API key/billing and try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
