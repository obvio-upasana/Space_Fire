"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion({children}:{children:ReactNode}) {
  const root=useRef<HTMLDivElement>(null);
  useGSAP(()=>{
    const media=gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)",()=>{
      const lenis=new Lenis({duration:1.1,anchors:true,smoothWheel:true});
      const tick=(time:number)=>lenis.raf(time*1000);
      gsap.ticker.add(tick);
      lenis.on("scroll",ScrollTrigger.update);
      gsap.from(".hero-enter",{y:32,opacity:0,duration:.9,stagger:.1,ease:"power3.out",delay:.1});
      gsap.to(".hero-orbit",{rotation:25,y:-12,duration:7,yoyo:true,repeat:-1,ease:"sine.inOut"});
      gsap.utils.toArray<HTMLElement>(".word-reveal").forEach(element=>{
        gsap.fromTo(element.querySelectorAll(".reveal-word"),{color:"#afbdc7"},{color:"#272b2d",stagger:.15,ease:"none",scrollTrigger:{trigger:element,start:"top 80%",end:"bottom 45%",scrub:1}});
      });
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach(element=>gsap.from(element,{y:32,duration:.8,ease:"power3.out",scrollTrigger:{trigger:element,start:"top 92%",once:true}}));
      let alive=true;
      document.fonts.ready.then(()=>{if(alive)ScrollTrigger.refresh();});
      return ()=>{alive=false;gsap.ticker.remove(tick);lenis.destroy();};
    },root);
    return ()=>media.revert();
  },{scope:root});
  return <div ref={root}>{children}</div>;
}
export function WordReveal({text}:{text:string}) {return <h2 className="word-reveal" aria-label={text}>{text.split(" ").map((word,index)=><span key={index} className="reveal-word" aria-hidden="true">{word} </span>)}</h2>;}
