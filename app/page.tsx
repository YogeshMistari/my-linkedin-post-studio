"use client";

import { useMemo, useState } from "react";
import { Check, Image as ImageIcon, RefreshCw, Sparkles } from "lucide-react";
import type { ApprovalState, GeneratedContent, Platform } from "@/lib/types";

const emptyContent: GeneratedContent = {
  linkedin: "",
  x: "",
  imageConcept: "",
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [imageChoice, setImageChoice] = useState<"generate" | "none" | "upload">("generate");
  const [content, setContent] = useState<GeneratedContent>(emptyContent);
  const [approval, setApproval] = useState<ApprovalState>({ linkedin: false, x: false });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const hasDrafts = Boolean(content.linkedin || content.x);
  const linkedinChars = content.linkedin.length;
  const xChars = content.x.length;

  const readyToPublish = useMemo(
    () => approval.linkedin && approval.x && hasDrafts,
    [approval, hasDrafts]
  );

  async function generate() {
    setLoading(true);
    setError("");
    setApproval({ linkedin: false, x: false });
    setImageUrl("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, notes, imageChoice }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");

      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
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
    if (!content.imageConcept) return;
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image generation failed.");
    } finally {
      setImageLoading(false);
    }
  }

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
        <span className="badge">Human-in-the-loop publishing</span>
      </header>

      <section className="card composer">
        <label className="section-label" htmlFor="topic">What do you want to post about?</label>
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
          placeholder="Optional context: your opinion, story, numbers, source link, or points that must be included..."
        />

        <div className="action-row">
          <div className="image-choice">
            <span className="section-label" style={{ margin: 0, marginRight: 4 }}>Image</span>
            {(["generate", "none", "upload"] as const).map((choice) => (
              <button
                key={choice}
                className={`choice ${imageChoice === choice ? "active" : ""}`}
                onClick={() => setImageChoice(choice)}
                type="button"
              >
                {choice === "generate" ? "AI generate" : choice === "none" ? "No image" : "Upload mine"}
              </button>
            ))}
          </div>

          <button className="primary" onClick={generate} disabled={loading || !topic.trim()}>
            {loading ? "Generating…" : "Generate LinkedIn + X"}
          </button>
        </div>

        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="editor-grid">
        <article className="card platform-card">
          <div className="platform-head">
            <div className="platform-name">
              <span className="platform-dot" />
              LinkedIn
            </div>
            <span className="platform-meta">{linkedinChars.toLocaleString()} characters</span>
          </div>

          <textarea
            className="post-editor"
            value={content.linkedin}
            onChange={(e) => updateDraft("linkedin", e.target.value)}
            placeholder="Your LinkedIn draft will appear here."
          />

          <div className="card-actions">
            <button className="secondary" onClick={generate} disabled={loading || !topic.trim()}>
              <RefreshCw size={15} /> Regenerate
            </button>
            <button
              className={`approve ${approval.linkedin ? "approved" : ""}`}
              onClick={() => toggleApproval("linkedin")}
              disabled={!content.linkedin}
            >
              <Check size={15} /> {approval.linkedin ? "Approved" : "Approve"}
            </button>
          </div>
        </article>

        <article className="card platform-card">
          <div className="platform-head">
            <div className="platform-name">
              <span className="platform-dot" style={{ background: "#f5f5f5" }} />
              X
            </div>
            <span className="platform-meta">{xChars.toLocaleString()} characters</span>
          </div>

          <textarea
            className="post-editor"
            value={content.x}
            onChange={(e) => updateDraft("x", e.target.value)}
            placeholder="Your X draft will appear here."
          />

          <div className="card-actions">
            <button className="secondary" onClick={generate} disabled={loading || !topic.trim()}>
              <RefreshCw size={15} /> Regenerate
            </button>
            <button
              className={`approve ${approval.x ? "approved" : ""}`}
              onClick={() => toggleApproval("x")}
              disabled={!content.x}
            >
              <Check size={15} /> {approval.x ? "Approved" : "Approve"}
            </button>
          </div>
        </article>
      </section>

      <section className="card media-card">
        <div className="platform-head">
          <div className="platform-name">
            <ImageIcon size={18} /> Media
          </div>
          <span className="platform-meta">You always approve the image before publishing</span>
        </div>

        <div className="media-grid">
          <div>
            <span className="section-label">Suggested image concept</span>
            <div className="image-concept">
              {content.imageConcept || "Generate the posts first and the visual concept will appear here."}
            </div>
            {imageChoice === "generate" ? (
              <button
                className="secondary"
                onClick={generateImage}
                disabled={!content.imageConcept || imageLoading}
                style={{ marginTop: 12 }}
              >
                <Sparkles size={15} /> {imageLoading ? "Generating image…" : "Generate image"}
              </button>
            ) : null}
          </div>

          <div className="image-preview">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="Generated social post visual" />
            ) : (
              <span>
                {imageChoice === "none"
                  ? "Text-only post selected."
                  : imageChoice === "upload"
                  ? "Upload workflow will be added with persistent storage."
                  : "Generated image preview will appear here."}
              </span>
            )}
          </div>
        </div>
      </section>

      <p className="footer-note">
        {readyToPublish
          ? "Both drafts approved. Publishing connections are the next milestone."
          : "Nothing is published automatically. Approval remains explicit for each platform."}
      </p>
    </main>
  );
}
