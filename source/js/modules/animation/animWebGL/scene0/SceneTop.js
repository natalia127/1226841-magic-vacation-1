import * as THREE from 'three';

import {Scene3D} from '../scene3D';
import {ObjectsScene0} from './ObjectsScene0';

export class SceneTop extends Scene3D {
  constructor() {
    super(0);
    this.objects = null;

  }
  setScene() {
    super.setScene();
    this.scene.add(new ObjectsScene0());

    this.renderScene();


  }
}
