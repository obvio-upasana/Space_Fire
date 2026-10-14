export type Environment = "iss" | "moon" | "mars" | "earth";
export type Sample = "fabric" | "pmma" | "droplet";
export interface FlameScenario {
  environment: Environment;
  oxygen: number;
  pressure: number;
  airflow: number;
  sample: Sample;
  cool: boolean;
}
export const environments: Record<
  Environment,
  { label: string; gravity: string; gravityRatio: number }
> = {
  iss: { label: "ISS microgravity", gravity: "Near 0 g", gravityRatio: 0 },
  moon: { label: "Moon habitat", gravity: "About 0.16 g", gravityRatio: 0.16 },
  mars: { label: "Mars habitat", gravity: "About 0.38 g", gravityRatio: 0.38 },
  earth: { label: "Earth reference", gravity: "1 g", gravityRatio: 1 },
};
export const defaultScenario: FlameScenario = {
  environment: "iss",
  oxygen: 21,
  pressure: 101,
  airflow: 5,
  sample: "fabric",
  cool: false,
};
export const physicsReferences = {
  gravity: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
  partialGravity: "https://ntrs.nasa.gov/citations/20260001966",
  coolFlames:
    "https://www.nasa.gov/missions/station/iss-research/youre-hot-then-youre-cold/",
  bass: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-25",
};
