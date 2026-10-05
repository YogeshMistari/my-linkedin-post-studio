# LinkedIn + X Post Studio

A personal content copilot for generating, reviewing and approving platform-native posts for LinkedIn and X.

## V1 implemented

- Topic + optional context input
- Public-safe personal creator profile
- Independent LinkedIn and X writing
- Side-by-side editable drafts
- Regenerate only LinkedIn or only X
- Quick rewrite controls:
  - shorter
  - more personal
  - less AI-sounding
  - stronger hook
- Custom rewrite instruction per platform
- Explicit approval per platform
- Editing automatically removes approval
- X character warning for a non-thread draft over 280 characters
- AI image concept generation
- Editable image prompt before generation
- AI image generation
- Local image upload/preview
- "Personal context used" visibility panel
- No automatic publishing

## Tech

- Next.js + TypeScript
- React
- OpenAI Responses API
- OpenAI Image API
- Plain CSS for V1

## Run locally

```bash
git clone https://github.com/anuanurag2410/linkedin-x-post.git
cd linkedin-x-post
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000.

## Environment

Only the API key is required:

```env
OPENAI_API_KEY=your_api_key
```

Optional overrides:

```env
OPENAI_TEXT_MODEL=
OPENAI_IMAGE_MODEL=
```

If you leave those blank, the app currently defaults to:

- `gpt-6-luna` for post generation
- `gpt-image-2.5-flare` for images

After changing `.env.local`, stop the dev server and run `npm run dev` again.

## Personalization safety

`lib/creator-profile.ts` contains only public-safe facts that are allowed to appear in generated public content.

Do **not** add confidential client details, compensation, private family information, secrets, or unapproved claims to that file.

## V1 test checklist

1. Enter a topic and optional notes.
2. Generate LinkedIn + X.
3. Edit either draft manually.
4. Try a quick rewrite on only one platform and verify the other does not change.
5. Add a custom rewrite instruction.
6. Review the Personal context used section.
7. Edit the suggested image concept.
8. Generate an image or upload your own.
9. Approve LinkedIn and X separately.
10. Verify editing an approved draft removes that platform's approval.

## Next milestone

After V1 is working locally:

1. Persist drafts and images.
2. LinkedIn OAuth.
3. X OAuth.
4. Direct publishing with final confirmation.
5. Post history and scheduling.
