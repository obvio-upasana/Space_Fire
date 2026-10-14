"use client";
import {useState} from "react";
import {Icon} from "./ui";
import {saveNote,useSaved,toggleSaved} from "../lib/research-state";
export function ResearchActions({id,title,body}:{id:string;title:string;body:string}) {
  const saved=useSaved();const [noted,setNoted]=useState(false);
  return <div className="row"><button className="button secondary" onClick={()=>toggleSaved("experiment:"+id)}><Icon name={saved.includes("experiment:"+id)?"check":"bookmark"} size={16}/>{saved.includes("experiment:"+id)?"Saved study":"Save study"}</button><button className="button secondary" onClick={()=>{saveNote({title,body});setNoted(true);}} disabled={noted}><Icon name={noted?"check":"file"} size={16}/>{noted?"Saved to notes":"Make a note"}</button></div>;
}
