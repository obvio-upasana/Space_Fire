# Flame behavior data: verified source roadmap
Reviewed 14 October 2026. This is a developer research guide, not an original-source extract. New datasets below have been located, not fully downloaded, ingested or calibrated.

## Priority sources
| Source | What it can support | What to extract next | Current evidence status |
| --- | --- | --- | --- |
| [BASS-II PSI-25](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25) | Solid fuel, ventilation, oxygen, geometry and spread/extinction | Test table, sample dimensions, calibration, measured spread/front data and selected matched frames | Selected B1/B3/F1 CSV inputs verified in app; no validated rendering model |
| [FLEX PSI-69](https://psi.nasa.gov/physci/repo/data/investigations/PSI-69) | Liquid droplets, pressure, composition, diameter and visible extinction | Experimental table, fuel identity, initial and extinction diameter, burn time, outcome; retain original units | Public table exposes 275 records; full extraction pending |
| [Saffire-I PSI-98](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) | Larger solid-fuel fire growth and fabric spread | Run conditions, camera calibration, front position versus time, oxygen and measured outcomes | Source located; individual file inventory pending |
| [LUCI report 20250010653](https://ntrs.nasa.gov/citations/20250010653) | Actual simulated lunar-gravity material tests | Figures/tables with oxygen limits, fabric/PMMA geometry, camera views, spread/growth measurements and uncertainty | Public report inspected; not a general Moon/Mars lookup table |
| [BASS modeling PSI-62](https://psi.nasa.gov/physci/repo/data/investigations/PSI-62) | Concurrent flame modeling and two-color tomography | Documentation, model inputs, temperature/soot outputs, experimental validation cases and licenses | NASA search index describes it; file availability not yet verified |
| [Cool-flame CFD PSI-117](https://psi.nasa.gov/physci/repo/data/investigations/PSI-117) | Perturbed n-alkane droplet cool flames in OpenFOAM | Model definitions, kinetics, boundary conditions and validation against FLEX | NASA search index describes it; no model executed |
| [ACME CFI-G PSI-159](https://psi.nasa.gov/physci/repo/data/investigations/PSI-159) | Gaseous cool diffusion flames, dilution, flow and pressure | Run table, fuel, burner geometry, atmosphere, pressure and diagnostics | Index describes the experiment; file inventory pending |
| [ACME Flame Design PSI-10](https://psi.nasa.gov/physci/repo/data/investigations/PSI-10) | Spherical gaseous flames and soot inception | Burner/run conditions, calibrated imagery, soot diagnostics, extinction results | Index discovery only; do not apply to fabric or droplets |

NASA discovery index: https://psi.nasa.gov/physci/repo/search?data_source=psi&data_type=investigation
Research-area index: https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/

## Selection rules
1. Start with small experimental tables, readme/calibration documents and outcome tables. Keep original PDFs as the authority. Fetch a small set of camera frames only when they map to a specific run; avoid entire video archives.
2. Every imported row needs investigation DOI, source URL, exact filename, run identifier, date, raw values/units, fuel and geometry, flow direction, gravity, pressure, oxygen composition and calibration provenance. Unknown fields remain null.
3. Numeric values belong in structured tables. Text explanations belong in RAG chunks with the original URL, document ID and page/section. Files stored in Drive are storage references, not scientific citations.
4. Never merge fuel categories or experiments into a universal color/height rule. Filter matched material, geometry, flow direction and atmosphere before comparison. Report interpolation separately from observed measurements and reject extrapolation outside a validated domain.
5. Measured images can support source-linked playback. A predictive 3D model additionally needs documented transport/chemistry assumptions and independent validation. A procedural FireMesh cannot substitute for that validation.

## Gaps that remain
No complete map covers every combination of Earth, ISS, lunar/Martian gravity, fabric/PMMA/liquid fuel, pressure, oxygen and ventilation. LUCI supplies specific lunar cases; Mars cannot be inferred by multiplying flame height by gravity. Generic fabric is not a material identity. The selected F1 record is Nomex, while B1 is PMMA; neither supplies a universal burn law.

NASA describes cool flames as weak-light combustion, including droplet combustion after visible extinction:
https://www.nasa.gov/missions/station/iss-research/youre-hot-then-youre-cold/
https://www.nasa.gov/missions/station/cool-flames-created-during-a-first-for-international-space-station-research/

## Recommended next implementation
Build source-linked measured-run playback before numerical predictions. Use BASS-II solid-fuel runs and FLEX droplet runs as separate case families. Keep lunar LUCI cases separate. Replace illustrative control mappings only after extracting outcomes, confirming units/calibration and comparing model output against held-out runs.
