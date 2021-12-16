import * as THREE from 'three';
import {getLathePointsForCircle} from '../../utilsGeometry';

export class Saturn extends THREE.Group {
  constructor() {
    super();

    this.color1 = 0xfc2947;
    this.color2 = 0x5b3ea5;
    this.color3 = 0x8388ab;
    this.spereBigPosition = null;
    this.cylinderPosition = null;
    this.radiusBigSpere = 60;
    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
    this.addCylinder();
    this.addSphereSmall();
  }

  addSphereBig() {
    const geometry = new THREE.SphereGeometry(this.radiusBigSpere, 50, 50);
    const material = new THREE.MeshStandardMaterial({color: 0xfc2947});
    const sphereBig = new THREE.Mesh(geometry, material);
    this.spereBigPosition = sphereBig.position;

    this.add(sphereBig);
  }

  addRing() {
    const points = getLathePointsForCircle((120 - 80), 2, 80);

    const geometry = new THREE.LatheBufferGeometry(points, 50);
    const ring = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: this.color2, flatShading: true, side: THREE.DoubleSide}));
    ring.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(ring);
  }

  addCylinder() {
    const geometry = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    const cylinder = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: this.color3, flatShading: true}));
    const topOffset = this.spereBigPosition.y + geometry.parameters.height / 2;
    cylinder.position.set(0, topOffset, 0);
    this.cylinderPosition = cylinder.position;
    this.add(cylinder);
  }

  addSphereSmall() {
    const geometry = new THREE.SphereGeometry(10, 30, 30);
    const sphereSmall = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: this.color2, flatShading: true}));
    const topOffset = this.spereBigPosition.y + this.radiusBigSpere * 2;
    sphereSmall.position.set(this.cylinderPosition.x, topOffset, this.cylinderPosition.z);
    this.add(sphereSmall);
  }
}

