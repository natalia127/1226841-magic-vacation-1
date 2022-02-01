import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {BASIC} from '../generalSettings/typeMaterials';
import {mapColors} from '../generalSettings/colors';
import {getMaterial} from '../generalSettings/getMaterial';


const mapModels = Object.freeze({
  airplane: {
    type: `obj`,
    path: `img/module-6/models/airplane.obj`,
    model: null,
    material: BASIC,
    optionsMaterial: {color: mapColors.white},
  },
  watermelon: {
    type: `gltf`,
    path: `img/module-6/models/watermelon.gltf`,
    model: null,
  },
  suitcase: {
    type: `gltf`,
    path: `img/module-6/models/suitcase.gltf`,
    model: null,
  },

});

let loadedModels = false;

const onComplete = (obj3d, params) => {
  const material = getMaterial(params.material, {
    ...params.optionsMaterial
  });

  obj3d.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
  params.model = obj3d;
};

const onGltfComplete = (gltf, params) => {
  if (!gltf.scene) {
    return;
  }
  params.model = gltf.scene;
};


const loadModels = async () => {
  const allPromise = [];
  Object.keys(mapModels).forEach((key)=>{
    const params = mapModels[key];
    if (!params.path) {
      return;
    }
    let loader = null;
    let callback = null;
    if (params.type === `obj`) {
      loader = new OBJLoader();
      callback = onComplete;
    }
    if (params.type === `gltf`) {
      loader = new GLTFLoader();
      callback = onGltfComplete;

    }
    if (!loader) {
      return;
    }
    allPromise.push(new Promise((resolve)=> {
      loader.load(params.path, function (obj3d) {
        callback(obj3d, params);
        resolve();

      });
    }));

  });
  await Promise.all(allPromise);
  loadedModels = true;
};


async function getMapModels() {
  if (!loadedModels) {
    await loadModels();
  }
  return mapModels;
}

export {
  getMapModels
};
