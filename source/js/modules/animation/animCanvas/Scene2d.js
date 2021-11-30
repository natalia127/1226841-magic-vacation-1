import {Animation} from "./Animation";

export class Scene2D {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.size = options.size;
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.animations = [];
    this.urlImgs = options.urlImgs;
    this.loadingImg = false;
    this.objects = JSON.parse(JSON.stringify(options.images));
    this.initAddEventListener();

  }

  start() {
    if (!this.loadingImg) {
      this.loadImgs(this.urlImgs);
      return;
    }
    this.initAnim();
    this.animations.forEach((anim) => anim.start());
  }

  async loadImgs(urlImgs) {
    let promises = [];
    promises = Object.keys(urlImgs).map((nameImg) => {
      return new Promise((resolve) => {
        let imgDom = new Image();
        imgDom.src = urlImgs[nameImg];

        const namesOb = Object.keys(this.objects).filter((name)=> {
          return this.objects[name].imageId === nameImg;
        });
        namesOb.forEach((name) => {
          this.objects[name].imgDom = imgDom;

        });
        imgDom.onload = () => {
          resolve();
        };
      });
    });

    await Promise.all(promises);
    this.loadingImg = true;
    const event = new CustomEvent(`imgLoaded`);

    document.body.dispatchEvent(event);
  }

  initAnim() {
    this.animations.push(
        new Animation({
          f: () => {
            this.drawAllImgs();
          },
          dur: `infinite`
        })
    );
  }

  initAddEventListener() {
    document.body.addEventListener(`imgLoaded`, this.start.bind(this));
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  drawAllImgs() {
    this.clearCtx();
    Object.keys(this.objects).forEach((imgName) => {
      if (this.objects[imgName].before) {
        this.objects[imgName].before();
      }
      this.drawImg(this.objects[imgName]);
      if (this.objects[imgName].after) {
        this.objects[imgName].after();
      }
    });
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImg(img) {
    const opacity = img.opacity;
    if (!opacity) {
      return;
    }
    const size = img.size;
    let width = (this.size * size) / 100;
    let height =
      (((this.size * size) / 100) * img.imgDom.height) / img.imgDom.width;
    let x = (this.size * img.x) / 100 - width / 2;
    let y = (this.size * img.y) / 100 - height / 2;
    const trf = {...img.transforms};
    if (trf) {
      this.ctx.save();
    }
    if (trf.translateY) {
      y += (this.size * trf.translateY) / 100;
    }
    if (trf.translateX) {
      x += (this.size * trf.translateX) / 100;
    }
    if (trf.rotate) {
      this.ctx.translate(x + width / 2, y + height / 2);
      this.ctx.rotate((Math.PI / 180) * trf.rotate);
    }
    if (trf.scaleX) {
      width *= trf.scaleX;

      if (trf.scaleX < 0) {
        this.ctx.scale(-1, 1);

        x = -x;
      }
    }

    if (trf.scaleY) {
      height *= trf.scaleY;

      if (trf.scaleY < 0) {
        this.ctx.scale(1, -1);

        y = -y;
      }
    }

    if (trf.rotate) {
      this.ctx.translate(-x - width / 2, -y - height / 2);
    }
    if (opacity) {
      this.ctx.globalAlpha = opacity;
    }
    this.ctx.drawImage(img.imgDom, x, y, width, height);

    if (trf) {
      this.ctx.restore();
    }

  }
  updateSize() {
    this.size = Math.min(window.innerWidth, window.innerHeight);

    this.canvas.height = this.size;
    this.canvas.width = this.size;
  }
}
