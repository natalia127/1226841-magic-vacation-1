import * as THREE from "three";
import {getLathePointsForCircle, getLatheDegrees} from '../../utilsGeometry';


export class Road extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }
  constructChildren() {
    this.addRoad();
  }
  addRoad() {
    const points = getLathePointsForCircle(160, 3, 732);
    const {start, length} = getLatheDegrees(0, 90);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    this.baseMesh = new THREE.Mesh(base, new THREE.MeshBasicMaterial({color: 0x585F6D, flatShading: true, side: THREE.DoubleSide}));

    this.add(this.baseMesh);
  }
}
