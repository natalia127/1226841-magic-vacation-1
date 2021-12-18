import * as THREE from "three";
import fragmentShader from '../shaders/mat_meshlambert_frag.glsl';
import vertexShader from '../shaders/meshlambert_vert.glsl';
import {mapColors} from "../generalSettings/colors";
export class MatShaderMaterial extends THREE.ShaderMaterial {
  constructor(parametrs, nameTheme = `light`) {
    const colorsTheme = getColorsTheme(nameTheme);
    parametrs.vertexShader = vertexShader.sourceCode;
    parametrs.fragmentShader = fragmentShader.sourceCode;
    parametrs.uniforms = {};
    parametrs.uniforms.uBaseColor = {
      value: colorsTheme[0]
    };
    parametrs.uniforms.uStripeColor = {
      value: colorsTheme[1]
    };
    super(parametrs);
  }

}
function getColorsTheme(nameTheme) {
  if (nameTheme === `light`) {
    return [
      new THREE.Color(mapColors.lightPurple),
      new THREE.Color(mapColors.additionalPurple)
    ];
  } else {
    return [
      new THREE.Color(mapColors.shadowedLightPurple),
      new THREE.Color(mapColors.shadowedAdditionalPurple)
    ];
  }
}
