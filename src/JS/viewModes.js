
// Import the THREE.js library
import * as THREE from 'three';

let wireframe, shading, backfaceCulling = false;

export function views(scene){

    //Wireframe
    window.addEventListener('keydown', (event) => {
        if (event.key === 'o'){
            wireframe = !wireframe;
            wireframeUpdateUI();
            scene.traverse((child) => {
                if (child.isMesh && child.material){
                    child.material.wireframe = !child.material.wireframe;
                }
            });
        }
    });

    // flat Shading
    window.addEventListener('keydown', (event) =>{
        if (event.key === 'p'){
            shading = !shading;
            console.log('flat')
            flatShadingUpdateUI();
            scene.traverse((child) =>{
                if (child.isMesh && child.material){
                    const currentState = child.material.flatShading;
                    child.material.flatShading = !currentState;
                    child.material.needsUpdate = true;
                }
            });
        }
    });

    //Backface Culling
    window.addEventListener('keydown', (event) =>{
        if (event.key === 'l'){
            backfaceCulling = !backfaceCulling
            backfaceCullingUpdateUI();
            scene.traverse((child) =>{
                if (child.isMesh && child.material){
                    child.material.side = (child.material.side === THREE.FrontSide)
                        ? THREE.DoubleSide
                        : THREE.FrontSide;
                    child.material.needsUpdate = true;

                }
            })
        }
    })
}

function wireframeUpdateUI(){
    const wire = document.getElementById('wireframe');
    if (wire){
        wire.innerText = wireframe ? 'Wireframe: AN 🟢 (o)' : 'Wireframe: Aus 🔴 (o)';
    }
}

function flatShadingUpdateUI(){
    const flatShading = document.getElementById('flat-shading');
    if (flatShading){
        flatShading.innerText = shading ? 'Flat Shading: AN 🟢 (p)' : 'Flat Shading: Aus 🔴 (p)';
    }
}

function backfaceCullingUpdateUI(){
    const back = document.getElementById('backface-culling');
    if (back){
        back.innerText = backfaceCulling ? 'Backface Culling: AN 🟢 (l)' : 'Backface Culling: Aus 🔴 (l)';
    }
}



