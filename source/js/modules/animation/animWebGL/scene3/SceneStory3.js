import {Scene3D} from '../scene3D';
import {StaticObjectsScene3} from './StaticObjectsScene3';
import {AnimObjectsScene3} from './AnimObjectsScene3';
import {degToRadians} from '../../utilsGeometry';

export class SceneStory3 extends Scene3D {
  constructor() {
    super(3);

  }
  async initObjects() {
    this.objects = new StaticObjectsScene3();
    this.objects.rotateX(degToRadians(10));

  }
  async setScene() {
    super.setScene();
    if (!this.objects) {
      await this.initObjects();
    }
    await this.initAnimObject(AnimObjectsScene3);
    this.scene.add(this.objects);
    this.renderScene();


  }
}
