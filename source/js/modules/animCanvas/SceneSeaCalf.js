import { Scene2D } from "./Scene2d"
const PATH_DIR_IMGS = './img/module-4/win-primary-images/'
const URL_IMGS = {
  seaCalf: 'sea-calf-2.png'
}
const SETTINGS_CANVAS = {
  size: 100
}
const IMAGES = {
  seaCalf: {
    imageId: `seaCalf`,
    x: 50,
    y: 60,
    size: 50,
    opacity: 0,
    transforms: {
      translateY: 200
    },
    imgDom: null
  }
}

export class Scene2SSeaCalf extends Scene2D {
  constructor () {
    const canvas = document.getElementById('warlus-canvas')
    const urlImgs = Object.keys(URL_IMGS).reduce((acc, nameImg) => {
      acc[nameImg] = PATH_DIR_IMGS+URL_IMGS[nameImg]
      return acc
    }, {})
    super (
      {
        canvas,
        images: IMAGES,
        urlImgs,
        settingsCanvas: SETTINGS_CANVAS
      }
    )
  }
}
