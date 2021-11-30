import {Scene2D} from "./Scene2d";
import {Animation} from "./Animation";
import {ease} from "../utils";

const PATH_DIR_IMGS = `./img/module-4/lose-images/`;
const URL_IMGS = Object.freeze({
  key: `key.png`,
  crocodile: `crocodile.png`,
  drop: `drop.png`,
  flamingo: `flamingo.png`,
  leaf: `leaf.png`,
  saturn: `saturn.png`,
  snowflake: `snowflake.png`,
  watermelon: `watermelon.png`
});
const SIZECANVAS = 1000;
const IMAGES = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 15,
    opacity: 0,
    imgDom: null,
  },
  crocodile: {
    imageId: `crocodile`,
    x: 50,
    y: 50,
    size: 50,
    opacity: 0,
    transforms: {
      translateY: 7,
      translateX: 30
    },
    imgDom: null,
  },
  drop: {
    imageId: `drop`,
    x: 50,
    y: 59,
    size: 2,
    opacity: 0,
    transforms: {

    },
    imgDom: null,
  },
  flamingo: {
    imageId: `flamingo`,
    x: 50,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      translateY: 20,
      translateX: 30
    },
    imgDom: null,
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      translateY: 20,
      translateX: 30
    },
    imgDom: null,
  },
  saturn: {
    imageId: `saturn`,
    x: 50,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      translateY: 20,
      translateX: 30
    },
    imgDom: null,
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      translateY: 20,
      translateX: 30
    },
    imgDom: null,
  },
  watermelon: {
    imageId: `watermelon`,
    x: 50,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      translateY: 20,
      translateX: 30
    },
    imgDom: null,
  },
});

const LOCALS = Object.freeze({
  maskForCrokodile: {
    opacity: 0,
    rxCenter: 50,
    ryCenter: 44.5,
    radius: 7.4
  }
});

export class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-canvas`);
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
    this.objects.crocodile.after = this.drawMask.bind(this);
    this.drawMask();

    super.initAnim();
    this.animKey();
    this.animObjectInKey();
    this.animCrocodile();
    this.animDrop();
  }

  animKey() {
    this.animations.push(
        new Animation({
          f: (progress) => {
            this.objects.key.opacity = progress;
          },
          dur: 100,
        }),
        new Animation({
          f: (progress) => {
            this.objects.key.size = 8 + 7 * progress;
          },
          dur: 200,
        })
    );
  }

  animObjectInKey() {
    this.animations.push(
        new Animation(
            {
              f: () => {
                this.objects.snowflake.opacity = 1;
                this.objects.flamingo.opacity = 1;
                this.objects.leaf.opacity = 1;
                this.objects.saturn.opacity = 1;
                this.objects.watermelon.opacity = 1;
              },
              dur: 0,
              del: 150
            }
        ),
        new Animation(
            {
              f: (progress) => {
                const progressReversed = 1 - progress;

                this.objects.snowflake.size = 10 * progress;
                this.objects.snowflake.transforms.translateY = 10 * progress;
                this.objects.snowflake.transforms.translateX = 15 * progress;
                this.objects.snowflake.transforms.rotate = 10 * progressReversed;

                this.objects.flamingo.size = 10 * progress;
                this.objects.flamingo.transforms.translateY = -5 * progress;
                this.objects.flamingo.transforms.translateX = -15 * progress;
                this.objects.flamingo.transforms.rotate = 40 * progressReversed;

                this.objects.leaf.size = 10 * progress;
                this.objects.leaf.transforms.translateY = -10 * progress;
                this.objects.leaf.transforms.translateX = 25 * progress;
                this.objects.leaf.transforms.rotate = -40 * progressReversed;


                this.objects.saturn.size = 10 * progress;
                this.objects.saturn.transforms.translateY = 15 * progress;
                this.objects.saturn.transforms.translateX = 30 * progress;
                this.objects.saturn.transforms.rotate = -30 * progressReversed;


                this.objects.watermelon.size = 10 * progress;
                this.objects.watermelon.transforms.translateY = 10 * progress;
                this.objects.watermelon.transforms.translateX = -20 * progress;
                this.objects.watermelon.transforms.rotate = 30 * progressReversed;

              },
              dur: 500,
              del: 150
            }
        ),
        new Animation(
            {
              f: (progress) => {

                this.objects.snowflake.transforms.translateY = 10 + 80 * progress;

                this.objects.flamingo.transforms.translateY = -5 + 80 * progress;

                this.objects.leaf.transforms.translateY = -10 + 80 * progress;

                this.objects.saturn.transforms.translateY = 15 + 80 * progress;

                this.objects.watermelon.transforms.translateY = 10 + 80 * progress;

              },
              dur: 400,
              del: 950,
              easing: ease.inQuad
            }
        )
    );
  }

  animCrocodile() {
    this.animations.push(
        new Animation({
          f: () => {
            this.objects.crocodile.opacity = 1;
          },
          dur: 0,
          del: 500
        }),
        new Animation({
          f: (progress) => {
            const progressReversed = 1 - progress;
            this.objects.crocodile.transforms.translateX = 10 * progressReversed + 1;
            this.objects.crocodile.transforms.translateY = 7 * progress;
            this.objects.crocodile.transforms.rotate = 10 * progressReversed;
          },
          dur: 350,
          del: 500
        })
    );
  }

  animDrop() {
    this.animations.push(
        new Animation({
          f: (progress) => {
            if (progress < 0.5) {
              this.objects.drop.transforms.translateY = 0;
              const progressIn = progress * 2;
              this.objects.drop.opacity = progressIn;
              this.objects.drop.transforms.scaleX = progressIn;
              this.objects.drop.transforms.scaleY = progressIn;
              this.objects.drop.transforms.translateX = this.objects.drop.size / 2 * (1 - progressIn);
            }
            if (progress >= 0.5) {
              const progressOut = (progress - 0.5) * 2;
              this.objects.drop.transforms.translateY = progressOut * 20;
            }
            if (progress > 0.7) {
              const progressReverseOut = ((1 - progress) / 0.3);
              this.objects.drop.opacity = progressReverseOut;
              this.objects.drop.transforms.scaleX = progressReverseOut;
              this.objects.drop.transforms.scaleY = progressReverseOut;
              this.objects.drop.transforms.translateX = this.objects.drop.size / 2 * (1 - progressReverseOut);
            }

          },
          dur: 1500,
          del: 650,
          repeat: true,
          fps: 120,
          easing: ease.inQuad
        })
    );
  }

  drawMask() {
    const m = this.locals.maskForCrokodile;

    if (m.opacity === 0) {
      m.opacity = 1;
    }

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = m.opacity;
    this.ctx.fillStyle = `#5f458c`;

    this.ctx.arc(m.rxCenter * s, m.ryCenter * s, m.radius * s, -2, 0.875);
    this.ctx.lineTo(60 * s, 75 * s);
    this.ctx.lineTo(100 * s, 75 * s);
    this.ctx.lineTo(100 * s, 25 * s);
    this.ctx.lineTo(50 * s, 25 * s);


    this.ctx.fill();
    this.ctx.restore();
  }

}
