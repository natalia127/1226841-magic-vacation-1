import * as THREE from 'three';
import {getLatheDegrees} from "../../utilsGeometry";

class Footer extends THREE.Group {
  constructor(material) {
    super();

    this.material = material;
    this.startDeg = 0;
    this.finishDeg = 90;
    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
  }

  addBase() {
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const geometry = new THREE.CircleGeometry(1350, 10, start, length);
    const baseMesh = new THREE.Mesh(geometry, this.material);

    baseMesh.rotation.copy(new THREE.Euler(90 * THREE.Math.DEG2RAD, 180 * THREE.Math.DEG2RAD, 0));
    baseMesh.receiveShadow = true;
    this.add(baseMesh);
  }
}

export {Footer};
