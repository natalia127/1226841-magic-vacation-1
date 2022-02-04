import * as THREE from 'three';

import {getMapModels} from '../loadModels/modelsLoader';

export class Suitcase extends THREE.Group {
  constructor() {
    super();
    this.mapModels = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapModels = await getMapModels([`suitcase`]);
    this.addSuitcase();

  }
  addSuitcase() {
    const suitcase = this.mapModels[`suitcase`].model.clone();
    suitcase.position.set(-300, -130, 840);
    suitcase.rotation.copy(new THREE.Euler(0, -10 * THREE.Math.DEG2RAD, 0));
    suitcase.scale.set(0.7, 0.7, 0.7);
    this.add(suitcase);
  }
}
