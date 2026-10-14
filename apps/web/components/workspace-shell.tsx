"use client";
import {useState,useRef,useEffect,type ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Brand,Icon,type IconName} from "./ui";
gsap.registerPlugin(useGSAP);
export const navigation:{href:string;label:string;icon:IconName}[]=[
 {href:"/assistant",label:"AI research desk",icon:"chat"},
 {href:"/programs",label:"Research programs",icon:"flask"},
 {href:"/sources",label:"Original sources",icon:"book"},
];
export function WorkspaceShell({children}:{children:ReactNode}){
 const pathname=usePathname();const [collapsed,setCollapsed]=useState(false);const [mobileOpen,setMobileOpen]=useState(false);const root=useRef<HTMLDivElement>(null);
 const current=navigation.find(n=>pathname.startsWith(n.href));
 useGSAP(()=>{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)gsap.from(".workspace-page",{y:8,duration:.3,ease:"power2.out"});},{scope:root,dependencies:[pathname],revertOnUpdate:true});
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setMobileOpen(false);};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[]);
 return <div ref={root} className={`workspace-layout ${collapsed?"is-collapsed":""}`}><a className="skip-link" href="#workspace-content">Skip to content</a>{mobileOpen&&<button className="sidebar-scrim" onClick={()=>setMobileOpen(false)} aria-label="Close navigation"/>}<aside className={`workspace-sidebar ${mobileOpen?"mobile-open":""}`}>
 <div className="sidebar-brand"><Brand compact={collapsed}/><button className="icon-button" aria-label={collapsed?"Expand sidebar":"Collapse sidebar"} title={collapsed?"Expand sidebar":"Collapse sidebar"} onClick={()=>setCollapsed(!collapsed)}><Icon name="sidebar" size={17}/></button></div>
 <Link href="/assistant" className="new-question" onClick={()=>{setMobileOpen(false);window.dispatchEvent(new Event("flameatlas-new-question"));}}><Icon name="plus" size={17}/><span>New conversation</span></Link>
 <p className="nav-label">Workspace</p><nav aria-label="Workspace navigation">{navigation.map(n=><Link key={n.href} href={n.href} title={n.label} onClick={()=>setMobileOpen(false)} className={`sidebar-link ${pathname===n.href?"active":""}`} aria-current={pathname===n.href?"page":undefined}><Icon name={n.icon} size={18}/><span>{n.label}</span></Link>)}</nav>
 <div className="sidebar-context"><p>Start with a question.</p><span>Keep the original research<br/>in the conversation.</span></div>
 <div className="sidebar-bottom"><Link href="/trust" className="sidebar-link secondary-nav" title="Evidence and limits"><Icon name="shield" size={17}/><span>Evidence & limits</span></Link><Link href="/login" className="profile-row"><span className="avatar">TS</span><span>Tanveer Singh<small>Personal workspace</small></span><Icon name="chevron" size={14}/></Link></div>
 </aside><div className="workspace-surface"><header className="workspace-header"><div className="row"><button className="icon-button workspace-menu" aria-label="Open navigation" onClick={()=>setMobileOpen(true)}><Icon name="menu"/></button><span className="header-breadcrumb">{current?.label??"Evidence & limits"}</span></div><div className="header-reference"><span className="reference-dot"/><span>NASA research archive</span><Link href="/sources" className="icon-button" aria-label="Search original sources"><Icon name="search" size={18}/></Link></div></header><main id="workspace-content" className="workspace-content"><div className="workspace-page">{children}</div></main></div></div>;
}
