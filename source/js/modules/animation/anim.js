import {$} from '../../dom';
import {
  PRIZES,
  TOP,
  GAME,
  RULES,
  STORY,
  RESULT1,
  RESULT2,
  RESULT3,
} from '../../screenNames';
import {Scene2DSeaCalf} from "./animCanvas/SceneSeaCalf";
import {Scene2DCrocodile} from "./animCanvas/SceneCrocodile";

import {
  animJumpTextSvg,
  animTextSvg
} from './animScreenResult';

import {
  animJumpText
} from './animScreenTop';

import {animCountPrizes} from './animScreenPrizes';

import {AnimTimerGame} from './animScreenGame';

import {addColorTheme} from './animScreenStoty';

import {Scene3D} from './animWebGL/scene3D';
import {TestScene} from './animWebGL/testScene';

export const animChangeScreen = () => {
  const scene0 = new TestScene(0);
  const scene1 = new Scene3D(1);

  let handlers = {
    [`anim${TOP}`]: (el) => {
      scene0.init();

      $(el).findEl(`.intro__message`).addClass(`intro__message--anim`);
      animJumpText($(el).findEl(`.intro__title`).$el, {
        property: `transform`,
        direction: 500,
        timeFunction: `ease`,
        classRunAnim: `active`,
      });
    },
    [`anim${GAME}`]: (el) => {
      $(el).findEl(`.chat__footer .form__field`).addClass(`form__field-anim`);
      const animTimerGame = new AnimTimerGame($(el).findEl(`.game__counter`).$el);
    },
    [`anim${STORY}`]: (el, nameTheme = `dark-purple`) => {
      scene1.init();

      addColorTheme(nameTheme);
      $(el).findEl(`.slider`).addClass(`anim-pagination`);
    },
    [`anim${RULES}`]: (el) => {
      $(el).findEl(`.rules`).addClass(`rules--anim`);
    },
    animHeader: () => {
      $(document.body).addClass(`body--anim`);
    },
    [`anim${RESULT1}`]: (el) => {
      animTextSvg($(el).findEl(`#victory1`).$el);
      beginAnimSVG(el, `#animTextV1`);
      const scene = new Scene2DSeaCalf();
      scene.start();
    },
    [`anim${RESULT2}`]: (el) => {
      $(el).findEl(`.result__images`).addClass(`anim-app-img`);
      animTextSvg($(el).findEl(`#victory2`).$el);
      beginAnimSVG(el, `#animTextV2`);
    },
    [`anim${RESULT3}`]: (el) => {
      $(el).findEl(`.result__button`).addClass(`anim-button`);
      animJumpTextSvg($(el).findEl(`#losing`).$el);
      animTextSvg($(el).findEl(`#losing`).$el);
      setTimeout(()=>{
        beginAnimSVG(el, `#animTextL`);

      }, 500);

      const scene = new Scene2DCrocodile();
      scene.start();
    },
    [`anim${PRIZES}`]: (el) => {
      let countPrizes = $(el).findEl(`.prizes__desc b`);

      beginAnimSVG(el, `#mainAnim`);
      setTimeout(() => {
        animCountPrizes(countPrizes[0].$el);
      }, 1400);

      setTimeout(() => {
        beginAnimSVG(el, `#mainAnimPrize2`);
      }, 2500);
      setTimeout(() => {
        animCountPrizes(countPrizes[1].$el);
      }, 3000);

      setTimeout(() => {
        beginAnimSVG(el, `#mainAnimPrize3`);
      }, 3700);
      setTimeout(() => {
        animCountPrizes(countPrizes[2].$el);
      }, 4700);
    },
  };

  function beginAnimSVG(el, animElSelector) {
    const animEl = el.querySelector(animElSelector);
    if (animEl) {
      animEl.beginElement();
    }
  }

  document.body.addEventListener(`screenChanged`, (e) => {
    let handler = handlers[`anim` + e.detail.screenName];
    if (handler) {
      setTimeout(() => {
        handler(e.detail.screenElement);
      }, 500);
    }

    if (e.detail.screenName !== STORY) {
      addColorTheme(`base`);
    }
  });

  window.addEventListener(`load`, () => {
    handlers.animHeader();
  });
};

export const animHiddenScreen = (screenName) => {
  const animFooter = (nameClass) => {
    $(document.body).addClass(nameClass);
    setTimeout(() => {
      $(document.body).removeClass(nameClass);
    }, 600);
  };
  const handlers = {
    [`anim${PRIZES}`]: () => {
      animFooter(`anim--footer__prizes`);
    },
    [`anim${RULES}`]: () => {
      animFooter(`anim--footer__rules`);
    },
  };
  const handler = handlers[`anim` + screenName];

  if (!handler) {
    return;
  }

  return new Promise((resolve) => {
    handler();
    setTimeout(() => {
      resolve();
    }, 500);
  });
};


