import { Vec3 } from "cannon-es";
import { getMotorActive } from "./controlsMotor";
import { world } from "../physics/world";
import { Quaternion } from "three";


const input = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false,
};

export function initControls() {
    window.addEventListener("keydown", function (event) {
        handleKey(event, true);
    });
    window.addEventListener("keyup", function (event) {
        handleKey(event, false);
    });
}

function handleKey(event, isPressed) {
    switch (event.key) {
        case "w":
            input.forward = isPressed;
            break;
        case "s":
            input.backward = isPressed;
            break;
        case "a":
            input.left = isPressed;
            break;
        case "d":
            input.right = isPressed;
            break;
        case "q":
            input.rotateLeft = isPressed;
            break;
        case "e":
            input.rotateRight = isPressed;
            break;
        case " ":
            input.up = isPressed;
            break;
        case "Shift":
            input.down = isPressed;
            break;
    }
}

export function updateHeli(heliBody){
    if (!getMotorActive()) return;

    const force = new Vec3(0, 0, 0);

    if (input.forward) force.z += 2;
    if (input.backward) force.z -= 2;
    if (input.left) force.x += 2;
    if (input.right) force.x -= 2;
    if (input.up) force.y += 1;
    if (input.down) force.y -= 1;

    if(!force.almostZero()){
        heliBody.applyLocalImpulse(force, heliBody.position);
    }

    if (input.rotateLeft) {
        heliBody.angularVelocity.y += 0.02;
    }
    if (input.rotateRight) {
        heliBody.angularVelocity.y -= 0.02;
    }

}

export function updateGravity() {
    if (getMotorActive()){
        world.gravity.set(0, 0, 0);
    }
    else {
        world.gravity.set(0, -9.81, 0);
    }


}
