import {Scene2D} from "./Scene2d";
import {Animation} from "./Animation";
import {ease} from "../utils";

const PATH_DIR_IMGS = `./img/module-4/win-primary-images/`;
const URL_IMGS = Object.freeze({
  plane: `airplane.png`,
  tree: `tree.png`,
  tree2: `tree_2.png`,
  ice: `ice.png`,
  seaCalf: `sea-calf-2.png`,
  snowflake: `snowflake.png`
});
const SIZECANVAS = 1000;
const IMAGES = Object.freeze({
  plane: {
    imageId: `plane`,
    x: 90,
    y: 50,
    size: 10,
    opacity: 0,
    transforms: {
      translateY: -10,
      translateX: -27,
      rotate: 45
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
    size: 20,
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
      scaleX: -1
    },
    imgDom: null,

  },
});

const LOCALS = Object.freeze({
  blob: {
    centerX: 50,
    centerY: 55,
    radius: 20,
    endX: 87,
    endY: 53,
    angle: 45,
    deltasLength: 10,
    opacity: 0
  }
});

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
    this.locals = JSON.parse(JSON.stringify(LOCALS));

  }

  initAnim() {
    this.objects.plane.before = this.drawBlob.bind(this);
    super.initAnim();
    this.animSeaCalf();
    this.animIce();
    this.animSnowFlake();
    this.animSnowFlake2();
    this.animTree();
    this.animPlane();
    this.animBlob();

  }

  animSeaCalf() {
    const objAnim = IMAGES.seaCalf;
    const customObjAnim = this.objects.seaCalf;


    const endTranslateY = 0;
    const distance = objAnim.transforms.translateY - endTranslateY;
    const endRotate = 0;
    const distanceRotate = objAnim.transforms.rotate - endRotate;

    const anim = new Animation({
      f: (progress) => {
        customObjAnim.opacity = 1;
        customObjAnim.transforms.translateY = objAnim.transforms.translateY - distance * progress;
        customObjAnim.transforms.rotate = objAnim.transforms.rotate - distanceRotate * progress;

      },
      easing: ease.outElastic,
      dur: 2000,
      del: 200
    });
    this.animations.push(anim);

  }

  animIce() {
    const objAnim = IMAGES.ice;
    const customObjAnim = this.objects.ice;
    customObjAnim.opacity = 1;
    const endTranslateY = 0;
    const distance = objAnim.transforms.translateY - endTranslateY;
    const endRotate = 0;
    const distanceRotate = objAnim.transforms.rotate - endRotate;
    const anim = new Animation({
      f: (progress) => {
        customObjAnim.transforms.translateY = objAnim.transforms.translateY - distance * progress;
        customObjAnim.transforms.rotate = objAnim.transforms.rotate - distanceRotate * progress;

      },
      easing: ease.outElastic,
      dur: 2000,
      del: 200
    });
    this.animations.push(anim);

  }
  animSnowFlake() {
    const objAnim = IMAGES.snowflake;
    const customObjAnim = this.objects.snowflake;

    const endOpacity = 1;
    const distanceOpacity = objAnim.opacity - endOpacity;

    this.animations.push(new Animation({
      f: (progress) => {
        customObjAnim.opacity = objAnim.opacity - distanceOpacity * progress;
      },
      dur: 500,
      del: 500,
    }));

    this.animations.push(new Animation({
      f: (progress, details) => {
        customObjAnim.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      dur: `infinite`
    }));

  }
  animSnowFlake2() {
    const objAnim = IMAGES.snowflake2;
    const customObjAnim = this.objects.snowflake2;

    const endOpacity = 1;
    const distanceOpacity = objAnim.opacity - endOpacity;

    this.animations.push(new Animation({
      f: (progress) => {
        customObjAnim.opacity = objAnim.opacity - distanceOpacity * progress;
      },
      dur: 500,
      del: 500,
    }));

    this.animations.push(new Animation({
      f: (progress, details) => {
        customObjAnim.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      dur: `infinite`,
      del: 800
    }));

  }
  animTree() {
    const objAnim = IMAGES.tree2;
    const customObjAnim = this.objects.tree2;
    const endOpacity = 1;
    const distanceOpacity = objAnim.opacity - endOpacity;
    const endTranslateY = 0;
    const distance = objAnim.transforms.translateY - endTranslateY;
    this.animations.push(new Animation({
      f: (progress) => {
        this.objects.tree.opacity = 1;
        customObjAnim.opacity = objAnim.opacity - distanceOpacity * progress;
        customObjAnim.transforms.translateY = objAnim.transforms.translateY - distance * progress;

      },
      dur: 500,
      del: 500,
      easing: ease.inQuad
    }));
  }

  animPlane() {
    const anim = new Animation({
      f: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.plane.transforms.translateX = -40 * progressReversed;
        this.objects.plane.transforms.translateY =
          5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
        this.objects.plane.transforms.rotate =
          45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
        this.objects.plane.opacity = progress;
      },
      dur: 500,
      del: 400,
      easing: ease.inQuad
    });
    this.animations.push(anim);
  }
  animBlob() {
    this.animations.push(new Animation({
      f: (progress) => {
        const progressReversed = 1 - progress;

        this.locals.blob.radius = 15 * progress;
        this.locals.blob.centerY = 55 - 15 * progressReversed;
        this.locals.blob.endX = 87 - 35 * progressReversed;
        this.locals.blob.endY = 53 - 12 * progressReversed;
        this.locals.blob.angle = 40 + 120 * progressReversed;
        this.locals.blob.deltasLength = 10 * progress;
        this.locals.blob.opacity = progress;
      },
      dur: 500,
      del: 400,
      easing: ease.inQuad
    }));
  }


  drawBlob() {
    const b = this.locals.blob;
    const angle = b.angle * Math.PI / 180;

    if (b.opacity === 0) {
      return;
    }

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = b.opacity;
    this.ctx.fillStyle = `#acc3ff`;

    this.ctx.beginPath();
    this.ctx.arc(
        b.centerX * s,
        b.centerY * s,
        b.radius * s,
        Math.PI / 2,
        Math.PI * 3 / 2
    );
    this.ctx.bezierCurveTo(
        (b.centerX + 10) * s,
        (b.centerY - b.radius) * s,
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        b.endX * s,
        b.endY * s
    );
    this.ctx.bezierCurveTo(
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        (b.centerX + 10) * s,
        (b.centerY + b.radius) * s,
        b.centerX * s,
        (b.centerY + b.radius) * s
    );

    this.ctx.fill();
    this.ctx.restore();
  }
}
