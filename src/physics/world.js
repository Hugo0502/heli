import { World, Plane, Body, Vec3 } from 'cannon-es';

export const world = new World();
world.gravity.set(0, -9.81, 0);

export function createPhysicsWorld() {

  // Boden
  const groundBody = new Body({
    mass: 0,
    shape: new Plane(),
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Plane rotieren
  world.addBody(groundBody);

  return world;
}
