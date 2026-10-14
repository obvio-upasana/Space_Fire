"use client";
import {useState,useRef,useEffect,type FormEvent} from "react";
import Link from "next/link";
import {Icon,Badge} from "./ui";
import {sources} from "../lib/demo";
import {saveNote} from "../lib/research-state";

type ResearchMode = "Explain" | "Compare" | "Mission match" | "Research brief";
interface Message { id:number; role:"user"|"assistant"; text:string; title?:string; citations:string[]; mode:ResearchMode; }
const suggestions = [
  ["How does airflow change a flame in microgravity?","Explain"],
  ["Compare BASS-II and Saffire research.","Compare"],
  ["What evidence applies to a lunar habitat?","Mission match"],
  ["Make a research brief on smoke detection.","Research brief"],
] as const;
const steps = ["Finding relevant sources","Reading experimental conditions","Connecting the evidence","Preparing a cited response"];
function respond(question:string,mode:ResearchMode):{title:string;text:string;citations:string[]} {
  const q=question.toLowerCase();
  if(q.includes("moon")||q.includes("lunar")||mode==="Mission match")return {title:"Keep the environment in the comparison.",text:"An ISS experiment is a starting point, not a direct prediction for a lunar habitat.\n\nSeparate gravity, oxygen concentration, total pressure, airflow and material geometry. Then look for studies that actually test those conditions.\n\nThe partial-gravity publications and BASS-II investigation are useful research starting points. Where a condition is not covered, preserve that evidence gap rather than inferring a safety limit.",citations:["S04","S01"]};
  if(q.includes("smoke")||q.includes("detect"))return {title:"Look beyond the visible flame.",text:"Smoke detection asks a different question from flame spread. Particle size, material and the way smoke moves through an enclosed environment matter to the evidence you choose.\n\nStart with the SAME research and the low-gravity smoke-particulate report. Keep detector behavior separate from material-flammability results when assembling the brief.\n\nResearch next: identify the tested material, the particle metric and the actual detector conditions in the original paper.",citations:["S07","S05"]};
  if(mode==="Compare"||q.includes("saffire"))return {title:"Compare the question before the result.",text:"BASS-II focuses on solid fuels in low-velocity forced flows. Saffire explores fire at larger scale inside an uncrewed spacecraft.\n\nBASS-II: begin with material, sample geometry, flow direction and oxygen.\nSaffire: keep the sample scale and enclosed vehicle conditions visible.\n\nUse the studies together for context, but do not turn those differences into an unqualified cross-program risk ranking.",citations:["S01","S03"]};
  if(q.includes("airflow")||q.includes("ventilation"))return {title:"Ventilation belongs beside the finding.",text:"In microgravity, the absence of buoyant flow changes how oxygen and heat reach a flame. Forced ventilation becomes part of the experimental environment.\n\nFor BASS and BASS-II, distinguish opposed flow from concurrent flow. Keep airflow, oxygen, material and geometry alongside any spread or extinction observation.\n\nA higher or lower setting is not automatically a safety result. The relevant comparison comes from the measured outcome under matching conditions.",citations:["S01","S02","S05"]};
  return {title:"A useful question starts with its conditions.",text:"Start by identifying the material, gravity level, oxygen, pressure and ventilation behind this question.\n\nThe archive links below can help locate the relevant research. Check the original test conditions and measured outcomes before drawing a conclusion.\n\nThis preview has no live retrieval. It cannot establish a new numerical or fire-safety answer for an arbitrary question.",citations:["S01","S05"]};
}

export function AiDesk() {
  const [input,setInput]=useState("");
  const [mode,setMode]=useState<ResearchMode>("Explain");
  const [messages,setMessages]=useState<Message[]>([]);
  const [phase,setPhase]=useState(-1);
  const [expanded,setExpanded]=useState(true);
  const [saved,setSaved]=useState<number[]>([]);
  const [copied,setCopied]=useState<number|null>(null);
  const [attachment,setAttachment]=useState("");
  const [copyError,setCopyError]=useState("");
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const fileInput=useRef<HTMLInputElement>(null);
  const bottom=useRef<HTMLDivElement>(null);
  const busy=phase>=0&&phase<4;
  function cancel(){timers.current.forEach(clearTimeout);timers.current=[];setPhase(-1);}
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  useEffect(()=>{
    const reset=()=>{timers.current.forEach(clearTimeout);timers.current=[];setMessages([]);setPhase(-1);setInput("");setSaved([]);};
    window.addEventListener("flameatlas-new-question",reset);
    return()=>window.removeEventListener("flameatlas-new-question",reset);
  },[]);
  useEffect(()=>{bottom.current?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});},[messages,phase]);
  function send(question=input,selectedMode=mode) {
    if(!question.trim()||busy)return;
    const id=Date.now();
    setMessages(previous=>[...previous,{id,role:"user",text:question.trim(),citations:[],mode:selectedMode}]);
    setInput("");setMode(selectedMode);setPhase(0);setExpanded(true);setAttachment("");
    for(let i=1;i<=4;i++)timers.current.push(setTimeout(()=>{
      setPhase(i);
      if(i===4){const answer=respond(question,selectedMode);setMessages(previous=>[...previous,{id:id+1,role:"assistant",mode:selectedMode,...answer}]);}
    },i*650));
  }
  function submit(event:FormEvent){event.preventDefault();send();}
  async function copy(message:Message) {
    try{await navigator.clipboard.writeText(message.title+"\n\n"+message.text);setCopied(message.id);setCopyError("");}
    catch{setCopyError("Clipboard access is unavailable. You can select and copy the response text.");}
  }
  function note(message:Message) {
    saveNote({title:message.title??"Research response",body:message.text,sourceIds:message.citations});
    setSaved(previous=>[...previous,message.id]);
  }
  return <section className={messages.length?"ai-desk has-conversation":"ai-desk"}>
    {!messages.length&&<div className="ai-welcome"><div className="ai-emblem"><Icon name="fire" size={28}/></div><p className="eyebrow">YOUR AI RESEARCH DESK</p><h1>What would you like<br/>to understand?</h1><p>Ask a question. Connect the research. Follow the source.</p></div>}
    {!!messages.length&&<div className="conversation-heading"><Link href="/sources" className="text-link">Research desk <Icon name="next" size={13}/> Original evidence</Link><button className="icon-button" title="New question" aria-label="Start a new question" onClick={()=>window.dispatchEvent(new Event("flameatlas-new-question"))}><Icon name="plus"/></button></div>}
    <div className="chat-messages" aria-live="polite">{messages.map(message=>message.role==="user"?<div className="user-message" key={message.id}><span className="avatar">TS</span><p>{message.text}</p></div>:<article className="ai-message" key={message.id}><div className="row"><span className="response-mark"><Icon name="fire" size={17}/></span><span className="mono">FLAMEATLAS</span><Badge tone="neutral">{message.mode}</Badge></div><h2>{message.title}</h2>{message.text.split("\n\n").map((paragraph,index)=><p key={index}>{paragraph}</p>)}<div className="response-sources">{message.citations.map(id=>{const source=sources.find(s=>s.id===id);return source?<a key={id} href={source.url} target="_blank" rel="noreferrer"><span className="mono">{id}</span><Icon name={source.type==="Dataset"?"database":"file"} size={15}/><span>{source.title}</span><Icon name="external" size={14}/></a>:null;})}</div><div className="response-actions"><button onClick={()=>copy(message)}><Icon name={copied===message.id?"check":"copy"} size={15}/>{copied===message.id?"Copied":"Copy response"}</button><button onClick={()=>note(message)} disabled={saved.includes(message.id)}><Icon name={saved.includes(message.id)?"check":"file"} size={15}/>{saved.includes(message.id)?"Saved to notes":"Save as a note"}</button><Link href="/notes">Open notes <Icon name="external" size={14}/></Link></div></article>)}
      {phase>=0&&<div className="research-activity"><button className="activity-heading" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}><Icon name={busy?"spinner":"check"} size={16} className={busy?"spin":""}/><span>{busy?"Working through the evidence":"Research steps complete"}</span><Icon name={expanded?"chevron":"next"} size={13}/></button>{expanded&&<ol>{steps.map((step,index)=><li key={step} className={index<phase?"complete":index===phase?"current":"pending"}><Icon name={index<phase?"check":index===phase?"spinner":"clock"} size={13} className={index===phase?"spin":""}/><span>{step}</span><small>{index<phase?"Complete":index===phase?"In progress":"Queued"}</small></li>)}</ol>}</div>}
      {copyError&&<p role="status" className="field-note">{copyError}</p>}<div ref={bottom}/>
    </div>
    <div className="composer-area"><form onSubmit={submit} className="ai-composer"><textarea aria-label="Research question" placeholder="Ask about a material, a condition, a mission..." value={input} onChange={event=>setInput(event.target.value)} rows={2} maxLength={4000} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey&&!event.nativeEvent.isComposing){event.preventDefault();send();}}}/>{attachment&&<span className="attachment-chip"><Icon name="file" size={13}/>{attachment}<button type="button" onClick={()=>setAttachment("")} aria-label="Remove attachment"><Icon name="close" size={12}/></button><small>File name only; analysis is unavailable.</small></span>}<div className="composer-toolbar"><div className="row"><button type="button" className="icon-button" aria-label="Attach a reference file" onClick={()=>fileInput.current?.click()}><Icon name="clip" size={18}/></button><input type="file" ref={fileInput} hidden accept=".pdf,.txt,.csv,.xlsx" onChange={e=>setAttachment(e.target.files?.[0]?.name??"")}/><label className="mode-label"><Icon name="sliders" size={15}/><select value={mode} aria-label="Research mode" onChange={e=>setMode(e.target.value as ResearchMode)}>{["Explain","Compare","Mission match","Research brief"].map(value=><option key={value}>{value}</option>)}</select></label></div>{busy?<button type="button" onClick={cancel} className="stop-button">Stop</button>:<button type="submit" disabled={!input.trim()} className="send-button" aria-label="Send question"><Icon name="up" size={18}/></button>}</div></form>
    {!messages.length&&<div className="prompt-grid">{suggestions.map(([question,selectedMode])=><button key={question} onClick={()=>send(question,selectedMode)}><span>{question}</span><Icon name="external" size={15}/></button>)}</div>}
    <p className="composer-footnote">Ground your question in the conditions. <Link href="/trust">Evidence & limits</Link></p></div>
  </section>;
}
