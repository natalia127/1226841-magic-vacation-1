import * as THREE from 'three';
import {Snowman} from './Snowman';
import {degToRadians} from '../../utils';

export class ObjectsScene3 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  constructChildren() {
    this.addSnowman();
  }
  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(-130, -20, 0);
    snowman.rotateX(degToRadians(6));
    snowman.rotateY(degToRadians(-50));
    this.add(snowman);
  }

}
