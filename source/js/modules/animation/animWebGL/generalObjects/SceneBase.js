import * as THREE from 'three';

import {getMapModels} from '../loadModels/modelsLoader';
import {Footer} from './Footer';
import {getMaterial} from '../generalSettings/getMaterial';
import {SOFT} from '../generalSettings/typeMaterials';

export class SceneBase extends THREE.Group {
  constructor(options) {
    super();
    this.keysModels = Object.values(options.keysModels);
    this.options = options;
    this.mapModels = null;
    this.constructChildren();
  }
  async constructChildren() {
    const keys = [...this.keysModels, `suitcase`];
    this.mapModels = await getMapModels(keys);

    this.addFooter();
    this.addWall();
    this.addStaticScene();
  }

  addStaticScene() {
    const staticScene1 = this.mapModels[this.options.keysModels.staticScene].model;
    staticScene1.rotation.copy(new THREE.Euler(0, -45 * THREE.Math.DEG2RAD, 0));
    staticScene1.position.set(0, -130, 0);
    this.add(staticScene1);
  }
  addWall() {
    const wall = this.mapModels[this.options.keysModels.wallScene].model;
    wall.rotation.copy(new THREE.Euler(0, -45 * THREE.Math.DEG2RAD, 0));
    wall.position.set(0, -130, 0);
    this.add(wall);
  }
  addFooter() {
    const material = getMaterial(SOFT, {
      color: this.options.colorFooter
    });
    const footer = new Footer(material);
    footer.rotation.copy(new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0));
    footer.position.set(0, -130, 0);
    this.add(footer);
  }
}
