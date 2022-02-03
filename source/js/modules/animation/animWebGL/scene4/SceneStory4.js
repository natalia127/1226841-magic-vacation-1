import {Scene3D} from '../scene3D';
import {ObjectsScene4} from './ObjectsScene4';
import {degToRadians} from '../../utilsGeometry';

export class SceneStory4 extends Scene3D {
  constructor() {
    super(4);
    this.objects = new ObjectsScene4();
    this.objects.rotateX(degToRadians(10));

  }

  setScene() {
    super.setScene();
    this.scene.add(this.objects);
    this.renderScene();
  }
}
