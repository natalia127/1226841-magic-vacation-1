import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
import {mapColors} from '../generalSettings/colors';
import {SOFT, BASIC} from '../generalSettings/typeMaterials';

const mapShapes = Object.freeze({
  flamingo: {
    id: `flamingo`,
    depth: 8,
    cap: 2,
    material: SOFT,
    optionsMaterial: {color: mapColors.lightDominantRed},
    shape: null,
  },
  snowflake: {
    id: `snowflake`,
    depth: 8,
    cap: 2,
    material: BASIC,
    optionsMaterial: {color: mapColors.blue},
    shape: null
  },
  question: {
    id: `question`,
    depth: 8,
    cap: 2,
    material: BASIC,
    optionsMaterial: {color: mapColors.blue},
    shape: null
  },
  leafKeyhole: {
    id: `leaf`,
    depth: 8,
    cap: 2,
    material: BASIC,
    optionsMaterial: {color: mapColors.green},
    shape: null
  },
  leafIntro: {
    id: `leaf`,
    depth: 3,
    cap: 3,
    material: BASIC,
    optionsMaterial: {color: mapColors.green},
    shape: null
  },
  leaf1Scene2: {
    id: `leaf`,
    depth: 3,
    cap: 3,
    material: BASIC,
    optionsMaterial: {color: mapColors.green},
    shape: null
  },
  leaf2Scene2: {
    id: `leaf`,
    depth: 3,
    cap: 3,
    material: BASIC,
    optionsMaterial: {color: mapColors.green},
    shape: null
  },
  keyhole: {
    id: `keyhole`,
    depth: 20,
    cap: 2,
    material: SOFT,
    optionsMaterial: {color: mapColors.darkPurple},
    shape: null
  },
  flower: {
    id: `flower`,
    depth: 4,
    cap: 2,
    material: BASIC,
    optionsMaterial: {color: mapColors.darkPurple},
    shape: null
  },
});
let loadedShape = false;

const URL_IMGS = Object.freeze({
  keyhole: `keyhole.svg`,
  flamingo: `flamingo.svg`,
  leaf: `leaf.svg`,
  flower: `flower.svg`,
  snowflake: `snowflake.svg`,
  question: `question.svg`
});
const baseUrl = `img/module-6/svg-forms/`;
async function getMapShapes() {
  if (!loadedShape) {
    await loadShape();
  }
  return mapShapes;
}


async function loadShape() {
  const allPromise = [];
  const loader = new SVGLoader();
  Object.keys(URL_IMGS).forEach((key)=>{
    allPromise.push(
        new Promise((resolve, reject)=> {
          loader.load(
              `${baseUrl}${URL_IMGS[key]}`,
              function (data) {
                const paths = data.paths;

                for (let i = 0; i < paths.length; i++) {
                  const path = paths[i];
                  const shapes = path.toShapes();
                  const groupShape = [];
                  for (let j = 0; j < shapes.length; j++) {
                    groupShape.push(shapes[j]);
                  }
                  addMapShape(groupShape, key);

                }
                resolve();
              },
              // called when loading is in progresses
              function (xhr) {

              },
              // called when loading has errors
              function (error) {
                console.log(`An error happened`);
                reject();
              }
          );
        })
    );
  });
  await Promise.all(allPromise);
  loadedShape = true;
}


function addMapShape(shape, id) {
  Object.keys(mapShapes).forEach((key)=> {
    if (mapShapes[key].id === id) {
      mapShapes[key].shape = shape;
    }
  });
}


export {
  getMapShapes
};
