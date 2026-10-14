"use client";
import { useState } from "react";
import Link from "next/link";
import { researchPrograms, programSlug } from "../../../lib/program-catalog";
import { PageHeading, Icon } from "../../../components/ui";
export default function ProgramsPage() {
  const [query, setQuery] = useState("");
  const filtered = researchPrograms.filter((program) =>
    (program.name + " " + program.title + " " + program.focus)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="program-gallery">
      <PageHeading
        kicker="NASA COMBUSTION RESEARCH"
        title="Explore the programs."
        description="Choose a program to open its report, recorded tests and original evidence."
      />
      <div className="program-gallery-toolbar">
        <label className="program-search">
          <Icon name="search" size={17} />
          <input
            aria-label="Search programs"
            placeholder="Search a program or research topic..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <span>{filtered.length} programs</span>
      </div>
      <div className="program-card-grid">
        {filtered.map((program) => (
          <Link
            href={"/programs/" + programSlug(program.name)}
            key={program.name}
            className="program-card"
          >
            <div className="program-card-copy">
              <p>{program.platform}</p>
              <h2>
                {program.name}
                <Icon name="external" size={18} />
              </h2>
              <h3>{program.focus}</h3>
              <div>
                <span>
                  {program.tests.length
                    ? program.tests.length + " selected test records"
                    : "Publications & context"}
                </span>
                <span>
                  Open report
                  <Icon name="right" size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="program-gallery-empty">
          <h2>No programs found.</h2>
          <p>Try a material, program name or research topic.</p>
          <button className="button secondary" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
