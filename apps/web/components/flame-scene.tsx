"use client";
import { useEffect, useRef, useState } from "react";
import { environments, type FlameScenario } from "../lib/flame-scenarios";
import { flameVertex, flameFragment } from "../lib/flame-shader";

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
        renderer.setClearColor("#101c28");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(3, 2.2, 5);
        camera.lookAt(0, 0.35, 0);
        const grid = new THREE.GridHelper(5, 20, 0x304b60, 0x1b3042);
        grid.position.y = -1;
        scene.add(grid);
        const geometry = new THREE.PlaneGeometry(4.8, 4.3);
        const material = new THREE.ShaderMaterial({
          vertexShader: flameVertex,
          fragmentShader: flameFragment,
          transparent: true,
          premultipliedAlpha: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uGravity: { value: 0 },
            uFlow: { value: 0 },
            uOxygen: { value: 0.21 },
            uCool: { value: 0 },
            uAngle: { value: 0 },
          },
        });
        const flame = new THREE.Mesh(geometry, material);
        flame.position.y = 0.3;
        flame.quaternion.copy(camera.quaternion);
        scene.add(flame);
        const fuelMaterial = new THREE.MeshBasicMaterial({ color: 0x637d91 });
        const fuelGeometry = new THREE.BoxGeometry(1.1, 0.06, 0.65);
        const fuel = new THREE.Mesh(fuelGeometry, fuelMaterial);
        fuel.position.y = -0.75;
        scene.add(fuel);
        const dropletGeometry = new THREE.SphereGeometry(0.13, 20, 16);
        const dropletMaterial = new THREE.MeshBasicMaterial({
          color: 0xa9bccb,
        });
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
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
        // Procedural volume is visual art, not a heat-transfer or chemical-kinetics solver.
        let animationTime = 0,
          lastTime = 0;
        renderer.setAnimationLoop((time) => {
          const delta = lastTime
            ? Math.min((time - lastTime) * 0.001, 0.05)
            : 0;
          lastTime = time;
          if (!visible || document.hidden) return;
          const { scenario: s, paused: isPaused } = latest.current;
          if (!reduced.matches && !isPaused) animationTime += delta;
          material.uniforms.uTime.value = animationTime;
          material.uniforms.uGravity.value =
            environments[s.environment].gravityRatio;
          material.uniforms.uFlow.value = s.airflow / 25;
          material.uniforms.uOxygen.value = s.oxygen / 100;
          material.uniforms.uCool.value = s.cool ? 1 : 0;
          material.uniforms.uAngle.value = angle;
          fuel.visible = s.sample !== "droplet";
          droplet.visible = s.sample === "droplet";
          fuel.scale.x = s.sample === "fabric" ? 1 : 0.7;
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
          material.dispose();
          fuelGeometry.dispose();
          fuelMaterial.dispose();
          dropletGeometry.dispose();
          dropletMaterial.dispose();
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
