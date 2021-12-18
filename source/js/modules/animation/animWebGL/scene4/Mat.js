import * as THREE from "three";
import {getLathePointsForCircle, getLatheDegrees} from '../../utilsGeometry';


export class Mat extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  constructChildren() {
    this.addMat();
  }
  addMat() {
    const points = getLathePointsForCircle(180, 3, 763);
    const {start, length} = getLatheDegrees(16, 74);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    this.baseMesh = new THREE.Mesh(base, new THREE.MeshBasicMaterial({color: 0x9372BA, flatShading: true, side: THREE.DoubleSide}));

    this.add(this.baseMesh);
  }
}
