import {ease} from './utils'

export class Animation {
  constructor (options) {
    this.startTime = null
    this.del = options.del || 0
    this.dur = options.dur || 1000
    this.fps = options.fps || 60
    this.easing = options.easing || ease.linear
    this.options = options
  }

  start() {
    setTimeout(() => {
      this.startTime = performance.now()
      let interval = 1000/this.fps
      let lastTimeFrame = this.startTime
      let endTime = this.startTime + this.dur
      let animationFrame = (currentTime) => {
        this.requestId = requestAnimationFrame(animationFrame)

        let diffTime = (currentTime - lastTimeFrame) / interval
        if (diffTime >= 1) {
          let progress = this.easing(diffTime)
          this.options.f(progress)
          lastTimeFrame = currentTime - diffTime
        }

        if (endTime < currentTime) this.stop()
      }
      animationFrame(lastTimeFrame)


    }, this.del)
  }
  stop () {
    cancelAnimationFrame(this.requestId)
  }
}
