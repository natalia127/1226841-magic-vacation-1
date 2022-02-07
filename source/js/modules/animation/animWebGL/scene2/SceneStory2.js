import * as THREE from 'three';
import frShaderDistortion from '../shaders/frShaderDistortion.glsl';
import vertexShader from '../shaders/vertexShader.glsl';
import {Animation} from '../../animCanvas/Animation';
import {Scene3D} from '../scene3D';
import {StaticObjectsScene2} from './StaticObjectsScene2';
import {degToRadians} from '../../utilsGeometry';
import {AnimObjectsScene2} from './AnimObjectsScene2';

let activeAnimates = null;

export class SceneStory2 extends Scene3D {
  constructor() {
    super(2);
    // this.isTestAnimate = false;
    this.objects = null;

  }

  async initObject() {
    this.objects = new StaticObjectsScene2();
    this.objects.rotateX(degToRadians(10));
    await this.initAnimObject(AnimObjectsScene2);

  }

  setMaterial() {
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        uMap: {
          value: this.texture,
        },
        uCanvasSize: {
          value: [this.infrastructure.canvasSize.width, this.infrastructure.canvasSize.height]
        },
        uProgressHue: {
          value: 0
        },
        uProgressBubl1: {
          value: 0
        },
        uProgressBubl2: {
          value: 0
        },
        uProgressBubl3: {
          value: 0
        }
      },
      vertexShader: vertexShader.sourceCode,
      fragmentShader: frShaderDistortion.sourceCode
    });
  }
  async setScene() {
    super.setScene();
    if (!this.objects) {
      await this.initObject();
    }
    this.scene.add(this.objects);

    this.renderScene();
    // this.renderWithAnim();
  }
  renderWithAnim() {
    this.animations.push(
        new Animation(
            {
              f: (progress) => {
                this.material.uniforms.uProgressHue.value = progress;
              },
              dur: 2000,
              repeat: true
            }
        ),
        new Animation(
            {
              f: (progress) => {
                this.material.uniforms.uProgressBubl1.value = progress;
              },
              dur: 3000,
              repeat: true
            }
        ),
        new Animation(
            {
              f: (progress) => {
                this.material.uniforms.uProgressBubl2.value = progress;
              },
              dur: 3000,
              del: 800,
              repeat: true
            }
        ),
        new Animation(
            {
              f: (progress) => {
                this.material.uniforms.uProgressBubl3.value = progress;

              },
              dur: 3000,
              del: 1200,
              repeat: true
            }
        ),
        new Animation({
          f: () => {
            this.renderScene();
          },
          dur: `infinite`
        })
    );
    this.animations.forEach((animation) => {
      animation.start();
    });
    this.renderScene();
    activeAnimates = this.animations;
  }

  stopRender() {
    super.stopRender();
    if (activeAnimates) {
      activeAnimates.forEach((animation) => {
        animation.stop();
      });
    }
  }
}
