import * as THREE from 'three';
import {ExtrudedSvg} from '../extrudeSvg/ExtrudeSvg';
import {degToRadians} from '../../utilsGeometry';
import {getMaterial} from '../generalSettings/getMaterial';
import {getMapShapes} from '../extrudeSvg/shapeLoader';
import {mapColors} from '../generalSettings/colors';
import {BASIC} from '../generalSettings/typeMaterials';
import {getMapModels} from '../loadModels/modelsLoader';
import {Saturn} from '../generalObjects/Saturn';
import {Animation} from '../../animCanvas/Animation';
import {ease} from '../../utils';
const keysModels = [`airplane`, `watermelon`, `suitcase`];
export class ObjectsScene0 {
  constructor() {
    this.mapShapes = null;
    this.mapModels = null;
    this.constructChildren();
    this.figures = [];
  }
  async setMapsFigure() {
    this.mapShapes = await getMapShapes();
    this.mapModels = await getMapModels(keysModels);

  }
  async constructChildren() {
    await this.setMapsFigure();
    this.figures.push(this.getBackground());
    this.figures.push(this.getFlamingo());
    this.figures.push(this.getQuestion());
    this.figures.push(this.getSnowflake());
    this.figures.push(this.getLeaf());
    this.figures.push(this.getWatermelon());
    this.figures.push(this.getSuturn());
    this.figures.push(this.getKeyhole());

    // this.addAirplane();
    // this.addSuitcase();
  }

  getBackground() {
    const geometry = new THREE.PlaneGeometry(1405, 1405);
    const background = new THREE.Mesh(geometry, getMaterial(BASIC, {
      color: mapColors.purple
    }));
    background.position.set(0, 0, 10);
    return {
      figure: background
    };
  }
  getFlamingo() {
    const flamingo = new ExtrudedSvg(this.mapShapes, `flamingo`);
    flamingo.scale.set(0, 0, 0);
    flamingo.rotateZ(degToRadians(-160));
    return {
      figure: flamingo,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            const reverseT = 1 - t;
            flamingo.scale.set(2 * t, 2 * t, 1 * t);
            flamingo.position.set((-550 * t), 410 * t, 40 * t + 50);
            flamingo.rotation.copy(new THREE.Euler(degToRadians(-45 * reverseT), 0, -160), `XYZ`);
          },
          dur: 1500,
          easing: ease.easeOutQuart
        }),
        new Animation({
          f: (t, details) => {
            const ampY = 0.015;
            const ampX = 0.018;
            const period = 4000;
            flamingo.position.y = flamingo.position.y +
            ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
            flamingo.position.x = flamingo.position.x +
            ampX * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);

          },
          del: 1500,
          dur: `infinite`

        }),
        ];
      }
    };
  }

  getQuestion() {
    const question = new ExtrudedSvg(this.mapShapes, `question`);
    question.scale.set(0, 0, 0);
    return {
      figure: question,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            question.scale.set(1.5 * t, 1.5 * t, 1.5 * t);
            question.position.set((100 * t), -310 * t, 100 * t + 50);

            question.rotation.copy(new THREE.Euler(degToRadians(130), degToRadians(20 * t), degToRadians(-30 * t)), `XYZ`);
          },
          dur: 1500,
          easing: ease.easeOutQuart
        }),
        new Animation({
          f: (t, details) => {
            const ampY = 0.021;
            const ampX = 0.028;
            const period = 5000;
            question.position.y = question.position.y +
            ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
            question.position.x = question.position.x -
            ampX * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);

          },
          del: 1500,
          dur: `infinite`

        }),
        ];
      }
    };
  }

  getSnowflake() {
    const snowflake = new ExtrudedSvg(this.mapShapes, `snowflake`);
    snowflake.position.set(-450, -10, 100);
    snowflake.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(20), degToRadians(20)), `XYZ`);
    snowflake.scale.set(0, 0, 0);
    return {
      figure: snowflake,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            const reverseT = 1 - t;

            snowflake.scale.set(1.3 * t, 1.3 * t, 1.3 * t);
            snowflake.position.set((-450 * t), -10 * t, 100 * t + 50);

            snowflake.rotation.copy(new THREE.Euler(degToRadians(-10 * t), degToRadians(reverseT * -30 + 70 * t), degToRadians(20)), `XYZ`);
          },
          dur: 1500,
          easing: ease.easeOutQuart
        }),
        new Animation({
          f: (t, details) => {
            const ampY = 0.02;
            const ampX = 0.03;
            const period = 5000;
            snowflake.position.y = snowflake.position.y +
            ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
            snowflake.position.x = snowflake.position.x -
            ampX * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);

          },
          del: 1500,
          dur: `infinite`

        }),
        ];
      }
    };
  }
  getLeaf() {
    const leaf = new ExtrudedSvg(this.mapShapes, `leafIntro`);
    leaf.scale.set(0, 0, 0);
    return {
      figure: leaf,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            const reverseT = 1 - t;

            leaf.scale.set(1.4 * t, -1.4 * t, 1.4 * t);
            leaf.position.set((660 * t), 330 * t, 150 * t + 50);

            leaf.rotation.copy(new THREE.Euler(degToRadians(10 * t), degToRadians(reverseT * 30 + -30 * t), degToRadians(-60)), `XYZ`);
          },
          dur: 1500,
          easing: ease.easeOutQuart
        }),
        new Animation({
          f: (t, details) => {
            const ampY = 0.025;
            const ampX = 0.02;
            const period = 5000;
            leaf.position.y = leaf.position.y -
            ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
            leaf.position.x = leaf.position.x -
            ampX * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);

          },
          del: 1500,
          dur: `infinite`

        }),
        ];
      }
    };
  }
  getKeyhole() {
    const keyhole = new ExtrudedSvg(this.mapShapes, `keyhole`);
    keyhole.position.set(-1500, 1515, 0);
    keyhole.scale.set(1.5, -1.5, 1.5);
    return {
      figure: keyhole
    };
  }

  addAirplane() {
    const airplane = this.mapModels[`airplane`].model;
    airplane.position.set(250, 180, 100);
    airplane.rotation.copy(new THREE.Euler(80 * THREE.Math.DEG2RAD, 120 * THREE.Math.DEG2RAD, -30 * THREE.Math.DEG2RAD), `XYZ`);
    airplane.scale.set(1.5, 1.5, 1.5);
  }

  getWatermelon() {
    const watermelon = this.mapModels[`watermelon`].model;
    watermelon.scale.set(0, 0, 0);
    return {
      figure: watermelon,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            const reverseT = 1 - t;

            watermelon.scale.set(2.5 * t, 2.5 * t, 2.5 * t);
            watermelon.position.set((-770 * t), -280 * t, 100 * t + 50);

            watermelon.rotation.copy(new THREE.Euler(degToRadians(10 * t), degToRadians(reverseT * 30 + 0 * t), degToRadians(150 * t)), `XYZ`);
          },
          dur: 1500,
          easing: ease.easeOutQuart
        }),
        new Animation({
          f: (t, details) => {
            const ampY = 0.015;
            const ampX = 0.04;
            const period = 7000;
            watermelon.position.y = watermelon.position.y +
            ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
            watermelon.position.x = watermelon.position.x -
            ampX * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);

          },
          del: 1500,
          dur: `infinite`

        }),
        ];
      }
    };
  }

  addSuitcase() {
    const suitcase = this.mapModels[`suitcase`].model.clone();
    suitcase.position.set(-80, -180, 40);
    suitcase.rotation.copy(new THREE.Euler(30 * THREE.Math.DEG2RAD, -135 * THREE.Math.DEG2RAD, 15 * THREE.Math.DEG2RAD), `XYZ`);
    suitcase.scale.set(0.6, 0.6, 0.6);
  }

  getSuturn() {
    const saturn = new Saturn({withSmallSphere: false});
    saturn.position.set(570, -180, 150);

    saturn.scale.set(0.8, 0.8, 0.8);
    return {
      figure: saturn,
      getAnimations() {
        return [new Animation({
          f: (t) => {
            const reverseT = 1 - t;

            saturn.scale.set(0.8 * t, 0.8 * t, 0.8 * t);
            saturn.position.set((570 * t), -180 * t, 150 * t + 50);

            saturn.rotation.copy(new THREE.Euler(degToRadians(0 * t), degToRadians(reverseT * 0), degToRadians(0 * t)), `XYZ`);
          },
          dur: 1500,
          easing: ease.easeOutQuart
        }),
        new Animation({
          f: (t, details) => {
            const ampY = 0.05;
            const ampX = 0.022;
            const period = 6500;
            saturn.position.y = saturn.position.y -
            ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
            saturn.position.x = saturn.position.x -
            ampX * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);

          },
          del: 1500,
          dur: `infinite`

        }),
        ];
      }
    };

  }
}
