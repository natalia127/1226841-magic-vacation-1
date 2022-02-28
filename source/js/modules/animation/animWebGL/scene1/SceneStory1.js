import {Scene3D} from '../scene3D';
import {StaticObjectsScene1} from './StaticObjectsScene1';
import {AnimObjectsScene1} from './AnimObjectsScene1';
import {degToRadians} from '../../utilsGeometry';

export class SceneStory1 extends Scene3D {
  constructor() {
    super(1);
    this.objects = null;
  }
  async initObjects() {
    this.objects = new StaticObjectsScene1();
    this.objects.rotateX(degToRadians(10));

  }
  async setScene() {
    super.setScene();
    if (!this.objects) {
      await this.initObjects();
    }
    await this.initAnimObject(AnimObjectsScene1);


    this.scene.add(this.objects);
    this.renderScene();
  }
}
