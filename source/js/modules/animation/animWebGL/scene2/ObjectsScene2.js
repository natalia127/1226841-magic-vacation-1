import * as THREE from 'three';
import {Lamp} from './Lamp';
import {degToRadians} from '../../utils';
export class ObjectsScene2 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  constructChildren() {
    this.addPyramid();
    this.addLamp();

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
}
