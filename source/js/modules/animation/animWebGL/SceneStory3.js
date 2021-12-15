import * as THREE from 'three';
import {Scene3D} from './scene3D';
import {ObjectsScene3} from './scene3/ObjectsScene3';

export class SceneStory3 extends Scene3D {
  constructor() {
    super(3);
    this.objects = new ObjectsScene3();
  }

  setScene() {
    super.setScene();
    this.scene.add(this.objects);
    this.renderScene();


  }
}
