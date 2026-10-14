"use client";
import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./ui";
import { BrandMark } from "./brand-mark";
import { sources } from "../lib/demo";

type ResearchMode = "Explain" | "Compare" | "Mission match" | "Research brief";
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  title?: string;
  citations: string[];
  mode: ResearchMode;
}
const suggestions = [
  ["How does airflow change a flame in microgravity?", "Explain"],
  ["Compare BASS-II and Saffire research.", "Compare"],
  ["What evidence applies to a lunar habitat?", "Mission match"],
  ["Make a research brief on smoke detection.", "Research brief"],
] as const;
const steps = [
  "Finding relevant sources",
  "Reading experimental conditions",
  "Connecting the evidence",
  "Preparing a cited response",
];
function respond(
  question: string,
  mode: ResearchMode,
): { title: string; text: string; citations: string[] } {
  const q = question.toLowerCase();
  if (q.includes("moon") || q.includes("lunar") || mode === "Mission match")
    return {
      title: "Keep the environment in the comparison.",
      text: "An ISS experiment is a starting point, not a direct prediction for a lunar habitat.\n\nSeparate gravity, oxygen concentration, total pressure, airflow and material geometry. Then look for studies that actually test those conditions.\n\nThe partial-gravity publications and BASS-II investigation are useful research starting points. Where a condition is not covered, preserve that evidence gap rather than inferring a safety limit.",
      citations: ["S04", "S01"],
    };
  if (q.includes("smoke") || q.includes("detect"))
    return {
      title: "Look beyond the visible flame.",
      text: "Smoke detection asks a different question from flame spread. Particle size, material and the way smoke moves through an enclosed environment matter to the evidence you choose.\n\nStart with the SAME research and the low-gravity smoke-particulate report. Keep detector behavior separate from material-flammability results when assembling the brief.\n\nResearch next: identify the tested material, the particle metric and the actual detector conditions in the original paper.",
      citations: ["S07", "S05"],
    };
  if (mode === "Compare" || q.includes("saffire"))
    return {
      title: "Compare the question before the result.",
      text: "BASS-II focuses on solid fuels in low-velocity forced flows. Saffire explores fire at larger scale inside an uncrewed spacecraft.\n\nBASS-II: begin with material, sample geometry, flow direction and oxygen.\nSaffire: keep the sample scale and enclosed vehicle conditions visible.\n\nUse the studies together for context, but do not turn those differences into an unqualified cross-program risk ranking.",
      citations: ["S01", "S03"],
    };
  if (q.includes("airflow") || q.includes("ventilation"))
    return {
      title: "Ventilation belongs beside the finding.",
      text: "In microgravity, the absence of buoyant flow changes how oxygen and heat reach a flame. Forced ventilation becomes part of the experimental environment.\n\nFor BASS and BASS-II, distinguish opposed flow from concurrent flow. Keep airflow, oxygen, material and geometry alongside any spread or extinction observation.\n\nA higher or lower setting is not automatically a safety result. The relevant comparison comes from the measured outcome under matching conditions.",
      citations: ["S01", "S02", "S05"],
    };
  return {
    title: "A useful question starts with its conditions.",
    text: "Start by identifying the material, gravity level, oxygen, pressure and ventilation behind this question.\n\nThe archive links below can help locate the relevant research. Check the original test conditions and measured outcomes before drawing a conclusion.\n\nThis preview has no live retrieval. It cannot establish a new numerical or fire-safety answer for an arbitrary question.",
    citations: ["S01", "S05"],
  };
}

function Activity({
  phase,
  finished = false,
}: {
  phase: number;
  finished?: boolean;
}) {
  const [expanded, setExpanded] = useState(!finished);
  return (
    <details
      className="agent-activity"
      open={expanded}
      onToggle={(event) => setExpanded(event.currentTarget.open)}
    >
      <summary>
        <span className={finished ? "activity-orb" : "activity-orb working"} />
        <span>{finished ? "Activity · 2.6s" : "Working..."}</span>
        <Icon name="chevron" size={11} />
      </summary>
      <ol>
        {steps.map((step, index) => (
          <li
            key={step}
            className={
              finished || index < phase
                ? "done"
                : index === phase
                  ? "current"
                  : "queued"
            }
          >
            <span className="step-status">
              {finished || index < phase ? (
                <Icon name="check" size={10} />
              ) : index === phase ? (
                <Icon name="spinner" size={12} className="spin" />
              ) : (
                <span />
              )}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </details>
  );
}
export function AiDesk() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ResearchMode>("Explain");
  const [messages, setMessages] = useState<Message[]>([]);
  const [phase, setPhase] = useState(-1);
  const [attachment, setAttachment] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [sourceId, setSourceId] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sequence = useRef(0);
  const thread = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const preview = useRef<HTMLElement>(null);
  const busy = phase >= 0 && phase < 4;
  const source = sources.find((s) => s.id === sourceId);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }
  function reset() {
    clearTimers();
    setMessages([]);
    setPhase(-1);
    setInput("");
    setSourceId(null);
    setAttachment("");
    setError("");
  }
  useEffect(() => {
    const resetConversation = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setMessages([]);
      setPhase(-1);
      setInput("");
      setSourceId(null);
      setAttachment("");
      setError("");
    };
    window.addEventListener("flameatlas-new-question", resetConversation);
    return () => {
      window.removeEventListener("flameatlas-new-question", resetConversation);
      timers.current.forEach(clearTimeout);
    };
  }, []);
  useEffect(() => {
    const textarea = field.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height =
        Math.min(128, Math.max(44, textarea.scrollHeight)) + "px";
    }
  }, [input]);
  useEffect(() => {
    const element = thread.current;
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [messages, phase]);
  useEffect(() => {
    if (!sourceId) return;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    preview.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSourceId(null);
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
      trigger?.focus();
    };
  }, [sourceId]);

  function send() {
    if (!input.trim() || busy) return;
    const question = input.trim(),
      selectedMode = mode,
      id = ++sequence.current;
    clearTimers();
    setError("");
    setMessages((previous) => [
      ...previous,
      { id, role: "user", text: question, citations: [], mode: selectedMode },
    ]);
    setInput("");
    setAttachment("");
    setPhase(0);
    for (let i = 1; i <= 4; i++)
      timers.current.push(
        setTimeout(() => {
          setPhase(i);
          if (i === 4) {
            const answerId = ++sequence.current;
            const answer = respond(question, selectedMode);
            setMessages((previous) => [
              ...previous,
              {
                id: answerId,
                role: "assistant",
                mode: selectedMode,
                ...answer,
              },
            ]);
          }
        }, i * 650),
      );
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    send();
  }
  async function copy(message: Message) {
    try {
      await navigator.clipboard.writeText(
        (message.title ? message.title + "\n\n" : "") + message.text,
      );
      setCopied(message.id);
      setError("");
    } catch {
      setError(
        "Clipboard access is unavailable. Select the response text to copy it.",
      );
    }
  }
  function download(message: Message) {
    const references = message.citations
      .map((id) => sources.find((s) => s.id === id))
      .filter((s) => s !== undefined)
      .map((s) => s.title + ": " + s.url)
      .join("\n");
    const blob = new Blob(
      [
        "# " +
          message.title +
          "\n\n" +
          message.text +
          "\n\nReferences\n" +
          references,
      ],
      { type: "text/markdown" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flameatlas-research.md";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const composer = (
    <div className="agent-composer-area">
      <form className="agent-composer" onSubmit={submit}>
        {attachment && (
          <div className="agent-attachment">
            <Icon name="file" size={14} />
            <span>{attachment}</span>
            <button
              type="button"
              onClick={() => setAttachment("")}
              aria-label="Remove attachment"
            >
              <Icon name="close" size={12} />
            </button>
            <small>File name only</small>
          </div>
        )}
        <textarea
          ref={field}
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a material, experiment or fire-safety question..."
          aria-label="Research question"
          maxLength={4000}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              send();
            }
          }}
        />
        <div className="agent-composer-controls">
          <div>
            <button
              className="agent-control"
              type="button"
              onClick={() => fileInput.current?.click()}
            >
              <Icon name="clip" size={12} />
              Attach
            </button>
            <input
              ref={fileInput}
              type="file"
              hidden
              accept=".pdf,.txt,.csv,.xlsx"
              onChange={(e) => setAttachment(e.target.files?.[0]?.name ?? "")}
            />
            <label className="agent-control">
              <Icon name="sliders" size={12} />
              <select
                aria-label="Research mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as ResearchMode)}
              >
                {["Explain", "Compare", "Mission match", "Research brief"].map(
                  (m) => (
                    <option key={m}>{m}</option>
                  ),
                )}
              </select>
            </label>
            <span className="composer-collection">
              <Icon name="database" size={12} />
              NASA archive
            </span>
          </div>
          {busy ? (
            <button
              className="agent-stop"
              type="button"
              onClick={() => {
                clearTimers();
                setPhase(-1);
              }}
            >
              Stop
            </button>
          ) : (
            <button
              className="agent-send"
              type="submit"
              disabled={!input.trim()}
              aria-label="Send question"
            >
              <Icon name="up" size={14} />
            </button>
          )}
        </div>
      </form>
      {!messages.length && (
        <div className="agent-suggestions">
          {suggestions.map(([question, selectedMode], index) => (
            <button
              key={question}
              type="button"
              onClick={() => {
                setInput(question);
                setMode(selectedMode);
                field.current?.focus();
              }}
            >
              {
                [
                  "Explain airflow",
                  "Compare programs",
                  "Lunar habitat",
                  "Smoke detection",
                ][index]
              }
            </button>
          ))}
        </div>
      )}
      <p className="agent-disclosure">
        Follow the original source. Check important information.{" "}
        <Link href="/trust">Evidence & limits</Link>
      </p>
    </div>
  );

  return (
    <div className={source ? "agent-layout reference-open" : "agent-layout"}>
      <section
        className={
          messages.length ? "agent-chat conversation" : "agent-chat empty"
        }
      >
        {!messages.length ? (
          <div className="agent-start">
            <div className="agent-start-heading">
              <h1>Ask FlameAtlas</h1>
              <p>
                Explore combustion research, compare experimental conditions,
                <br className="desktop-break" /> or follow a question back to
                its original source.
              </p>
            </div>
            {composer}
          </div>
        ) : (
          <>
            <div className="agent-thread-header">
              <button onClick={reset}>
                <Icon name="plus" size={12} />
                New chat
              </button>
              <span>{messages.find((m) => m.role === "user")?.text}</span>
            </div>
            <div className="agent-thread" ref={thread}>
              <div className="agent-thread-inner">
                {messages.map((message) =>
                  message.role === "user" ? (
                    <div className="agent-user" key={message.id}>
                      <p>{message.text}</p>
                      <button
                        aria-label="Copy question"
                        onClick={() => copy(message)}
                      >
                        <Icon
                          name={copied === message.id ? "check" : "copy"}
                          size={11}
                        />
                        {copied === message.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ) : (
                    <article className="agent-answer" key={message.id}>
                      <div className="agent-answer-name">
                        <BrandMark />
                        <strong>FlameAtlas Research</strong>
                        <span>{message.mode}</span>
                      </div>
                      <Activity phase={4} finished />
                      <div className="agent-prose">
                        <h2>{message.title}</h2>
                        {message.text.split("\n\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="agent-source-links">
                        {message.citations.map((id) => {
                          const reference = sources.find((s) => s.id === id);
                          return reference ? (
                            <button key={id} onClick={() => setSourceId(id)}>
                              <Icon
                                name={
                                  reference.type === "Dataset"
                                    ? "database"
                                    : "file"
                                }
                                size={12}
                              />
                              <span>{reference.program}</span>
                              <span className="source-index">{id}</span>
                              <Icon name="external" size={11} />
                            </button>
                          ) : null;
                        })}
                      </div>
                      <div className="agent-answer-actions">
                        <button onClick={() => copy(message)}>
                          <Icon
                            name={copied === message.id ? "check" : "copy"}
                            size={12}
                          />
                          {copied === message.id ? "Copied" : "Copy"}
                        </button>
                        <button onClick={() => download(message)}>
                          <Icon name="download" size={12} />
                          Export response
                        </button>
                      </div>
                    </article>
                  ),
                )}
                {busy && (
                  <div className="agent-answer">
                    <div className="agent-answer-name">
                      <BrandMark />
                      <strong>FlameAtlas Research</strong>
                    </div>
                    <Activity phase={phase} />
                  </div>
                )}
                {error && (
                  <p className="agent-error" role="status">
                    {error}
                  </p>
                )}
              </div>
            </div>
            <div className="agent-bottom-composer">{composer}</div>
          </>
        )}
      </section>
      {source && (
        <aside
          ref={preview}
          className="agent-reference"
          aria-label="Original reference"
        >
          <header>
            <div>
              <Icon name="file" size={16} />
              <span>Source preview</span>
            </div>
            <button
              onClick={() => setSourceId(null)}
              aria-label="Close source preview"
            >
              <Icon name="close" size={16} />
            </button>
          </header>
          <div className="agent-reference-body">
            <p className="eyebrow">
              {source.id} / {source.type}
            </p>
            <h2>{source.title}</h2>
            <p>{source.author}</p>
            <dl>
              <div>
                <dt>Program</dt>
                <dd>{source.program}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>{source.year}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{source.status}</dd>
              </div>
            </dl>
            <div className="reference-original">
              <Icon name="link" size={14} />
              <span>{new URL(source.url).hostname}</span>
            </div>
            <p className="reference-note">
              Open the original to review the complete investigation, methods
              and measured results.
            </p>
            <a
              className="button"
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              Open original source
              <Icon name="external" size={14} />
            </a>
          </div>
        </aside>
      )}
    </div>
  );
}
