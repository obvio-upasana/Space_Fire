"use client";
import { useState } from "react";
import { sources } from "../../../lib/demo";
import { PageHeading, Icon, Badge, EmptyState } from "../../../components/ui";
export default function SourcesPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All sources");
  const filtered = sources.filter(
    (s) =>
      (s.title + " " + s.program + " " + s.author)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (type === "All sources" || s.type === type),
  );
  return (
    <>
      <PageHeading
        kicker="BACK TO THE ORIGINAL"
        title="Every question has a source."
        description="Original NASA investigations, publications and program context, ready to review."
      />
      <div className="source-summary">
        <div>
          <strong>38</strong>
          <span>Archive source records</span>
        </div>
        <div>
          <strong>23</strong>
          <span>Research & overview PDFs</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Selected PSI investigations</span>
        </div>
      </div>
      <div className="library-toolbar">
        <label className="search-field">
          <Icon name="search" size={18} />
          <input
            aria-label="Search original sources"
            placeholder="Find a publication, program or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          className="input"
          aria-label="Source type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {["All sources", "PDF", "Article", "Dataset"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <p className="field-note" style={{ margin: "24px 0 12px" }}>
        {filtered.length} featured references · Latest source review: 14 October
        2026
      </p>
      <div className="source-list">
        {filtered.map((s) => (
          <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
            <span className="file-symbol">
              <Icon
                name={s.type === "Dataset" ? "database" : "file"}
                size={19}
              />
            </span>
            <div>
              <strong>{s.title}</strong>
              <small>
                {s.author} · {s.program} · {s.year}
              </small>
              <small>{s.status}</small>
            </div>
            <Badge tone="neutral">{s.type}</Badge>
            <Icon name="external" size={16} />
          </a>
        ))}
      </div>
      {!filtered.length && (
        <EmptyState
          title="No source matches yet."
          description="Try another program or clear the search."
        />
      )}
      <p className="archive-note">
        This view features selected references. The archive count includes
        additional records, metadata and links; it does not mean every paper has
        full text.
      </p>
    </>
  );
}
