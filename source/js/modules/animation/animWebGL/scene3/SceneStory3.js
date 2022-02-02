import {Scene3D} from '../scene3D';
import {ObjectsScene3} from './ObjectsScene3';
import {degToRadians} from '../../utilsGeometry';

export class SceneStory3 extends Scene3D {
  constructor() {
    super(3);
    this.objects = new ObjectsScene3();
    this.objects.rotateX(degToRadians(45));

  }

  setScene() {
    super.setScene();
    this.scene.add(this.objects);
    this.renderScene();


  }
}
