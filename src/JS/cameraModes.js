import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { exp } from 'three/src/nodes/TSL.js';

let cameraMode = 'orbit'; // Default camera mode
let controls;

export function initCameraModes(camera, renderer){
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enabled = false; 

    window.addEventListener('keydown', (event) => {
        if (event.key === '1') cameraMode = 'orbit';
        if (event.key === '2') cameraMode = 'follow';
        if (event.key === '3') cameraMode = 'cockpit';
    });
}

export function updateCamera(camera, heliMesh) {
    if (!heliMesh) return; // Wenn das Helikopter-Mesh nicht geladen ist, nichts tun

    if (cameraMode === 'orbit') {
        controls.enabled = true;
        controls.target.copy(heliMesh.position);
        controls.update();
    }
    else {
        controls.enabled = false;
    }

    if (cameraMode === 'follow') {
        const offsetFollow = new THREE.Vector3(0, 7, -11);
        const posHeli = heliMesh.position.clone().add(offsetFollow.applyQuaternion(heliMesh.quaternion));
        camera.position.lerp(posHeli, 0.1);
        camera.lookAt(heliMesh.position);
    }

    if (cameraMode === 'cockpit') {
        const cockpitOffset = new THREE.Vector3(0,3.5,0.5);
        const posWorld = heliMesh.localToWorld(cockpitOffset.clone());
        camera.position.copy(posWorld);
        const lookTarget = heliMesh.localToWorld(new THREE.Vector3(0, 0, 7));
        camera.lookAt(lookTarget);

    }
}