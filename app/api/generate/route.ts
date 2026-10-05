import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { buildGenerationInstructions } from "@/lib/prompts";
import type { GenerationMode } from "@/lib/types";

function extractJson(text: string) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "");
  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      topic,
      notes = "",
      imageChoice = "generate",
      mode = "both",
      feedback = "",
      currentDraft = "",
    } = body as {
      topic?: string;
      notes?: string;
      imageChoice?: string;
      mode?: GenerationMode;
      feedback?: string;
      currentDraft?: string;
    };

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    if (!["both", "linkedin", "x"].includes(mode)) {
      return NextResponse.json({ error: "Invalid generation mode." }, { status: 400 });
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
      instructions: buildGenerationInstructions({
        mode,
        feedback,
        currentDraft,
      }),
      input: [
        `Topic: ${topic.trim()}`,
        notes ? `Additional notes/context: ${notes.trim()}` : "",
        `Image preference: ${imageChoice}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
    });

    const parsed = extractJson(response.output_text);
    const contextUsed = Array.isArray(parsed.contextUsed)
      ? parsed.contextUsed.map(String).slice(0, 8)
      : [];

    return NextResponse.json({
      linkedin: String(parsed.linkedin ?? ""),
      x: String(parsed.x ?? ""),
      imageConcept: String(parsed.imageConcept ?? ""),
      contextUsed,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Generation failed. Check the API configuration and try again." },
      { status: 500 }
    );
  }
}
