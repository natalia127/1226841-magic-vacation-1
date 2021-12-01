import {ease} from "../utils";

export class Animation {
  constructor(options) {
    this.startTime = null;
    this.del = options.del || 0;
    this.dur = options.dur || 1000;
    this.fps = options.fps || 60;
    this.easing = options.easing || ease.linear;
    this.options = options;
    this.repeat = options.repeat;
  }

  start() {
    setTimeout(() => {

      this.setAnimation();

    }, this.del);
  }
  setAnimation() {
    this.startTime = performance.now();
    const interval = 1000 / this.fps;
    let lastTimeFrame = this.startTime;
    let animationFrame = null;
    if (this.dur === `infinite`) {
      animationFrame = (currentTime) => {
        this.requestId = requestAnimationFrame(animationFrame);
        const delta = currentTime - lastTimeFrame;
        this.options.f(1, {
          currentTime,
          startTime: this.startTime
        });
        lastTimeFrame += delta % interval;
      };
    } else {
      animationFrame = (currentTime) => {
        this.requestId = requestAnimationFrame(animationFrame);
        const delta = currentTime - lastTimeFrame;
        if (delta > interval) {
          let timeFraction = (currentTime - this.startTime) / this.dur;
          if (timeFraction > 1) {
            timeFraction = 1;
            this.stop();
          }
          if (timeFraction <= 1) {
            const progress = this.easing(timeFraction);
            this.options.f(progress);
          }
          lastTimeFrame += delta % interval;
        }
      };
    }
    animationFrame(lastTimeFrame);
  }
  stop() {
    cancelAnimationFrame(this.requestId);
    if (this.repeat) {
      this.setAnimation();
    }
  }
}
