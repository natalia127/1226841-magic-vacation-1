import * as THREE from 'three';

import {Animation} from '../../animCanvas/Animation';
import {ease} from '../../utils';
import {degToRadians} from '../../utilsGeometry';

import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {getMapShapes} from '../extrudeSvg/shapeLoader';

export class AnimObjectsScene2 {
  constructor() {
    this.figures = [];
    this.mapModels = null;

  }
  async init() {
    this.mapShapes = await getMapShapes();
    this.constructChildren();
  }
  async constructChildren() {
    this.figures.push(await this.getLeaf1());
    this.figures.push(await this.getLeaf2());

  }

  getLeaf1() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leaf1Scene2`);
    leaf.position.set(-250, 120, 370);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(40), degToRadians(-1)), `XYZ`);
    leaf.scale.set(2.3, -2.3, 0.9);
    const wrapperLeaf = new THREE.Group();
    wrapperLeaf.add(leaf);
    return {
      figure: wrapperLeaf,
      getAnimations() {
        return [new Animation({
          f: (t, details) => {
            animLeaf(wrapperLeaf, t, 0.5, 25);

          },
          del: 100,
          dur: 2000,
          repeat: true,
          easing: ease.outElastic,
        })
        ];
      }
    };
  }

  getLeaf2() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leaf2Scene2`);
    leaf.position.set(-320, -20, 420);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(40), degToRadians(45)), `XYZ`);
    leaf.scale.set(1.7, -1.7, 0.7);
    const wrapperLeaf = new THREE.Group();
    wrapperLeaf.add(leaf);
    return {
      figure: wrapperLeaf,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            animLeaf(wrapperLeaf, t, 0.3, 20);
          },
          del: 200,
          dur: 2000,
          repeat: true,
          easing: ease.outElastic,
        })
        ];
      }
    };
  }
}


function animLeaf(obj, t, amp, period) {
  obj.rotation.x = amp * Math.sin((Math.PI * t / period));
}
