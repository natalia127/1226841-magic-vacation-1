import * as THREE from 'three';
import {degToRadians} from '../../utilsGeometry';
import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';
import {STRONG, SOFT} from "../generalSettings/typeMaterials";
export class Snowman extends THREE.Group {
  constructor() {
    super();
    this.baseMaterial = getMaterial(STRONG, {color: mapColors.snowColor});
    this.constructChildren();

  }
  constructChildren() {
    this.addHead();
    this.addBody();
    this.addCarrot();
  }

  addHead() {
    const head = new THREE.Mesh(new THREE.SphereGeometry(44, 50, 30), this.baseMaterial);
    head.castShadow = true;

    this.add(head);
  }

  addBody() {
    const body = new THREE.Mesh(new THREE.SphereGeometry(75, 50, 30), this.baseMaterial);
    body.position.set(0, -105, 0);
    body.castShadow = true;

    this.add(body);
  }

  addCarrot() {
    const carrot = new THREE.Mesh(new THREE.ConeGeometry(18, 75, 30), getMaterial(SOFT, {color: mapColors.orange}));
    carrot.position.set(50, 0, 0);
    carrot.rotateZ(degToRadians(-90));
    this.add(carrot);
  }
}
