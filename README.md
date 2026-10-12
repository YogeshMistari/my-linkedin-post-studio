# Yogesh Post Studio — LinkedIn Creator Studio

Yogesh Post Studio helps me turn my professional expertise and learning journey into engaging, professional LinkedIn posts. It is intended to support AI-assisted post generation, optional visuals, an approval workflow, and LinkedIn publishing when valid API credentials are configured.

This project is personalized for Yogesh Mistari, focusing on:

Oracle SQL and PL/SQL development
Database troubleshooting and performance tuning
Application and production support
SQL interview preparation
Google Cloud learning and practical progress

My content philosophy:

Practical Learning → Useful Insights → Professional Credibility → Career Growth

The application uses a configurable creator profile so its identity, expertise, writing style, topics, and hashtags can be maintained in one central configuration file.

---

## 1. What this app does

Generate professional LinkedIn post drafts from a topic.
Use a creator-specific profile and professional knowledge configuration.
Suggest relevant topics and optional content angles.
Format content for LinkedIn readability.
Apply the configured professional hashtags.
Generate optional social-media visuals when image-generation tools are configured.
Review, edit and approve drafts before publishing.
Publish approved posts directly through the LinkedIn API when valid credentials are configured.
Attach a selected or generated image to a LinkedIn post when supported by the publishing workflow.
Start the local application for content creation and review.

---

## 2. Technology Stack

| Capability           | Technology      |
| -------------------- | --------------- |
| Web application      | Next.js 15      |
| UI library           | React 19        |
| Programming language | TypeScript      |
| Styling              | Custom CSS      |
| Icons                | Lucide React    |
| AI text generation   | Ollama          |
| Default text model   | `gemma3:4b`     |
| Image generation     | Draw Things CLI |
| Social publishing    | LinkedIn API    |

The application combines AI-assisted LinkedIn content generation, draft editing, approval workflows, and optional image generation.

**Important:** Actual capabilities depend on the project's implementation and configuration. Direct LinkedIn publishing requires valid API credentials and permissions. Local AI and image-generation tools may require additional operating-system-specific setup.


---

## 3. Prerequisites

Yogesh Post Studio is intended to be developed and run locally on Windows 11.

### Required Software

* Windows 11
* Visual Studio Code
* Node.js (LTS version)
* npm (included with Node.js)
* Git (optional if you download the repository as a ZIP file)

### Verify Your Installation

Open the VS Code terminal using **Terminal → New Terminal** and run:

```bash
node --version
npm --version
git --version
```

Git is required only if you plan to clone the repository using Git.

### AI and Image Generation

The project uses Ollama for local AI text generation and Draw Things CLI for image generation.

**Important:** The original setup script is macOS-oriented. Do not run `bash scripts/setup-local-ai.sh` on Windows until its compatibility has been verified.

Additional Windows-compatible setup may be required for AI models and image generation.


---

## 4. Clone the Repository

The source code for **Yogesh Post Studio** is maintained in my GitHub repository.

**GitHub Repository:**
https://github.com/YogeshMistari/my-linkedin-post-studio

### Clone Using Git

Open the VS Code terminal (`Ctrl + ``) or Windows Terminal and run:

```bash
git clone https://github.com/YogeshMistari/my-linkedin-post-studio.git
```

Navigate to the project directory:

```bash
cd my-linkedin-post-studio
```

Open the project in Visual Studio Code:

```bash
code .
```

### Download Without Git

1. Open the [GitHub repository](https://github.com/YogeshMistari/my-linkedin-post-studio).
2. Click **Code**.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file.
5. Open the extracted project folder in VS Code.

---

## 5. Add Your Logo and Favicon

Brand assets for **Yogesh Post Studio** are stored in:

```text
public/brand/
```

### Logo File

Use your logo file:

```text
public/brand/yogesh-post-studio-logo.png
```

The logo can be used for:

* Application header
* Browser favicon
* Bookmark icon
* Apple touch icon

### Recommended Logo Specifications

```text
Format: PNG
Canvas: Square
Recommended size: 512 × 512 pixels
Background: Transparent, if possible
```

Use a professional design that reflects your personal brand and your interests in Oracle SQL, PL/SQL, application support, and Google Cloud learning.

**Important:** Adding a logo to this README does not automatically configure the application. The application configuration must reference the correct filename.

### Upload Through GitHub

1. Open the [Yogesh Post Studio repository](https://github.com/YogeshMistari/my-linkedin-post-studio).
2. Navigate to `public/brand/`.
3. Click **Add file → Upload files**.
4. Upload your logo as `yogesh-post-studio-logo.png`.
5. Commit the changes if the logo is not already in the repository.

If you have already uploaded the logo, you do not need to upload it again.

### Configure a Separate Favicon Later

If you want a separate favicon, edit:

```text
config/creator.config.ts
```

For example:

```ts
app: {
  logoPath: "/brand/yogesh-post-studio-logo.png",
  faviconPath: "/brand/yogesh-post-studio-icon.png",
}
```

Place both image files inside `public/brand/`. Make sure the favicon file exists before referencing it.

---

## 6. Local AI Setup (Windows 11)

Yogesh Post Studio uses Ollama for local AI text generation, depending on the project's configuration.

### Prerequisites

* Install Node.js LTS and npm.
* Install Ollama for Windows if you want to use local AI generation.
* Download a compatible model, such as `gemma3:4b`, if supported by your system.

### Verify Your Installation

Open PowerShell or the VS Code terminal and run:

```powershell
node --version
npm --version
ollama --version
```

If you plan to use Ollama, verify that the Ollama service is running and that your selected model is available.

To list locally available models, run:

```powershell
ollama list
```

### Important

The existing `scripts/setup-local-ai.sh` script may be intended for macOS/Linux environments. Do not run it on Windows unless you have verified its compatibility.

Before configuring Ollama or image generation, check the project's environment variables, dependencies, and scripts. Setup requirements may vary depending on the actual implementation.

---


## 7. Daily Startup

After completing the required setup, start the development server from the project directory.

### Start the Next.js Application

Open the VS Code terminal and run:

```powershell
npm.cmd run dev
```

Open the application in your browser:

http://localhost:3000

To stop the development server, press:

```text
Ctrl + C
```

### Start the Full Local AI Environment

The project also defines a `dev:all` command:

```bash
npm run dev:all
```

This command invokes `scripts/dev-all.sh`. Its compatibility with Windows depends on your Bash environment and the script's implementation.

**Windows 11 note:** Verify the script requirements before relying on `dev:all` for automatic Ollama startup, model downloads, or image-generation checks. Use a compatible Bash environment if required.


---

## 8. Environment Configuration

The project uses environment variables to configure text generation, image generation, and social publishing.

The example configuration is stored in:

```text
.env.example
```

Create a local environment file named `.env.local` in the project root and use `.env.example` as your reference.

**Never commit `.env.local` or expose access tokens, API keys, or other secrets.**

### Text Generation

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b

# Optional OpenAI text fallback
OPENAI_API_KEY=
OPENAI_TEXT_MODEL=
```

### Image Generation

```env
IMAGE_PROVIDER=drawthings
DRAWTHINGS_BIN=draw-things-cli
DRAWTHINGS_MODEL=flux_2_klein_4b_q8p.ckpt
DRAWTHINGS_STEPS=4

# Optional OpenAI image fallback
OPENAI_IMAGE_MODEL=
```

Image generation requirements depend on the configured provider and the tools available on your computer.

### LinkedIn Publishing

```env
LINKEDIN_ACCESS_TOKEN=
LINKEDIN_VERSION=202609
```

LinkedIn direct publishing is optional. A valid access token with the required permissions is needed to publish through the API.

### X Publishing

The application uses the X web composer flow. According to the current project configuration, X API credentials and API billing are not required for this workflow.

**Important:** Keep `.env.example` free of real credentials. Add your actual local configuration only to `.env.local`, and verify that `.env.local` is excluded from Git.

---


## 9. Personalize the App for Another Creator

The main personalization file is:

```text
config/creator.config.ts
```

For normal customization, update this file instead of rewriting the prompt engine.

It contains settings for:

* Application name and tagline
* Logo and favicon paths
* Creator name and professional positioning
* Target audience and areas of expertise
* Approved professional experiences
* Writing voice and phrases to avoid
* Required hashtags
* Topic library and recurring themes
* Professional viewpoints and hook styles
* LinkedIn and X formatting rules
* Content growth strategy

### Change the Creator Identity

Example:

```ts
creator: {
  name: "Your Name",
  positioning: {
    primaryIdentity: "Your professional positioning",
    experience: "Your professional experience",
    currentAngle: "How you want your content positioned",
  },
}
```

Adapt the example to the actual structure of `config/creator.config.ts`; property names must match the existing configuration.

Only include facts you are comfortable sharing publicly.

Never add passwords, access tokens, confidential client information, or private account details to this file.

---


## 10. Change the Brand

The application branding is configured in:

```text
config/creator.config.ts
```

The current brand settings for Yogesh Post Studio include:

```ts
app: {
  name: "Yogesh Post Studio",
  brandInitial: "YM",
  tagline: "Create professional content. Share your learning. Grow your career.",
  logoPath: "/brand/yogesh-post-studio-logo.png",
  faviconPath: "/brand/yogesh-post-studio-logo.png",
  logoAlt: "Yogesh Mistari Logo",
  initiativeBy: "Yogesh Mistari",
  initiativeRole: "Oracle SQL & PL/SQL Developer",
}
```

**Important:** This is a reference example. Keep the property names and structure consistent with the actual `config/creator.config.ts` file.

The application theme can be customized in:

```text
app/globals.css
```

---


## 11. Configure Required Hashtags

Required hashtags are configured in:

```text id="8p4dmr"
config/creator.config.ts
```

If the project supports mandatory hashtags, configure them to match your professional content and target audience.

Example hashtags for Yogesh Post Studio:

```ts id="d7v2g3"
requiredHashtags: [
  "#OracleSQL",
  "#PLSQL",
  "#ApplicationSupport",
  "#GoogleCloud",
]
```

**Important:** This is an example, not a verified copy of your current configuration. Keep the existing property name and structure used by the application.

Choose relevant hashtags for each post rather than adding every hashtag to every post. Avoid unrelated or excessive hashtags.

---


## 12. Dynamic Topic Library

Yogesh Post Studio provides topic suggestions to help create relevant professional content.

The topic library can include subjects such as:

* Oracle SQL and PL/SQL practice
* SQL query optimization and performance tuning
* Oracle errors and troubleshooting
* Application and production support
* SQL interview preparation
* Google Cloud learning
* Career development and learning in public

### Topic Configuration

The main creator configuration file is:

```text
config/creator.config.ts
```

The topic library defined there can provide initial suggestions and fallback content, depending on the application's implementation.

Topic-generation logic is located in:

```text
app/api/topics/route.ts
```

The application interface may allow you to select a suggested topic, edit it, refresh suggestions, or enter your own idea.

### Example Topic

```ts
{
  id: "oracle-sql-performance",
  category: "Performance Tuning",
  topic: "How to investigate a slow Oracle SQL query",
  angles: [
    "Check the execution plan before changing the query.",
    "Investigate indexes, joins, and filtering conditions.",
    "Explain the troubleshooting process with a practical example."
  ],
}
```

This example illustrates the topic structure; keep it consistent with the actual implementation in your project.

The goal is to turn practical learning and troubleshooting experience into useful, authentic professional content.

---


## 13. Change the Writing Voice

The creator's writing voice is configured in:

```text id="voice13"
config/creator.config.ts
```

Depending on the project configuration, the relevant settings may include:

```text id="voice14"
creator.voice.principles
creator.voice.avoid
contentStrategy.growthPrinciples
contentStrategy.viewpoints
contentStrategy.formatting
```

Use these settings to guide the generated content toward a consistent professional style.

For Yogesh Post Studio, the preferred content style can emphasize:

* Clear, practical technical explanations
* Realistic Oracle SQL and PL/SQL examples
* Structured troubleshooting and root-cause analysis
* Concise, professional language
* Lessons learned through hands-on practice
* Career insights and Google Cloud learning
* Authentic experiences without unsupported claims

You can adjust the voice to be more technical, concise, educational, conversational, or opinion-driven.

**Tip:** Update `config/creator.config.ts` first. Modify `lib/prompts.ts` only when you need to change the application's general generation behavior.

The exact configuration property names must match those in your project.

---


## 14. Where the Actual Prompt Lives

The reusable prompt engine is located in:

```text
lib/prompts.ts
```

For normal personalization, start with:

```text
config/creator.config.ts
```

Modify `lib/prompts.ts` only when you want to change general content-generation behavior, such as:

* Default LinkedIn post structure
* Opening hooks and formatting rules
* Technical explanation requirements
* X writing strategy
* Promotional content rules
* Image concept instructions
* Expected generation output format

Keep creator-specific facts and preferences in the creator configuration.

---

## 15. LinkedIn Formatting

Post Studio includes formatting functionality for social content.

The formatter is located in:

```text
lib/social-format.ts
```

Depending on the implementation, formatting may convert model-generated emphasis into Unicode bold-style characters and normalize lists into readable bullets.

Example:

```text
SQL Performance Tuning

• Review the execution plan
• Check indexes and joins
• Investigate filtering conditions
```

Review generated content before publishing, because formatting and character rendering may vary across platforms and devices.

---

## 16. LinkedIn Publishing Setup

LinkedIn direct publishing is optional. You can generate and edit content without configuring a publishing token.

### Environment Variables

Configure these values in your local `.env.local` file:

```env
LINKEDIN_ACCESS_TOKEN=
LINKEDIN_VERSION=202609
```

Use a valid access token with the permissions required by the application's current publishing implementation.

The project configuration documents these permissions:

```text
openid
profile
w_member_social
```

The required permissions and API behavior may change. Verify them against LinkedIn's current documentation and the implementation in your project before publishing.

### Security Notes

* Never commit `.env.local`.
* Never put access tokens in `config/creator.config.ts`.
* Never share tokens in screenshots or public repositories.
* Replace expired or revoked credentials when necessary.
* Review and approve a draft before publishing.

### Image Publishing

The project may support attaching a generated or uploaded image to a LinkedIn post. Confirm the current implementation in:

```text
lib/publishers.ts
app/api/publish/route.ts
```

If image publishing is supported, follow the configured upload and publishing workflow. If no image is selected, check whether the current implementation publishes a text-only post.

---

## 17. X Publishing — Web Composer

Post Studio supports an X web-composer workflow without requiring the X API for that workflow.

Typical workflow:

```text
Generate an X draft
        ↓
Review and edit
        ↓
Approve the draft
        ↓
Open the X composer
        ↓
Review the prefilled text
        ↓
Publish manually on X
```

The combined action may publish the approved LinkedIn post and open the X composer with the approved X text.

**Important:** Opening the X composer is not the same as publishing a post automatically. Complete the final review and publish manually on X.

The web-composer flow may not attach the generated image automatically. Verify the current implementation before relying on image attachment.

---

## 18. Image Generation

The example environment configuration uses Draw Things CLI:

```env
IMAGE_PROVIDER=drawthings
DRAWTHINGS_BIN=draw-things-cli
DRAWTHINGS_MODEL=flux_2_klein_4b_q8p.ckpt
DRAWTHINGS_STEPS=4
```

The relevant project files are:

```text
lib/drawthings.ts
app/api/generate-image/route.ts
```

Image generation depends on the configured provider, installed software, model availability, and operating-system compatibility.

You can also use the **Upload mine** option in the application to select your own image, if that feature is enabled.

Before using image generation on Windows 11, verify that the configured CLI and model are installed and supported by your environment.

---

## 19. Content Creation Workflow

A typical Post Studio workflow is:

```text
Choose or enter a topic
        ↓
Choose or edit the angle
        ↓
Select a content goal
        ↓
Generate LinkedIn and X drafts
        ↓
Review and edit each draft
        ↓
Generate or upload an image
        ↓
Approve the drafts
        ↓
Publish to LinkedIn and/or open X
```

Review every draft before publishing. Editing an approved draft may remove its approval, depending on the current application implementation.

The goal is to create authentic, useful content based on your professional knowledge and learning.

---

## 20. Useful Commands

Run these commands from the project directory in the VS Code terminal.

### Install Dependencies

```powershell
npm.cmd install
```

### Start the Next.js Development Server

```powershell
npm.cmd run dev
```

Open:

http://localhost:3000

### Build the Application

```powershell
npm.cmd run build
```

### Start the Production Server

```powershell
npm.cmd run start
```

### Local AI Setup and Diagnostics

The project defines these additional commands:

```bash
npm run setup:local
npm run ai:check
npm run dev:all
```

These commands invoke Bash scripts. On Windows 11, their compatibility depends on the installed Bash environment and script implementation. Verify the requirements before running them.

---

## 21. Important Project Files

The following is a reference to the main files discussed in this README. Verify individual paths against the current repository.

```text
app/
  page.tsx
  globals.css
  layout.tsx
  api/
    generate/route.ts
    topics/route.ts
    generate-image/route.ts
    publish/route.ts

config/
  creator.config.ts

lib/
  prompts.ts
  social-format.ts
  ollama.ts
  drawthings.ts
  publishers.ts

public/
  brand/
    yogesh-post-studio-logo.png

scripts/
  setup-local-ai.sh
  dev-all.sh
  check-local-ai.sh

.env.example
.env.local
package.json
README.md
```

### File Responsibilities

* `app/page.tsx` — main application interface
* `app/globals.css` — application styling
* `app/layout.tsx` — page layout and metadata
* `config/creator.config.ts` — creator identity, branding, and content preferences
* `lib/prompts.ts` — reusable generation prompts
* `lib/social-format.ts` — social content formatting
* `lib/ollama.ts` — local text-generation integration
* `lib/drawthings.ts` — image-generation integration
* `lib/publishers.ts` — publishing functionality
* `.env.example` — example environment configuration
* `.env.local` — local configuration and secrets; never commit this file

---

## 22. Troubleshooting

### PowerShell Blocks `npm`

If PowerShell reports that `npm.ps1` cannot run because script execution is disabled, try using the Windows command wrapper:

```powershell
npm.cmd run dev
```

This avoids invoking `npm.ps1` and does not require changing the PowerShell execution policy.

### Ollama Is Not Reachable

Check that Ollama is installed and running. Then run:

```powershell
ollama --version
ollama list
```

If the project uses Ollama, confirm that the configured model is available.

For example:

```powershell
ollama pull gemma3:4b
```

Only download the model if it is compatible with your machine and required by your configuration.

### Local AI Setup Fails

The local AI scripts use Bash. Check their dependencies and Windows compatibility before running them. Review the terminal error message and the relevant script to identify the cause.

### Logo Does Not Appear

Confirm that this file exists:

```text
public/brand/yogesh-post-studio-logo.png
```

Check that `config/creator.config.ts` references the same filename, and verify the logo settings in the application.

Restart the application and refresh the browser after making configuration changes.

### Favicon Does Not Update

Browsers may cache favicons. Check the configured favicon path in `config/creator.config.ts` and the metadata in `app/layout.tsx`. Confirm that the referenced file exists, then refresh the page or reopen the browser tab.

### LinkedIn Publishing Fails

Check the following:

* `LINKEDIN_ACCESS_TOKEN` is configured in `.env.local`.
* The token is valid and has the required permissions.
* The configured API version is supported by the implementation.
* The draft has been approved in the application.
* The publishing request and response contain no relevant API errors.

Never paste an access token into a public issue or repository.

### X Composer Does Not Open

Check that the X draft is approved and that the application can open the X composer. If the application enforces a character limit, make sure the post meets the limit for the selected posting format.

---

## 23. Security Rules

Never commit or publish:

```text
.env.local
Access tokens
API keys
Client secrets
Passwords
Confidential client information
Private account details
```

Keep only information suitable for public use in:

```text
config/creator.config.ts
```

Before committing changes:

1. Review the files being staged.
2. Confirm that `.env.local` and other secrets are excluded.
3. Remove confidential information from logs and screenshots.
4. Rotate any credential that has been accidentally exposed.

---

## 24. Fork and Personalization Checklist

To adapt Post Studio for another creator:

1. Fork the repository or create your own copy.
2. Clone or download the project.
3. Install Node.js LTS and the project dependencies.
4. Add your brand assets to `public/brand/`.
5. Update `config/creator.config.ts`.
6. Customize your creator identity and professional positioning.
7. Review the writing voice and content preferences.
8. Configure relevant hashtags and topic suggestions.
9. Review the `.env.example` file.
10. Create `.env.local` without committing secrets.
11. Configure local AI and image generation if required.
12. Verify any Bash-based setup scripts before running them on Windows.
13. Start the application using `npm.cmd run dev`.
14. Open http://localhost:3000.
15. Generate, review, and approve drafts before publishing.

LinkedIn publishing and local image generation may require additional configuration. X web-composer publishing requires a final manual review and publishing action.

Yogesh Post Studio is intended to help turn practical technical knowledge, hands-on learning, and professional experience into useful content.
  