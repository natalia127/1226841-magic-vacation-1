import Swiper from "swiper";
import {addColorTheme} from "./animation/animScreenStoty";
export default () => {
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url('img/slide1.jpg'), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

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
              sliderContainer.style.backgroundImage = `url('img/slide1.jpg'), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
              addColorTheme(`dark-purple`);
            } else if (
              storySlider.activeIndex === 2 ||
              storySlider.activeIndex === 3
            ) {
              sliderContainer.style.backgroundImage = `url('img/slide2.jpg'), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
              addColorTheme(`dark-blue`);
            } else if (
              storySlider.activeIndex === 4 ||
              storySlider.activeIndex === 5
            ) {
              sliderContainer.style.backgroundImage = `url('img/slide3.jpg'), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
              addColorTheme(`light-blue`);
            } else if (
              storySlider.activeIndex === 6 ||
              storySlider.activeIndex === 7
            ) {
              sliderContainer.style.backgroundImage = `url('img/slide4.jpg'), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
              addColorTheme(`dark-purple`);
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
              sliderContainer.style.backgroundImage = `url('img/slide1.jpg')`;
              addColorTheme(`dark-purple`);
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url('img/slide2.jpg')`;
              addColorTheme(`dark-blue`);
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url('img/slide3.jpg')`;
              addColorTheme(`light-blue`);
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url('img/slide4.jpg')`;
              addColorTheme(`dark-purple`);
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
