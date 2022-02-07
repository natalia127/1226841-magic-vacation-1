import * as THREE from 'three';

import {Suitcase} from '../generalObjects/Suitcase';
import {Animation} from '../../animCanvas/Animation';
import {ease} from '../../utils';
import {getMapModels} from '../loadModels/modelsLoader';
import {Saturn} from '../generalObjects/Saturn';


const tick = (from, to, progress) => from + progress * (to - from);

export class AnimObjectsScene1 {
  constructor() {
    this.figures = [];
    this.mapModels = null;

  }
  async init() {
    this.mapModels = await getMapModels([`dog`]);
    this.constructChildren();

  }
  async constructChildren() {
    const suitcase = await this.getSuitcase();
    this.figures.push(suitcase);
    this.figures.push(await this.getDog());
    this.figures.push(await this.getSaturn());
  }

  async getSuitcase() {
    const animateConfig = {
      durationMove: 600,
      startY: 0,
      finishY: -130,
      startScale: 1,
      minScale: 0.8,
      maxScale: 1.2
    };
    const suitcase = new Suitcase();
    await suitcase.init();
    suitcase.position.set(-350, animateConfig.startY, 800);
    suitcase.rotation.copy(new THREE.Euler(0, -20 * THREE.Math.DEG2RAD, 0));


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

  getDog() {
    const dog = this.mapModels[`dog`].model;
    dog.position.set(50, -130, 640);
    dog.rotation.copy(new THREE.Euler(0, 15 * THREE.Math.DEG2RAD, 0));
    const tail = dog.getObjectByName(`Tail`);
    return {
      figure: dog,
      getAnimations() {
        return [new Animation({
          f: (t, details) => {
            const progress = Math.floor((details.currentTime) % 6);
            const amp = progress > 2 && progress < 6 ? 0.8 : 0.4;
            tail.rotation.x = amp * Math.sin((7 * Math.PI * (details.currentTime)) / 1000);
          },
          dur: `infinite`,
          easing: ease.linear,
        })
        ];
      }
    };
  }

  getSaturn() {
    const saturn = new Saturn({castShadow: true});
    saturn.position.set(0, 260, 300);
    const bigSphere = saturn.getObjectByName(`bigSphere`);
    const ring = saturn.getObjectByName(`ring`);
    return {
      figure: saturn,
      getAnimations() {
        return [new Animation({
          f: (_, details) => {
            const amp = 0.15;
            const t = details.currentTime;
            const rotationX1 = amp * Math.sin((1 * Math.PI * t) / 3000);
            const rotationX2 = -0.15 * Math.sin((0.9 * Math.PI * t) / 6000);

            ring.rotation.x = rotationX1;
            bigSphere.rotation.x = rotationX2;
          },
          dur: `infinite`,
          easing: ease.linear,
        })
        ];
      }
    };
  }

}
