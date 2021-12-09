import * as THREE from 'three';
import frShaderDistortion from './frShaderDistortion.glsl';
import fragmentShader from './fragmentShader.glsl';
import vertexShader from './vertexShader.glsl';
import {Animation} from '../animCanvas/Animation';

const basicUrlImg = `./img/module-5/scenes-textures/`;
const loadedTexture = {};
const scenesWithAnimate = [2];
const setup3dInfrastructure = ()=> {
  const initialWidth = window.innerWidth;
  const initialHeight = window.innerHeight;
  const canvasSize = {
    width: initialWidth,
    height: initialHeight
  };

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1024);
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 1024;
  const geometry = new THREE.PlaneGeometry(2048, 1024);

  document.querySelector(`.three--screen`).appendChild(renderer.domElement);

  const infrastructure = {
    renderer,
    canvasSize,
    camera,
    geometry
  };
  return infrastructure;
};
let infrastructure = setup3dInfrastructure();
let activeEventListener = null;
let activeAnimates = null;
export class Scene3D {
  constructor(numberScene) {
    this.urlTexture = `${basicUrlImg}scene-${numberScene}.png`;
    this.texture = null;
    this.material = null;
    this.numberScene = numberScene;
    this.animations = [];
    this.scene = new THREE.Scene();
    this.isAnimate = !!scenesWithAnimate.includes(numberScene);
  }

  async init() {
    if (!infrastructure) {
      infrastructure = setup3dInfrastructure();
    }
    if (!loadedTexture[this.numberScene]) {
      await this.initTexture();
    }
    this.setScene();
  }

  initTexture() {
    return new Promise((resolve) => {
      const manager = new THREE.LoadingManager();
      let texture = new THREE.TextureLoader(manager).load(this.urlTexture);
      manager.onLoad = () => {
        loadedTexture[this.numberScene] = texture;
        resolve();
      };
    });

  }
  setMaterial() {
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        uMap: {
          value: this.texture,
        },
        uCanvasSize: {
          value: [infrastructure.canvasSize.width, infrastructure.canvasSize.height]
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
      fragmentShader: this.isAnimate ? frShaderDistortion.sourceCode : fragmentShader.sourceCode
    });
  }
  setScene() {
    this.stopRender();
    this.texture = loadedTexture[this.numberScene];
    this.setMaterial();
    const image = new THREE.Mesh(infrastructure.geometry, this.material);
    this.scene = new THREE.Scene();
    this.scene.add(image);

    if (this.isAnimate) {
      this.renderWithAnim();
    } else {
      this.renderScene();
    }
    this.initEventListner();

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
  renderScene() {
    infrastructure.renderer.render(this.scene, infrastructure.camera);
  }
  updateSize() {
    infrastructure.canvasSize.width = window.innerWidth;
    infrastructure.canvasSize.height = window.innerHeight;
    infrastructure.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScene();

  }
  stopRender() {
    this.dropEventListner();
    if (activeAnimates) {
      activeAnimates.forEach((animation) => {
        animation.start();
      });
    }
  }

  initEventListner() {
    activeEventListener = this.updateSize.bind(this);
    window.addEventListener(`resize`, activeEventListener);
  }
  dropEventListner() {
    window.removeEventListener(`resize`, activeEventListener);
  }
}
