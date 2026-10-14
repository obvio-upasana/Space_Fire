"use client";
import { useEffect, useRef, useState } from "react";
import { environments, type FlameScenario } from "../lib/flame-scenarios";
import { Icon } from "./ui";
const shellVertex = `
varying vec3 vNormal;
varying vec3 vView;
void main(){
 vec4 world=modelMatrix*vec4(position,1.0);
 vNormal=normalize(mat3(modelMatrix)*normal);
 vView=cameraPosition-world.xyz;
 gl_Position=projectionMatrix*viewMatrix*world;
}
`;
const shellFragment = `
varying vec3 vNormal;
varying vec3 vView;
uniform float uTime,uFlow,uOpacity;
void main(){
 float rim=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),2.5);
 float ripple=1.0+sin(vNormal.y*14.0+uTime*.4)*.015;
 float alpha=clamp(rim*uOpacity*ripple,0.0,.8);
 vec3 color=mix(vec3(.07,.23,.65),vec3(.13,.62,1.0),rim);
 gl_FragColor=vec4(color,alpha);
}
`;
export function FlameScene({
  scenario,
  paused = false,
}: {
  scenario: FlameScenario;
  paused?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const latest = useRef({ scenario, paused }),
    resetCamera = useRef<(() => void) | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    latest.current = { scenario, paused };
  }, [scenario, paused]);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let stopped = false;
    let dispose: (() => void) | undefined;
    Promise.all([
      import("three"),
      import("three/addons/controls/OrbitControls.js"),
      import("@wolffo/three-fire/vanilla"),
    ])
      .then(([THREE, { OrbitControls }, { FireMesh }]) => {
        if (stopped) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            canvas: element,
            antialias: true,
          });
        } catch {
          setError(
            "WebGL is unavailable. The research context and controls remain available.",
          );
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor("#101c28");
        const scene = new THREE.Scene(),
          camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
        camera.position.set(2.8, 1.5, 4.8);
        const controls = new OrbitControls(camera, element);
        controls.target.set(0, 0.2, 0);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.minDistance = 2.3;
        controls.maxDistance = 9;
        controls.maxPolarAngle = Math.PI * 0.56;
        controls.update();
        controls.saveState();
        resetCamera.current = () => controls.reset();
        const grid = new THREE.GridHelper(5, 10, 0x294153, 0x182d3d);
        grid.position.y = -0.8;
        scene.add(grid);
        const texture = new THREE.TextureLoader().load(
          "/fire-density.png",
          undefined,
          undefined,
          () => {
            if (!stopped) setError("The fire density texture could not load.");
          },
        );
        const plume = new FireMesh({
          fireTex: texture,
          color: 0xff8a2d,
          iterations: window.innerWidth < 760 ? 24 : 40,
          octaves: 3,
          magnitude: 1.1,
          noiseScale: [1, 2, 1, 0.3],
        });
        plume.position.y = 0.3;
        scene.add(plume);
        const shellGeometry = new THREE.SphereGeometry(0.64, 64, 40);
        const shellMaterial = new THREE.ShaderMaterial({
          vertexShader: shellVertex,
          fragmentShader: shellFragment,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: {
            uTime: { value: 0 },
            uFlow: { value: 0 },
            uOpacity: { value: 0.7 },
          },
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.position.y = 0.3;
        scene.add(shell);
        const fuelGeometry = new THREE.BoxGeometry(1.05, 0.06, 0.65),
          fuelMaterial = new THREE.MeshBasicMaterial({ color: 0x698399 });
        const fuel = new THREE.Mesh(fuelGeometry, fuelMaterial);
        fuel.position.y = -0.74;
        scene.add(fuel);
        const dropletGeometry = new THREE.SphereGeometry(0.07, 24, 20),
          dropletMaterial = new THREE.MeshBasicMaterial({ color: 0xb9cbd8 });
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
        droplet.position.y = 0.3;
        scene.add(droplet);
        const resize = () => {
          const width = element.clientWidth,
            height = element.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(1, height);
          camera.updateProjectionMatrix();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(element);
        resize();
        let visible = true;
        const visibility = new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting ?? false;
        });
        visibility.observe(element);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let time = 0,
          lastTime = 0;
        renderer.setAnimationLoop((now) => {
          const delta = lastTime ? Math.min((now - lastTime) * 0.001, 0.05) : 0;
          lastTime = now;
          if (!visible || document.hidden) return;
          const { scenario: s, paused: isPaused } = latest.current;
          if (!isPaused && !reduced.matches) time += delta;
          const gravity = environments[s.environment].gravityRatio,
            flow = s.airflow / 25;
          const spherical = s.environment === "iss" && s.sample === "droplet";
          plume.visible = !spherical && !s.cool;
          shell.visible = spherical && !s.cool;
          plume.scale.set(0.85 + flow * 0.18, 0.95 + gravity * 0.3, 0.85);
          plume.position.y = -0.72 + plume.scale.y * 0.5;
          plume.rotation.z = -flow * 0.25;
          // Color is an illustrative style, not a calibrated airflow threshold.
          plume.fireColor.set(0xffa341);
          plume.magnitude = 0.65 + gravity * 0.55 + flow * 0.2;
          plume.update(time);
          shell.scale.set(1 + flow * 0.25, 1, 1);
          shellMaterial.uniforms.uTime.value = time;
          shellMaterial.uniforms.uOpacity.value = 0.65;
          fuel.visible = s.sample !== "droplet";
          fuel.scale.x = s.sample === "fabric" ? 1 : 0.7;
          droplet.visible = s.sample === "droplet";
          // A schematic shrink cycle communicates evaporation, without claiming a measured burn rate.
          droplet.scale.setScalar(s.cool ? 1 - (time % 12) / 24 : 1);
          controls.update();
          renderer.render(scene, camera);
        });
        dispose = () => {
          renderer.setAnimationLoop(null);
          controls.dispose();
          resetCamera.current = null;
          observer.disconnect();
          visibility.disconnect();
          plume.dispose();
          texture.dispose();
          shellGeometry.dispose();
          shellMaterial.dispose();
          fuelGeometry.dispose();
          fuelMaterial.dispose();
          dropletGeometry.dispose();
          dropletMaterial.dispose();
          grid.geometry.dispose();
          (Array.isArray(grid.material)
            ? grid.material
            : [grid.material]
          ).forEach((m) => m.dispose());
          renderer.dispose();
        };
      })
      .catch(() => {
        if (!stopped)
          setError(
            "The 3D scene could not load. Research details remain available.",
          );
      });
    return () => {
      stopped = true;
      dispose?.();
    };
  }, []);
  return (
    <div
      ref={stage}
      className={scenario.cool ? "flame-scene cool-view" : "flame-scene"}
    >
      <canvas
        ref={canvas}
        aria-label={
          "Interactive flame illustration for " +
          environments[scenario.environment].label
        }
      />
      <div className="scene-label">
        <span>3D VISUAL STUDY</span>
        <span>{environments[scenario.environment].gravity}</span>
      </div>
      <span className="scene-instruction">
        Drag to orbit · Scroll to zoom · Right-drag to pan
      </span>
      <div className="scene-actions">
        <button type="button" onClick={() => resetCamera.current?.()}>
          <Icon name="compass" size={13} />
          Reset view
        </button>
        <button
          type="button"
          aria-label="Expand simulation scene"
          onClick={async () => {
            try {
              if (document.fullscreenElement) await document.exitFullscreen();
              else if (stage.current?.requestFullscreen)
                await stage.current.requestFullscreen();
              else setError("Fullscreen is unavailable in this browser.");
            } catch {
              setError("Fullscreen could not open.");
            }
          }}
        >
          <Icon name="external" size={13} />
          Expand
        </button>
      </div>
      {scenario.cool && (
        <div className="cool-view-note">
          <strong>Visible flame extinguished</strong>
          <span>
            Droplet evaporation schematic. Cool-flame light is too faint to
            depict as a bright flame; burn rate is not predicted.
          </span>
        </div>
      )}
      {(scenario.environment === "moon" || scenario.environment === "mars") && (
        <span className="scene-projection">
          Illustrative projection · no matched shape measurements
        </span>
      )}
      {error && (
        <p role="status" className="scene-error">
          {error}
        </p>
      )}
    </div>
  );
}
