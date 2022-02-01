import * as THREE from "three";
import {getLathePointsForCircle, getLatheDegrees} from '../../utilsGeometry';
import {MatShaderMaterial} from "./MatShaderMaterial";

export class Mat extends THREE.Group {
  constructor(nameTheme) {
    super();
    this.nameTheme = nameTheme;
    this.constructChildren();
  }
  constructChildren() {
    this.addMat();
  }
  addMat() {
    const points = getLathePointsForCircle(180, 3, 763);
    const {start, length} = getLatheDegrees(16, 74);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    this.baseMesh = new THREE.Mesh(base, new MatShaderMaterial({flatShading: true, side: THREE.DoubleSide}, this.nameTheme));

    this.add(this.baseMesh);
  }
}
