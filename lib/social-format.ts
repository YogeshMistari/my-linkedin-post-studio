export type SocialPlatform = "linkedin" | "x";

function toUnicodeBold(text: string) {
  let output = "";

  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;

    if (code >= 65 && code <= 90) {
      output += String.fromCodePoint(0x1d400 + (code - 65));
    } else if (code >= 97 && code <= 122) {
      output += String.fromCodePoint(0x1d41a + (code - 97));
    } else if (code >= 48 && code <= 57) {
      output += String.fromCodePoint(0x1d7ce + (code - 48));
    } else {
      output += char;
    }
  }

  return output;
}

function baseCleanup(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/__/g, "")
    .replace(/\x60/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n");
}

function formatLinkedIn(text: string) {
  let result = baseCleanup(text);

  // Convert Markdown list stars into clean LinkedIn bullets first.
  result = result.replace(/^\s*\*+\s+/gm, "• ");

  // Normalize accidental **, ***, **** etc. into one internal marker.
  result = result.replace(/\*{2,}/g, "*");

  // Convert *short emphasis* to Unicode bold so LinkedIn never sees the stars.
  result = result.replace(/\*([^*\n]+)\*/g, (_match, phrase: string) =>
    toUnicodeBold(phrase)
  );

  // Remove any unmatched stray asterisks.
  result = result.replace(/\*/g, "");

  return result
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatX(text: string) {
  return baseCleanup(text)
    .replace(/^\s*\*+\s+/gm, "• ")
    .replace(/\*+/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function formatSocialText(text: string, platform: SocialPlatform) {
  return platform === "linkedin" ? formatLinkedIn(text) : formatX(text);
}
