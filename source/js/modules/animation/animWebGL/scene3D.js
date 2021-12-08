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

  let isEventResize = null;
  const infrastructure = {
    renderer,
    canvasSize,
    camera,
    isEventResize,
    geometry
  };
  return infrastructure;
};
let infrastructure = setup3dInfrastructure();
export class Scene3D {
  constructor(numberScene) {
    this.urlTexture = `${basicUrlImg}scene-${numberScene}.png`;
    this.texture = null;
    this.material = null;
    this.numberScene = numberScene;
    this.scene = new THREE.Scene();
    this.fps = 60;
    this.timeStart = -1;
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
        uProgress: {
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

    this.scene.add(image);
    this.renderScene();

    if (this.isAnimate) {
      this.renderWithAnim();
    }
    this.initEventListner();

  }
  renderWithAnim() {
    this.animation = new Animation(
        {
          f: (progress) => {
            this.material.uniforms.uProgress.value = progress;
            this.renderScene();
          },
          dur: 2000
        }
    );
    this.animation.start();
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
    if (this.animation) {
      this.animation.stop();
    }
  }

  initEventListner() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }
  dropEventListner() {
    window.removeEventListener(`resize`, this.updateSize.bind(this));
  }
}
