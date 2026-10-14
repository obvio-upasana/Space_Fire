"use client";
import { useEffect, useRef, useState } from "react";
import { environments, type FlameScenario } from "../lib/flame-scenarios";

export function FlameScene({
  scenario,
  paused = false,
}: {
  scenario: FlameScenario;
  paused?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const latest = useRef({ scenario, paused });
  const [error, setError] = useState("");
  useEffect(() => {
    latest.current = { scenario, paused };
  }, [scenario, paused]);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let stopped = false;
    let dispose: (() => void) | undefined;
    import("three")
      .then((THREE) => {
        if (stopped) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            canvas: element,
            antialias: true,
            alpha: false,
          });
        } catch {
          setError(
            "3D is unavailable in this browser. The parameter controls and explanations still work.",
          );
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor("#f3f7fa");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(3, 2.2, 5);
        camera.lookAt(0, 0.35, 0);
        const grid = new THREE.GridHelper(5, 20, 0xcbdbe6, 0xe0e9ef);
        grid.position.y = -1;
        scene.add(grid);
        const geometry = new THREE.SphereGeometry(1, 32, 24);
        const outerMaterial = new THREE.MeshBasicMaterial({
          color: 0x629ecb,
          transparent: true,
          opacity: 0.16,
          depthWrite: false,
        });
        const innerMaterial = new THREE.MeshBasicMaterial({
          color: 0x8dc5eb,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        });
        const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xe5f4ff });
        const outer = new THREE.Mesh(geometry, outerMaterial);
        const inner = new THREE.Mesh(geometry, innerMaterial);
        const core = new THREE.Mesh(geometry, coreMaterial);
        const flame = new THREE.Group();
        flame.add(outer, inner, core);
        scene.add(flame);
        const fuelMaterial = new THREE.MeshBasicMaterial({ color: 0x6e879a });
        const fuelGeometry = new THREE.BoxGeometry(1.1, 0.06, 0.65);
        const fuel = new THREE.Mesh(fuelGeometry, fuelMaterial);
        fuel.position.y = -0.75;
        scene.add(fuel);
        const wireGeometry = new THREE.SphereGeometry(1.03, 12, 8);
        const wireMaterial = new THREE.MeshBasicMaterial({
          color: 0x93afc3,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
        });
        const wire = new THREE.Mesh(wireGeometry, wireMaterial);
        flame.add(wire);
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
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let visible = true;
        const visibility = new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting ?? false;
        });
        visibility.observe(element);
        let angle = 0;
        const drag = { down: false, x: 0 };
        const down = (event: PointerEvent) => {
          drag.down = true;
          drag.x = event.clientX;
          element.setPointerCapture(event.pointerId);
        };
        const move = (event: PointerEvent) => {
          if (drag.down) {
            angle += (event.clientX - drag.x) * 0.008;
            drag.x = event.clientX;
          }
        };
        const up = () => {
          drag.down = false;
        };
        element.addEventListener("pointerdown", down);
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerup", up);
        element.addEventListener("pointercancel", up);
        // Shape responses are authored illustrations, not a combustion solver or calibrated model.
        renderer.setAnimationLoop((time) => {
          if (!visible || document.hidden) return;
          const { scenario: s, paused: isPaused } = latest.current;
          const gravity = environments[s.environment].gravityRatio;
          const flow = s.airflow / 25;
          const motion =
            reduced.matches || isPaused ? 0 : Math.sin(time * 0.0018) * 0.035;
          const height = 1 + gravity * 0.75;
          const width = 0.72 + flow * 0.22;
          flame.scale.set(width * (1 + motion), height * (1 - motion), 0.72);
          flame.rotation.z = -flow * 0.22;
          flame.rotation.y = angle;
          flame.position.set(flow * 0.24, gravity * 0.1, 0);
          outer.scale.set(1, 1, 1);
          inner.scale.set(0.73, 0.8, 0.73);
          core.scale.set(0.22, 0.3, 0.22);
          outerMaterial.opacity = s.cool
            ? 0.035
            : 0.14 + (s.oxygen / 100) * 0.16;
          innerMaterial.opacity = s.cool ? 0.08 : 0.34;
          innerMaterial.color.set(s.cool ? 0x9ba7b2 : 0x80b8e2);
          core.visible = !s.cool;
          wire.visible = s.cool;
          fuel.visible = s.sample !== "droplet";
          fuel.scale.set(s.sample === "fabric" ? 1 : 0.7, 1, 1);
          renderer.render(scene, camera);
        });
        dispose = () => {
          renderer.setAnimationLoop(null);
          observer.disconnect();
          visibility.disconnect();
          element.removeEventListener("pointerdown", down);
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerup", up);
          element.removeEventListener("pointercancel", up);
          geometry.dispose();
          fuelGeometry.dispose();
          wireGeometry.dispose();
          outerMaterial.dispose();
          innerMaterial.dispose();
          coreMaterial.dispose();
          fuelMaterial.dispose();
          wireMaterial.dispose();
          grid.geometry.dispose();
          const gridMaterials = Array.isArray(grid.material)
            ? grid.material
            : [grid.material];
          gridMaterials.forEach((m) => m.dispose());
          renderer.dispose();
        };
      })
      .catch(() => {
        if (!stopped)
          setError(
            "The 3D preview could not load. You can still inspect the controls and research context.",
          );
      });
    return () => {
      stopped = true;
      dispose?.();
    };
  }, []);
  return (
    <div className="flame-scene">
      <canvas
        ref={canvas}
        aria-label={`Illustrative flame view for ${environments[scenario.environment].label}. Drag to rotate.`}
      />
      <div className="scene-label">
        <span>3D ILLUSTRATION</span>
        <span>{environments[scenario.environment].gravity}</span>
      </div>
      <span className="scene-instruction">
        Drag to rotate · Shape is qualitative
      </span>
      {error && (
        <p role="status" className="scene-error">
          {error}
        </p>
      )}
    </div>
  );
}
