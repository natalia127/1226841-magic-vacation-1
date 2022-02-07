import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Animation} from '../animCanvas/Animation';
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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const controls = new OrbitControls(camera, document.querySelector(`body`));

  camera.position.z = 1800;

  controls.update();

  const geometry = new THREE.PlaneGeometry(2048, 1024);

  document.querySelector(`.three--screen`).appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const infrastructure = {
    renderer,
    canvasSize,
    camera,
    geometry,
    controls,
    scene
  };
  return infrastructure;
};
let infrastructure = setup3dInfrastructure();
let activeEventListener = null;
let requestId = null;

export class Scene3D {
  constructor(numberScene) {
    this.infrastructure = infrastructure;
    this.numberScene = numberScene;
    this.animations = [];
    this.scene = this.infrastructure.scene;
    this.camera = this.infrastructure.camera;
    this.light = this.getLight();
    this.isTestAnimate = false;
    this.startTime = -1;
    this.figures = [];
    this.lengthFiguresForUpdate = 0;

  }

  async init() {
    if (!infrastructure) {
      infrastructure = setup3dInfrastructure();
    }

    this.setScene();
  }

  setScene() {
    this.stopRender();
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    this.scene.add(this.light);
    this.animations.push(new Animation({
      f: () => {
        this.renderScene();
      },
      dur: `infinite`,
    }));
    this.initAnim(0);
    this.initEventListner();

  }

  initAnim() {
    this.animations.forEach((anim) => {
      if (!anim.startTime) {
        anim.start();
      }
    });
  }

  renderScene() {
    if (this.lengthFiguresForUpdate !== this.figures.length) {
      this.initNewFigure();
    }

    this.infrastructure.renderer.render(this.scene, this.infrastructure.camera);
    this.infrastructure.controls.update();
  }

  initNewFigure() {
    let newFigures = this.figures.slice(this.lengthFiguresForUpdate);
    newFigures.forEach((parametrs) => {
      this.scene.add(parametrs.figure);
      if (parametrs.getAnimations) {
        this.animations.push(...parametrs.getAnimations());
      }
    });
    this.lengthFiguresForUpdate = this.figures.length;

    this.initAnim();

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

  getLight() {
    const light = new THREE.Group();

    // Light 1
    const lightUnit1 = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.84);
    const targetObject = new THREE.Object3D();
    targetObject.position.set(0, this.infrastructure.camera.position.z * Math.tan(15 * THREE.Math.DEG2RAD), 0);
    this.scene.add(targetObject);
    lightUnit1.target = targetObject;
    lightUnit1.castShadow = true;

    light.add(lightUnit1);

    // Light 2
    const lightUnit2 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.3);
    lightUnit2.position.set(-500, 700, 0);
    lightUnit2.castShadow = true;
    lightUnit2.shadow.camera.far = 3000;
    lightUnit2.shadow.mapSize.width = 500;
    lightUnit2.shadow.mapSize.height = 500;
    lightUnit2.shadow.camera.near = 0.5;

    light.add(lightUnit2);

    const lightUnit3 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.45);
    lightUnit3.position.set(500, 1500, -700);
    lightUnit3.castShadow = true;
    lightUnit3.shadow.camera.far = 3000;
    lightUnit3.shadow.mapSize.width = 500;
    lightUnit3.shadow.mapSize.height = 500;
    lightUnit3.shadow.camera.near = 0.5;
    light.add(lightUnit3);
    light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    return light;
  }

}
