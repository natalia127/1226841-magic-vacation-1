const COUNT_MINUTE = 5;
const KEY_LS = `timeGame`;

export class AnimTimerGame {
  constructor(el) {
    this.el = el;
    this.timeNow = null;
    this.timeLeft = null;
    this.requestId = null;
    this.dateTimer = null;
    this.timeEl = document.createElement(`span`);
    this.initWidthTimer();
    this.initTimer();
  }
  initTimer() {
    this.setTimeNow();
    this.setTimeLeft();
    this.tick();
  }
  setTimeNow() {
    this.timeNow = Date.now();
  }
  setTimeLeft() {
    if (localStorage.getItem(KEY_LS)) {
      this.timeLeft = localStorage.getItem(KEY_LS);
    } else {
      this.timeLeft = addMinutesToDate(this.timeNow, COUNT_MINUTE).getTime();
      localStorage.setItem(KEY_LS, this.timeLeft);
    }
    function addMinutesToDate(date, minutes) {
      return new Date(date + minutes * 60000);
    }
  }
  initWidthTimer() {
    this.timeEl.innerHTML = `99:99`;
    this.timeEl.style.opacity = 0;
    this.timeEl.style.display = `inline-block`;
    this.el.append(this.timeEl);
    this.timeEl.style.width = window.getComputedStyle(this.timeEl, null).width;
    this.el.innerHTML = ``;
    this.timeEl.style.opacity = 1;
  }
  tick() {
    this.setTimeNow();
    this.requestId = requestAnimationFrame(() => {
      this.tick();
    });
    let timeDiff = this.timeLeft - this.timeNow;
    if (timeDiff <= 1000) {
      this.stop();
    }
    let dateTimeDiff = dateFormat(new Date(timeDiff));

    if (this.dateTimer !== dateTimeDiff) {
      this.timeEl.innerHTML = dateTimeDiff;
      this.el.innerHTML = ``;
      this.el.append(this.timeEl);
      this.dateTimer = dateTimeDiff;
    }

    function dateFormat(date) {
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? `0` + minutes : minutes;
      let seconds = date.getSeconds();
      seconds = seconds < 10 ? `0` + seconds : seconds;
      let strTime = `${minutes}:${seconds}`;
      return strTime;
    }
  }
  stop() {
    cancelAnimationFrame(this.requestId);
    localStorage.removeItem(KEY_LS);
  }
}
