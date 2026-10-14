export interface RecordedTest {
  id: string;
  material: string;
  date: string;
  fields: { label: string; value: string }[];
}
export interface ResearchProgram {
  name: string;
  title: string;
  focus: string;
  platform: string;
  url: string;
  description: string;
  availability: string;
  sourceIds: string[];
  tests: RecordedTest[];
}
export const researchPrograms: ResearchProgram[] = [
  {
    name: "BASS-II",
    title: "Burning and Suppression of Solids II",
    focus: "Ignition, spread & extinction",
    platform: "International Space Station",
    url: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-25",
    description:
      "Solid-fuel combustion in low-velocity forced flows. The investigation keeps material geometry, ventilation and oxygen conditions alongside its measurements.",
    availability: "Selected dataset archived",
    sourceIds: ["S01"],
    tests: [
      {
        id: "B1",
        material: "100 micron PMMA film 2 cm wide",
        date: "19 Feb 2014",
        fields: [
          { label: "Fan display", value: "62" },
          { label: "Air display", value: "5" },
          { label: "Initial O₂ by volume", value: "22.2%" },
          { label: "Final O₂ by volume", value: "22.2%" },
          { label: "Frames shot", value: "57" },
        ],
      },
      {
        id: "B2",
        material: "200 micron PMMA film 2 cm wide",
        date: "19 Feb 2014",
        fields: [
          { label: "Fan display", value: "62" },
          { label: "Air display", value: "5" },
          { label: "Initial O₂ by volume", value: "22.2%" },
          { label: "Final O₂ by volume", value: "1.6%" },
          { label: "Frames shot", value: "none" },
        ],
      },
      {
        id: "B3",
        material: "100 micron film 2 cm wide",
        date: "19 Feb 2014",
        fields: [
          { label: "Fan display", value: "47" },
          { label: "Air display", value: "2" },
          { label: "Initial O₂ by volume", value: "22.2%" },
          { label: "Final O₂ by volume", value: "21.8%" },
          { label: "Frames shot", value: "253" },
        ],
      },
      {
        id: "B4",
        material: "300 micron PMMA film 2 cm wide",
        date: "19 Feb 2014",
        fields: [
          { label: "Fan display", value: "61" },
          { label: "Air display", value: "5" },
          { label: "Initial O₂ by volume", value: "22.2%" },
          { label: "Final O₂ by volume", value: "22.2%" },
          { label: "Frames shot", value: "137" },
        ],
      },
    ],
  },
  {
    name: "BASS",
    title: "Burning and Suppression of Solids",
    focus: "Solid fuels & suppression",
    platform: "International Space Station",
    url: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-26",
    description:
      "An investigation of solid-material flammability and inert-gas extinguishment. Read the as-run matrix alongside the original research.",
    availability: "Selected dataset archived",
    sourceIds: ["S02"],
    tests: [
      {
        id: "1",
        material: "SIBAL 2 cm",
        date: "30 Mar 2012",
        fields: [
          { label: "As-run test", value: "1" },
          { label: "Test number", value: "1" },
          { label: "Sample number", value: "4" },
        ],
      },
      {
        id: "42",
        material: "PMMA sphere 2 cm",
        date: "30 Mar 2012",
        fields: [
          { label: "As-run test", value: "2" },
          { label: "Test number", value: "42" },
          { label: "Sample number", value: "24" },
        ],
      },
      {
        id: "18",
        material: "PMMA sphere 1 cm",
        date: "30 Mar 2012",
        fields: [
          { label: "As-run test", value: "3" },
          { label: "Test number", value: "18" },
          { label: "Sample number", value: "19" },
        ],
      },
    ],
  },
  {
    name: "Saffire",
    title: "Spacecraft Fire Safety Demonstration",
    focus: "Large-scale spacecraft fire",
    platform: "Cygnus spacecraft",
    url: "https://ntrs.nasa.gov/citations/20240007488",
    description:
      "Research on fire at spacecraft scale. Keep enclosure conditions and sample scale visible alongside the findings.",
    availability: "Original papers archived",
    sourceIds: ["S03"],
    tests: [],
  },
  {
    name: "SoFIE",
    title: "Solid Fuel Ignition and Extinction",
    focus: "Ignition & extinction limits",
    platform: "International Space Station",
    url: "https://science.nasa.gov/biological-physical/investigations/sofie/",
    description:
      "A program studying the ignition and flammability of solid fuels. The selected archive currently provides program context.",
    availability: "Program context",
    sourceIds: ["S06"],
    tests: [],
  },
  {
    name: "SAME",
    title: "Smoke Aerosol Measurement Experiment",
    focus: "Smoke particle properties",
    platform: "International Space Station",
    url: "https://ntrs.nasa.gov/citations/20140006579",
    description:
      "Smoke and aerosol research relevant to spacecraft detection. Particle evidence is distinct from material-flammability evidence.",
    availability: "Original papers archived",
    sourceIds: ["S07"],
    tests: [],
  },
  {
    name: "FLEX",
    title: "Flame Extinguishment Experiment",
    focus: "Droplet combustion",
    platform: "International Space Station",
    url: "https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/",
    description:
      "Research into droplet combustion and extinguishment. Use the original overview as a starting point for the experiment literature.",
    availability: "Program context",
    sourceIds: ["S05", "S08"],
    tests: [],
  },
];

export function programSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
