import * as THREE from 'three';

import {Suitcase} from '../generalObjects/Suitcase';
import {Animation} from '../../animCanvas/Animation';
import {ease} from '../../utils';

const tick = (from, to, progress) => from + progress * (to - from);

export class AnimObjectsScene1 {
  constructor() {
    this.figures = [];
  }
  async init() {
    this.constructChildren();

  }
  async constructChildren() {
    const suitcase = await this.getSuitcase();
    this.figures.push(suitcase);
  }

  async getSuitcase() {
    const animateConfig = {
      durationMove: 600,
      startY: -160,
      finishY: -270,
      startScale: 1,
      minScale: 0.8,
      maxScale: 1.2
    };
    const suitcase = new Suitcase();
    await suitcase.init();
    suitcase.position.set(-350, animateConfig.startY, 800);
    suitcase.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, -20 * THREE.Math.DEG2RAD, 0));


    return {
      figure: suitcase,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            let scaleX = animateConfig.startScale;
            let scaleY = animateConfig.startScale;
            let scaleZ = animateConfig.startScale;
            if (t < 0.5) {
              scaleX = tick(animateConfig.startScale, animateConfig.minScale, t);
              scaleY = tick(animateConfig.startScale, animateConfig.maxScale, t);
              scaleZ = tick(animateConfig.startScale, animateConfig.minScale, t);
            }

            if (t > 0.5 && t < 0.8) {
              scaleX = tick(animateConfig.minScale, animateConfig.maxScale, t);
              scaleY = tick(animateConfig.maxScale, animateConfig.minScale, t);
              scaleZ = tick(animateConfig.minScale, animateConfig.maxScale, t);
            }

            if (t > 0.8 && t <= 1) {
              scaleX = tick(animateConfig.maxScale, animateConfig.startScale, t);
              scaleY = tick(animateConfig.minScale, animateConfig.startScale, t);
              scaleZ = tick(animateConfig.maxScale, animateConfig.startScale, t);
            }

            suitcase.scale.set(scaleX, scaleY, scaleZ);

          },
          dur: animateConfig.durationMove * 1.5,
          easing: ease.linear
        }),
        new Animation({
          f: (t) => {
            let positionY = tick(animateConfig.startY, animateConfig.finishY, t);
            suitcase.position.set(-350, positionY, 800);
          },
          dur: animateConfig.durationMove,
          easing: ease.inQuad
        }),
        ];
      }
    };
  }

}
