"use client";
import { useId, useState, type ReactNode } from "react";
import { FlameScene } from "./flame-scene";
import { Icon } from "./ui";
import { SelectMenu } from "./select-menu";
import {
  verifiedConditions,
  conditionProvenance,
} from "../lib/verified-conditions";
import {
  defaultScenario,
  environments,
  physicsReferences,
  type Environment,
  type FlameScenario,
} from "../lib/flame-scenarios";
type View = "answer" | "comparison" | "simulation";
export function ResearchResponse({
  children,
  initialView = "answer",
  cool = false,
  standalone = false,
}: {
  children: ReactNode;
  initialView?: View;
  cool?: boolean;
  standalone?: boolean;
}) {
  const panelId = useId();
  const [view, setView] = useState<View>(initialView);
  const [scenario, setScenario] = useState<FlameScenario>({
    ...defaultScenario,
    ...(cool
      ? { environment: "iss" as const, sample: "droplet" as const, cool: true }
      : {}),
  });
  const [paused, setPaused] = useState(false);
  const [recordId, setRecordId] = useState("visual");
  const record = verifiedConditions.find((row) => row["Test #"] === recordId);
  const [left, setLeft] = useState<Environment>("moon");
  const [right, setRight] = useState<Environment>("mars");
  function update<K extends keyof FlameScenario>(
    key: K,
    value: FlameScenario[K],
  ) {
    setScenario((s) => ({
      ...s,
      [key]: value,
      ...(key === "environment" && value !== "iss" ? { cool: false } : {}),
    }));
  }
  const compare = initialView === "comparison";
  const tabs: { id: View; label: string }[] = [
    { id: "answer", label: "Answer" },
    ...(compare
      ? [{ id: "comparison" as const, label: "Environment comparison" }]
      : []),
    { id: "simulation", label: "Simulation" },
  ];
  return (
    <div className="research-response">
      {!standalone && (
        <div
          className="research-view-tabs"
          role="tablist"
          aria-label="Research response view"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={panelId + "-" + tab.id}
              aria-controls={panelId + "-panel"}
              aria-selected={view === tab.id}
              tabIndex={view === tab.id ? 0 : -1}
              onKeyDown={(event) => {
                const index = tabs.findIndex((t) => t.id === tab.id);
                const next =
                  event.key === "ArrowRight"
                    ? (index + 1) % tabs.length
                    : event.key === "ArrowLeft"
                      ? (index + tabs.length - 1) % tabs.length
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? tabs.length - 1
                          : -1;
                if (next < 0) return;
                event.preventDefault();
                const selected = tabs[next]!;
                setView(selected.id);
                document.getElementById(panelId + "-" + selected.id)?.focus();
              }}
              onClick={() => setView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div
        className="research-view-body"
        role={standalone ? "region" : "tabpanel"}
        id={panelId + "-panel"}
        aria-labelledby={standalone ? undefined : panelId + "-" + view}
        aria-label={standalone ? "Simulation" : undefined}
      >
        {view === "answer" && children}
        {view === "comparison" && (
          <div className="environment-comparison">
            <div className="comparison-intro">
              <h2>Two habitats. One set of assumptions.</h2>
              <p>
                Compare gravity while holding the atmosphere and sample
                conditions equal.
              </p>
            </div>
            <div className="comparison-selectors">
              {[
                { value: left, set: setLeft, label: "Environment A" },
                { value: right, set: setRight, label: "Environment B" },
              ].map((item) => (
                <label key={item.label}>
                  <span>{item.label}</span>
                  <SelectMenu
                    label={item.label}
                    value={item.value}
                    onChange={item.set}
                    options={Object.entries(environments).map(([value, e]) => ({
                      value: value as Environment,
                      label: e.label,
                    }))}
                  />
                </label>
              ))}
            </div>
            <div className="environment-columns">
              {[left, right].map((id, index) => (
                <div key={index}>
                  <p>
                    {index === 0 ? "A" : "B"} / {environments[id].label}
                  </p>
                  <strong>{environments[id].gravity}</strong>
                  <span>
                    {id === "iss"
                      ? "Buoyancy-driven flow is largely absent."
                      : "Partial gravity introduces buoyancy; ventilation still matters."}
                  </span>
                </div>
              ))}
            </div>
            <table className="environment-table">
              <caption>
                Shared illustration inputs, not measured habitat specifications
              </caption>
              <tbody>
                {[
                  ["Sample", "Fabric sample"],
                  ["Oxygen", "21%"],
                  ["Pressure", "101 kPa"],
                  ["Forced airflow", "5 cm/s"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="comparison-gap">
              <Icon name="book" size={16} />
              <p>
                Gravity alone cannot tell us which habitat has the greater fire
                risk. We need matched material, atmosphere, geometry and
                measured outcomes.
              </p>
            </div>
            <p className="comparison-scope">
              These are pressurized habitat scenarios, not the Moon’s vacuum or
              Mars’s ambient atmosphere.
            </p>
            <a
              href={physicsReferences.partialGravity}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Read the partial-gravity research
              <Icon name="external" size={13} />
            </a>
          </div>
        )}
        {view === "simulation" && (
          <div className="simulation-panel">
            <div className="simulation-presets">
              <span>Research context</span>
              <SelectMenu
                label="Research record"
                value={recordId}
                options={[
                  { value: "visual", label: "Visual exploration" },
                  ...verifiedConditions.map((row) => ({
                    value: row["Test #"],
                    label: "BASS-II · " + row["Test #"],
                  })),
                ]}
                onChange={(id) => {
                  setRecordId(id);
                  const selected = verifiedConditions.find(
                    (row) => row["Test #"] === id,
                  );
                  setScenario(
                    selected
                      ? {
                          ...defaultScenario,
                          environment: "iss",
                          sample: selected["Fuel Sample Material"].includes(
                            "Nomex",
                          )
                            ? "fabric"
                            : "pmma",
                          oxygen: Number(
                            selected["Calibrated  initial O2 % by vol"],
                          ),
                          airflow: 0,
                          cool: false,
                        }
                      : defaultScenario,
                  );
                }}
              />
              <span className="preset-state">
                {record
                  ? scenario.oxygen ===
                    Number(record["Calibrated  initial O2 % by vol"])
                    ? "Record-linked initial oxygen"
                    : "Edited oxygen · original record below"
                  : "Editable illustration inputs"}
              </span>
            </div>
            <div className="simulation-heading">
              <div>
                <h2>
                  {scenario.cool
                    ? "After visible extinction"
                    : scenario.sample === "droplet"
                      ? "Droplet combustion"
                      : "Solid-fuel flame"}
                </h2>
                <p>Research-informed visual study · not a numerical solver</p>
              </div>
              <button
                type="button"
                onClick={() => setPaused(!paused)}
                aria-pressed={paused}
              >
                <Icon name={paused ? "play" : "clock"} size={13} />
                {paused ? "Play" : "Pause"}
              </button>
            </div>
            <div className="simulation-layout">
              <FlameScene scenario={scenario} paused={paused} />
              <div className="simulation-controls">
                <label>
                  <span>Environment</span>
                  <SelectMenu
                    label="Simulation environment"
                    value={scenario.environment}
                    onChange={(value) => update("environment", value)}
                    options={Object.entries(environments).map(([value, e]) => ({
                      value: value as Environment,
                      label: e.label,
                    }))}
                  />
                </label>
                <label>
                  <span>Sample</span>
                  <SelectMenu
                    label="Simulation sample"
                    value={scenario.sample}
                    onChange={(sample) =>
                      setScenario((s) => ({
                        ...s,
                        sample,
                        cool: sample === "droplet" ? s.cool : false,
                      }))
                    }
                    options={[
                      { value: "fabric", label: "Fabric sample" },
                      { value: "pmma", label: "PMMA solid" },
                      { value: "droplet", label: "Liquid fuel droplet" },
                    ]}
                  />
                </label>
                {[
                  {
                    key: "oxygen" as const,
                    label: "Oxygen",
                    unit: "%",
                    min: 15,
                    max: 40,
                  },
                  {
                    key: "pressure" as const,
                    label: "Pressure",
                    unit: " kPa",
                    min: 50,
                    max: 105,
                  },
                  {
                    key: "airflow" as const,
                    label: "Forced airflow",
                    unit: " cm/s",
                    min: 0,
                    max: 25,
                  },
                ].map((control) => (
                  <label className="simulation-slider" key={control.key}>
                    <span>
                      {control.label}
                      <output>
                        {scenario[control.key]}
                        {control.unit}
                      </output>
                    </span>
                    <input
                      type="range"
                      aria-label={control.label}
                      step={control.key === "pressure" ? 1 : 0.1}
                      min={control.min}
                      max={control.max}
                      value={scenario[control.key]}
                      onChange={(e) =>
                        update(control.key, Number(e.target.value))
                      }
                    />
                  </label>
                ))}
                <label className="cool-flame-toggle">
                  <input
                    type="checkbox"
                    checked={scenario.cool}
                    onChange={(e) => {
                      setRecordId("visual");
                      setScenario((s) => ({
                        ...s,
                        cool: e.target.checked,
                        sample: e.target.checked ? "droplet" : s.sample,
                        environment: e.target.checked ? "iss" : s.environment,
                      }));
                    }}
                  />
                  <span>
                    Cool-flame concept
                    <small>FLEX concept · switches to an ISS droplet</small>
                  </span>
                </label>
                <button
                  type="button"
                  className="simulation-reset"
                  onClick={() => {
                    setScenario(defaultScenario);
                    setRecordId("visual");
                    setPaused(false);
                  }}
                >
                  Reset conditions
                </button>
              </div>
            </div>
            <div className="simulation-evidence">
              <div>
                <p className="eyebrow">INPUT PROVENANCE</p>
                <h3>
                  {record
                    ? "BASS-II record " + record["Test #"]
                    : "Visual exploration"}
                </h3>
                <p>
                  {record
                    ? record["Fuel Sample Material"]
                    : "The controls describe a chosen scenario. They are not measured NASA habitat settings."}
                </p>
              </div>
              {record && (
                <dl>
                  <div>
                    <dt>Initial oxygen · CSV</dt>
                    <dd>{record["Calibrated  initial O2 % by vol"]}%</dd>
                  </div>
                  <div>
                    <dt>Fan display · raw</dt>
                    <dd>{record["Fan display"]}</dd>
                  </div>
                  <div>
                    <dt>Air display · raw</dt>
                    <dd>{record["Air display"]}</dd>
                  </div>
                  <div>
                    <dt>Restrictors · CSV</dt>
                    <dd>{record["Flow restrictor"]}</dd>
                  </div>
                </dl>
              )}
              <p className="input-assumptions">
                Pressure and physical airflow remain editable assumptions. CSV
                fan and air display readings are retained as raw values; they
                are not converted to cm/s in this view.
              </p>
              <a
                href={conditionProvenance.investigation}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Review the original data
                <Icon name="external" size={13} />
              </a>
            </div>
            <div className="simulation-reading">
              <h3>
                {scenario.cool
                  ? "Visible extinction is not the whole story."
                  : scenario.environment === "iss"
                    ? "Look at the flow, not just the shape."
                    : "Keep gravity beside the atmosphere."}
              </h3>
              <p>
                {scenario.cool
                  ? "FLEX observed continued low-temperature droplet combustion after visible flame extinction. The visible flame is removed in this view; continued chemistry is not modeled."
                  : scenario.environment === "iss"
                    ? "Without ordinary buoyant circulation, forced ventilation and diffusion matter. This view illustrates geometry changes; it does not predict spread speed or extinction."
                    : "Moon and Mars gravity differ. A shape illustration cannot establish the flammability of a material under those conditions."}
              </p>
              <p className="simulation-limit">
                Oxygen and pressure are context inputs, with no calibrated
                visual effect. Airflow changes the illustrative plume geometry,
                not a measured burn rate or color threshold. No transport, heat
                transfer or reaction kinetics are solved. Material-specific
                behavior requires validated experiment data.
              </p>
              <a
                href={
                  scenario.cool
                    ? physicsReferences.coolFlames
                    : physicsReferences.bass
                }
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                {scenario.cool
                  ? "Read NASA’s cool-flame findings"
                  : "Review BASS-II experimental conditions"}
                <Icon name="external" size={13} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
