import * as THREE from 'three';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {Saturn} from '../generalObjects/Saturn';
import {Mat} from '../generalObjects/Mat';
import {degToRadians} from '../../utilsGeometry';


export class ObjectsScene4 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addSaturn();
    this.addMat();

  }
  addMat() {
    const mat = new Mat(`dark`);
    mat.rotation.copy(new THREE.Euler(degToRadians(20), degToRadians(-50), degToRadians(0)), `XYZ`);
    mat.position.set(0, -30, -600);
    this.add(mat);
  }
  addSaturn() {
    const saturn = new Saturn(`dark`);
    saturn.position.set(70, 260, 0);
    this.add(saturn);
  }
}
