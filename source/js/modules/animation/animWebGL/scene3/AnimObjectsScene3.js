import * as THREE from 'three';

import {Animation} from '../../animCanvas/Animation';
import {ease} from '../../utils';
import {degToRadians} from '../../utilsGeometry';

import {getMapModels} from '../loadModels/modelsLoader';


export class AnimObjectsScene3 {
  constructor() {
    this.figures = [];
    this.mapModels = null;

  }
  async init() {
    this.mapModels = await getMapModels([`compass`]);
    this.constructChildren();
  }
  async constructChildren() {

    this.figures.push(await this.getCompas());

  }

  getCompas() {
    const compass = this.mapModels[`compass`].model;
    compass.position.set(30, -170, 120);
    compass.rotation.copy(new THREE.Euler(0, degToRadians(-40), 0), `XYZ`);
    const arrowCenter = compass.getObjectByName(`ArrowCenter`);
    return {
      figure: compass,
      getAnimations() {
        return [new Animation({
          f: (t, details) => {
            const amp = 0.2;
            const rotationZ = amp * Math.sin((1.5 * Math.PI * (details.currentTime - details.startTime)) / 2000);

            arrowCenter.rotation.z = rotationZ;

          },
          dur: `infinite`,
        })
        ];
      }
    };
  }

}

