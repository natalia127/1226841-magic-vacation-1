import * as THREE from 'three';

import {getMapModels} from '../loadModels/modelsLoader';

export class Suitcase extends THREE.Group {
  constructor() {
    super();
    this.mapModels = null;
  }
  async init() {
    await this.constructChildren();
  }
  async constructChildren() {
    this.mapModels = await getMapModels([`suitcase`]);
    this.addSuitcase();

  }
  addSuitcase() {
    const suitcase = this.mapModels[`suitcase`].model.clone();
    suitcase.scale.set(0.7, 0.7, 0.7);
    this.add(suitcase);
  }
}
