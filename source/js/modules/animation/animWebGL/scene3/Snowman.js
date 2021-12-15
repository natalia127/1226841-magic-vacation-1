import * as THREE from 'three';
import {degToRadians} from '../../utils';

export class Snowman extends THREE.Group {
  constructor() {
    super();
    this.baseMaterial = new THREE.MeshStandardMaterial({color: 0xb2d0f4});

    this.constructChildren();

  }
  constructChildren() {
    this.addHead();
    this.addBody();
    this.addCarrot();
  }

  addHead() {
    const head = new THREE.Mesh(new THREE.SphereGeometry(44, 30, 30), this.baseMaterial);
    this.add(head);
  }

  addBody() {
    const body = new THREE.Mesh(new THREE.SphereGeometry(75, 30, 30), this.baseMaterial);
    body.position.set(0, -105, 0);
    this.add(body);
  }

  addCarrot() {
    const carrot = new THREE.Mesh(new THREE.ConeGeometry(18, 75, 30), new THREE.MeshStandardMaterial({color: 0xff4500}));
    carrot.position.set(50, 0, 0);
    carrot.rotateZ(degToRadians(-90));
    this.add(carrot);
  }
}
