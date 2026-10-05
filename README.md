# Post Studio — LinkedIn + X Creator Growth Copilot

Post Studio turns a creator's real expertise into platform-native LinkedIn and X drafts, local visuals, review/approval flows, and direct publishing.

The product goal is:

```text
Authority → Trust → Authenticity → Relevant Follower Growth
```

It optimizes for useful hooks, practitioner insight, saves/shares and follow intent without inventing stories or chasing clickbait.

## Fast start

```bash
git clone https://github.com/anuanurag2410/linkedin-x-post.git
cd linkedin-x-post
bash scripts/setup-local-ai.sh
npm run dev:all
```

After the first setup, use only:

```bash
npm run dev:all
```

This starts Ollama automatically when needed, checks the configured local model, and then starts Post Studio. Draw Things CLI runs on demand only when you generate an image. Press Ctrl+C to stop the development session.

Open `http://localhost:3000`.

Full installation, models, environment variables and publishing requirements are in **[REQUIREMENTS.md](./REQUIREMENTS.md)**.

## Branding

The UI uses the Data With Anurag black + yellow brand system.

The logo is mapped to:

```text
public/brand/data-with-anurag-logo.png
```

Display name / alt text:

```text
Data With Anurag Logo
```

If the image is not present yet, the app automatically shows a DWA fallback mark.

Brand credit shown in the app:

```text
An Initiative by Anurag Srivastava · Founder, Data With Anurag
```

## Personalize the whole app in one file

Edit:

```text
config/creator.config.ts
```

This is the creator DNA file. A different creator can replace the current profile, expertise, proof, opinions, voice, content strategy and Topic Library there without rewriting the prompt engine.

The Topic Library powers the left-side idea picker in the UI. Each topic can include optional angles/sub-text suggestions that users can select, edit or replace with their own notes.

## Default local stack

- **Text:** Ollama + `gemma3:4b`
- **Images:** Draw Things CLI + `flux_2_klein_4b_q8p.ckpt`
- **App:** Next.js + React

No paid AI API is required for the default local generation flow.

## Content workflow

1. Enter a topic and optional context.
2. Choose the content goal:
   - Trust + Growth
   - Authority
   - Engagement
   - Educational Value
3. Generate independent LinkedIn and X drafts.
4. Use quick rewrites for hook, authenticity, authority or save/share value.
5. Review/edit each platform independently.
6. Optionally generate a local visual with Draw Things.
7. Approve LinkedIn and/or X.
8. Publish LinkedIn, X or both.

## Publishing

The app supports:

- **Post LinkedIn**
- **Post X**
- **Post Both**

LinkedIn publishing now supports attaching the currently generated or uploaded image to a post. The app uploads the image to LinkedIn first and then creates the post with that image attached. X publishing is still text-only for now.

## Important files

```text
config/creator.config.ts     ← edit this to personalize a creator
lib/prompts.ts               ← reusable prompt engine
REQUIREMENTS.md              ← all installation + credential requirements
scripts/setup-local-ai.sh    ← one-step local AI setup
.env.example                 ← environment-variable template
```

## Safety

Only store public-safe professional facts in the creator config. Keep access tokens in `.env.local`, never in source code.
