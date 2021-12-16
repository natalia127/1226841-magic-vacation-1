import * as THREE from 'three';
import {Snowman} from './Snowman';
import {Road} from './Road';
import {degToRadians} from '../../utilsGeometry';


export class ObjectsScene3 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  constructChildren() {
    this.addSnowman();
    this.addRoad();
  }
  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(-130, -20, 0);
    snowman.rotateX(degToRadians(6));
    snowman.rotateY(degToRadians(-50));
    this.add(snowman);
  }
  addRoad() {
    const road = new Road();
    road.rotation.copy(new THREE.Euler(degToRadians(0), degToRadians(45), degToRadians(180)), `XYZ`);
    road.position.set(-40, -220, -400);
    this.add(road);
  }

}
