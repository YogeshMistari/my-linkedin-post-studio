import { NextResponse } from "next/server";
import { creatorConfig } from "@/config/creator.config";
import { generateWithOllama } from "@/lib/ollama";

export const runtime = "nodejs";

const TOPIC_LIBRARY_SCHEMA = {
  type: "object",
  properties: {
    topics: {
      type: "array",
      minItems: 8,
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          category: { type: "string" },
          topic: { type: "string" },
          angles: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: { type: "string" },
          },
        },
        required: ["id", "category", "topic", "angles"],
        additionalProperties: false,
      },
    },
  },
  required: ["topics"],
  additionalProperties: false,
} as const;

function normalizeId(value: string, index: number) {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);

  return cleaned || `idea-${index + 1}`;
}

export async function GET() {
  try {
    const strategy = creatorConfig.contentStrategy;
    const creator = creatorConfig.creator;

    const system = `
You generate fresh professional content ideas for ${creator.name}.

POSITIONING
${creator.positioning.primaryIdentity}
${creator.positioning.currentAngle}

AUDIENCE
${creator.targetAudience.join(", ")}

EXPERTISE
${creator.coreExpertise.join(", ")}

RECURRING THEMES
${strategy.recurringThemes.join(", ")}

VIEWPOINTS
${strategy.viewpoints.map((item) => `- ${item}`).join("\n")}

HOOK STYLES
${strategy.hookPatterns.join(", ")}

TASK
Generate 8-10 fresh LinkedIn/X topic ideas for this creator.

Rules:
- Do not simply rename or paraphrase the existing fallback topics.
- Mix technical, career, interview, practical engineering, opinion and mentor-style ideas.
- Make each topic specific enough to immediately turn into a strong post.
- Prefer useful tension, real practitioner problems, trade-offs, mistakes, frameworks and scenarios.
- Avoid generic motivation.
- Avoid fake controversy and clickbait.
- Keep topic wording natural and human.
- Give exactly 3 optional angles for every topic.
- Each angle should meaningfully change the direction of the post, not repeat the title.
- Keep categories short, for example Career, Databricks, Spark, Pipelines, Fundamentals, AI + DE, Interviews, Cloud.
- Return only JSON matching the provided schema.
`;

    const fallbackTopics = strategy.topicLibrary
      .map((item) => `${item.category}: ${item.topic}`)
      .join("\n");

    const user = `
Create a completely refreshed topic library.

These are FALLBACK examples only. Avoid returning the same wording or obvious rewrites:
${fallbackTopics}
`;

    const raw = await generateWithOllama({
      system,
      user,
      format: TOPIC_LIBRARY_SCHEMA,
      temperature: 0.8,
    });

    const parsed = JSON.parse(raw);
    const topics = Array.isArray(parsed?.topics)
      ? parsed.topics
          .map(
            (
              item: {
                id?: unknown;
                category?: unknown;
                topic?: unknown;
                angles?: unknown;
              },
              index: number
            ) => {
              const topic = String(item?.topic ?? "").trim();
              const category = String(item?.category ?? "Ideas").trim();
              const angles = Array.isArray(item?.angles)
                ? item.angles.map(String).map((value) => value.trim()).filter(Boolean).slice(0, 3)
                : [];

              if (!topic || angles.length < 3) return null;

              return {
                id: normalizeId(String(item?.id ?? topic), index),
                category: category || "Ideas",
                topic,
                angles,
              };
            }
          )
          .filter(Boolean)
          .slice(0, 10)
      : [];

    if (topics.length < 6) {
      throw new Error("Ollama returned too few usable topic ideas.");
    }

    return NextResponse.json(
      {
        topics,
        generatedAt: new Date().toISOString(),
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Topic refresh failed:", error);

    return NextResponse.json(
      {
        error:
          "Could not refresh topic ideas right now. The app will keep using the fallback topic library.",
      },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
