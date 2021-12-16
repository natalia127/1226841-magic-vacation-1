import * as THREE from 'three';
import {Lamp} from './Lamp';
import {degToRadians} from '../../utilsGeometry';

import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {getMapShapes} from '../extrudeSvg/shapeLoader';
export class ObjectsScene2 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addPyramid();
    this.addLamp();
    this.addLeaf1();
    this.addLeaf2();
  }
  addLamp() {
    const lamp = new Lamp();
    lamp.position.set(400, -220, 0);
    lamp.rotateX(degToRadians(6));
    lamp.rotateY(degToRadians(-20));

    this.add(lamp);

  }
  addPyramid() {
    const material = new THREE.MeshStandardMaterial({
      color: 0x514EF3,
    });
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(250, 280, 4), material);

    mesh.scale.set(0.65, 0.9, 0.6);
    mesh.rotateY(degToRadians(8));
    mesh.rotateX(degToRadians(6));
    mesh.position.set(-10, -75, 25);
    this.add(mesh);
  }
  addLeaf1() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leaf1Scene2`);
    leaf.position.set(-250, 120, 50);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(10), degToRadians(-1)), `XYZ`);
    leaf.scale.set(2.3, -2.3, 0.9);
    this.add(leaf);
  }

  addLeaf2() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leaf2Scene2`);
    leaf.position.set(-270, -140, 30);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(10), degToRadians(45)), `XYZ`);
    leaf.scale.set(1.7, -1.7, 0.7);
    this.add(leaf);
  }
}
