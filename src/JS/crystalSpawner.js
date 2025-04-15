import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const crystalClones = [];



export async function spawnCrystals(scene, count = 10) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load('/heli//models/crystal.glb', (gltf) => {
      const model = gltf.scene;

      for (let i = 0; i < count; i++) {
        const clone = model.clone(true);
        clone.position.set(
          Math.random() * 200 - 100, // x zwischen -200 und 200
          Math.abs(Math.random() * 50), // y (immer positiv, leicht über Boden)
          Math.random() * 200 - 100  // z zwischen -200 und 200
        );
        clone.scale.set(1.5,1.5,1.5);
        clone.name = `crystal_${i}`;

        crystalClones.push(clone);
        scene.add(clone);
      }

      resolve(crystalClones);
    }, undefined, reject);
  });
}

export function getCrystals() {
  return crystalClones;
}
