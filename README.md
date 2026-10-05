# LinkedIn + X Post Studio

A personal content copilot for generating, reviewing and approving platform-native posts for LinkedIn and X.

## Local AI stack

V1 can now run fully locally for both text and images:

- **Text:** Ollama + `gemma3:4b`
- **Images:** Draw Things CLI + `flux_2_klein_4b_q8p.ckpt`

No paid API is required for this setup.

## Configure `.env.local`

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b

IMAGE_PROVIDER=drawthings
DRAWTHINGS_BIN=draw-things-cli
DRAWTHINGS_MODEL=flux_2_klein_4b_q8p.ckpt
DRAWTHINGS_STEPS=4
```

## Make sure Ollama is ready

```bash
ollama run gemma3:4b
```

Exit the chat with `/bye`. Verify the local API:

```bash
curl http://127.0.0.1:11434/api/tags
```

## Make sure Draw Things is ready

Verify the CLI:

```bash
draw-things-cli --help
```

Ensure the image model is installed:

```bash
draw-things-cli models ensure --model "flux_2_klein_4b_q8p.ckpt"
```

Test image generation:

```bash
draw-things-cli generate \
  --prompt "minimal clean social media graphic about data engineering roadmap" \
  --model "flux_2_klein_4b_q8p.ckpt" \
  --width 1024 \
  --height 1024 \
  --steps 4 \
  --output /tmp/post-studio-test.png
```

## Start the app

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## V1 flow

1. Enter a topic and optional personal notes.
2. Generate separate LinkedIn and X drafts with Ollama.
3. Edit/regenerate each platform independently.
4. Review the suggested image concept.
5. Edit the image prompt if needed.
6. Click **Generate image** to render locally through Draw Things.
7. Approve the drafts.
8. Publishing/OAuth comes in a later milestone.

## Personalization safety

`lib/creator-profile.ts` contains only public-safe facts that are allowed to appear in generated public content.

Do not add confidential client details, compensation, private family information, secrets, or unapproved claims to that file.
