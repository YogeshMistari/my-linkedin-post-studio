import { NextResponse } from "next/server";
import {
  getPublishingConfig,
  publishLinkedIn,
  publishX,
  type PublishResult,
} from "@/lib/publishers";

export const runtime = "nodejs";

type PublishTarget = "linkedin" | "x" | "both";

function sanitizePublishText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/__/g, "")
    .replace(/\x60/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET() {
  return NextResponse.json(getPublishingConfig());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const target = body?.target as PublishTarget;
    const linkedinText = sanitizePublishText(
      String(body?.linkedinText || "")
    );
    const xText = sanitizePublishText(String(body?.xText || ""));
    const approvals = body?.approvals || {};
    const imageDataUrl =
      typeof body?.imageDataUrl === "string" && body.imageDataUrl.startsWith("data:image/")
        ? body.imageDataUrl
        : "";
    const imageAltText = String(body?.imageAltText || "").trim();

    if (!["linkedin", "x", "both"].includes(target)) {
      return NextResponse.json(
        { error: "Invalid publishing target." },
        { status: 400 }
      );
    }

    if (
      (target === "linkedin" || target === "both") &&
      (!approvals.linkedin || !linkedinText)
    ) {
      return NextResponse.json(
        { error: "Approve the LinkedIn draft before publishing it." },
        { status: 400 }
      );
    }

    if (
      (target === "x" || target === "both") &&
      (!approvals.x || !xText)
    ) {
      return NextResponse.json(
        { error: "Approve the X draft before publishing it." },
        { status: 400 }
      );
    }

    const results: PublishResult[] = [];

    // Publish sequentially so a partial success can be retried safely
    // without duplicating the platform that already succeeded.
    if (target === "linkedin" || target === "both") {
      results.push(
        await publishLinkedIn(
          linkedinText,
          imageDataUrl
            ? {
                dataUrl: imageDataUrl,
                altText: imageAltText,
              }
            : null
        )
      );
    }

    if (target === "x" || target === "both") {
      results.push(await publishX(xText));
    }

    const succeeded = results.filter((item) => item.success);
    const failed = results.filter((item) => !item.success);

    const linkedInResult = results.find(
      (item) => item.platform === "linkedin" && item.success
    );

    let warning: string | null = null;

    if (imageDataUrl && target === "x") {
      warning =
        "The image is ready, but X image publishing is not connected yet. X was published as text only.";
    } else if (imageDataUrl && target === "both") {
      warning = linkedInResult?.imageAttached
        ? "Image attached to LinkedIn. X was published as text only."
        : "X was published as text only.";
    }

    return NextResponse.json({
      allSucceeded: failed.length === 0,
      partialSuccess: succeeded.length > 0 && failed.length > 0,
      results,
      warning,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Publishing failed.",
      },
      { status: 500 }
    );
  }
}
