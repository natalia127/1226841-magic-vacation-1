

export class Scene2D {
  constructor(options) {
    this.screenScale = 6
    this.canvas = options.canvas
    this.ctx = this.canvas.getContext('2d')
    this.size = options.settingsCanvas.size
    this.canvas.width = this.size
    this.canvas.height = this.size
    this.settingsImgs = {...options.images}
    this.loadImgs(options.urlImgs)

  }

  changeSizeInCanvas () {
    this.size = this.size * this.screenScale
    Object.keys(this.settingsImgs).forEach((nameImg) => {
      const img = this.settingsImgs[nameImg]
      img.x
    })
  }

  updateSizeCanvas () {

  }

  async loadImgs (urlImgs) {
    let promises = []
    promises = Object.keys(urlImgs).map((nameImg) => {
      return new Promise((resolve) => {
        let imgDom = new Image()
        imgDom.src = urlImgs[nameImg]
        this.settingsImgs[nameImg].imgDom = imgDom
        imgDom.onload = () => {
          console.log('resolve');
          resolve()
        }
      })
    })

    await Promise.all(promises)
    this.drawAllImgs()
  }
  drawAllImgs () {
    Object.keys(this.settingsImgs).forEach((imgName) => {
      this.drawImg(this.settingsImgs[imgName])
    })

  }

  drawImg (img) {
    let size = img.size
    let width = this.size * size / 100
    let height = this.size * size / 100 * img.imgDom.height / img.imgDom.width
    let x = this.size * img.x / 100 - width/2
    let y = this.size * img.y / 100 - height/2
    let trf = {...img.transforms}

    if (trf.translateY) {
      let translateY = this.size * trf.translateY / 100
      this.ctx.translate(0, trf.translateY)
    }
    this.ctx.drawImage(img.imgDom, x, y, width, height)

  }
}
