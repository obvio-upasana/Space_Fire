import { HomeNav } from "../components/home-nav";
import { LandingMotion } from "../components/landing-motion";
import { ButtonLink, Icon } from "../components/ui";
import { HomeContent } from "../components/home-content";
import { OrbitArt } from "../components/orbit-art";

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
            <ButtonLink href="/assistant">Open your research desk</ButtonLink>
            <ButtonLink href="/assistant" secondary>Ask the evidence</ButtonLink>
          </div>
          <p className="hero-note hero-enter">For curious minds, researchers and the next generation of explorers.</p>
          <div className="hero-visual hero-enter" aria-hidden="true">
            <OrbitArt light />
          </div>
        </div>
        <div className="hero-baseline mono"><a href="#science">SCROLL TO EXPLORE <Icon name="down" size={14} /></a><span>IGNITION → SPREAD → EXTINCTION</span></div>
      </section>
      <HomeContent />
    </main>
  </LandingMotion>;
}
