import {Scene3D} from '../scene3D';
import {StaticObjectsScene4} from './StaticObjectsScene4';
import {AnimObjectsScene4} from './AnimObjectsScene4';
import {degToRadians} from '../../utilsGeometry';

export class SceneStory4 extends Scene3D {
  constructor() {
    super(4);
    this.objects = new StaticObjectsScene4();
    this.objects.rotateX(degToRadians(10));

  }

  async setScene() {
    super.setScene();
    this.scene.add(this.objects);
    await this.initAnimObject(AnimObjectsScene4);
    this.renderScene();
  }
}
