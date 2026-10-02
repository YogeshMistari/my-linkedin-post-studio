import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { buildGenerationInstructions } from "@/lib/prompts";

function extractJson(text: string) {
  const cleaned = text
    .trim()
    .replace(/^\`\`\`json\s*/i, "")
    .replace(/\`\`\`$/i, "");
  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const { topic, notes = "", imageChoice = "generate" } = await request.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    const model = process.env.OPENAI_TEXT_MODEL;
    if (!model) {
      return NextResponse.json(
        { error: "OPENAI_TEXT_MODEL is not configured." },
        { status: 500 }
      );
    }

    const client = getOpenAI();
    const response = await client.responses.create({
      model,
      instructions: buildGenerationInstructions(),
      input: [
        `Topic: ${topic.trim()}`,
        notes ? `Additional notes/context: ${notes.trim()}` : "",
        `Image preference: ${imageChoice}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
    });

    const parsed = extractJson(response.output_text);

    return NextResponse.json({
      linkedin: String(parsed.linkedin ?? ""),
      x: String(parsed.x ?? ""),
      imageConcept: String(parsed.imageConcept ?? ""),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Generation failed. Check the server logs and API configuration." },
      { status: 500 }
    );
  }
}
