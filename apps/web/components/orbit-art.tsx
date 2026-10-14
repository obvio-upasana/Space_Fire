"use client";
import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
gsap.registerPlugin(useGSAP);
export function OrbitArt({light=false}:{light?:boolean}) {
  const root=useRef<HTMLDivElement>(null);
  useGSAP(()=>{
    const media=gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.to(".orbit-plane",{rotation:360,transformOrigin:"50% 50%",duration:32,repeat:-1,ease:"none"});
      gsap.to(".orbit-particle",{rotation:-360,svgOrigin:"180 180",duration:12,repeat:-1,ease:"none",stagger:2});
      gsap.to(".orbit-nucleus",{scale:1.16,svgOrigin:"180 180",duration:3,yoyo:true,repeat:-1,ease:"sine.inOut"});
    },root);
    return()=>media.revert();
  },{scope:root});
  return <div ref={root} className={`orbit-stage ${light?"light":""}`} aria-hidden="true"><svg viewBox="0 0 360 360" className="orbit-svg"><g className="orbit-plane" fill="none" stroke="currentColor" strokeWidth=".8"><ellipse cx="180" cy="180" rx="150" ry="58"/><ellipse cx="180" cy="180" rx="150" ry="58" transform="rotate(60 180 180)"/><ellipse cx="180" cy="180" rx="150" ry="58" transform="rotate(120 180 180)"/></g><g fill="currentColor"><circle className="orbit-particle" cx="324" cy="180" r="3"/><circle className="orbit-particle" cx="130" cy="120" r="2.5"/><circle className="orbit-particle" cx="96" cy="260" r="3"/><circle className="orbit-nucleus" cx="180" cy="180" r="12"/></g><circle cx="180" cy="180" r="22" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".4"/></svg></div>;
}
