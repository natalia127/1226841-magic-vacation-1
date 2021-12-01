import * as THREE from 'three';

const basicUrlImg = `../../img/module-5/scenes-textures/`;
const TEXTURE = Object.freeze({
  scene0: {
    url: `${basicUrlImg}scene-0.png`,
    loadedTexture: null
  },
  scene1: {
    url: `${basicUrlImg}scene-1.png`,
    loadedTexture: null
  },
  scene2: {
    url: `${basicUrlImg}scene-2.png`,
    loadedTexture: null
  },
  scene3: {
    url: `${basicUrlImg}scene-3.png`,
    loadedTexture: null
  },
  scene4: {
    url: `${basicUrlImg}scene-4.png`,
    loadedTexture: null
  },
});
export class Anim3D {
  constructor() {
    this.scene = new THREE.Scene();
    this.currentScene = null;

  }
  init(numberScene = 0) {
    this.currentScene = `scene${numberScene}`;
    if (Anim3D.textures[this.currentScene].loadedTexture) {
      this.setTexture();
    } else {
      this.initTexture();
    }
  }
  initTexture() {
    const manager = new THREE.LoadingManager();
    let texture = new THREE.TextureLoader(manager).load(Anim3D.textures[this.currentScene].url);
    manager.onLoad = () => {
      Anim3D.textures[this.currentScene].loadedTexture = texture;
      this.setTexture();
    };
  }
  setTexture() {
    this.scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2048, 1024);
    const material = new THREE.MeshBasicMaterial({map: Anim3D.textures[this.currentScene].loadedTexture});
    const image = new THREE.Mesh(geometry, material);
    this.scene.add(image);
    this.renderScene();
  }

  renderScene() {
    Anim3D.renderer.render(this.scene, Anim3D.camera);
  }

  static updateSize() {
    Anim3D.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScene();
  }
}
export const setSettingsAnim3D = () => {
  Anim3D.textures = JSON.parse(JSON.stringify(TEXTURE));
  Anim3D.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1024);
  Anim3D.renderer = new THREE.WebGLRenderer();
  Anim3D.renderer.setPixelRatio(window.devicePixelRatio);
  Anim3D.renderer.setSize(window.innerWidth, window.innerHeight);
  Anim3D.camera.position.z = 1024;

  window.addEventListener(`resize`, () => {
    Anim3D.updateSize();
  });

  window.addEventListener(`load`, () => {
    document.querySelector(`.three--screen`).appendChild(Anim3D.renderer.domElement);
  });
};
