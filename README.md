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
- LinkedIn API and X API integrations come after the local V1 flow is validated

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

Edit `.env.local`:

```env
OPENAI_API_KEY=your_api_key
OPENAI_TEXT_MODEL=gpt-6-luna
OPENAI_IMAGE_MODEL=gpt-image-2.5-flare
```

Model names remain environment variables so the code is easy to update as API model availability changes.

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
