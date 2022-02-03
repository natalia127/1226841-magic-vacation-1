import * as THREE from 'three';
import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';
import {SOFT} from "../generalSettings/typeMaterials";
export class Lamp extends THREE.Group {
  constructor() {
    super();
    this.baseMaterial = getMaterial(SOFT, {color: mapColors.blue});
    this.constructChildren();
  }
  constructChildren() {
    this.addBase();
    this.addMiddle();
    this.addTop();
  }

  addBase() {
    const geometryCylinder = new THREE.CylinderGeometry(16, 16, 120, 32);
    const cylinder = new THREE.Mesh(geometryCylinder, this.baseMaterial);
    cylinder.castShadow = true;

    this.add(cylinder);

    const geometrySphere = new THREE.SphereGeometry(16, 30, 30);
    geometrySphere.thetaStart = -(Math.PI * 0.5);
    const sphere = new THREE.Mesh(geometrySphere, this.baseMaterial);
    sphere.position.set(0, 60, 0);
    sphere.castShadow = true;
    this.add(sphere);
  }
  addMiddle() {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 230), this.baseMaterial);
    pole.position.set(0, 189, 0);
    pole.castShadow = true;
    this.add(pole);

  }
  addTop() {
    const lampBottom = new THREE.Mesh(new THREE.CylinderGeometry(37, 37, 4, 4), this.baseMaterial);
    lampBottom.position.set(0, 306, 0);
    lampBottom.castShadow = true;
    this.add(lampBottom);

    const lampMid = new THREE.Mesh(new THREE.CylinderGeometry(42, 34, 60, 4), getMaterial(SOFT, {color: mapColors.lightBlue}));
    lampMid.position.set(0, 334, 0);
    lampMid.castShadow = true;
    this.add(lampMid);

    const lampUpper = new THREE.Mesh(new THREE.CylinderGeometry(45, 57, 6, 4), this.baseMaterial);
    lampUpper.position.set(0, 367, 0);
    lampUpper.castShadow = true;

    this.add(lampUpper);
  }

}
