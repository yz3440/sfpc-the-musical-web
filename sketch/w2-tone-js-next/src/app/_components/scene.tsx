"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
  Clouds,
  Cloud,
  OrbitControls,
  PerspectiveCamera,
  Html,
  Outlines,
} from "@react-three/drei";
import { useState } from "react";

import { useMainStore } from "@/store/main-store";

export default function Scene() {
  const mainStore = useMainStore();

  const [cameraRotation, setCameraRotation] = useState<THREE.Euler>(
    new THREE.Euler(),
  );
  useFrame(({ clock }) => {
    // console.log(clock.elapsedTime);
    // setCameraRotation(new THREE.Euler(0, cameraRotation.y + 0.01, 0));
  });
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 0]}
        fov={75}
        rotation={cameraRotation}
      />
      {/* <OrbitControls /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <mesh
        position={[0, 0, -2]}
        onClick={() => {
          if (mainStore.synth) mainStore.synth.triggerAttackRelease("C4", "8n");
        }}
      >
        <boxGeometry />
        <meshStandardMaterial />
        {/* <Outlines thickness={0.05} color="hotpink" /> */}
      </mesh>

      <mesh position={[0, 0, 2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={1}
          scale={3}
          bounds={[2, 2, 2]}
          volume={10}
          color="hotpink"
          fade={100}
          speed={0.1}
        />
      </Clouds>
      <Html
        position={[2, 2, 0]}
        // occlude="blending"
        material={
          <meshPhysicalMaterial
            side={THREE.DoubleSide} // Required
            opacity={0.1} // Degree of influence of lighting on the HTML
          />
        }
      >
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold">Hello, world!</h1>
          <p className="text-gray-500">This is a 3D scene with clouds.</p>
        </div>
      </Html>
    </>
  );
}
