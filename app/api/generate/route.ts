import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { generateWithOllama } from "@/lib/ollama";
import { buildGenerationInstructions } from "@/lib/prompts";
import type { GenerationMode } from "@/lib/types";

const DEFAULT_OPENAI_TEXT_MODEL = "gpt-6-luna";

function extractJson(text: string) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "");

  return JSON.parse(cleaned);
}

async function generateWithOpenAI({
  instructions,
  input,
}: {
  instructions: string;
  input: string;
}) {
  const model = process.env.OPENAI_TEXT_MODEL || DEFAULT_OPENAI_TEXT_MODEL;
  const client = getOpenAI();

  const response = await client.responses.create({
    model,
    instructions,
    input,
  });

  return response.output_text;
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

    const instructions = buildGenerationInstructions({
      mode,
      feedback,
      currentDraft,
    });

    const input = [
      `Topic: ${topic.trim()}`,
      notes ? `Additional notes/context: ${notes.trim()}` : "",
      `Image preference: ${imageChoice}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const provider = (process.env.AI_PROVIDER || "ollama").toLowerCase();

    const raw =
      provider === "openai"
        ? await generateWithOpenAI({ instructions, input })
        : await generateWithOllama({
            system: instructions,
            user: input,
          });

    const parsed = extractJson(raw);

    const contextUsed = Array.isArray(parsed.contextUsed)
      ? parsed.contextUsed.map(String).slice(0, 8)
      : [];

    return NextResponse.json({
      linkedin: String(parsed.linkedin ?? ""),
      x: String(parsed.x ?? ""),
      imageConcept: String(parsed.imageConcept ?? ""),
      contextUsed,
      provider,
    });
  } catch (error) {
    console.error(error);

    const rawMessage = error instanceof Error ? error.message : "";

    let message = "Generation failed. Check the server terminal and try again.";

    if (rawMessage.includes("Cannot connect to Ollama")) {
      message =
        "Cannot connect to Ollama. Keep Ollama running locally and try again.";
    } else if (rawMessage.includes("OPENAI_API_KEY")) {
      message =
        "OPENAI_API_KEY is not configured. Either use Ollama or configure OpenAI.";
    } else if (
      rawMessage.includes("credit_balance_exhausted") ||
      rawMessage.includes("insufficient_quota") ||
      rawMessage.includes("no credits")
    ) {
      message =
        "OpenAI API credits are unavailable. Switch AI_PROVIDER to ollama for free local generation.";
    } else if (
      rawMessage.includes("JSON") ||
      rawMessage.includes("Unexpected token")
    ) {
      message =
        "The local model returned an invalid response format. Try Generate again.";
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
