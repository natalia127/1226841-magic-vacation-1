import * as THREE from 'three';
import {Snowman} from './Snowman';
import {Road} from './Road';
import {degToRadians} from '../../utilsGeometry';
import {SceneBase} from '../generalObjects/SceneBase';
import {mapColors} from '../generalSettings/colors';

export class StaticObjectsScene3 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  async constructChildren() {

    this.addSnowman();
    this.addRoad();
    this.addSceneBase();
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(-50, 100, 400);
    snowman.rotateY(degToRadians(-50));
    this.add(snowman);
  }
  addRoad() {
    const road = new Road();
    road.rotation.copy(new THREE.Euler(degToRadians(0), degToRadians(45), degToRadians(180)), `XYZ`);
    road.position.set(0, -125, 30);
    this.add(road);
  }
  addSceneBase() {
    const sceneBase = new SceneBase({
      keysModels: {
        staticScene: `staticScene3`,
        wallScene: `wallScene3`
      },
      colorFooter: mapColors.mountainBlue
    },
    );
    this.add(sceneBase);
  }

}
