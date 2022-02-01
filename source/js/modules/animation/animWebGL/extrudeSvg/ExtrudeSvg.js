import * as THREE from 'three';
import {getMaterial} from '../generalSettings/getMaterial';
export class ExtrudedSvg extends THREE.Group {
  constructor(mapShapes, nameShape) {
    super();
    this.mapShapes = mapShapes;
    this.nameShape = nameShape;
    const settingsShape = this.mapShapes[this.nameShape];

    this.depth = settingsShape.depth;
    this.cap = settingsShape.cap;
    this.shape = settingsShape.shape;
    this.material = getMaterial(settingsShape.material, {
      ...settingsShape.optionsMaterial
    });
    this.constructChildren();
  }
  constructChildren() {
    this.addShape();
  }
  addShape() {
    const geometry = new THREE.ExtrudeBufferGeometry(this.shape, {
      depth: this.depth,
      bevelEnabled: true,
      bevelThickness: this.cap,
    });
    const mesh = new THREE.Mesh(geometry, this.material);
    this.add(mesh);
  }
}
