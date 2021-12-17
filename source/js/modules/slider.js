import Swiper from "swiper";
import {addColorTheme} from "./animation/animScreenStoty";
import {SceneStory2} from './animation/animWebGL/SceneStory2';
import {SceneStory1} from './animation/animWebGL/SceneStory1';
import {SceneStory3} from './animation/animWebGL/SceneStory3';
import {SceneStory4} from './animation/animWebGL/SceneStory4';

export default () => {
  let storySlider;
  const scene1 = new SceneStory1();
  const scene2 = new SceneStory2();
  const scene3 = new SceneStory3();
  const scene4 = new SceneStory4();

  const setSlider = function () {
    if (window.innerWidth / window.innerHeight < 1 || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            if (
              storySlider.activeIndex === 0 ||
              storySlider.activeIndex === 1
            ) {
              addColorTheme(`dark-purple`);
              scene1.init();
            } else if (
              storySlider.activeIndex === 2 ||
              storySlider.activeIndex === 3
            ) {
              addColorTheme(`dark-blue`);
              scene2.init();

            } else if (
              storySlider.activeIndex === 4 ||
              storySlider.activeIndex === 5
            ) {
              addColorTheme(`light-blue`);
              scene3.init();

            } else if (
              storySlider.activeIndex === 6 ||
              storySlider.activeIndex === 7
            ) {
              addColorTheme(`dark-purple`);
              scene4.init();
            }
          },
          resize: () => {
            storySlider.update();
          },
          slideChangeTransitionEnd: () => {
            animText();
          },
          reachBeginning: () => {
            animText();
          },
        },
        speed: 0,
        observer: true,
        observeParents: true,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`,
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true,
        },
        speed: 0,
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              addColorTheme(`dark-purple`);
              scene1.init();

            } else if (storySlider.activeIndex === 2) {
              addColorTheme(`dark-blue`);
              scene2.init();

            } else if (storySlider.activeIndex === 4) {
              addColorTheme(`light-blue`);
              scene3.init();

            } else if (storySlider.activeIndex === 6) {
              addColorTheme(`dark-purple`);
              scene4.init();

            }
          },
          resize: () => {
            storySlider.update();
          },
          slideChangeTransitionEnd: () => {
            animText();
          },
          reachBeginning: () => {
            animText();
          },
        },
        observer: true,
        observeParents: true,
      });
    }
  };
  let animText = () => {
    let animEls = document.querySelectorAll(`.swiper-slide-active .slider__item-text, .swiper-slide-next .slider__item-text`
    );
    let stepTime = 0;
    Array.from(animEls).forEach((el) => {
      setTimeout(() => {
        if (!el.classList.contains(`.slider__item-text--anim`)) {
          el.classList.add(`slider__item-text--anim`);
        }
      }, stepTime);
      stepTime += 250;
    });
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
