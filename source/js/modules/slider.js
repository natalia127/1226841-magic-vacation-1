import Swiper from "swiper";
import {addColorTheme} from "./animation/animScreenStoty";
import {Anim3D} from "./animation/animWebGL/anim3D";
export default () => {
  let storySlider;
  const anim3D = new Anim3D();

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
              anim3D.init(1);
            } else if (
              storySlider.activeIndex === 2 ||
              storySlider.activeIndex === 3
            ) {
              addColorTheme(`dark-blue`);
              anim3D.init(2);
            } else if (
              storySlider.activeIndex === 4 ||
              storySlider.activeIndex === 5
            ) {
              addColorTheme(`light-blue`);
              anim3D.init(3);
            } else if (
              storySlider.activeIndex === 6 ||
              storySlider.activeIndex === 7
            ) {
              addColorTheme(`dark-purple`);
              anim3D.init(4);
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
              anim3D.init(1);

            } else if (storySlider.activeIndex === 2) {
              addColorTheme(`dark-blue`);
              anim3D.init(2);

            } else if (storySlider.activeIndex === 4) {
              addColorTheme(`light-blue`);
              anim3D.init(3);

            } else if (storySlider.activeIndex === 6) {
              addColorTheme(`dark-purple`);
              anim3D.init(4);

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
