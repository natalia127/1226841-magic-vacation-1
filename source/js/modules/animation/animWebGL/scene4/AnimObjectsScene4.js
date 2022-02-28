import * as THREE from 'three';

import {Animation} from '../../animCanvas/Animation';
import {ease} from '../../utils';
import {degToRadians} from '../../utilsGeometry';

import {getMapModels} from '../loadModels/modelsLoader';


export class AnimObjectsScene4 {
  constructor() {
    this.figures = [];
    this.mapModels = null;

  }
  async init() {
    this.mapModels = await getMapModels([`sonya`]);
    this.constructChildren();
  }
  async constructChildren() {

    this.figures.push(await this.getSonya());

  }

  getSonya() {
    const sonya = this.mapModels[`sonya`].model;
    sonya.position.set(200, 0, 540);
    sonya.rotation.copy(new THREE.Euler(0, degToRadians(-35), 0), `XYZ`);
    const rightHand = sonya.getObjectByName(`RightHand`);
    const leftHand = sonya.getObjectByName(`LeftHand`);
    return {
      figure: sonya,
      getAnimations() {
        return [new Animation({
          f: (_, details) => {
            const t = (details.currentTime - details.startTime);
            const positionY = 10 * Math.sin((2 * Math.PI * t) / 2000);
            const rotation = -0.05 * Math.sin((2 * Math.PI * t) / 2000);
            sonya.position.y = positionY;
            rightHand.rotation.y = -1.3 + rotation;
            leftHand.rotation.y = 1.3 - rotation;
          },
          dur: `infinite`,
        })
        ];
      }
    };
  }

}

