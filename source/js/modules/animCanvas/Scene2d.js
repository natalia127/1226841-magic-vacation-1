export class Scene2D {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.size = options.size;
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.objects = JSON.parse(JSON.stringify(options.images));
    this.loadImgs(options.urlImgs);
    this.initAddEventListener();

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
  }

  initAddEventListener() {
    document.body.addEventListener(`imgLoaded`, () => {
      this.drawAllImgs();
      this.initAnim();
    });
  }

  drawAllImgs() {
    this.clearCtx();
    Object.keys(this.objects).forEach((imgName) => {
      this.drawImg(this.objects[imgName]);
    });
  }

  rotateCtx(angle, trOrigin) {
    this.ctx.translate(trOrigin.x, trOrigin.y);
    this.ctx.rotate((Math.PI / 180) * angle);
    this.ctx.translate(-trOrigin.x, -trOrigin.y);
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImg(img) {
    let opacity = img.opacity;
    if (!opacity) {
      return;
    }
    let size = img.size;
    let width = (this.size * size) / 100;
    let height =
      (((this.size * size) / 100) * img.imgDom.height) / img.imgDom.width;
    let x = (this.size * img.x) / 100 - width / 2;
    let y = (this.size * img.y) / 100 - height / 2;
    let trf = {...img.transforms};
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
      this.rotateCtx(trf.rotate, {x: x + width / 2, y: y + height / 2});
    }
    if (opacity) {
      this.ctx.globalAlpha = opacity;
    }
    this.ctx.drawImage(img.imgDom, x, y, width, height);

    if (trf) {
      this.ctx.restore();
    }

  }
}
