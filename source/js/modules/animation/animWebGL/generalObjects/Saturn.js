import * as THREE from 'three';
import {getLathePointsForCircle} from '../../utilsGeometry';
import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';
import {SOFT} from "../generalSettings/typeMaterials";

export class Saturn extends THREE.Group {
  constructor(nameTheme = `light`) {
    super();
    this.colors1 = null;
    this.colors2 = null;
    this.colors3 = null;
    this.nameTheme = nameTheme;
    this.spereBigPosition = null;
    this.cylinderPosition = null;
    this.radiusBigSpere = 60;
    this.constructChildren();
  }

  constructChildren() {
    this.setColorsTheme();
    this.addSphereBig();
    this.addRing();
    this.addCylinder();
    this.addSphereSmall();
  }

  setColorsTheme() {
    if (this.nameTheme === `light`) {
      this.colors1 = mapColors.dominantRed;
      this.colors2 = mapColors.brightBlue;
      this.colors3 = mapColors.metalGrey;
    } else {
      this.colors1 = mapColors.shadowedDominantRed;
      this.colors2 = mapColors.shadowedBrightPurple;
      this.colors3 = mapColors.metalGrey;
    }
  }

  addSphereBig() {
    const geometry = new THREE.SphereGeometry(this.radiusBigSpere, 50, 50);
    const material = getMaterial(SOFT, {color: this.colors1});
    const sphereBig = new THREE.Mesh(geometry, material);
    this.spereBigPosition = sphereBig.position;

    this.add(sphereBig);
  }

  addRing() {
    const points = getLathePointsForCircle((120 - 80), 2, 80);

    const geometry = new THREE.LatheBufferGeometry(points, 50);
    const material = getMaterial(SOFT, {color: this.colors2, side: THREE.DoubleSide});

    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(ring);
  }

  addCylinder() {
    const geometry = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    const material = getMaterial(SOFT, {color: this.colors3, flatShading: true});
    const cylinder = new THREE.Mesh(geometry, material);
    const topOffset = this.spereBigPosition.y + geometry.parameters.height / 2;
    cylinder.position.set(0, topOffset, 0);
    this.cylinderPosition = cylinder.position;
    this.add(cylinder);
  }

  addSphereSmall() {
    const geometry = new THREE.SphereGeometry(10, 30, 30);
    const material = getMaterial(SOFT, {color: this.colors2});
    const sphereSmall = new THREE.Mesh(geometry, material);
    const topOffset = this.spereBigPosition.y + this.radiusBigSpere * 2;
    sphereSmall.position.set(this.cylinderPosition.x, topOffset, this.cylinderPosition.z);
    this.add(sphereSmall);
  }
}

