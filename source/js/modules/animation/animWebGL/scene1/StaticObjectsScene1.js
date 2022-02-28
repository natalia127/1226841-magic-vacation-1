import * as THREE from 'three';
import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {degToRadians} from '../../utilsGeometry';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {Mat} from '../generalObjects/Mat';
import {mapColors} from '../generalSettings/colors';
import {SceneBase} from '../generalObjects/SceneBase';


export class StaticObjectsScene1 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
    this.name = `staticScene`;

  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();

    this.addSceneBase();
    this.addMat();
    this.addFlower();
  }

  addMat() {
    const mat = new Mat();
    mat.rotation.copy(new THREE.Euler(0, degToRadians(-45), 0), `XYZ`);
    mat.position.set(0, -130, 30);
    this.add(mat);
  }

  addFlower() {
    const flower = new ExtrudedSvg(this.mapShapes, `flower`);
    flower.position.set(-290, 290, 370);
    flower.rotation.copy(new THREE.Euler(degToRadians(180), degToRadians(-40), 0), `XYZ`);
    this.add(flower);
  }

  addSceneBase() {
    const sceneBase = new SceneBase({
      keysModels: {
        staticScene: `staticScene1`,
        wallScene: `wallScene1`
      },
      colorFooter: mapColors.darkPurple
    },
    );
    this.add(sceneBase);
  }
}
