export interface Experiment {
  id: string; title: string; program: string; material: string; geometry: string;
  oxygen: number; pressure: number; airflow: number; gravity: string; direction: string;
  topic: string; spread: number; score: number; color: string; source: string;
}
// Synthetic interface fixtures. These values are not extracted NASA measurements.
export const experiments: Experiment[] = [
  { id:"bass-01",title:"A flame at the edge of extinction",program:"BASS-II",material:"PMMA",geometry:"Rod",oxygen:19.5,pressure:101,airflow:6,gravity:"Microgravity",direction:"Opposed",topic:"Extinction",spread:1.24,score:72,color:"mist",source:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-25" },
  { id:"bass-02",title:"When ventilation changes the story",program:"BASS-II",material:"PMMA",geometry:"Rod",oxygen:21,pressure:101,airflow:12,gravity:"Microgravity",direction:"Opposed",topic:"Spread",spread:1.68,score:84,color:"sand",source:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-25" },
  { id:"bass-03",title:"Following a flame across fabric",program:"BASS",material:"SIBAL fabric",geometry:"Sheet",oxygen:21,pressure:101,airflow:8,gravity:"Microgravity",direction:"Concurrent",topic:"Spread",spread:2.16,score:79,color:"sage",source:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-26" },
  { id:"saffire-01",title:"Fire beyond the laboratory scale",program:"Saffire",material:"PMMA",geometry:"Slab",oxygen:34,pressure:57,airflow:20,gravity:"Microgravity",direction:"Concurrent",topic:"Scale",spread:2.84,score:88,color:"clay",source:"https://ntrs.nasa.gov/citations/20240007488" },
  { id:"sofie-01",title:"Finding the ignition boundary",program:"SoFIE",material:"PMMA",geometry:"Cylinder",oxygen:18,pressure:70,airflow:4,gravity:"Microgravity",direction:"Opposed",topic:"Ignition",spread:.86,score:61,color:"mist",source:"https://science.nasa.gov/biological-physical/investigations/sofie/" },
  { id:"flex-01",title:"The flame you cannot see",program:"FLEX",material:"Heptane",geometry:"Droplet",oxygen:16,pressure:101,airflow:0,gravity:"Microgravity",direction:"Quiescent",topic:"Suppression",spread:.64,score:58,color:"sand",source:"https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/" },
  { id:"same-01",title:"Reading the signature of smoke",program:"SAME",material:"Silicone",geometry:"Sample",oxygen:21,pressure:101,airflow:5,gravity:"Microgravity",direction:"Forced",topic:"Detection",spread:0,score:46,color:"sage",source:"https://ntrs.nasa.gov/citations/20140006579" },
  { id:"fm2-01",title:"A different gravity. A different limit.",program:"FM2",material:"PMMA",geometry:"Rod",oxygen:34,pressure:57,airflow:6,gravity:"Lunar gravity",direction:"Concurrent",topic:"Gravity",spread:1.92,score:76,color:"clay",source:"https://ntrs.nasa.gov/citations/20240008623" },
];
export const programs = [
  { name:"BASS-II",long:"Burning and Suppression of Solids II",topic:"Solid materials",platform:"ISS",years:"2014–2022",status:"Selected archive",count:129,color:"mist" },
  { name:"BASS",long:"Burning and Suppression of Solids",topic:"Spread & suppression",platform:"ISS",years:"2012–2013",status:"Selected archive",count:122,color:"sage" },
  { name:"Saffire",long:"Spacecraft Fire Safety Demonstration",topic:"Large-scale fires",platform:"Cygnus",years:"2016–2024",status:"Papers available",count:6,color:"clay" },
  { name:"SoFIE",long:"Solid Fuel Ignition and Extinction",topic:"Ignition & extinction",platform:"ISS",years:"2022–present",status:"Program context",count:5,color:"sand" },
  { name:"FLEX",long:"Flame Extinguishment Experiment",topic:"Droplet combustion",platform:"ISS",years:"2009–2017",status:"Program context",count:2,color:"mist" },
  { name:"SAME",long:"Smoke Aerosol Measurement Experiment",topic:"Smoke detection",platform:"ISS",years:"2007–2012",status:"Papers available",count:2,color:"sage" },
  { name:"ACME",long:"Advanced Combustion via Microgravity Experiments",topic:"Gaseous flames",platform:"ISS",years:"2017–2022",status:"Program context",count:6,color:"sand" },
  { name:"FM2",long:"Flammability of Materials on the Moon",topic:"Partial gravity",platform:"Research flights",years:"2024–2026",status:"Papers available",count:3,color:"clay" },
];
export const sources = [
  { id:"S01",title:"Burning and Suppression of Solids II",type:"Dataset",program:"BASS-II",year:"2025",url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-25",author:"NASA Physical Sciences Informatics",status:"Original archived" },
  { id:"S02",title:"Burning and Suppression of Solids",type:"Dataset",program:"BASS",year:"2025",url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-26",author:"NASA Physical Sciences Informatics",status:"Original archived" },
  { id:"S03",title:"Preliminary Results from the Saffire VI Experiment",type:"PDF",program:"Saffire",year:"2024",url:"https://ntrs.nasa.gov/citations/20240007488",author:"NASA Technical Reports Server",status:"Original archived" },
  { id:"S04",title:"Material Flammability at Lunar and Martian Gravity",type:"PDF",program:"FM2",year:"2026",url:"https://ntrs.nasa.gov/citations/20260001966",author:"NASA Technical Reports Server",status:"Original archived" },
  { id:"S05",title:"Studying Combustion and Fire Safety",type:"Article",program:"Overview",year:"2024",url:"https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/",author:"NASA ISS Research",status:"Original archived" },
  { id:"S06",title:"Solid Fuel Ignition and Extinction",type:"Article",program:"SoFIE",year:"2023",url:"https://science.nasa.gov/biological-physical/investigations/sofie/",author:"NASA Science",status:"Program context" },
  { id:"S07",title:"Evaluation of Low-Gravity Smoke Particulate",type:"PDF",program:"SAME",year:"2014",url:"https://ntrs.nasa.gov/citations/20140006579",author:"NASA Technical Reports Server",status:"Original archived" },
];
export const insights = [
  {id:"i1",title:"Gravity changes the shape of fire.",topic:"Fundamentals",program:"Overview",body:"Without buoyancy, diffusion and ventilation play a different role. Explore how the same material can behave differently beyond Earth.",color:"mist",source:4},
  {id:"i2",title:"Ventilation is part of the experiment.",topic:"Flame spread",program:"BASS-II",body:"Airflow direction, speed and material geometry belong alongside any flame-spread result. Compare the conditions before comparing the outcome.",color:"sage",source:0},
  {id:"i3",title:"A small test is not a whole spacecraft.",topic:"Scale",program:"Saffire",body:"Saffire investigates large-scale fire behavior. Keep sample scale and enclosure conditions visible when moving between studies.",color:"clay",source:2},
  {id:"i4",title:"The Moon is not microgravity.",topic:"Exploration",program:"FM2",body:"Partial-gravity evidence needs its own label. An ISS result alone does not establish behavior in a lunar habitat.",color:"sand",source:3},
  {id:"i5",title:"Smoke carries its own evidence.",topic:"Detection",program:"SAME",body:"Smoke particle properties are a different evidence stream from visible flame behavior. Explore the detection studies alongside combustion research.",color:"mist",source:6},
];
