import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';

const basicUrlImg = `./img/module-5/scenes-textures/`;
const loadedTexture = {};
const setup3dInfrastructure = ()=> {
  const initialWidth = window.innerWidth;
  const initialHeight = window.innerHeight;
  const canvasSize = {
    width: initialWidth,
    height: initialHeight
  };

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  const controls = new OrbitControls(camera, document.querySelector('body'));

  camera.position.z = 1024;

  controls.update();

  const geometry = new THREE.PlaneGeometry(2048, 1024);

  document.querySelector(`.three--screen`).appendChild(renderer.domElement);

  const infrastructure = {
    renderer,
    canvasSize,
    camera,
    geometry,
    controls
  };
  return infrastructure;
};
let infrastructure = setup3dInfrastructure();
let activeEventListener = null;
let requestId = null;

export class Scene3D {
  constructor(numberScene) {
    this.infrastructure = infrastructure;
    this.urlTexture = `${basicUrlImg}scene-${numberScene}.png`;
    this.texture = null;
    this.material = null;
    this.numberScene = numberScene;
    this.animations = [];
    this.scene = new THREE.Scene();
    this.isTestAnimate = true;
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
        }

      },
      vertexShader: vertexShader.sourceCode,
      fragmentShader: fragmentShader.sourceCode
    });
  }
  setScene() {
    this.stopRender();
    this.texture = loadedTexture[this.numberScene];
    this.setMaterial();
    const image = new THREE.Mesh(this.infrastructure.geometry, this.material);
    this.scene = new THREE.Scene();
    this.scene.add(image);
    this.setLight();
    this.renderScene();
    this.initEventListner();

  }
  renderScene() {
    this.infrastructure.renderer.render(this.scene, this.infrastructure.camera);
    this.infrastructure.controls.update();
    if (this.isTestAnimate) {
      requestId = requestAnimationFrame(this.renderScene.bind(this));
    }
  }
  updateSize() {
    this.infrastructure.canvasSize.width = window.innerWidth;
    this.infrastructure.canvasSize.height = window.innerHeight;
    this.infrastructure.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScene();

  }
  stopRender() {
    cancelAnimationFrame(requestId);
    this.dropEventListner();
  }

  initEventListner() {
    activeEventListener = this.updateSize.bind(this);
    window.addEventListener(`resize`, activeEventListener);
  }
  dropEventListner() {
    window.removeEventListener(`resize`, activeEventListener);
  }

  setLight() {
    const light = new THREE.Group();

    // Light 1
    const lightUnit1 = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.84);
    const targetObject = new THREE.Object3D();
    targetObject.position.set(0, this.infrastructure.camera.position.z * Math.tan(15 * THREE.Math.DEG2RAD), 0);
    this.scene.add(targetObject);
    lightUnit1.target = targetObject;
    light.add(lightUnit1);

    // Light 2
    const lightUnit2 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.9, 0, 0.5);
    lightUnit2.position.set(-785, 350, -710);
    light.add(lightUnit2);

    // // Light 3
    const lightUnit3 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.9, 0, 0.5);
    lightUnit3.position.set(730, 800, -985);
    light.add(lightUnit3);

    light.position.z = this.infrastructure.camera.position.z;
    this.scene.add(light);
  }
}
