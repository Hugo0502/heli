import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createScene } from './JS/scene.js';
import { createCamera, updateCameraOnResize } from './JS/camera.js';
import { initCameraModes, updateCamera } from './JS/cameraModes.js';
import { createRenderer } from './JS/renderer.js';
import { createPhysicsWorld } from './physics/world.js';
import { createHeliBody } from './physics/heliBody.js';
import { loadHelicopter } from './meshes/heli.js';
import { initControls as initMotorControls, getMotorActive, updateMotorUI } from './JS/controlsMotor.js';
import { initControls as initHeliControls, updateHeli, updateGravity } from './JS/controlsHeli.js';
import { createDayNightLights, createSunMoon } from './JS/dayToggle.js';
import { views } from './JS/viewModes.js';
import { spawnCrystals, getCrystals } from './JS/crystalSpawner.js';
import { checkCrystalCollision } from './JS/crystalCollision.js';
import { createGround } from './JS/groundTex.js';


import * as THREE from 'three';

export const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
updateCameraOnResize(camera, renderer);
initCameraModes(camera, renderer);
views(scene);

createGround(scene);

// erstellt Licht durch Tag/Nacht
createSunMoon(scene);

// Kristalle spawnen
let crystals = [];
spawnCrystals(scene).then((spawned) => {
  crystals = spawned;
});
let score = 0;

// Physik-Welt
const world = createPhysicsWorld();
const heliBody = createHeliBody();
heliBody.linearDamping = 0.8; 
heliBody.angularDamping = 0.8; 
world.addBody(heliBody);

// Steuerung Heli
initMotorControls();
initHeliControls();

// Helikopter-Objekt
let heliMesh;
let mainRotor;
let tailRotor;
loadHelicopter().then((model) => {
  heliMesh = model;
  scene.add(heliMesh);

  createDayNightLights(scene, heliMesh);
  mainRotor = heliMesh.getObjectByName('blades');
  tailRotor = heliMesh.getObjectByName('tail_rotor');
  animate(); 
});






// Animationsloop
function animate() {
  requestAnimationFrame(animate);

  world.step(1 / 60);

  // Synchronisierung Mesh <-> Physik
  if (heliMesh && heliBody) {
    heliMesh.position.copy(heliBody.position);
    heliMesh.quaternion.copy(heliBody.quaternion);

    checkCrystalCollision(heliMesh, crystals, scene);
    updateHeli(heliBody);
    updateGravity();
  }

  if (mainRotor && tailRotor&& getMotorActive()) {
    mainRotor.rotation.y += 0.1; 
    tailRotor.rotation.x += 0.2;

  }

  // updates
  updateCamera(camera, heliMesh);
  updateMotorUI();

  renderer.render(scene, camera);
}
animate();
