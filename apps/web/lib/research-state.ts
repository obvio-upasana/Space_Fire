"use client";
import {useSyncExternalStore} from "react";

export interface ResearchNote { id:string; title:string; body:string; sourceIds:string[]; createdAt:string; }
const memory = new Map<string,string>();
const NOTES = "flameatlas-notes";
const SAVED = "flameatlas-saved";
const EVENT = "flameatlas-storage";

function read(key:string):string {
  try { return window.localStorage.getItem(key) ?? memory.get(key) ?? "[]"; }
  catch { return memory.get(key) ?? "[]"; }
}
function write(key:string,value:unknown) {
  const raw=JSON.stringify(value);
  memory.set(key,raw);
  try { window.localStorage.setItem(key,raw); }
  catch { /* Browser storage disabled: retain the research in memory for this session. */ }
  window.dispatchEvent(new Event(EVENT));
}
function subscribe(callback:()=>void) {
  window.addEventListener(EVENT,callback);
  window.addEventListener("storage",callback);
  return ()=>{window.removeEventListener(EVENT,callback);window.removeEventListener("storage",callback);};
}
function parse(raw:string):unknown { try{return JSON.parse(raw);}catch{return [];} }
function strings(raw:string):string[] {
  const value=parse(raw);
  return Array.isArray(value)?value.filter((item:unknown):item is string=>typeof item==="string"):[];
}
function isNote(value:unknown):value is ResearchNote {
  if(typeof value!=="object"||value===null)return false;
  const note=value as Record<string,unknown>;
  return typeof note.id==="string"&&typeof note.title==="string"&&typeof note.body==="string"&&typeof note.createdAt==="string"&&Array.isArray(note.sourceIds)&&note.sourceIds.every((id:unknown)=>typeof id==="string");
}
function notes(raw:string):ResearchNote[] {const value=parse(raw);return Array.isArray(value)?value.filter(isNote):[];}
export function useNotes() {
  const raw=useSyncExternalStore(subscribe,()=>read(NOTES),()=>"[]");
  return notes(raw);
}
export function saveNote(input:{title:string;body:string;sourceIds?:string[]},id?:string) {
  const current=notes(read(NOTES));
  const note:ResearchNote={id:id??crypto.randomUUID(),title:input.title,body:input.body,sourceIds:input.sourceIds??[],createdAt:current.find(n=>n.id===id)?.createdAt??new Date().toISOString()};
  write(NOTES,[note,...current.filter(n=>n.id!==note.id)]);
  return note.id;
}
export function deleteNote(id:string){write(NOTES,notes(read(NOTES)).filter(n=>n.id!==id));}
export function useSaved(){const raw=useSyncExternalStore(subscribe,()=>read(SAVED),()=>"[]");return strings(raw);}
export function toggleSaved(id:string){const current=strings(read(SAVED));write(SAVED,current.includes(id)?current.filter(s=>s!==id):[...current,id]);}
