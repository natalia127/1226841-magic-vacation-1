import * as THREE from 'three';
import {getLathePointsForCircle} from '../../utilsGeometry';
import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';
import {SOFT} from "../generalSettings/typeMaterials";

export class Saturn extends THREE.Group {
  constructor(options) {
    super();
    const optionsDefault =
    {nameTheme: `light`,
      withSmallSphere: true
    };
    options = {...optionsDefault, ...options};
    this.castShadow = options.castShadow;
    this.colors1 = null;
    this.colors2 = null;
    this.colors3 = null;
    this.nameTheme = options.nameTheme;
    this.spereBigPosition = null;
    this.cylinderPosition = null;
    this.radiusBigSpere = 60;
    this.withSmallSphere = options.withSmallSphere;
    this.constructChildren();
  }

  constructChildren() {
    this.setColorsTheme();
    const sphere = new THREE.Group();
    sphere.add(this.getSphereBig());
    sphere.add(this.getRing());
    sphere.name = `bigSphere`;
    this.add(sphere);
    if (this.withSmallSphere) {
      this.addCylinder();
      this.addSphereSmall();
    }

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

  getSphereBig() {
    const geometry = new THREE.SphereGeometry(this.radiusBigSpere, 50, 50);
    const material = getMaterial(SOFT, {color: this.colors1});
    const sphereBig = new THREE.Mesh(geometry, material);
    this.spereBigPosition = sphereBig.position;
    sphereBig.castShadow = this.castShadow;
    return sphereBig;
  }

  getRing() {
    const points = getLathePointsForCircle((120 - 80), 2, 80);

    const geometry = new THREE.LatheBufferGeometry(points, 50);
    const material = getMaterial(SOFT, {color: this.colors2, side: THREE.DoubleSide});

    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);
    ring.castShadow = this.castShadow;
    ring.name = `ring`;
    return ring;
  }

  addCylinder() {
    const geometry = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    const material = getMaterial(SOFT, {color: this.colors3, flatShading: true});
    const cylinder = new THREE.Mesh(geometry, material);
    const topOffset = this.spereBigPosition.y + geometry.parameters.height / 2;
    cylinder.position.set(0, topOffset, 0);
    this.cylinderPosition = cylinder.position;
    cylinder.castShadow = this.castShadow;

    this.add(cylinder);
  }

  addSphereSmall() {
    const geometry = new THREE.SphereGeometry(10, 30, 30);
    const material = getMaterial(SOFT, {color: this.colors2});
    const sphereSmall = new THREE.Mesh(geometry, material);
    const topOffset = this.spereBigPosition.y + this.radiusBigSpere * 2;
    sphereSmall.position.set(this.cylinderPosition.x, topOffset, this.cylinderPosition.z);
    sphereSmall.castShadow = this.castShadow;

    this.add(sphereSmall);
  }
}

