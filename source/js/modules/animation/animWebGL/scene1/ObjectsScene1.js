import * as THREE from 'three';
import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {degToRadians} from '../../utils';
import {getMapShapes} from '../extrudeSvg/shapeLoader';
export class ObjectsScene1 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addFlower();

  }
  addFlower() {
    const flower = new ExtrudedSvg(this.mapShapes, `flower`);
    flower.position.set(-290, 165, 100);
    flower.rotation.copy(new THREE.Euler(degToRadians(180), degToRadians(-20), degToRadians(-8)), `XYZ`);
    flower.scale.set(0.8, 0.8, 0.8);
    this.add(flower);
  }
}
