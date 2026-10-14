"use client";
import {useState,useRef,useEffect,type ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Brand,Icon,type IconName} from "./ui";
gsap.registerPlugin(useGSAP);
export const navigation: {href:string;label:string;icon:IconName;group:string}[] = [
  {href:"/dashboard",label:"Overview",icon:"grid",group:"Research"},
  {href:"/experiments",label:"Experiment library",icon:"flask",group:"Research"},
  {href:"/assistant",label:"Ask the evidence",icon:"chat",group:"Research"},
  {href:"/compare",label:"Compare experiments",icon:"compare",group:"Analysis"},
  {href:"/rankings",label:"Risk explorer",icon:"chart",group:"Analysis"},
  {href:"/missions",label:"Mission matcher",icon:"compass",group:"Analysis"},
  {href:"/programs",label:"Program map",icon:"atom",group:"Discover"},
  {href:"/insights",label:"Insight collection",icon:"bolt",group:"Discover"},
  {href:"/sources",label:"Source archive",icon:"book",group:"Discover"},
  {href:"/saved",label:"Saved research",icon:"bookmark",group:"Workspace"},
  {href:"/trust",label:"Evidence & limits",icon:"shield",group:"Workspace"},
];
export function WorkspaceShell({children}:{children:ReactNode}) {
  const pathname=usePathname();const [collapsed,setCollapsed]=useState(false);const [mobileOpen,setMobileOpen]=useState(false);const root=useRef<HTMLDivElement>(null);
  const current=navigation.find(n=>pathname.startsWith(n.href));
  useGSAP(()=>{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)gsap.from(".workspace-page",{y:10,opacity:0,duration:.35,ease:"power2.out"});},{scope:root,dependencies:[pathname],revertOnUpdate:true});
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setMobileOpen(false);};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[]);
  return <div ref={root} className={`workspace-layout ${collapsed?"is-collapsed":""}`}>
    <a className="skip-link" href="#workspace-content">Skip to content</a>
    {mobileOpen&&<button className="sidebar-scrim" onClick={()=>setMobileOpen(false)} aria-label="Close navigation"/>}
    <aside className={`workspace-sidebar ${mobileOpen?"mobile-open":""}`}>
      <div className="sidebar-brand"><Brand compact={collapsed}/><button className="icon-button" title={collapsed?"Expand sidebar":"Collapse sidebar"} aria-label={collapsed?"Expand sidebar":"Collapse sidebar"} onClick={()=>setCollapsed(!collapsed)}><Icon name="sidebar" size={17}/></button></div>
      <Link href="/assistant" className="new-question" onClick={()=>setMobileOpen(false)} title="New research question"><Icon name="plus" size={17}/><span>New question</span><span className="mono">↗</span></Link>
      <nav aria-label="Workspace navigation">{["Research","Analysis","Discover","Workspace"].map(group=><div className="nav-group" key={group}><p className="nav-label mono">{group}</p>{navigation.filter(n=>n.group===group).map(n=><Link key={n.href} href={n.href} title={n.label} onClick={()=>setMobileOpen(false)} className={`sidebar-link ${pathname.startsWith(n.href)?"active":""}`} aria-current={pathname.startsWith(n.href)?"page":undefined}><Icon name={n.icon} size={19}/><span>{n.label}</span>{n.href==="/assistant"&&<span className="nav-new mono">AI</span>}</Link>)}</div>)}</nav>
      <div className="sidebar-bottom"><Link href="/trust" className="sidebar-hint"><Icon name="play" size={18}/><span>You're exploring a demo.<small>Original sources. Illustrative analysis.</small></span></Link><Link href="/settings" className="profile-row" onClick={()=>setMobileOpen(false)}><span className="avatar">TS</span><span>Tanveer Singh<small>Research workspace</small></span><Icon name="settings" size={16}/></Link></div>
    </aside>
    <div className="workspace-surface"><header className="workspace-header"><div className="row"><button className="icon-button workspace-menu" aria-label="Open navigation" onClick={()=>setMobileOpen(true)}><Icon name="menu"/></button><span className="header-breadcrumb">Workspace <Icon name="next" size={12}/><strong>{current?.label??"Settings"}</strong></span></div><div className="row"><span className="demo-chip mono">DEMO DATA</span><Link className="icon-button" href="/experiments" aria-label="Search experiments"><Icon name="search" size={19}/></Link><details className="notification-menu"><summary className="icon-button" aria-label="Notifications"><Icon name="bell" size={19}/></summary><div className="notification-pop"><p className="eyebrow">WORKSPACE ACTIVITY</p><h3>Your research desk is ready.</h3><p>Explore the library, try a comparison or open a demo conversation.</p><Link href="/sources" className="text-link">View the source archive <Icon name="right" size={14}/></Link></div></details><Link href="/settings" className="avatar" aria-label="Open profile settings">TS</Link></div></header><main id="workspace-content" className="workspace-content"><div className="workspace-page">{children}</div></main></div>
  </div>;
}
