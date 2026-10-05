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
  Send,
} from "lucide-react";
import { creatorConfig } from "@/config/creator.config";
import type {
  ApprovalState,
  ContentGoal,
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
  "Stronger hook",
  "More personal",
  "Build more authority",
  "More save/share worthy",
];

const contentGoals: Array<{
  id: ContentGoal;
  label: string;
  hint: string;
}> = [
  { id: "trust-growth", label: "Trust + Growth", hint: "Best default" },
  { id: "authority", label: "Authority", hint: "Expert positioning" },
  { id: "engagement", label: "Engagement", hint: "Discussion + shares" },
  { id: "education", label: "Educational", hint: "Saves + value" },
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [imageChoice, setImageChoice] = useState<"generate" | "none" | "upload">("generate");
  const [contentGoal, setContentGoal] = useState<ContentGoal>("trust-growth");
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
  const [publishingTarget, setPublishingTarget] = useState<"linkedin" | "x" | "both" | null>(null);
  const [publishMessage, setPublishMessage] = useState("");
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
          contentGoal,
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

  async function publish(target: "linkedin" | "x" | "both") {
    const needsLinkedIn = target === "linkedin" || target === "both";
    const needsX = target === "x" || target === "both";

    if (needsLinkedIn && !approval.linkedin) {
      setError("Approve the LinkedIn draft before publishing it.");
      return;
    }

    if (needsX && !approval.x) {
      setError("Approve the X draft before publishing it.");
      return;
    }

    if (needsX && content.x.length > 280) {
      setError(
        "The X draft is over 280 characters. Shorten it before publishing. Thread publishing is not enabled yet."
      );
      return;
    }

    const label =
      target === "linkedin"
        ? "LinkedIn"
        : target === "x"
          ? "X"
          : "LinkedIn and X";

    const confirmed = window.confirm(
      `Publish this approved draft to ${label} now? This action goes live immediately.`
    );

    if (!confirmed) return;

    setPublishingTarget(target);
    setPublishMessage("");
    setError("");

    const snapshot = {
      topic,
      notes,
      linkedin: content.linkedin,
      x: content.x,
      imageChoice,
      hasImage: Boolean(imageUrl),
      target,
      approvedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        "post-studio:last-approved-draft",
        JSON.stringify(snapshot)
      );

      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          linkedinText: content.linkedin,
          xText: content.x,
          approvals: approval,
          hasImage: Boolean(imageUrl),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Publishing failed.");
      }

      const successes = (data.results || [])
        .filter((item: { success: boolean }) => item.success)
        .map((item: { platform: string; id?: string }) =>
          item.platform === "linkedin"
            ? `LinkedIn${item.id ? ` (${item.id})` : ""}`
            : `X${item.id ? ` (${item.id})` : ""}`
        );

      const failures = (data.results || [])
        .filter((item: { success: boolean }) => !item.success)
        .map((item: { platform: string; error?: string }) =>
          `${item.platform === "linkedin" ? "LinkedIn" : "X"}: ${item.error || "failed"}`
        );

      if (data.allSucceeded) {
        setPublishMessage(
          `Published successfully to ${successes.join(" and ")}.${
            data.warning ? ` ${data.warning}` : ""
          }`
        );
      } else if (data.partialSuccess) {
        setPublishMessage(
          `Published to ${successes.join(" and ")}. The other platform failed, so do not repost the successful one. ${failures.join(" | ")}`
        );
      } else {
        setError(failures.join(" | ") || "Publishing failed.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publishing failed.");
    } finally {
      setPublishingTarget(null);
    }
  }

  const platformCard = (platform: Platform) => {
    const isLinkedIn = platform === "linkedin";
    const label = isLinkedIn ? "LinkedIn" : "X";
    const chars = isLinkedIn ? linkedinChars : xChars;
    const isLoading = loadingMode === platform;
    const overSingleX = !isLinkedIn && chars > 280 && !/^\s*1\//m.test(content.x);

    return (
      <article className={`card platform-card ${isLinkedIn ? "linkedin-card" : "x-card"}`}>
        <div className="platform-head">
          <div className="platform-name">
            <span className={`platform-logo ${isLinkedIn ? "linkedin-logo" : "x-logo"}`}>
              {isLinkedIn ? "in" : "X"}
            </span>
            <span>
              {label}
              <small>{isLinkedIn ? "Professional authority" : "Sharp ideas & reach"}</small>
            </span>
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
          <div className="brand-logo-shell" aria-label={creatorConfig.app.logoAlt}>
            <span className="brand-logo-fallback">DWA</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creatorConfig.app.logoPath}
              alt={creatorConfig.app.logoAlt}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <span className="brand-eyebrow">{creatorConfig.creator.creatorIdentity.brand}</span>
            <h1>{creatorConfig.app.name}</h1>
            <p>{creatorConfig.app.tagline}</p>
          </div>
        </div>

        <div className="topbar-note">
          <span className="status-dot" />
          Local AI ready
        </div>
      </header>

      <section className="hero-panel">
        <span className="hero-kicker">Built for professional creators</span>
        <h2>Build authority. Earn trust. <span>Grow with useful content.</span></h2>
        <p>
          Create LinkedIn and X posts from your real expertise, keep your voice,
          review everything, then publish only what you approve.
        </p>
      </section>

      <section className="card composer">
        <div className="composer-heading">
          <div className="section-icon"><Sparkles size={18} /></div>
          <div>
            <span className="section-label">Create</span>
            <h3>What do you want to be known for today?</h3>
          </div>
        </div>

        <label className="field-label" htmlFor="topic">
          Topic / idea
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

        <div className="goal-section">
          <div className="field-label-row">
            <span className="field-label">Content goal</span>
            <span className="field-help">Changes how the AI frames the post</span>
          </div>
          <div className="goal-grid">
            {contentGoals.map((goal) => (
              <button
                key={goal.id}
                className={`goal-choice ${contentGoal === goal.id ? "active" : ""}`}
                onClick={() => setContentGoal(goal.id)}
                type="button"
              >
                <strong>{goal.label}</strong>
                <span>{goal.hint}</span>
              </button>
            ))}
          </div>
        </div>

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
                  className="secondary image-generate"
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

      <footer className="brand-footer">
        <span>An Initiative by</span>
        <strong>Anurag Srivastava</strong>
        <span>Founder, Data With Anurag</span>
      </footer>

      <div className={`publish-strip ${approval.linkedin || approval.x ? "ready" : ""}`}>
        <div>
          <strong>
            {approval.linkedin || approval.x
              ? "Approved content ready"
              : "Review before publishing"}
          </strong>
          <span>
            {publishMessage
              ? publishMessage
              : "Approve a platform draft to enable its publish button. Editing a draft removes its approval."}
          </span>
        </div>

        <div className="publish-actions">
          <button
            className={approval.linkedin ? "publish-linkedin" : "publish-disabled"}
            disabled={!approval.linkedin || Boolean(publishingTarget)}
            onClick={() => publish("linkedin")}
            type="button"
          >
            <Send size={15} />
            {publishingTarget === "linkedin" ? "Posting…" : "Post LinkedIn"}
          </button>

          <button
            className={approval.x && xChars <= 280 ? "publish-x" : "publish-disabled"}
            disabled={!approval.x || xChars > 280 || Boolean(publishingTarget)}
            onClick={() => publish("x")}
            type="button"
            title={xChars > 280 ? "Shorten the X draft to 280 characters first." : undefined}
          >
            <Send size={15} />
            {publishingTarget === "x" ? "Posting…" : "Post X"}
          </button>

          <button
            className={readyToPublish && xChars <= 280 ? "publish-active" : "publish-disabled"}
            disabled={!readyToPublish || xChars > 280 || Boolean(publishingTarget)}
            onClick={() => publish("both")}
            type="button"
          >
            <Send size={15} />
            {publishingTarget === "both" ? "Posting both…" : "Post Both"}
          </button>
        </div>
      </div>
    </main>
  );
}
