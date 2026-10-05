# LinkedIn + X Post Studio

A personal content copilot for generating, reviewing, approving and publishing platform-native posts for LinkedIn and X.

## Local AI stack

- **Text:** Ollama + `gemma3:4b`
- **Images:** Draw Things CLI + `flux_2_klein_4b_q8p.ckpt`

## Local AI configuration

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b

IMAGE_PROVIDER=drawthings
DRAWTHINGS_BIN=draw-things-cli
DRAWTHINGS_MODEL=flux_2_klein_4b_q8p.ckpt
DRAWTHINGS_STEPS=4
```

## Real social publishing

The app now supports three explicit actions:

- **Post LinkedIn**
- **Post X**
- **Post Both**

A platform's button only activates after that platform draft is approved. Every publish action asks for final confirmation before making the API request.

### LinkedIn

Add to `.env.local`:

```env
LINKEDIN_ACCESS_TOKEN=
LINKEDIN_VERSION=202609
```

The LinkedIn access token should include `openid`, `profile`, and `w_member_social`. The app calls LinkedIn's OIDC `/v2/userinfo` endpoint and derives the member author automatically, so you do not need to configure a Person URN manually.

### X

Add to `.env.local`:

```env
X_USER_ACCESS_TOKEN=
```

This must be a user-context access token authorized to create posts.

### Important

The current direct publishing milestone publishes **text only**.

If you generated or uploaded an image, the app will warn that the image was not attached. Media upload for LinkedIn and X is a separate API flow and is the next publishing milestone.

X drafts over 280 characters are not published yet. Shorten the draft first. Thread publishing will be added separately.

If **Post Both** gets one success and one failure, do not click Post Both again. The app reports the successful platform and you should retry only the failed platform to avoid duplicate posts.

## Start the app

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Personalization

- `lib/creator-profile.ts` contains public-safe professional background.
- `lib/content-playbook.ts` contains recurring viewpoints, content themes and writing habits.
- `lib/prompts.ts` combines them with each new topic.

Keep private client information, compensation, family details and secrets out of the public creator profile.
