"use client";
import {useState} from "react";
export function LineChart({values=[.8,1.1,1.24,1.4,1.68,1.9],label="Illustrative flame spread"}:{values?:number[];label?:string}) {
  const [active,setActive]=useState<number|null>(null);
  const width=560,height=210,max=Math.max(...values,2.2);
  const points=values.map((v,i)=>({x:44+i*(width-76)/Math.max(values.length-1,1),y:height-28-v/max*(height-58),value:v}));
  return <figure className="line-chart"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${label}. Synthetic demonstration values: ${values.join(", ")}.`}>
    {[0,1,2].map(v=><g key={v}><line x1="44" x2="544" y1={height-28-v/max*(height-58)} y2={height-28-v/max*(height-58)} stroke="#e5e8e9" strokeDasharray="3 5"/><text x="16" y={height-24-v/max*(height-58)} fill="#646d72" fontSize="10">{v}</text></g>)}
    <path d={`M ${points.map(p=>`${p.x},${p.y}`).join(" L ")} L ${points.at(-1)?.x},${height-28} L 44,${height-28} Z`} fill="#eef4f8"/>
    <polyline points={points.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="#185b8c" strokeWidth="2"/>
    {points.map((p,i)=><g key={i} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}><circle cx={p.x} cy={p.y} r="14" fill="transparent"/><circle cx={p.x} cy={p.y} r={active===i?5:3} fill="#185b8c"/>{active===i&&<g><rect x={Math.min(p.x-30,490)} y={p.y-30} width="60" height="22" rx="4" fill="#185b8c"/><text x={Math.min(p.x,520)} y={p.y-15} fill="white" textAnchor="middle" fontSize="10">{p.value.toFixed(2)}</text></g>}</g>)}
    <text x="44" y="205" fill="#646d72" fontSize="9">LOWER OXYGEN</text><text x="544" y="205" fill="#646d72" fontSize="9" textAnchor="end">HIGHER OXYGEN</text>
  </svg><figcaption className="mono">ILLUSTRATIVE TREND · NOT MEASURED RESULTS</figcaption></figure>;
}
