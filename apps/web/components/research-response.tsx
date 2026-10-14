"use client";
import { useId, useState, type ReactNode } from "react";
import { FlameScene } from "./flame-scene";
import { Icon } from "./ui";
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
}: {
  children: ReactNode;
  initialView?: View;
  cool?: boolean;
}) {
  const panelId = useId();
  const [view, setView] = useState<View>(initialView);
  const [scenario, setScenario] = useState<FlameScenario>({
    ...defaultScenario,
    ...(cool ? { sample: "droplet" as const, cool: true } : {}),
  });
  const [paused, setPaused] = useState(false);
  const [left, setLeft] = useState<Environment>("moon");
  const [right, setRight] = useState<Environment>("mars");
  function update<K extends keyof FlameScenario>(
    key: K,
    value: FlameScenario[K],
  ) {
    setScenario((s) => ({ ...s, [key]: value }));
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
      <div
        className="research-view-body"
        role="tabpanel"
        id={panelId + "-panel"}
        aria-labelledby={panelId + "-" + view}
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
                  <select
                    aria-label={item.label}
                    value={item.value}
                    onChange={(e) => item.set(e.target.value as Environment)}
                  >
                    {Object.entries(environments).map(([id, environment]) => (
                      <option key={id} value={id}>
                        {environment.label}
                      </option>
                    ))}
                  </select>
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
            <div className="simulation-heading">
              <div>
                <h2>Explore the conditions.</h2>
                <p>Interactive 3D illustration · no calculated safety limits</p>
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
                  <select
                    value={scenario.environment}
                    aria-label="Simulation environment"
                    onChange={(e) =>
                      update("environment", e.target.value as Environment)
                    }
                  >
                    {Object.entries(environments).map(([id, e]) => (
                      <option key={id} value={id}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Sample</span>
                  <select
                    value={scenario.sample}
                    aria-label="Simulation sample"
                    onChange={(e) => {
                      const sample = e.target.value as FlameScenario["sample"];
                      setScenario((s) => ({
                        ...s,
                        sample,
                        cool: sample === "droplet" ? s.cool : false,
                      }));
                    }}
                  >
                    <option value="fabric">Fabric sample</option>
                    <option value="pmma">PMMA solid</option>
                    <option value="droplet">Liquid fuel droplet</option>
                  </select>
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
                    onChange={(e) =>
                      setScenario((s) => ({
                        ...s,
                        cool: e.target.checked,
                        sample: e.target.checked ? "droplet" : s.sample,
                      }))
                    }
                  />
                  <span>
                    Cool-flame concept
                    <small>Switches to a liquid fuel droplet</small>
                  </span>
                </label>
                <button
                  type="button"
                  className="simulation-reset"
                  onClick={() => {
                    setScenario(defaultScenario);
                    setPaused(false);
                  }}
                >
                  Reset conditions
                </button>
              </div>
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
                  ? "FLEX observed continued low-temperature droplet combustion after visible flame extinction. The faint shell marks a concept; it does not model reaction chemistry."
                  : scenario.environment === "iss"
                    ? "Without ordinary buoyant circulation, forced ventilation and diffusion matter. This view illustrates geometry changes; it does not predict spread speed or extinction."
                    : "Moon and Mars gravity differ. A shape illustration cannot establish the flammability of a material under those conditions."}
              </p>
              <p className="simulation-limit">
                Oxygen, pressure and airflow are user-selected inputs. Pressure
                is recorded for context; no transport, heat transfer or reaction
                kinetics are solved. Material-specific behavior requires
                validated experiment data.
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
