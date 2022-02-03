import * as THREE from 'three';
import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {degToRadians} from '../../utilsGeometry';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {Mat} from '../generalObjects/Mat';
import {Saturn} from '../generalObjects/Saturn';
import {mapColors} from '../generalSettings/colors';
import {SceneBase} from '../generalObjects/SceneBase';
import {getMapModels} from '../loadModels/modelsLoader';


export class ObjectsScene1 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.mapModels = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.mapModels = await getMapModels([`dog`]);
    this.addSceneBase();
    this.addMat();
    this.addFlower();
    this.addSaturn();
    this.addDog();
  }

  addMat() {
    const mat = new Mat();
    mat.rotation.copy(new THREE.Euler(0, degToRadians(-45), 0), `XYZ`);
    mat.position.set(0, -130, 30);
    this.add(mat);
  }
  addSaturn() {
    const saturn = new Saturn({castShadow: true});
    saturn.position.set(0, 260, 300);
    this.add(saturn);
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

  addDog() {
    const obj = this.mapModels[`dog`].model;
    obj.position.set(50, -130, 640);
    obj.rotation.copy(new THREE.Euler(0, 15 * THREE.Math.DEG2RAD, 0));
    this.add(obj);
  }
}
