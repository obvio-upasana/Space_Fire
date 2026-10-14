import Link from "next/link";
import {Icon} from "./ui";
export function EvidenceStack(){
  return <Link href="/sources" className="evidence-stack" aria-label="Explore the original research"><div className="evidence-paper paper-back" aria-hidden="true"/><div className="evidence-paper paper-middle" aria-hidden="true"/><div className="evidence-paper paper-front"><span className="reference-symbol"><Icon name="file" size={24}/></span><div><strong>Original research. A clearer reference.</strong><p>Source, conditions and findings belong together.</p></div><Icon name="external" size={18}/></div></Link>;
}
