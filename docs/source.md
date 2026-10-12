# Sources

## Overview and program pages

**1. Studying Combustion and Fire Safety (NASA ISS research article)**
- Link: https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/
- What is in it: why flames are round in microgravity; summaries of FLEX, ACME, BASS, BASS-II, SoFIE-GEL, Saffire, Confined Combustion, FLARE; 7 paper citations with DOIs.
- Helps: Program map, Insight cards, Experiment library.
- How: take program names and findings from it, and use the cited papers as the source records.

**2. Combustion Science (NASA Glenn)**
- Link: https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/
- What is in it: current experiments (FM2, SoFIE, FLARE), archived ones (ACME, BASS, DAFT, FLEX, Saffire, SAME, SLICE, SPICE) with a PDF fact sheet each; why gravity changes flames; the note that the 1-g flame test may not be conservative in low gravity.
- Helps: Program map, Mission condition matcher, Insight cards.
- How: use it as the list of programs and as the reason for Moon and Mars warnings.

**3. SoFIE (NASA Science)**
- Link: https://science.nasa.gov/biological-physical/investigations/sofie/
- What is in it: ignition and flammability of solid spacecraft materials, tested at oxygen levels and pressures meant to match exploration atmospheres; the spacecraft uses.
- Helps: Experiment library, Mission condition matcher.
- How: a high-relevance program to load, and the closest match to exploration conditions.

**4. ACME (NASA Science)**
- Link: https://science.nasa.gov/biological-physical/investigations/acme/
- What is in it: gaseous flame studies aimed mostly at efficiency and pollution; only the BRE study targets spacecraft fire.
- Helps: Program map.
- How: use it to mark most ACME studies as low relevance and keep BRE.

**5. PSI-25 (PSI repository)**
- Link: https://psi.nasa.gov/physci/repo/data/investigations/PSI-25
- What is in it: verified as Burning and Suppression of Solids - II (BASS-II), DOI 10.60555/4qc4-de67, version 4. Selected experimental CSV, calibration XLSX, original documents and summary report are archived in Drive.
- Helps: Experiment library, flame spread/extinction evidence and selected comparisons.
- How: use the investigation file index; raw ProofSheets and large video/ZIP data remain excluded. ReadMe and test-matrix downloads returned 404.

## Data

**6. PSI Data Repository**
- Link: https://psi.nasa.gov/physci/repo/
- What is in it: NASA physical science studies, each with raw and processed data, models, images, documentation and a publication list. Filter by Combustion Science.
- Helps: Experiment library, Evidence Q&A.
- How: main place to find experiments and their files.

**7. PSI on AWS Open Data**
- Link: https://registry.opendata.aws/nasa-psi
- What is in it: public `nasa-psi` bucket, no account needed. It must not be assumed to mirror every PSI investigation; the checked roots were DSI, OASIS and pk4, and PSI-25 was not found.
- Helps: Experiment library.
- How: list with `aws s3 ls --no-sign-request s3://nasa-psi/`, then download only the experiments we use.

**8. PSI tutorials and contacts**
- Link: https://www.nasa.gov/content/psi-contacts-tutorials-and-related-links
- What is in it: help pages and contacts.
- Helps: any dataset question.
- How: use when a dataset is unclear.

## Papers on flame spread and fire safety

**9. BASS-II results**
- Link: https://ntrs.nasa.gov/citations/20160000593
- What is in it: more than 100 burn tests of thin fuels, varying airflow speed, fuel thickness, preheating and oxygen concentration.
- Helps: Experiment library, Fire risk ranking.
- How: its variables are our table columns.

**10. Saffire large-scale fire tests**
- Link: https://ntrs.nasa.gov/citations/20170008805
- What is in it: spacecraft-scale fire; flame size stays limited in concurrent spread after ignition.
- Helps: Fire risk ranking, Insight cards.
- How: a record for the large-scale group.

**11. Saffire overview**
- Link: https://ntrs.nasa.gov/citations/20180005168
- What is in it: tests on Cygnus spacecraft and the effect of enclosure size.
- Helps: Fire risk ranking, Compare.
- How: shows why small and large tests are not mixed.

**12. Fire Safety in Space (NASA feature)**
- Link: https://www.nasa.gov/?p=532142
- What is in it: plain-language summary of BASS and Saffire.
- Helps: Insight cards.
- How: wording and checked findings for cards.

**13. ISS Combustion in Reduced Gravity (mini book)**
- Link: https://www.nasa.gov/sites/default/files/atoms/files/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf
- What is in it: beginner overview of ACME, BASS, FLEX and SLICE.
- Helps: the team's physics background, Insight cards.
- How: read first.

## Papers on Moon and Mars conditions

**14. Material Flammability at Lunar and Martian Gravity (2026 slides)**
- Link: https://ntrs.nasa.gov/citations/20260001966
- What is in it: 0 g, Moon g and 1 g compared; plans for tests at 8.2 psia.
- Helps: Mission condition matcher, Insight cards.
- How: source for the gravity warning.

**15. Flammability of Materials on the Moon**
- Link: https://ntrs.nasa.gov/citations/20240008623
- What is in it: lunar-gravity tests; upward and downward burning; 14.4 psi at 21% oxygen versus 8.2 psi at 34%.
- Helps: Mission condition matcher.
- How: numbers for the two presets.

**16. Moon to Mars Exploration Atmosphere**
- Link: https://ntrs.nasa.gov/citations/20240003211
- What is in it: why NASA proposes 8.2 psia and 34% oxygen.
- Helps: Mission condition matcher.
- How: reason behind the exploration preset.

**17. Reduced pressure impacts on life support**
- Link: https://ntrs.nasa.gov/citations/20260003925
- What is in it: says material flammability is the biggest problem at 8.2 psia and 34 to 40% oxygen.
- Helps: Insight cards.
- How: a "why this matters" card.

**18. Exploration atmosphere (journal article, 2018)**
- Link: https://asma.kglmeridian.com/downloadpdf/view/journals/amhp/89/9/article-p792.pdf
- What is in it: how the 8.2 psia and 34% choice was made.
- Helps: Mission condition matcher.
- How: background for the preset.

## Challenge page

**19. Space Apps 2026 challenges**
- Link: https://www.spaceappschallenge.org/2026/challenges/
- What is in it: the official statement. Full statement and data links are expected Oct 28.
- Helps: Problem statement check.
- How: compare it with `idea.md` when the full text is out.

## Added after the 12 October 2026 coverage audit

- BASS / PSI-26: https://psi.nasa.gov/physci/repo/data/investigations/PSI-26 — selected CSV, as-run XLSX, three results presentations and science requirements PDF archived. Final-report download returned 404.
- Saffire VI preliminary results: https://ntrs.nasa.gov/citations/20240007488
- Saffire V vehicle modeling: https://ntrs.nasa.gov/citations/20240008602
- Exploration-atmosphere microgravity PMMA spread: https://ntrs.nasa.gov/citations/20210017785
- Buoyancy effects on thick PMMA spread: https://ntrs.nasa.gov/citations/20200000557
- SoFIE project overview: https://ntrs.nasa.gov/citations/20200000361
- Low-gravity smoke particulate and detection: https://ntrs.nasa.gov/citations/20140006579
- SAME-2 particle morphology and size: https://ntrs.nasa.gov/citations/20130000422

Original PDFs are saved in Drive. Source URLs, direct PDF URLs, checksums and Drive file IDs are in sources.json. See how-to-use-data-sources.md for ingestion and citation rules. No new PDF-to-TXT copies were retained in this audit.
