# Post Studio — LinkedIn + X Creator Growth Copilot

Post Studio turns a creator's real expertise into platform-native LinkedIn and X content, optional AI-generated visuals, an approval workflow, direct LinkedIn publishing, and a free X web-composer flow.

The default project is branded for **Data With Anurag** and optimized around:

```text
Authority → Trust → Authenticity → Relevant Follower Growth
```

The app is designed so another creator can fork the repository, replace one creator-config file and brand assets, then use the same workflow.

---

## 1. What this app does

- Generate independent LinkedIn and X drafts from one topic.
- Use a creator-specific knowledge/config layer.
- Suggest reusable topic ideas and optional content angles.
- Apply platform-specific formatting.
- Keep mandatory brand hashtags.
- Generate a local social-media image with Draw Things.
- Review, edit and approve drafts before anything is published.
- Publish LinkedIn directly through the LinkedIn API.
- Attach the selected/generated image to LinkedIn.
- Open X with approved text prefilled using the free web composer.
- Start the whole local app with one command after setup.

---

## 2. Default technology stack

| Capability | Default |
| --- | --- |
| Web app | Next.js 15 + React 19 + TypeScript |
| Text AI | Ollama |
| Default text model | `gemma3:4b` |
| Image AI | Draw Things CLI |
| Default image model | `flux_2_klein_4b_q8p.ckpt` |
| LinkedIn publishing | LinkedIn API |
| X publishing | Free X web composer |
| Styling | Custom CSS |
| Icons | Lucide React |

The default text and image generation workflow runs locally and does not require a paid AI API.

---

## 3. Prerequisites

The included one-step local installer currently targets **macOS** because the default Draw Things image workflow is macOS-first.

You need:

- macOS
- Git
- Homebrew
- internet access for the initial package/model downloads
- enough free disk space for local models
- Apple Silicon is strongly recommended for local image generation

Node.js, Ollama and Draw Things CLI are checked/installed by the included setup script.

If Homebrew is not installed, install it first from:

```text
https://brew.sh
```

Verify Git and Homebrew:

```bash
git --version
brew --version
```

---

## 4. Clone the repository

```bash
git clone https://github.com/anuanurag2410/linkedin-x-post.git
cd linkedin-x-post
```

If you fork the repository first, clone your fork instead.

---

## 5. Add your logo and favicon

Brand assets are stored in GitHub under:

```text
public/brand/
```

For the default Data With Anurag setup, upload the logo as:

```text
public/brand/data-with-anurag-logo.png
```

The app currently uses this single file for:

- the header logo
- browser favicon
- shortcut/bookmark icon
- Apple touch icon

Recommended asset:

```text
Format: PNG
Canvas: square
Recommended size: 512 x 512 px
Background: transparent if possible
```

### Upload through GitHub

1. Open the repository on GitHub.
2. Open `public/brand/`.
3. Click **Add file → Upload files**.
4. Upload your logo using the exact filename:
   `data-with-anurag-logo.png`
5. Commit the file.

### Or add it locally

```bash
cp /path/to/your/logo.png public/brand/data-with-anurag-logo.png
git add public/brand/data-with-anurag-logo.png
git commit -m "Add brand logo"
git push
```

Brand-file guidance is also documented in:

```text
public/brand/README.md
```

### Use a separate favicon later

Edit:

```text
config/creator.config.ts
```

Example:

```ts
app: {
  logoPath: "/brand/my-brand-logo.png",
  faviconPath: "/brand/my-brand-icon.png",
}
```

Store both files inside `public/brand/`.

---

## 6. One-time installation

From the repository root, run:

```bash
bash scripts/setup-local-ai.sh
```

The script will:

1. check macOS/Homebrew
2. check/install Node.js 22+
3. install Ollama
4. install Draw Things CLI
5. run `npm install`
6. create `.env.local` from `.env.example` if needed
7. start Ollama
8. download `gemma3:4b`
9. download the Draw Things image model

This model download can take time the first time.

You can verify the local AI setup with:

```bash
npm run ai:check
```

---

## 7. Daily startup — one command

After the one-time setup, use only:

```bash
npm run dev:all
```

This command:

- checks whether Ollama is running
- starts Ollama automatically if required
- checks whether the configured model exists
- downloads it if missing
- verifies Draw Things availability
- starts the Next.js app

Open:

```text
http://localhost:3000
```

Press:

```text
Ctrl + C
```

to stop the development session.

If Post Studio started Ollama itself, the launcher also stops that Ollama process when the session ends.

---

## 8. Environment configuration

The first setup creates:

```text
.env.local
```

from:

```text
.env.example
```

Never commit `.env.local`.

Default local configuration:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b

IMAGE_PROVIDER=drawthings
DRAWTHINGS_BIN=draw-things-cli
DRAWTHINGS_MODEL=flux_2_klein_4b_q8p.ckpt
DRAWTHINGS_STEPS=4

LINKEDIN_ACCESS_TOKEN=
LINKEDIN_VERSION=202609
```

X does not require an API token because the app currently uses the free X web composer.

---

## 9. Personalize the app for another creator

The main personalization file is:

```text
config/creator.config.ts
```

For normal customization, edit this file instead of rewriting the prompt engine.

It contains:

- app name and tagline
- brand logo/favicon paths
- creator name
- positioning
- target audience
- expertise
- credentials
- approved professional experiences
- creator brand identity
- writing voice
- phrases to avoid
- required hashtags
- topic library
- recurring themes
- professional viewpoints
- hook styles
- LinkedIn formatting rules
- X formatting rules
- growth strategy

### Change the creator identity

Example:

```ts
creator: {
  name: "Your Name",
  positioning: {
    primaryIdentity: "Your professional positioning",
    experience: "Your experience",
    currentAngle: "How you want your content positioned",
  },
}
```

Only include facts you are comfortable using publicly.

Do not put secrets, passwords, confidential client information or private account details here.

---

## 10. Change the brand

Inside:

```text
config/creator.config.ts
```

edit:

```ts
app: {
  name: "Post Studio",
  brandInitial: "DWA",
  tagline: "Create authentic content. Build trust. Grow professionally.",
  logoPath: "/brand/data-with-anurag-logo.png",
  faviconPath: "/brand/data-with-anurag-logo.png",
  logoAlt: "Data With Anurag Logo",
  initiativeBy: "Anurag Srivastava",
  initiativeRole: "Founder, Data With Anurag",
}
```

The current UI theme is black + yellow and can be changed in:

```text
app/globals.css
```

---

## 11. Change the mandatory hashtags

Inside:

```text
config/creator.config.ts
```

edit:

```ts
requiredHashtags: [
  "#DataXMentor",
  "#DataWithAnurag",
],
```

These hashtags are enforced by the generation backend so they are not dependent only on the local model remembering them.

---

## 12. Change the Topic Library

The left sidebar is generated from:

```text
config/creator.config.ts
```

Example topic:

```ts
{
  id: "spark-performance",
  category: "Spark",
  topic: "More compute is not the first answer to every slow Spark job",
  angles: [
    "Talk about skew, shuffles and joins before scaling compute.",
    "Use a simple troubleshooting sequence.",
    "Frame it as a common performance mistake."
  ],
}
```

Each topic can contain:

- a category
- a main topic
- multiple optional angles/sub-text ideas

Users can click an idea, then edit the topic or notes before generating.

---

## 13. Change the writing voice

Creator voice is configured in:

```text
config/creator.config.ts
```

Important sections:

```text
creator.voice.principles
creator.voice.avoid
contentStrategy.growthPrinciples
contentStrategy.viewpoints
contentStrategy.formatting
```

This is the best place to make the output:

- more technical
- more casual
- more concise
- more opinionated
- more educational
- more founder-style
- more mentor-style

without rewriting the whole prompt.

---

## 14. Where the actual prompt lives

The reusable prompt engine is:

```text
lib/prompts.ts
```

Most users should personalize `config/creator.config.ts` first.

Only edit `lib/prompts.ts` when you want to change the app-wide generation behavior itself, such as:

- default LinkedIn structure
- hook rules
- trust-signal requirements
- X writing strategy
- promotional-post rules
- image-concept rules
- JSON output contract

The creator-specific facts should remain in `config/creator.config.ts`.

---

## 15. LinkedIn formatting

Post Studio formats LinkedIn content before it reaches the editor.

Internal emphasis markers generated by the model are converted into Unicode bold-looking characters so LinkedIn does not receive broken Markdown such as:

```text
**SQL Deep Dive**
```

Lists are normalized to clean bullets such as:

```text
• SQL fundamentals
• Python fundamentals
• Spark fundamentals
```

The formatter is implemented in:

```text
lib/social-format.ts
```

---

## 16. LinkedIn publishing setup

LinkedIn direct publishing is optional.

Without a LinkedIn token, you can still generate and edit content.

To enable publishing, place a valid member access token in:

```text
.env.local
```

Example:

```env
LINKEDIN_ACCESS_TOKEN=your_token_here
LINKEDIN_VERSION=202609
```

The token used by this project needs the permissions required by the current publishing flow, including:

```text
openid
profile
w_member_social
```

The app resolves the authenticated LinkedIn member through OIDC userinfo and publishes through LinkedIn's Posts API.

Important:

- never commit the token
- never put it in `creator.config.ts`
- rotate the token if it is accidentally exposed
- LinkedIn access tokens expire, so replace the token in `.env.local` when required

### LinkedIn image publishing

If an image is generated or uploaded in Post Studio, the LinkedIn publishing flow:

1. initializes a LinkedIn image upload
2. uploads the image
3. receives the image URN
4. publishes the LinkedIn post with that image attached

If no image is selected, the app publishes text only.

---

## 17. X publishing — free mode

The project intentionally does not require a paid X API.

The workflow is:

```text
Generate X draft
→ Review
→ Approve
→ Open in X
→ X composer opens with text prefilled
→ Click Post manually
```

No X API token, Client ID, developer billing or OAuth setup is required.

The combined action:

```text
Publish LinkedIn + Open X
```

does the following:

1. publishes LinkedIn through the API
2. opens X with the approved X text prefilled
3. you make the final X post manually

The free X intent flow does not automatically attach the generated image.

---

## 18. Image generation

The default image provider is Draw Things CLI.

Configuration:

```env
IMAGE_PROVIDER=drawthings
DRAWTHINGS_BIN=draw-things-cli
DRAWTHINGS_MODEL=flux_2_klein_4b_q8p.ckpt
DRAWTHINGS_STEPS=4
```

Draw Things does not need to remain open as a desktop application.

Post Studio runs the CLI only when you click image generation.

Image generation code lives in:

```text
lib/drawthings.ts
app/api/generate-image/route.ts
```

You can also choose **Upload mine** inside the UI and use your own image.

---

## 19. Content workflow

Typical flow:

```text
Choose or enter topic
        ↓
Choose/edit optional angle
        ↓
Choose content goal
        ↓
Generate LinkedIn + X
        ↓
Review/edit independently
        ↓
Generate/upload image
        ↓
Approve platform drafts
        ↓
Post LinkedIn
and/or
Open in X
```

Editing an approved draft removes its approval so you do not accidentally publish changed content without reviewing it again.

---

## 20. Useful commands

### First-time local setup

```bash
bash scripts/setup-local-ai.sh
```

### Start everything

```bash
npm run dev:all
```

### Check AI installation

```bash
npm run ai:check
```

### Start only Next.js

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Production start

```bash
npm run start
```

---

## 21. Important project files

```text
app/
  page.tsx                       main UI
  globals.css                    black/yellow visual theme
  layout.tsx                     metadata + favicon
  api/
    generate/route.ts            text-generation API
    generate-image/route.ts      image-generation API
    publish/route.ts             LinkedIn publish endpoint

config/
  creator.config.ts              main creator personalization file

lib/
  prompts.ts                     reusable writing prompt engine
  social-format.ts               LinkedIn/X text formatter
  ollama.ts                      local text-model connection
  drawthings.ts                  local image generation
  publishers.ts                  LinkedIn publishing implementation

public/
  brand/
    README.md                     brand asset instructions
    data-with-anurag-logo.png     add this file yourself

scripts/
  setup-local-ai.sh              one-time local setup
  dev-all.sh                     one-command launcher
  check-local-ai.sh              installation diagnostics

.env.example                     environment variable template
.env.local                       local secrets; never commit
REQUIREMENTS.md                  compact requirements reference
```

---

## 22. Troubleshooting

### Ollama is not reachable

Run:

```bash
npm run dev:all
```

The launcher normally starts Ollama automatically.

Check:

```bash
npm run ai:check
```

Ollama logs are written to:

```text
/tmp/post-studio-ollama.log
```

### Local model returns an incomplete draft

The generation API automatically attempts a recovery pass.

If failures continue:

```bash
ollama list
ollama pull gemma3:4b
```

Then restart:

```bash
npm run dev:all
```

A larger Ollama model can also improve output consistency if your machine has enough memory.

### Logo does not appear

Confirm this exact file exists:

```text
public/brand/data-with-anurag-logo.png
```

Then restart the app and hard-refresh the browser.

The app header uses a DWA fallback mark when the logo is missing.

### Favicon does not update immediately

Browsers cache favicons aggressively.

After adding/replacing the logo:

1. restart Post Studio
2. hard-refresh the page
3. close/reopen the tab if needed
4. clear the site's cached data if the old icon remains

### LinkedIn publishing fails

Check:

- `LINKEDIN_ACCESS_TOKEN` exists in `.env.local`
- the token has not expired
- the token has the necessary publishing permission
- the post has been approved in the UI

### X button is disabled

The X draft must:

- be approved
- fit within 280 characters for the current single-post flow

---

## 23. Security rules

Never commit:

```text
.env.local
access tokens
API keys
client secrets
passwords
private client information
confidential project data
```

Keep only public-safe creator facts inside:

```text
config/creator.config.ts
```

If a credential is accidentally shown in a screenshot, terminal recording, commit or chat, rotate it immediately.

---

## 24. Fork/personalization checklist

For a new creator:

1. fork the repository
2. clone the fork
3. add a logo to `public/brand/`
4. edit `config/creator.config.ts`
5. replace creator identity and positioning
6. replace expertise and approved experiences
7. replace voice rules and phrases to avoid
8. replace required hashtags
9. replace Topic Library ideas
10. run `bash scripts/setup-local-ai.sh`
11. add LinkedIn credentials to `.env.local` only if direct publishing is wanted
12. run `npm run dev:all`
13. open `http://localhost:3000`
14. generate, review and approve before publishing

That is enough to reuse Post Studio for another professional creator without rebuilding the application.
