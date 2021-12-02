import * as THREE from 'three';
import fragmentSheder from './fragmentShader.glsl';
import vertexShader from './vertexShader.glsl';
const basicUrlImg = `./img/module-5/scenes-textures/`;

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
    hue: 0.2,
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

const textures = JSON.parse(JSON.stringify(TEXTURE));
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1024);
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 1024;
window.addEventListener(`load`, () => {
  document.querySelector(`.three--screen`).appendChild(renderer.domElement);
});
let isEventResize = null;

const getShaderSettings = (texture, hue)=> ({
  uniforms: {
    map: {
      value: texture,
    },
    hue: {
      value: hue
    }
  },
  vertexShader: vertexShader.sourceCode,
  fragmentShader: fragmentSheder.sourceCode
});
export class Anim3D {
  constructor() {
    this.scene = new THREE.Scene();
    this.currentScene = null;

  }
  init(numberScene = 0) {
    this.currentScene = `scene${numberScene}`;
    if (textures[this.currentScene].loadedTexture) {
      this.setTexture();
    } else {
      this.initTexture();
    }
    this.initEventListner();
  }
  initTexture() {
    const manager = new THREE.LoadingManager();
    let texture = new THREE.TextureLoader(manager).load(textures[this.currentScene].url);
    manager.onLoad = () => {
      textures[this.currentScene].loadedTexture = texture;
      this.setTexture();
    };
  }
  setTexture() {
    this.scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2048, 1024);
    const hueColor = textures[this.currentScene].hue || 0.0;
    const material = new THREE.RawShaderMaterial(getShaderSettings(textures[this.currentScene].loadedTexture, hueColor));
    const image = new THREE.Mesh(geometry, material);
    this.scene.add(image);
    this.renderScene();
  }

  renderScene() {
    renderer.render(this.scene, camera);
  }

  updateSize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScene();
  }
  initEventListner() {
    if (!isEventResize) {
      window.addEventListener(`resize`, () => {
        this.updateSize();
      });
      isEventResize = true;
    }
  }
}
