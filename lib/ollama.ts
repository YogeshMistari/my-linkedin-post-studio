type OllamaChatResponse = {
  message?: {
    content?: string;
  };
};

const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_OLLAMA_MODEL = "gemma3:4b";

export async function generateWithOllama({
  system,
  user,
}: {
  system: string;
  user: string;
}) {
  const baseUrl = (process.env.OLLAMA_BASE_URL || DEFAULT_OLLAMA_URL).replace(/\/$/, "");
  const model = process.env.OLLAMA_MODEL || DEFAULT_OLLAMA_MODEL;

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        format: "json",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        options: {
          temperature: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Ollama returned ${response.status}: ${detail}`);
    }

    const data = (await response.json()) as OllamaChatResponse;
    const content = data.message?.content?.trim();

    if (!content) {
      throw new Error("Ollama returned an empty response.");
    }

    return content;
  } catch (error) {
    if (
      error instanceof TypeError ||
      (error instanceof Error && error.message.toLowerCase().includes("fetch failed"))
    ) {
      throw new Error(
        "Cannot connect to Ollama. Make sure Ollama is running locally, then try again."
      );
    }

    throw error;
  }
}
