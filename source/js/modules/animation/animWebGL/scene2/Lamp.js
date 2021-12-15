import * as THREE from 'three';
export class Lamp extends THREE.Group {
  constructor() {
    super();
    this.material = new THREE.MeshStandardMaterial({color: 0x514EF3});

    this.constructChildren();
  }
  constructChildren() {
    this.addBase();
    this.addMiddle();
    this.addTop();
  }

  addBase() {
    const geometryCylinder = new THREE.CylinderGeometry(16, 16, 120, 32);
    const cylinder = new THREE.Mesh(geometryCylinder, this.material);
    this.add(cylinder);

    const geometrySphere = new THREE.SphereGeometry(16, 30, 30);
    geometrySphere.thetaStart = -(Math.PI * 0.5);
    const sphere = new THREE.Mesh(geometrySphere, this.material);
    sphere.position.set(0, 60, 0);
    this.add(sphere);
  }
  addMiddle() {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 230), this.material);
    pole.position.set(0, 189, 0);
    this.add(pole);

  }
  addTop() {
    const lampBottom = new THREE.Mesh(new THREE.CylinderGeometry(37, 37, 4, 4), this.material);
    lampBottom.position.set(0, 306, 0);
    this.add(lampBottom);

    const lampMid = new THREE.Mesh(new THREE.CylinderGeometry(42, 34, 60, 4), new THREE.MeshStandardMaterial({color: 0xAE9BFF}));
    lampMid.position.set(0, 334, 0);
    this.add(lampMid);

    const lampUpper = new THREE.Mesh(new THREE.CylinderGeometry(45, 57, 6, 4), this.material);
    lampUpper.position.set(0, 367, 0);
    this.add(lampUpper);
  }

}
