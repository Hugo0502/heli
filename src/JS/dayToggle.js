import * as THREE from 'three';

let isDay = true;

let sunLight, moonLight, ambient;
let heliSpotlight;
let sunPosition = new THREE.Vector3(1000, 500, 0);
let moonPosition = new THREE.Vector3(-1000, 500, 0)

export function createDayNightLights(scene, heliMesh) {
  // Sonne
  sunLight = new THREE.DirectionalLight(0xfff3c4, 1);
  sunLight.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
  scene.add(sunLight);

  // Mond
  moonLight = new THREE.DirectionalLight(0xaaaaee, 0.4);
  moonLight.position.set(moonPosition.x, moonPosition.y, moonPosition.z);
  moonLight.visible = false; // Nachtlicht aus
  scene.add(moonLight);

  // Ambient Light
  ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  // Helikopter-Spotlight
  heliSpotlight = new THREE.SpotLight(0xffffff, 50, 50, Math.PI / 6, 0.3, 1);
  heliSpotlight.position.set(0, 1.5, 2); // vor dem Helikopter
  heliSpotlight.visible = false;

  // Zielpunkt des Spotlights – nach vorne/unten
  const target = new THREE.Object3D();
  target.position.set(0, 0, 10);
  heliMesh.add(target);
  heliSpotlight.target = target;

  // Spotlight zum Heli hinzufügen
  heliMesh.add(heliSpotlight);
  heliMesh.add(heliSpotlight.target);



  // Tasten-Event
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't') {
      isDay = !isDay;
      updateLighting(scene);
      toggleSunAndMoon();
      updateDayNightDOM();
    }
  });
}

function updateLighting(scene) {
    sunLight.visible = isDay;
    moonLight.visible = !isDay;
    ambient.intensity = isDay ? 0.3 : 0.1;
  
    // Hintergrundfarbe anpassen
    scene.background = new THREE.Color(isDay ? 0xaec6cf : 0x0a0a22);
  
    // Spotlight & Lichtkegel
    heliSpotlight.visible = !isDay;
}

let sunSphere, moonSphere;

export function createSunMoon(scene) {
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load('textures/sun.jpg');
    const moonTexture = textureLoader.load('textures/moon.jpg');

    const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
    sunSphere = new THREE.Mesh(sunGeometry, sunMaterial);
    sunSphere.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    scene.add(sunSphere);

    const moonGeometry = new THREE.SphereGeometry(30, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({map: moonTexture});
    moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
    moonSphere.position.set(moonPosition.x, moonPosition.y, moonPosition.z);
    moonSphere.visible = false;
    scene.add(moonSphere);


}

export function toggleSunAndMoon(){
    sunSphere.visible = isDay
    moonSphere.visible = !isDay
}

function updateDayNightDOM(){
  const toggleDayNight = document.getElementById('toggle-day-night')
  if(toggleDayNight){
    toggleDayNight.innerText = isDay ? 'Tageszeit: Tag ☀️ (t)' : 'Tageszeit: Nacht 🌙 (t)'
  }

}