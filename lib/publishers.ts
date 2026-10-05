export type PublishResult = {
  platform: "linkedin" | "x";
  success: boolean;
  id?: string;
  error?: string;
};

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function safeErrorDetail(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return (
      parsed?.message ||
      parsed?.detail ||
      parsed?.title ||
      parsed?.error_description ||
      raw
    );
  } catch {
    return raw;
  }
}

export function getPublishingConfig() {
  return {
    linkedinConfigured: Boolean(
      env("LINKEDIN_ACCESS_TOKEN") && env("LINKEDIN_AUTHOR_URN")
    ),
    xConfigured: Boolean(env("X_USER_ACCESS_TOKEN")),
  };
}

export async function publishLinkedIn(text: string): Promise<PublishResult> {
  const accessToken = env("LINKEDIN_ACCESS_TOKEN");
  const author = env("LINKEDIN_AUTHOR_URN");
  const version = env("LINKEDIN_VERSION") || "202609";

  if (!accessToken || !author) {
    return {
      platform: "linkedin",
      success: false,
      error:
        "LinkedIn is not configured. Add LINKEDIN_ACCESS_TOKEN and LINKEDIN_AUTHOR_URN to .env.local.",
    };
  }

  try {
    const response = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "Linkedin-Version": version,
      },
      body: JSON.stringify({
        author,
        commentary: text,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      }),
    });

    if (!response.ok) {
      const detail = safeErrorDetail(await response.text());
      return {
        platform: "linkedin",
        success: false,
        error: `LinkedIn returned ${response.status}: ${detail}`,
      };
    }

    return {
      platform: "linkedin",
      success: true,
      id: response.headers.get("x-restli-id") || undefined,
    };
  } catch (error) {
    return {
      platform: "linkedin",
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown LinkedIn publishing error.",
    };
  }
}

export async function publishX(text: string): Promise<PublishResult> {
  const accessToken = env("X_USER_ACCESS_TOKEN");

  if (!accessToken) {
    return {
      platform: "x",
      success: false,
      error:
        "X is not configured. Add X_USER_ACCESS_TOKEN to .env.local.",
    };
  }

  if (text.length > 280) {
    return {
      platform: "x",
      success: false,
      error:
        "This X draft is over 280 characters. Shorten it before publishing. Thread publishing will be added separately.",
    };
  }

  try {
    const response = await fetch("https://api.x.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};

    if (!response.ok) {
      return {
        platform: "x",
        success: false,
        error: `X returned ${response.status}: ${safeErrorDetail(raw)}`,
      };
    }

    return {
      platform: "x",
      success: true,
      id: data?.data?.id ? String(data.data.id) : undefined,
    };
  } catch (error) {
    return {
      platform: "x",
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown X publishing error.",
    };
  }
}
