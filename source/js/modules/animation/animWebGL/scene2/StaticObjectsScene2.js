import * as THREE from 'three';
import {Lamp} from './Lamp';
import {degToRadians} from '../../utilsGeometry';

import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';
import {SOFT} from "../generalSettings/typeMaterials";
import {SceneBase} from '../generalObjects/SceneBase';

export class StaticObjectsScene2 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();

  }
  init() {
  }
  constructChildren() {
    this.addSceneBase();
    this.addPyramid();
    this.addLamp();
  }


  addSceneBase() {
    const sceneBase = new SceneBase({
      keysModels: {
        staticScene: `staticScene2`,
        wallScene: `wallScene2`
      },
      colorFooter: mapColors.brightBlue
    },
    );
    this.add(sceneBase);
  }

  addLamp() {
    const lamp = new Lamp();
    lamp.position.set(400, -75, 550);
    lamp.rotateY(degToRadians(-20));
    this.add(lamp);

  }
  addPyramid() {
    const material = getMaterial(SOFT, {color: mapColors.blue});
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(250, 280, 4), material);

    mesh.scale.set(0.7, 0.9, 0.7);
    mesh.rotateY(degToRadians(8));
    mesh.position.set(0, 0, 395);
    mesh.castShadow = true;
    this.add(mesh);
  }


}
