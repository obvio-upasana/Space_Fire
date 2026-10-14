# In-chat comparison and illustration

The frontend keeps one AI workspace. Starter prompts open an Answer, Environment comparison, or Simulation view inside a response. Comparison stays inside chat. Simulation also has a dedicated /simulation workspace route using the same controls and view.

## Evidence boundaries

- Moon and Mars refer to pressurized habitat scenarios. The comparison holds sample, oxygen, pressure and forced airflow equal; it does not rank fire risk.
- Gravity presets are approximate Earth ratios: ISS near zero, Moon 0.16, Mars 0.38, Earth 1.
- The Three.js scene is an authored qualitative illustration. Its procedural shader changes visual shape with gravity and airflow and opacity with oxygen. Animated turbulence and flame colors are authored visual effects. These mappings are presentation choices, not calibrated physics.
- Pressure is an input recorded for context; it has no modeled effect on the scene.
- Fabric and PMMA selections change the sample representation; material-specific burning rates are not calculated.
- Cool-flame mode switches to a liquid droplet. It illustrates continued combustion after visible extinction without claiming to solve reaction chemistry.
- No CFD, heat transfer, reaction kinetics, ignition threshold, spread speed or safety limit is computed.

## Archived data

The PSI-25 archive manifest lists the BASS-II experimental CSV and fan-calibration XLSX. The program view links to the original investigation and identifies these files. It does not import workbook values or equate fan settings with physical velocity.

Before replacing the illustration with a numerical model, verify workbook sheets, units, calibration geometry and mapping to the CSV run IDs. Validate predictions against held-out measured outcomes and preserve a source record for every value. Low-gravity solid-fuel metadata cannot establish droplet cool-flame chemistry or matched lunar/Martian results.

## References

- [NASA planetary fact sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [Lunar and Martian material flammability](https://ntrs.nasa.gov/citations/20260001966)
- [NASA cool-flame findings](https://www.nasa.gov/missions/station/iss-research/youre-hot-then-youre-cold/)
- [BASS-II original dataset](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25)

## Renderer behavior

Three.js loads when the simulation view mounts. Device pixel ratio is capped at 1.5. Animation pauses offscreen and when the document is hidden; reduced motion removes pulsing. Unmount disposes geometry, materials, observers, pointer listeners and the renderer. Unsupported WebGL shows a readable fallback while retaining controls and explanations.
