"use client";
import {useState} from "react";
import Link from "next/link";
import {programs} from "../../../lib/demo";
import {PageHeading,Icon,Badge} from "../../../components/ui";
export default function ProgramsPage(){
 const [platform,setPlatform]=useState("All platforms");
 return <><PageHeading kicker="THE RESEARCH LANDSCAPE" title="Different studies. One frontier." description="Understand what each program asks, where it runs and what evidence is available."/><div className="segmented">{["All platforms","ISS","Cygnus","Research flights"].map(p=><button key={p} aria-pressed={platform===p} onClick={()=>setPlatform(p)} className={platform===p?"selected":""}>{p}</button>)}</div><div className="program-rows">{programs.filter(p=>platform==="All platforms"||p.platform===platform).map((p,index)=><Link href="/experiments" key={p.name}><span className="mono">{String(index+1).padStart(2,"0")}</span><div><h2>{p.name}</h2><p>{p.long}</p></div><div><span>{p.topic}</span><small>{p.platform} · {p.years}</small></div><Badge tone="neutral">{p.status}</Badge><Icon name="external" size={18}/></Link>)}</div><p className="archive-note">Coverage labels distinguish selected datasets, saved papers and program context. They do not imply complete research coverage.</p></>;
}
