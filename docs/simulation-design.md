# Research-informed flame views

## Routes and scope

- /programs is a searchable card gallery.
- /programs/{slug} opens a static program report with selected raw test metadata and original references.
- /simulation is the larger interactive scene. Chat responses can also open the same view.
- This frontend does not run a validated combustion solver.

## Input provenance

The archived PSI-25 CSV and fan-calibration workbook were read through Google Drive on 14 October 2026. Selected B1, B3 and F1 rows are retained in apps/web/lib/verified-conditions.ts.

Selecting one of these records loads its initial oxygen percentage and sample category. The raw fan display, air display and restrictor count remain visible independently. B1 and B3 begin at 22.2% oxygen. F1 identifies Nomex natural (nomex III) and also begins at 22.2%.

Pressure and physical airflow are editable illustration assumptions. They are not extracted values from these CSV rows. Default exploration uses Earth gravity, a fabric sample, 21% oxygen, 101 kPa and zero forced flow. These are chosen illustration inputs, not a recorded test.

The slider ranges are interface exploration bounds, not proven flammability bounds. Editing oxygen changes the provenance label. No temperature, burn rate, extinction threshold or risk score is emitted.

The calibration workbook organizes readings by date and restrictor count. Its example states U = 1.0066(AIR) and describes SPICE calibration at 56 mm downstream and 36 mm from the bottom. It also cautions against the 3.8 V zero-flow value. That example is not applied across all runs here.

## Rendering decisions and evidence

- The microgravity droplet view uses a hollow blue reaction shell around a visible fuel droplet. It follows NASA's published low-convection droplet/candle imagery; it is not a universal claim about every microgravity flame.
- Solid-fuel views use a compact procedural plume. Its warm color is a fixed illustrative style; there is no blue/yellow cutoff at 1 cm/s. Geometry and material dependence prevent prediction from gravity alone.
- Buoyant reference views use an elongated, animated plume. The procedural density and color mappings are authored visual effects.
- Cool-flame mode switches to an ISS liquid droplet and removes the visible flame. A looping droplet-size schematic illustrates evaporation; its speed and diameter are not measured or predicted. It does not establish that the selected atmosphere supports cool combustion.
- Moon and Mars scenes carry an explicit unvalidated-projection label. Gravity presets are approximate ratios, 0.16 and 0.38 of Earth gravity. They are not measured habitat flame shapes.
- Airflow deformation is an illustrative mapping. Oxygen and pressure are scenario context only; neither has a calibrated rendering effect. The UI explains this beside the controls.

The solid-fuel plume now uses the MIT-licensed @wolffo/three-fire WebGL FireMesh and its reference grayscale density texture. The microgravity droplet uses a separate 3D spherical reaction-shell illustration. Three.js OrbitControls provides rotate, zoom, pan and reset. The library supplies volumetric rendering and animated turbulence, not a validated combustion solver. Source: https://github.com/typeWolffo/THREE.Fire . License: three-fire-LICENSE.txt.

## References

- [NASA candle flame comparison](https://www.nasa.gov/image-article/candle-flame-1g-vs-microgravity/)
- [NASA BASS-II results](https://ntrs.nasa.gov/citations/20160000593)
- [NASA cool-flame findings](https://www.nasa.gov/missions/station/iss-research/youre-hot-then-youre-cold/)
- [NASA planetary fact sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [Lunar and Martian material flammability](https://ntrs.nasa.gov/citations/20260001966)
- [BASS-II original dataset](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25)
- [Three.js volumetric fire example](https://threejs.org/examples/webgpu_volume_fire.html)

## Validation still required for numerical predictions

Confirm calibration applicability and units against original workbook sheets, source documentation and test locations. Join each reading to its run ID, date and restrictor setup. A transport/heat-transfer/chemistry model needs independent validation against measured outcomes. The selected solid-fuel CSV cannot validate droplet cool-flame chemistry or a matched lunar-versus-Martian risk ranking.

## Renderer lifecycle

Three.js loads on simulation mount. Pixel ratio is capped at 1.5. Offscreen and hidden scenes suspend updates. Pause freezes animation time, and reduced motion removes procedural time variation. Unmount disposes geometries, materials, renderer, observers and pointer listeners. Unsupported WebGL shows a readable fallback.
