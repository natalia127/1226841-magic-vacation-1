import {Scene3D} from '../scene3D';
import {ObjectsScene1} from './ObjectsScene1';
import {AnimObjectsScene1} from './AnimObjectsScene1';
import {degToRadians} from '../../utilsGeometry';

export class SceneStory1 extends Scene3D {
  constructor() {
    super(1);
    this.objects = null;
  }
  setObjects() {
    this.objects = new ObjectsScene1();
    this.objects.rotateX(degToRadians(10));
  }
  async setScene() {
    super.setScene();
    if (!this.objects) {
      this.setObjects();
    }
    let animObjects = new AnimObjectsScene1();
    await animObjects.init();
    this.figures = animObjects.figures;
    this.scene.add(this.objects);
    this.renderScene();
  }
}
