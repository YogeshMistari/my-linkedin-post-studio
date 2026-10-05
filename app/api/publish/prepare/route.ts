import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.hasLinkedIn || !body?.hasX) {
      return NextResponse.json(
        { error: "Both LinkedIn and X drafts are required." },
        { status: 400 }
      );
    }

    const linkedinConfigured = Boolean(
      process.env.LINKEDIN_CLIENT_ID &&
      process.env.LINKEDIN_CLIENT_SECRET &&
      process.env.LINKEDIN_REDIRECT_URI
    );

    const xConfigured = Boolean(
      process.env.X_CLIENT_ID &&
      process.env.X_CLIENT_SECRET &&
      process.env.X_REDIRECT_URI
    );

    return NextResponse.json({
      ready: linkedinConfigured && xConfigured,
      linkedinConfigured,
      xConfigured,
      hasImage: Boolean(body.hasImage),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to check publishing configuration." },
      { status: 500 }
    );
  }
}
