import * as THREE from 'three';

import {Scene3D} from '../scene3D';
import {ObjectsScene0} from './ObjectsScene0';

export class SceneTop extends Scene3D {
  constructor() {
    super(0);
  }
  setScene() {
    let objects = new ObjectsScene0();
    this.figures = objects.figures;

    super.setScene();
    this.scene.add(objects);
    this.renderScene();


  }
}
