import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { concept } = await request.json();

    if (!concept?.trim()) {
      return NextResponse.json({ error: "Image concept is required." }, { status: 400 });
    }

    const model = process.env.OPENAI_IMAGE_MODEL;
    if (!model) {
      return NextResponse.json(
        { error: "OPENAI_IMAGE_MODEL is not configured." },
        { status: 500 }
      );
    }

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
      { error: "Image generation failed. Check the image model/API configuration." },
      { status: 500 }
    );
  }
}
