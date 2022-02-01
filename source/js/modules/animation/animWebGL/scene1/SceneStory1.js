import {Scene3D} from '../scene3D';
import {ObjectsScene1} from './ObjectsScene1';

export class SceneStory1 extends Scene3D {
  constructor() {
    super(1);
  }

  setScene() {
    super.setScene();
    this.scene.add(new ObjectsScene1());
    this.renderScene();


  }
}
