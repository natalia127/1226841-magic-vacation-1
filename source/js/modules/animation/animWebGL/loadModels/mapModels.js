import {BASIC, SOFT} from '../generalSettings/typeMaterials';
import {mapColors} from '../generalSettings/colors';
import * as THREE from 'three';

export const mapModels = {
  airplane: {
    id: `airplane`,
    type: `obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.white},
    castShadow: true
  },
  watermelon: {
    id: `watermelon`,
    type: `gltf`,
    model: null,
    castShadow: true
  },
  suitcase: {
    id: `suitcase`,
    type: `gltf`,
    model: null,
    castShadow: true
  },
  wallScene1: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: SOFT,
    optionsMaterial: {color: mapColors.purple, side: THREE.DoubleSide},
    receiveShadow: true
  },
  wallScene2: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.blue, side: THREE.DoubleSide},
    receiveShadow: true
  },
  wallScene3: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: SOFT,
    optionsMaterial: {color: mapColors.skyLightBlue, side: THREE.DoubleSide},
    receiveShadow: true
  },
  wallScene4: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.shadowedPurple, side: THREE.DoubleSide},
    receiveShadow: true
  },
  staticScene1: {
    id: `staticScene1`,
    type: `gltf`,
    model: null,
    castShadow: true
  },
  staticScene2: {
    id: `staticScene2`,
    type: `gltf`,
    model: null,
    receiveShadow: true,
    castShadow: true
  },
  staticScene3: {
    id: `staticScene3`,
    type: `gltf`,
    model: null,
    receiveShadow: true

  },
  staticScene4: {
    id: `staticScene4`,
    type: `gltf`,
    model: null,
    castShadow: true
  },
  dog: {
    id: `dog`,
    type: `gltf`,
    model: null,
    castShadow: true
  },
  compass: {
    id: `compass`,
    type: `gltf`,
    model: null,
    castShadow: true
  },
  sonya: {
    id: `sonya`,
    type: `gltf`,
    model: null,
    castShadow: true
  }
};


export const PATH_DIR_IMGS = `img/module-6/models/`;
export const URL_IMGS = Object.freeze({
  wallCornerUnit: `common/WallCornerUnit.obj`,
  suitcase: `suitcase.gltf`,
  watermelon: `watermelon.gltf`,
  airplane: `airplane.obj`,
  staticScene1: `scenesStatic/scene1-static-output-1.gltf`,
  staticScene2: `scenesStatic/scene2-static-output-1.gltf`,
  staticScene3: `scenesStatic/scene3-static-output-1.gltf`,
  staticScene4: `scenesStatic/scene4-static-output-1.gltf`,
  dog: `objects/dog.gltf`,
  compass: `objects/compass.gltf`,
  sonya: `objects/sonya.gltf`
});
