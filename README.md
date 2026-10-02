# LinkedIn + X Post Studio

A personal content copilot for generating, reviewing, approving and eventually publishing platform-native posts to LinkedIn and X.

## V1 goals

- Topic + optional context input
- Personal, public-safe creator profile
- Independent LinkedIn and X generation
- Side-by-side editable drafts
- Explicit approval per platform
- AI image concept + image generation
- Human-in-the-loop publishing
- Later: OAuth, direct posting, scheduling, version history and learning from edits

## Tech

- Next.js + TypeScript
- React
- OpenAI API
- Plain CSS for the initial UI
- LinkedIn API and X API integrations are planned next

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000.

## Environment

Set:

```env
OPENAI_API_KEY=...
OPENAI_TEXT_MODEL=...
OPENAI_IMAGE_MODEL=...
```

The model names are environment variables intentionally, so the app is not coupled to a hard-coded model version.

## Personalization safety

`lib/creator-profile.ts` contains only public-safe facts approved for use in public posts.

Do **not** casually add private client names, compensation, personal details, confidential metrics or sensitive context. Anything in that profile may be used by the model in generated public content.

## Publishing roadmap

1. LinkedIn OAuth + member publishing
2. X OAuth + post publishing
3. Media upload for both platforms
4. Store drafts, approvals and post history
5. Scheduling
6. Learn writing preferences from user edits
