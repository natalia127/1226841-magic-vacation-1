import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {mapModels, PATH_DIR_IMGS, URL_IMGS} from './mapModels';
import {getMaterial} from '../generalSettings/getMaterial';


const onComplete = (obj3d, params) => {
  const material = getMaterial(params.material, {
    ...params.optionsMaterial
  });

  obj3d.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
  params.model = obj3d.clone();
};

const onGltfComplete = (gltf, params) => {
  if (!gltf.scene) {
    return;
  }
  params.model = gltf.scene;
};


const loadModels = async (unloadedKeysModels) => {
  const allPromise = [];
  unloadedKeysModels.forEach((key)=>{
    const params = mapModels[key];
    const path = PATH_DIR_IMGS + URL_IMGS[params.id];
    if (!path) {
      return;
    }
    const loader = params.type === `obj` ? new OBJLoader() : new GLTFLoader();
    const callback = params.type === `obj` ? onComplete : onGltfComplete;
    const keysWithSameId = Object.keys(mapModels).filter((keyModel) => {
      return mapModels[keyModel].id === params.id;
    });
    const promiseModel = new Promise((resolve)=> {
      loader.load(path, function (obj3d) {
        keysWithSameId.forEach((keyModel) => {
          callback(obj3d, mapModels[keyModel]);
        });
        resolve();

      });
    });

    keysWithSameId.forEach((keyModel) => {
      mapModels[keyModel].model = promiseModel;
    });


    allPromise.push(promiseModel);

  });
  await Promise.all(allPromise);
};


async function getMapModels(keys) {
  let _keys = keys ? keys : Object.keys(mapModels);
  let modelsInLoaded = _keys.filter((key) => {
    return mapModels[key] && mapModels[key].model instanceof Promise;
  });
  if (modelsInLoaded && modelsInLoaded.length) {
    await Promise.all(modelsInLoaded.map((key) => mapModels[key].model));
  }

  let unloadedKeysModels = _keys.filter((key) => {
    return mapModels[key] && !mapModels[key].model;
  });
  if (unloadedKeysModels && unloadedKeysModels.length) {
    await loadModels(unloadedKeysModels);
  }

  let result;
  if (keys) {
    result = keys.reduce(((acc, key) => {
      acc[key] = mapModels[key];
      return acc;
    }), {});
  } else {
    result = mapModels;
  }

  return result;
}

export {
  getMapModels
};
