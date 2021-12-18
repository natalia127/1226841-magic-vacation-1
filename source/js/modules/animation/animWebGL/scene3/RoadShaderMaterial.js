import * as THREE from "three";
import fragmentShader from '../shaders/road_meshlambert_frag.glsl';
import vertexShader from '../shaders/meshlambert_vert.glsl';
import {mapColors} from "../generalSettings/colors";
export class RoadShaderMaterial extends THREE.ShaderMaterial {
  constructor(parametrs) {
    parametrs.vertexShader = vertexShader.sourceCode;
    parametrs.fragmentShader = fragmentShader.sourceCode;
    parametrs.uniforms = {};
    parametrs.uniforms.uBaseColor = {
      value: new THREE.Color(mapColors.grey )
    };
    parametrs.uniforms.uStripeColor = {
      value: new THREE.Color(mapColors.white)
    };
    super(parametrs);
  }
}
