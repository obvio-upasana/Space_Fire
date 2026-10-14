import {CompareView} from "../../../components/compare-view";
export default async function ComparePage({searchParams}:{searchParams:Promise<{left?:string;right?:string}>}){
 const query=await searchParams;return <CompareView initialLeft={query.left} initialRight={query.right}/>;
}
