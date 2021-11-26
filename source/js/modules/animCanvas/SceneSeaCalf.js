import {Scene2D} from "./Scene2d";
import {Animation} from "./Animation";
import {ease} from "./utils";

const PATH_DIR_IMGS = `./img/module-4/win-primary-images/`;
const URL_IMGS = {
  plane: `airplane.png`,
  tree: `tree.png`,
  tree2: `tree_2.png`,
  ice: `ice.png`,
  seaCalf: `sea-calf-2.png`,
  snowflake: `snowflake.png`
};
const SIZECANVAS = 600;
const IMAGES = {
  plane: {
    imageId: `plane`,
    x: 90,
    y: 50,
    size: 10,
    opacity: 0,
    transforms: {
      translateY: -10
    },
    imgDom: null,
  },
  tree: {
    imageId: `tree`,
    x: 65,
    y: 62,
    size: 5,
    opacity: 0,
    imgDom: null,
  },
  tree2: {
    imageId: `tree2`,
    x: 60,
    y: 60,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 30
    },
    imgDom: null,

  },
  ice: {
    imageId: `ice`,
    x: 50,
    y: 70,
    size: 50,
    opacity: 0,
    transforms: {
      translateY: 50,
      rotate: 30
    },
    imgDom: null,
  },
  seaCalf: {
    imageId: `seaCalf`,
    x: 50,
    y: 60,
    size: 50,
    opacity: 0,
    transforms: {
      translateY: 50,
      rotate: 30
    },
    imgDom: null,
  },
  snowflake: {
    imageId: `snowflake`,
    x: 25,
    y: 55,
    size: 10,
    opacity: 0,
    transforms: {
      rotate: -30
    },
    imgDom: null,

  },
  snowflake2: {
    imageId: `snowflake`,
    x: 75,
    y: 65,
    size: 15,
    opacity: 0,
    transforms: {
      rotate: 30,
      scaleX: -1
    },
    imgDom: null,

  },
};

export class Scene2SSeaCalf extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`warlus-canvas`);
    const urlImgs = Object.keys(URL_IMGS).reduce((acc, nameImg) => {
      acc[nameImg] = PATH_DIR_IMGS + URL_IMGS[nameImg];
      return acc;
    }, {});
    super({
      canvas,
      images: IMAGES,
      urlImgs,
      size: SIZECANVAS,
    });
  }

  initAnim() {
    this.animSeaCalf();
    this.animIce();
    this.animSnowFlase();
  }

  animSeaCalf() {
    const objAnim = IMAGES.seaCalf;
    const customObjAnim = this.objects.seaCalf;
    customObjAnim.opacity = 1;

    const endTranslateY = 0;
    const distance = objAnim.transforms.translateY - endTranslateY;
    const animTranslateY = new Animation({
      f: (progress) => {
        this.objects.seaCalf.transforms.translateY = objAnim.transforms.translateY - distance * progress;
        this.drawAllImgs();
      },
      easing: ease.outElastic,
      dur: 2000
    });

    const endRotate = 0;
    const distanceRotate = objAnim.transforms.rotate - endRotate;

    const animRotate = new Animation({
      f: (progress) => {
        this.objects.seaCalf.transforms.rotate = objAnim.transforms.rotate - distanceRotate * progress;
        this.drawAllImgs();
      },
      easing: ease.outElastic,
      dur: 2000
    });
    animTranslateY.start();
    animRotate.start();
  }

  animIce() {
    const objAnim = IMAGES.ice;
    const customObjAnim = this.objects.ice;
    customObjAnim.opacity = 1;

    const endTranslateY = 0;
    const distance = objAnim.transforms.translateY - endTranslateY;
    const animTranslateY = new Animation({
      f: (progress) => {
        customObjAnim.transforms.translateY = objAnim.transforms.translateY - distance * progress;
        this.drawAllImgs();
      },
      easing: ease.outElastic,
      dur: 2000
    });

    const endRotate = 0;
    const distanceRotate = objAnim.transforms.rotate - endRotate;

    const animRotate = new Animation({
      f: (progress) => {
        customObjAnim.transforms.rotate = objAnim.transforms.rotate - distanceRotate * progress;
        this.drawAllImgs();
      },
      easing: ease.outElastic,
      dur: 2000
    });

    animTranslateY.start();
    animRotate.start();
  }
  animSnowFlase() {
    const objAnim = IMAGES.snowflake;
    const customObjAnim = this.objects.snowflake;

    const endOpacity = 1;
    const distanceOpacity = objAnim.opacity - endOpacity;

    const animOpacity = new Animation({
      f: (progress) => {
        customObjAnim.opacity = objAnim.opacity - distanceOpacity * progress;
        this.drawAllImgs();
      },
      dur: 300,
      del: 300,
    });
    animOpacity.start();
  }
}
