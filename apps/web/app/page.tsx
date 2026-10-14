import { HomeNav } from "../components/home-nav";
import { LandingMotion } from "../components/landing-motion";
import { ButtonLink, Icon } from "../components/ui";
import { HomeContent } from "../components/home-content";

export default function Home() {
  return <LandingMotion>
    <HomeNav />
    <main id="main-content">
      <section className="landing-hero">
        <div className="hero-content">
          <p className="hero-topline hero-enter">FIRE SCIENCE, BEYOND EARTH.</p>
          <h1 className="hero-title hero-enter">Fire behaves<br />differently here.</h1>
          <p className="hero-copy hero-enter">Decades of microgravity research.<br />A clearer picture of fire safety in space.</p>
          <div className="hero-actions hero-enter">
            <ButtonLink href="/dashboard">Explore the atlas</ButtonLink>
            <ButtonLink href="/assistant" secondary>Ask the evidence</ButtonLink>
          </div>
          <p className="hero-note hero-enter">An independent NASA Space Apps concept · Interactive demo</p>
          <div className="hero-visual hero-enter" aria-hidden="true">
            <div className="hero-orbit" /><div className="hero-orbit" /><div className="hero-orbit" />
            <div className="hero-flame" />
            <span className="hero-coordinate mono">μg / NO BUOYANCY</span>
            <span className="hero-coordinate end mono">01 · DIFFUSION</span>
          </div>
        </div>
        <div className="hero-baseline mono"><a href="#science">SCROLL TO EXPLORE <Icon name="down" size={14} /></a><span>IGNITION → SPREAD → EXTINCTION</span></div>
      </section>
      <HomeContent />
    </main>
  </LandingMotion>;
}
