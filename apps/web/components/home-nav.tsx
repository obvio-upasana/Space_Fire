"use client";
import {useState,useRef} from "react";
import Link from "next/link";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Brand,Icon} from "./ui";
gsap.registerPlugin(useGSAP);

export function HomeNav(){
  const [open,setOpen]=useState(false);
  const header=useRef<HTMLElement>(null);
  useGSAP(()=>{
    const element=header.current;
    if(!element)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const hide=gsap.to(element,{y:-12,autoAlpha:0,duration:.4,ease:"power2.inOut",paused:true});
    let previous=window.scrollY;
    const show=()=>hide.reverse();
    const update=()=>{
      const position=Math.max(0,window.scrollY);
      const hero=document.querySelector<HTMLElement>(".landing-hero");
      element.classList.toggle("scrolled",position>(hero?.offsetHeight??800)-96);
      if(!reduced.matches&&Math.abs(position-previous)>8){
        if(position>96&&position>previous&&!element.contains(document.activeElement)&&!open)hide.play();else show();
      }
      previous=position;
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    element.addEventListener("focusin",show);
    return()=>{window.removeEventListener("scroll",update);element.removeEventListener("focusin",show);};
  },{scope:header,dependencies:[open],revertOnUpdate:true});
  return <header ref={header} className="home-nav"><Brand/><nav aria-label="Main navigation" className={open?"open":""}><a href="#science" onClick={()=>setOpen(false)}>THE SCIENCE</a><a href="#workflow" onClick={()=>setOpen(false)}>HOW IT WORKS</a><a href="#programs" onClick={()=>setOpen(false)}>THE RESEARCH</a></nav><div className="nav-actions"><Link href="/assistant" className="nav-entry">Open FlameAtlas <Icon name="external" size={15}/></Link><button className="icon-button mobile-menu" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open?"close":"menu"}/></button></div></header>;
}
