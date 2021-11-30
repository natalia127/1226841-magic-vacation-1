import {ease} from "../utils";

export class Animation {
  constructor(options) {
    this.startTime = null;
    this.del = options.del || 0;
    this.dur = options.dur || 1000;
    this.fps = options.fps || 60;
    this.easing = options.easing || ease.linear;
    this.options = options;
  }

  start() {
    setTimeout(() => {
      this.startTime = performance.now();
      let interval = 1000 / this.fps;
      let lastTimeFrame = this.startTime;
      let animationFrame = null;
      if (this.dur === `infinite`) {
        animationFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animationFrame);
          let delta = currentTime - lastTimeFrame;
          this.options.f(1, {
            currentTime,
            startTime: this.startTime
          });
          lastTimeFrame += delta % interval;
        };
      } else {
        animationFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animationFrame);
          let delta = currentTime - lastTimeFrame;
          if (delta > interval) {
            let timeFraction = (currentTime - this.startTime) / this.dur;
            if (timeFraction > 1) {
              timeFraction = 1;
              this.stop();
            }
            if (timeFraction <= 1) {
              let progress = this.easing(timeFraction);
              this.options.f(progress);
            }
            lastTimeFrame += delta % interval;
          }
        };
      }
      animationFrame(lastTimeFrame);


    }, this.del);
  }
  stop() {
    cancelAnimationFrame(this.requestId);
  }
}
