import * as THREE from 'three';

export function createLights(scene) {
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // Optional: weiteres Licht
  const ambientLight = new THREE.AmbientLight(0x404040); // weiches Grundlicht
  scene.add(ambientLight);

  return { dirLight, ambientLight }; // Rückgabe zur Steuerung
}