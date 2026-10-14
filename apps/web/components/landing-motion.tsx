"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const lenis = new Lenis({
            duration: 1.1,
            anchors: true,
            smoothWheel: true,
          });
          const tick = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.from(".hero-enter", {
            y: 24,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
          });
          gsap.utils.toArray<HTMLElement>(".word-reveal").forEach((element) => {
            gsap.fromTo(
              element.querySelectorAll(".reveal-word"),
              { color: "#7c8991" },
              {
                color: "#272b2d",
                stagger: 0.15,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top 85%",
                  end: "top 35%",
                  scrub: 0.5,
                },
              },
            );
          });
          gsap.utils
            .toArray<HTMLElement>(".reveal-up")
            .forEach((element) =>
              gsap.from(element, {
                y: 32,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 92%",
                  once: true,
                },
              }),
            );
          let alive = true;
          document.fonts.ready.then(() => {
            if (alive) ScrollTrigger.refresh();
          });
          return () => {
            alive = false;
            gsap.ticker.remove(tick);
            lenis.destroy();
          };
        },
        root,
      );
      return () => media.revert();
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
export function WordReveal({ text }: { text: string }) {
  return (
    <h2 className="word-reveal" aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="reveal-word" aria-hidden="true">
          {word}{" "}
        </span>
      ))}
    </h2>
  );
}
