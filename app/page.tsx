"use client";

import {
  ChangeEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  RefreshCw,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react";
import type {
  ApprovalState,
  GeneratedContent,
  GenerationMode,
  Platform,
} from "@/lib/types";

const emptyContent: GeneratedContent = {
  linkedin: "",
  x: "",
  imageConcept: "",
  contextUsed: [],
};

const quickFeedback = [
  "Make it shorter",
  "Make it more personal",
  "Make it less AI-sounding",
  "Give it a stronger hook",
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [imageChoice, setImageChoice] = useState<"generate" | "none" | "upload">("generate");
  const [content, setContent] = useState<GeneratedContent>(emptyContent);
  const [approval, setApproval] = useState<ApprovalState>({ linkedin: false, x: false });
  const [loadingMode, setLoadingMode] = useState<GenerationMode | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<Record<Platform, string>>({
    linkedin: "",
    x: "",
  });
  const [contextOpen, setContextOpen] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);

  const hasDrafts = Boolean(content.linkedin || content.x);
  const linkedinChars = content.linkedin.length;
  const xChars = content.x.length;

  const readyToPublish = useMemo(
    () => approval.linkedin && approval.x && hasDrafts,
    [approval, hasDrafts]
  );

  async function generate(mode: GenerationMode = "both", presetFeedback = "") {
    setLoadingMode(mode);
    setError("");

    if (mode === "both") {
      setApproval({ linkedin: false, x: false });
      setImageUrl("");
      setUploadedImageName("");
    } else {
      setApproval((current) => ({ ...current, [mode]: false }));
    }

    const platformFeedback =
      mode === "both" ? "" : presetFeedback || feedback[mode];

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          notes,
          imageChoice,
          mode,
          feedback: platformFeedback,
          currentDraft: mode === "both" ? "" : content[mode],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");

      setContent((current) => ({
        linkedin: data.linkedin || (mode !== "both" ? current.linkedin : ""),
        x: data.x || (mode !== "both" ? current.x : ""),
        imageConcept:
          mode === "both" ? data.imageConcept || "" : current.imageConcept,
        contextUsed:
          mode === "both"
            ? data.contextUsed || []
            : Array.from(new Set([...current.contextUsed, ...(data.contextUsed || [])])),
      }));

      if (mode !== "both") {
        setFeedback((current) => ({ ...current, [mode]: "" }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoadingMode(null);
    }
  }

  function updateDraft(platform: Platform, value: string) {
    setContent((current) => ({ ...current, [platform]: value }));
    setApproval((current) => ({ ...current, [platform]: false }));
  }

  function toggleApproval(platform: Platform) {
    setApproval((current) => ({ ...current, [platform]: !current[platform] }));
  }

  async function generateImage() {
    if (!content.imageConcept.trim()) return;
    setImageLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept: content.imageConcept }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image generation failed.");
      setImageUrl(data.imageUrl);
      setUploadedImageName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image generation failed.");
    } finally {
      setImageLoading(false);
    }
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(String(reader.result || ""));
      setUploadedImageName(file.name);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  function setImageMode(choice: "generate" | "none" | "upload") {
    setImageChoice(choice);
    if (choice === "none") {
      setImageUrl("");
      setUploadedImageName("");
    }
    if (choice === "upload") {
      uploadRef.current?.click();
    }
  }

  const platformCard = (platform: Platform) => {
    const isLinkedIn = platform === "linkedin";
    const label = isLinkedIn ? "LinkedIn" : "X";
    const chars = isLinkedIn ? linkedinChars : xChars;
    const isLoading = loadingMode === platform;
    const overSingleX = !isLinkedIn && chars > 280 && !/^\s*1\//m.test(content.x);

    return (
      <article className="card platform-card">
        <div className="platform-head">
          <div className="platform-name">
            <span
              className="platform-dot"
              style={isLinkedIn ? undefined : { background: "#f5f5f5" }}
            />
            {label}
          </div>
          <span className={`platform-meta ${overSingleX ? "warning" : ""}`}>
            {chars.toLocaleString()} characters
            {overSingleX ? " · consider a thread" : ""}
          </span>
        </div>

        <textarea
          className="post-editor"
          value={content[platform]}
          onChange={(e) => updateDraft(platform, e.target.value)}
          placeholder={`Your ${label} draft will appear here.`}
        />

        <div className="quick-actions">
          {quickFeedback.map((item) => (
            <button
              key={item}
              className="chip"
              onClick={() => generate(platform, item)}
              disabled={Boolean(loadingMode) || !content[platform]}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="feedback-row">
          <input
            value={feedback[platform]}
            onChange={(e) =>
              setFeedback((current) => ({
                ...current,
                [platform]: e.target.value,
              }))
            }
            placeholder="Custom change: e.g. use my promotion experience but keep it subtle"
          />
          <button
            className="secondary"
            onClick={() => generate(platform)}
            disabled={Boolean(loadingMode) || !content[platform]}
            type="button"
          >
            <WandSparkles size={15} />
            Apply
          </button>
        </div>

        <div className="card-actions">
          <button
            className="secondary"
            onClick={() => generate(platform)}
            disabled={Boolean(loadingMode) || !topic.trim()}
            type="button"
          >
            <RefreshCw size={15} />
            {isLoading ? "Regenerating…" : `Regenerate ${label}`}
          </button>
          <button
            className={`approve ${approval[platform] ? "approved" : ""}`}
            onClick={() => toggleApproval(platform)}
            disabled={!content[platform]}
            type="button"
          >
            <Check size={15} />
            {approval[platform] ? "Approved" : "Approve"}
          </button>
        </div>
      </article>
    );
  };

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <h1>Post Studio</h1>
            <p>Anurag&apos;s LinkedIn + X content copilot</p>
          </div>
        </div>
        <span className="badge">Nothing posts without your approval</span>
      </header>

      <section className="card composer">
        <label className="section-label" htmlFor="topic">
          What do you want to post about?
        </label>
        <input
          id="topic"
          className="topic-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Why learning every Data Engineering tool is a mistake"
        />

        <textarea
          className="notes-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional: your opinion, experience, numbers, source, story, or points that must be included..."
        />

        <div className="action-row">
          <div className="image-choice">
            <span className="section-label inline-label">Image</span>
            {(["generate", "none", "upload"] as const).map((choice) => (
              <button
                key={choice}
                className={`choice ${imageChoice === choice ? "active" : ""}`}
                onClick={() => setImageMode(choice)}
                type="button"
              >
                {choice === "generate"
                  ? "AI generate"
                  : choice === "none"
                    ? "No image"
                    : "Upload mine"}
              </button>
            ))}
            <input
              ref={uploadRef}
              className="hidden-input"
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
          </div>

          <button
            className="primary"
            onClick={() => generate("both")}
            disabled={Boolean(loadingMode) || !topic.trim()}
            type="button"
          >
            <Sparkles size={16} />
            {loadingMode === "both" ? "Generating…" : "Generate LinkedIn + X"}
          </button>
        </div>

        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="editor-grid">
        {platformCard("linkedin")}
        {platformCard("x")}
      </section>

      {hasDrafts ? (
        <section className="card context-card">
          <button
            className="context-toggle"
            onClick={() => setContextOpen((current) => !current)}
            type="button"
          >
            <span>
              Personal context used
              <small>
                {content.contextUsed.length
                  ? ` ${content.contextUsed.length} approved profile reference(s)`
                  : " No personal profile facts were required"}
              </small>
            </span>
            {contextOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </button>

          {contextOpen ? (
            <div className="context-body">
              {content.contextUsed.length ? (
                content.contextUsed.map((item) => (
                  <span className="context-pill" key={item}>
                    <Check size={13} /> {item}
                  </span>
                ))
              ) : (
                <p>
                  This draft was written from the topic and your notes without forcing
                  personal experience into it.
                </p>
              )}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="card media-card">
        <div className="platform-head">
          <div className="platform-name">
            <ImageIcon size={18} /> Media
          </div>
          <span className="platform-meta">Review the visual before publishing</span>
        </div>

        <div className="media-grid">
          <div>
            <label className="section-label" htmlFor="image-concept">
              Image concept / prompt
            </label>
            <textarea
              id="image-concept"
              className="image-concept-editor"
              value={content.imageConcept}
              onChange={(e) =>
                setContent((current) => ({
                  ...current,
                  imageConcept: e.target.value,
                }))
              }
              placeholder="The suggested visual direction will appear here. You can edit it before image generation."
            />

            <div className="media-actions">
              {imageChoice === "generate" ? (
                <button
                  className="secondary"
                  onClick={generateImage}
                  disabled={!content.imageConcept.trim() || imageLoading}
                  type="button"
                >
                  <Sparkles size={15} />
                  {imageLoading ? "Generating image…" : imageUrl ? "Regenerate image" : "Generate image"}
                </button>
              ) : null}

              {imageChoice === "upload" ? (
                <button
                  className="secondary"
                  onClick={() => uploadRef.current?.click()}
                  type="button"
                >
                  <Upload size={15} /> Choose image
                </button>
              ) : null}

              {uploadedImageName ? (
                <span className="file-name">{uploadedImageName}</span>
              ) : null}
            </div>
          </div>

          <div className="image-preview">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="Selected social post visual" />
            ) : (
              <span>
                {imageChoice === "none"
                  ? "Text-only post selected."
                  : imageChoice === "upload"
                    ? "Choose one of your own images."
                    : "Generated image preview will appear here."}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className={`publish-strip ${readyToPublish ? "ready" : ""}`}>
        <div>
          <strong>{readyToPublish ? "Content approved" : "Review before publishing"}</strong>
          <span>
            {readyToPublish
              ? "Both platform drafts are approved. OAuth publishing comes in the next milestone."
              : "Approve LinkedIn and X independently. Editing a draft removes its approval."}
          </span>
        </div>
        <button className="publish-disabled" disabled type="button">
          Publish both
        </button>
      </div>
    </main>
  );
}
