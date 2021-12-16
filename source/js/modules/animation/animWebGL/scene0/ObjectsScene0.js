import * as THREE from 'three';
import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {degToRadians} from '../../utilsGeometry';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
export class ObjectsScene0 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addFlamingo();
    this.addQuestion();
    this.addSnowflake();
    this.addLeaf();
    this.addKeyhole();
  }
  addFlamingo() {
    const flamingo = new ExtrudedSvg(this.mapShapes, `flamingo`);
    flamingo.position.set(-550, 410, 40);
    flamingo.scale.set(2, 2, 1);

    flamingo.rotateZ(degToRadians(-160));
    this.add(flamingo);
  }

  addQuestion() {
    const question = new ExtrudedSvg(this.mapShapes, `question`);
    question.position.set(100, -310, 100);
    question.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(10), degToRadians(20)), `XYZ`);
    question.scale.set(1.5, -1.5, 1.5);
    this.add(question);
  }

  addSnowflake() {
    const snowflake = new ExtrudedSvg(this.mapShapes, `snowflake`);
    snowflake.position.set(-450, -10, 100);
    snowflake.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(20), degToRadians(20)), `XYZ`);
    snowflake.scale.set(1.3, 1.3, 1.3);
    this.add(snowflake);
  }
  addLeaf() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leafIntro`);
    leaf.position.set(560, 230, 50);
    leaf.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(10), degToRadians(-60)), `XYZ`);
    leaf.scale.set(1, -1, 1);
    this.add(leaf);
  }
  addKeyhole() {
    const keyhole = new ExtrudedSvg(this.mapShapes, `keyhole`);
    keyhole.position.set(-1500, 1515, 0);
    keyhole.scale.set(1.5, -1.5, 1.5);
    this.add(keyhole);
  }
}
