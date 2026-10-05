# LinkedIn + X Post Studio

A personal content copilot for generating, reviewing and approving platform-native posts for LinkedIn and X.

## V1 AI setup

V1 now defaults to **Ollama running locally**, so LinkedIn and X text generation can work without paid API credits.

Default local model:

```text
gemma3:4b
```

OpenAI remains an optional provider.

## V1 implemented

- Topic + optional context input
- Public-safe personal creator profile
- Independent LinkedIn and X writing
- Side-by-side editable drafts
- Regenerate only LinkedIn or only X
- Quick rewrite controls
- Custom rewrite instruction per platform
- Explicit approval per platform
- Editing automatically removes approval
- X character warning
- AI-generated image concept/prompt
- Editable image prompt
- Local image upload/preview
- Personal-context-used visibility
- Ollama local text generation
- Optional OpenAI text fallback
- No automatic publishing

## Run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Make sure Ollama is installed

```bash
ollama --version
```

### 3. Download/run the model

```bash
ollama run gemma3:4b
```

You can exit its interactive chat with:

```text
/bye
```

Ollama should remain available as a local service.

You can verify the local API with:

```bash
curl http://127.0.0.1:11434/api/tags
```

### 4. Configure the app

Create/edit `.env.local`:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b
```

No API key is needed for local text generation.

### 5. Start Next.js

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Images in free V1

Ollama is being used for text generation and for writing the **image concept/prompt**, not for rendering images.

For now select:

- **No image**, or
- **Upload mine**

OpenAI image generation is still available as an optional paid integration.

## Optional OpenAI mode

```env
AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_TEXT_MODEL=
```

## Personalization safety

`lib/creator-profile.ts` contains only public-safe facts that are allowed to appear in generated public content.

Do not add confidential client details, compensation, private family information, secrets, or unapproved claims to that file.

## V1 test checklist

1. Start Ollama.
2. Start `npm run dev`.
3. Enter a topic and optional notes.
4. Generate LinkedIn + X.
5. Edit either draft manually.
6. Regenerate only one platform.
7. Try a quick rewrite.
8. Review Personal context used.
9. Select No image or Upload mine.
10. Approve both drafts separately.

## Next milestone

After the local V1 generation quality is good:

1. Persist drafts and images.
2. LinkedIn OAuth.
3. X OAuth.
4. Direct publishing with final confirmation.
5. Post history and scheduling.
