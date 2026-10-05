import { NextResponse } from "next/server";
import {
  getPublishingConfig,
  publishLinkedIn,
  publishX,
  type PublishResult,
} from "@/lib/publishers";

export const runtime = "nodejs";

type PublishTarget = "linkedin" | "x" | "both";

export async function GET() {
  return NextResponse.json(getPublishingConfig());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const target = body?.target as PublishTarget;
    const linkedinText = String(body?.linkedinText || "").trim();
    const xText = String(body?.xText || "").trim();
    const approvals = body?.approvals || {};

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

    // Intentionally publish sequentially. If the first platform succeeds and
    // the second fails, the caller gets a partial result and can retry only
    // the failed platform, avoiding duplicate posts.
    if (target === "linkedin" || target === "both") {
      results.push(await publishLinkedIn(linkedinText));
    }

    if (target === "x" || target === "both") {
      results.push(await publishX(xText));
    }

    const succeeded = results.filter((item) => item.success);
    const failed = results.filter((item) => !item.success);

    return NextResponse.json({
      allSucceeded: failed.length === 0,
      partialSuccess: succeeded.length > 0 && failed.length > 0,
      results,
      warning: body?.hasImage
        ? "The current direct-publish version is text-only. The selected image was not attached."
        : null,
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
