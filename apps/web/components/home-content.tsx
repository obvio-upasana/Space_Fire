"use client";
import { WordReveal } from "./landing-motion";
import { FlameArt, Icon } from "./ui";

export function HomeContent() { return <><ScienceStory /></>; }
function ScienceStory() {
  return <section id="science" className="landing-section science-layout">
    <div><p className="eyebrow">01 / A DIFFERENT KIND OF FIRE</p>
      <WordReveal text="Take away gravity. Change everything we know about a flame." />
      <p className="section-copy">On Earth, hot air rises. In microgravity, a flame follows different rules. Material, oxygen and ventilation become a story worth understanding together.</p>
      <div className="science-labels mono"><span>EARTH / BUOYANCY</span><Icon name="right" size={16} /><span>SPACE / DIFFUSION</span></div>
    </div>
    <div className="reveal-up"><FlameArt /><p className="science-caption mono">ILLUSTRATED DIFFUSION FIELD · NOT A SIMULATION</p></div>
  </section>;
}
