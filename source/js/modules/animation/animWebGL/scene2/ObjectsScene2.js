import * as THREE from 'three';
import {Lamp} from './Lamp';
import {degToRadians} from '../../utilsGeometry';

import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';
import {SOFT} from "../generalSettings/typeMaterials";
import {SceneBase} from '../generalObjects/SceneBase';

export class ObjectsScene2 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addSceneBase();
    this.addPyramid();
    this.addLamp();
    this.addLeaf1();
    this.addLeaf2();
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
  addLeaf1() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leaf1Scene2`);
    leaf.position.set(-250, 120, 370);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(40), degToRadians(-1)), `XYZ`);
    leaf.scale.set(2.3, -2.3, 0.9);
    this.add(leaf);
  }

  addLeaf2() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leaf2Scene2`);
    leaf.position.set(-320, -20, 420);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(40), degToRadians(45)), `XYZ`);
    leaf.scale.set(1.7, -1.7, 0.7);
    this.add(leaf);
  }

}
