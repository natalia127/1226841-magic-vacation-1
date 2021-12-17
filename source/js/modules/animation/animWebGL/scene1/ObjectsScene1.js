import * as THREE from 'three';
import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {degToRadians} from '../../utilsGeometry';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {Mat} from './Mat';
import {Saturn} from './Saturn';
export class ObjectsScene1 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addFlower();
    this.addMat();
    this.addSaturn();

  }
  addMat() {
    const mat = new Mat();
    mat.rotation.copy(new THREE.Euler(degToRadians(20), degToRadians(-50), degToRadians(0)), `XYZ`);
    mat.position.set(0, -30, -600);
    this.add(mat);
  }
  addSaturn() {
    const saturn = new Saturn();
    saturn.position.set(70, 260, 0);
    this.add(saturn);
  }
  addFlower() {
    const flower = new ExtrudedSvg(this.mapShapes, `flower`);
    flower.position.set(-290, 165, 100);
    flower.rotation.copy(new THREE.Euler(degToRadians(180), degToRadians(-20), degToRadians(-8)), `XYZ`);
    flower.scale.set(0.8, 0.8, 0.8);
    this.add(flower);
  }
}
