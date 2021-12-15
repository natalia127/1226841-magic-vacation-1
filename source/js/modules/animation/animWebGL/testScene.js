import {Scene3D} from "./Scene3D";
import * as THREE from 'three';

export class TestScene extends Scene3D {
  constructor(numberScene) {
    super(numberScene);
  }
  async init() {
    await super.init();
    this.setSphere();
    this.setLight();
    this.renderScene();

  }
  setSphere() {
    const geometry = new THREE.SphereGeometry(100, 50, 50);

    const material = new THREE.MeshStandardMaterial({
      color: 0x006262,
      metalness: 0.05,
      emissive: 0x0,
      roughness: 0.5
    });

    const object = new THREE.Mesh(geometry, material);
    this.scene.add(object);
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
    const lightUnit2 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.6, 0, 2);
    lightUnit2.position.set(-785, -350, -710);
    light.add(lightUnit2);

    // Light 3
    const lightUnit3 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.95, 0, 2);
    lightUnit3.position.set(730, 800, -985);
    light.add(lightUnit3);

    light.position.z = this.infrastructure.camera.position.z;
    this.scene.add(light);
  }
}
