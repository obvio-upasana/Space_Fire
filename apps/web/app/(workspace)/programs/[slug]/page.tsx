import Link from "next/link";
import { notFound } from "next/navigation";
import { researchPrograms, programSlug } from "../../../../lib/program-catalog";
import { ProgramDetails } from "../../../../components/program-details";
import { Icon } from "../../../../components/ui";
export function generateStaticParams() {
  return researchPrograms.map((program) => ({
    slug: programSlug(program.name),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = researchPrograms.find((p) => programSlug(p.name) === slug);
  return {
    title: program ? program.name + " research report" : "Program not found",
  };
}
export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = researchPrograms.find((p) => programSlug(p.name) === slug);
  if (!program) notFound();
  return (
    <div className="program-report">
      <Link href="/programs" className="program-back">
        <Icon name="left" size={15} />
        All programs
      </Link>
      <ProgramDetails program={program} />
    </div>
  );
}
