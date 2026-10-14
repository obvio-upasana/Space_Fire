"use client";
import {useState,useEffect} from "react";
import Link from "next/link";
import {Brand,Icon} from "./ui";
export function HomeNav(){const[open,setOpen]=useState(false);const[scrolled,setScrolled]=useState(false);
  useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>80);scroll();window.addEventListener("scroll",scroll,{passive:true});return()=>window.removeEventListener("scroll",scroll);},[]);
  return <header className={`home-nav ${scrolled?"scrolled":""}`}><Brand/><nav aria-label="Main navigation" className={open?"open":""}><a href="#science" onClick={()=>setOpen(false)}>THE SCIENCE</a><a href="#workflow" onClick={()=>setOpen(false)}>HOW IT WORKS <span>+</span></a><a href="#programs" onClick={()=>setOpen(false)}>THE ARCHIVE</a></nav><div className="nav-actions"><Link href="/login" className="nav-login">Log in</Link><Link href="/dashboard" className="nav-entry">Explore the atlas <Icon name="external" size={15}/></Link><button className="icon-button mobile-menu" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open?"close":"menu"}/></button></div></header>;
}
