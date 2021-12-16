import * as THREE from 'three';
export class ExtrudedSvg extends THREE.Group {
  constructor(mapShapes, nameShape) {
    super();
    this.mapShapes = mapShapes;
    this.nameShape = nameShape;
    const settingsShape = this.mapShapes[this.nameShape];

    this.depth = settingsShape.depth;
    this.cap = settingsShape.cap;
    this.color = settingsShape.color;
    this.shape = settingsShape.shape;
    this.material = new THREE.MeshStandardMaterial({
      color: settingsShape.color,
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
