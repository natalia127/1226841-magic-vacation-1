import {
  PRIZES
} from '../../screenNames';
import {$} from '../../dom';


const animJumpScreen = (screenName) => {
  if (screenName !== PRIZES) {
    return;
  }
  return new Promise((resolve) => {
    let elJumpScreen = $(document)
      .findEl(`.jump-screen`)
      .addClass(`jump-screen--anim`);

    setTimeout(() => {
      elJumpScreen.removeClass(`jump-screen--anim`);
      resolve();
    }, 700);
  });
};

const animCountPrizes = (el) => {
  let totalCount = parseInt(el.innerText, 10);
  let intermediateValues = [totalCount];
  if (totalCount > 100) {
    intermediateValues.push(11);
  }

  for (let index = 0; index < 7; index++) {
    let value = Math.ceil(Math.random() * totalCount);
    if (!intermediateValues.includes(value)) {
      intermediateValues.push(value);
    }
  }
  intermediateValues.sort();

  let stylesEl = window.getComputedStyle(el, null);
  let width = stylesEl.width;
  let height = stylesEl.height;
  el.style.width = width;
  el.style.height = height;
  el.innerHTML = ``;
  el.style.opacity = 1;
  let i = 0;
  let fps = 12;
  let fpsInterval = 1000 / fps;
  let lastFrameTime = performance.now();
  let delta;

  (function tick(currentTime) {
    if (i >= intermediateValues.length) {
      return;
    }
    requestAnimationFrame(tick);
    delta = currentTime - lastFrameTime;
    if (delta > fpsInterval) {
      el.innerHTML = intermediateValues[i];
      i++;
      lastFrameTime = currentTime - delta % fpsInterval;
    }
  })();
};

export {
  animCountPrizes,
  animJumpScreen
};
