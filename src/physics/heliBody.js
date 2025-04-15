
import { Body, Box, Vec3 } from 'cannon-es';

export function createHeliBody() {
  const shape = new Box(new Vec3(0,0,0)); // grobe Bounding-Box

  const body = new Body({
    mass: 5,
    position: new Vec3(0, 10, 0),
    shape: shape,
  });
  return body;
}

