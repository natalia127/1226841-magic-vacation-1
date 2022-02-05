import {BASIC, SOFT} from '../generalSettings/typeMaterials';
import {mapColors} from '../generalSettings/colors';
export const mapModels = {
  airplane: {
    id: `airplane`,
    type: `obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.white},
  },
  watermelon: {
    id: `watermelon`,
    type: `gltf`,
    model: null,
  },
  suitcase: {
    id: `suitcase`,
    type: `gltf`,
    model: null,
  },
  wallScene1: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: SOFT,
    optionsMaterial: {color: mapColors.purple},
  },
  wallScene2: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.blue},
  },
  wallScene3: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: SOFT,
    optionsMaterial: {color: mapColors.skyLightBlue},
  },
  wallScene4: {
    id: `wallCornerUnit`,
    type: `obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.shadowedPurple},
  },
  staticScene1: {
    id: `staticScene1`,
    type: `gltf`,
    model: null,
  },
  staticScene2: {
    id: `staticScene2`,
    type: `gltf`,
    model: null,
  },
  staticScene3: {
    id: `staticScene3`,
    type: `gltf`,
    model: null,
  },
  staticScene4: {
    id: `staticScene4`,
    type: `gltf`,
    model: null,
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
  staticScene4: `scenesStatic/scene4-static-output-1.gltf`
});
