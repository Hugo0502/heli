import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadHelicopter() {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      '/heli/models/helicopter.glb', 
      (gltf) => {
        console.log('Helikopter geladen:', gltf);
        const model = gltf.scene;
        model.scale.set(1,1,1); // Größe anpassen
        model.position.set(0, 10, 0);
        resolve(model);
      },
      undefined,
      (error) => {
        console.error('Fehler beim Laden des Helikopters:', error);
        reject(error);
      }
    );
  });
}
