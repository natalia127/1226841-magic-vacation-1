import * as THREE from 'three';

import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {Saturn} from '../generalObjects/Saturn';
import {Mat} from '../generalObjects/Mat';
import {degToRadians} from '../../utilsGeometry';
import {SceneBase} from '../generalObjects/SceneBase';
import {mapColors} from '../generalSettings/colors';

export class StaticObjectsScene4 extends THREE.Group {
  constructor() {
    super();
    this.mapShapes = null;
    this.constructChildren();
  }
  async constructChildren() {
    this.mapShapes = await getMapShapes();
    this.addSceneBase();
    this.addSaturn();
    this.addMat();
  }

  addMat() {
    const mat = new Mat(`dark`);
    mat.rotation.copy(new THREE.Euler(0, degToRadians(-45), 0), `XYZ`);
    mat.position.set(0, -130, 30);
    this.add(mat);
  }
  addSaturn() {
    const saturn = new Saturn({nameTheme: `dark`});
    saturn.position.set(70, 260, 0);
    saturn.position.set(0, 260, 300);
    this.add(saturn);
  }
  addSceneBase() {
    const sceneBase = new SceneBase({
      keysModels: {
        staticScene: `staticScene4`,
        wallScene: `wallScene4`
      },
      colorFooter: mapColors.shadowedDarkPurple
    },
    );
    this.add(sceneBase);
  }
}
