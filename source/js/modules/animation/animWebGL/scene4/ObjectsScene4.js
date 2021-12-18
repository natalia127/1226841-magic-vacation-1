import * as THREE from 'three';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {Saturn} from '../generalObjects/Saturn';
export class ObjectsScene4 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addSaturn();

  }
  addSaturn() {
    const saturn = new Saturn(`dark`);
    saturn.position.set(70, 260, 0);
    this.add(saturn);
  }
}
