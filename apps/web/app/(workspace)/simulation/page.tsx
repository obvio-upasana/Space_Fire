import { ResearchResponse } from "../../../components/research-response";
import { PageHeading } from "../../../components/ui";
export default function SimulationPage() {
  return (
    <div className="standalone-simulation">
      <PageHeading
        kicker="EXPLORE THE CONDITIONS"
        title="A closer look at the flame."
        description="Change the environment and sample. Explore a visual model with the research context alongside it."
      />
      <ResearchResponse initialView="simulation" standalone>
        <span />
      </ResearchResponse>
    </div>
  );
}
