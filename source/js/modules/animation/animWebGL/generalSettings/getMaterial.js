import {SOFT, BASIC, STRONG} from "./typeMaterials";
import * as THREE from 'three';

export function getMaterial(type, options) {
  let material = null;
  switch (type) {
    case SOFT:
      material = new THREE.MeshStandardMaterial({roughness: 0.7,
        metalness: 0.1, ...options});
      break;
    case BASIC:
      material = new THREE.MeshPhongMaterial({shininess: 30, ...options});
      break;
    case STRONG:
      material = new THREE.MeshStandardMaterial({
        roughness: 1,
        metalness: 0.05,
        ...options});
      break;
  }
  return material;
}
