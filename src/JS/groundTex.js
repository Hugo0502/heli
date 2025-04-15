import * as THREE from 'three';

export function createGround(scene){
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load('textures/ground.jpg')

    groundTexture.wrapS = THREE.RepeatWrapping; // Wiederholung in horizontaler Richtung
    groundTexture.wrapT = THREE.RepeatWrapping; // Wiederholung in vertikaler Richtung
    groundTexture.repeat.set(10, 10); // Anzahl der Wiederholungen (10x10)

    const groundGeo = new THREE.PlaneGeometry(600 ,600);
    const groundMat = new THREE.MeshStandardMaterial({ map: groundTexture });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = 0;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);
}