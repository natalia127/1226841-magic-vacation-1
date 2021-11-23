import { lte } from 'lodash'
import {$} from '../dom'
import {PRIZES, TOP, GAME, RULES, STORY, RESULT2, RESULT3} from '../screenNames'

export const animChangeScreen = () => {
  let handlers = {
    [`anim${TOP}`]: (el) => {
      $(el).findEl('.intro__message').addClass('intro__message--anim')
      animJumpText($(el).findEl('.intro__title').$el, {
        property: 'transform',
        direction: 500,
        timeFunction: 'ease',
        classRunAnim: 'active'
      })
    },
    [`anim${GAME}`]: (el) => {
      $(el).findEl('.chat__footer .form__field').addClass('form__field-anim')
    },
    [`anim${STORY}`]: (el, nameTheme = 'dark-purple') => {
      addColorTheme(nameTheme)
      $(el).findEl('.slider').addClass('anim-pagination')
    },
    [`anim${RULES}`]: (el) => {
      $(el).findEl('.rules').addClass('rules--anim')
    },
    animHeader: () => {
      $(document.body).addClass('body--anim')
    },
    [`anim${RESULT2}`]: (el) => {
      $(el).findEl('.result__images').addClass('anim-app-img')
    },
    [`anim${RESULT3}`]: (el) => {
      $(el).findEl('.result__button').addClass('anim-button')
    },
    [`anim${PRIZES}`]: (el) => {
      let countPrizes = $(el).findEl('.prizes__desc b')

      beginAnim('#mainAnim')
      setTimeout(() => {
        animCountPrizes(countPrizes[0].$el)
      }, 1400)

      setTimeout(()=> {
        beginAnim('#mainAnimPrize2')
      },
      2500)
      setTimeout(()=> {
        animCountPrizes(countPrizes[1].$el)
      },
      3000)

      setTimeout(()=> {
        beginAnim('#mainAnimPrize3')

      },
      3700)
      setTimeout(()=> {
        animCountPrizes(countPrizes[2].$el)
      },
      4700)


      function beginAnim(animElSelector){
        const animEl = el.querySelector(animElSelector);
        if (animEl) {
          animEl.beginElement();
        }
      }
    }
  }

  document.body.addEventListener('screenChanged', (e)=> {
    let handler = handlers['anim' + e.detail.screenName]
    if (handler) {
      setTimeout(()=>{
        handler(e.detail.screenElement)
      }, 500)
    }

    if(e.detail.screenName !== STORY) {
      addColorTheme('base')
    }
  })

  window.addEventListener('load', ()=> {
    handlers.animHeader()
  })
}

export const animHiddenScreen = (screenName) => {
  const animFooter = (nameClass) => {
    $(document.body).addClass(nameClass)
    setTimeout(()=> {
      $(document.body).removeClass(nameClass)
    }, 600)
  }
  const handlers = {
    [`anim${PRIZES}`]: () => {
      animFooter('anim--footer__prizes')
    },
    [`anim${RULES}`]: () => {
      animFooter('anim--footer__rules')
    },
  }
  const handler = handlers['anim' + screenName]

  if (!handler) return

  return new Promise((resolve) => {
    handler()
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

export const addColorTheme = (nameTheme) => {
  const namesTheme = ['base', 'dark-purple', 'dark-blue', 'light-blue']
  if(!namesTheme.includes(nameTheme)) return
  const el = $(document).findEl('body')
  if (el.isClass(nameTheme)) return
  namesTheme.forEach(nameClass => el.removeClass(nameClass))
  el.addClass(nameTheme)
}

export const animJumpScreen = (screenName) => {
  if (screenName !== PRIZES)  return
  return new Promise((resolve, reject) => {
    let elJumpScreen = $(document).findEl('.jump-screen').addClass('jump-screen--anim')

    setTimeout(() => {
      elJumpScreen.removeClass('jump-screen--anim')
      resolve()
    }, 700);
  });
}

const animJumpText = (el, { property, direction, timeFunction, classRunAnim}) => {
  const text = el.textContent.trim().split(' ').filter(letter => !letter !== '')
  const stepDelayStr = 250
  let startDelayStr = 0

  el.classList.add('txt')

  const content = text.reduce((acc, word)=> {
    const fragmentWord = word.split('').reduce((accWord, char) => {
      const fragmentChar = document.createElement('span')
      fragmentChar.innerHTML = char
      fragmentChar.style.transition = `${property} ${direction}ms ${timeFunction}`
      fragmentChar.style.transitionDelay = `${Math.random() * 300}ms`

      accWord.append(fragmentChar)
      return accWord
    }, document.createDocumentFragment())


    const fragment = document.createElement('span')
    fragment.append(fragmentWord)
    fragment.classList.add('str')
    fragment.innerHTML += ' '
    fragment.style.transitionDelay = `${startDelayStr}ms`

    acc.append(fragment)
    startDelayStr+=stepDelayStr

    return acc
  }, document.createDocumentFragment())

  el.innerHTML = ``;
  el.append(content);
  setTimeout(()=> {
    el.classList.add(classRunAnim)
  }, 200)
}

const animCountPrizes = (el) => {
  let totalCount = parseInt(el.innerText)
  let intermediateValues = [totalCount]
  if (totalCount > 100) {
    intermediateValues.push(11)
  }
  if (totalCount > 4) {
    for (let index = 0; index < 3; index++) {
      let value = Math.ceil(Math.random() * totalCount)
      if (!intermediateValues.includes(value)) {
        intermediateValues.push(value)
      }
    }
    intermediateValues.sort()
  }
  let stylesEl = window.getComputedStyle(el, null)
  let width = stylesEl.width
  let height = stylesEl.height
  el.style.width = width
  el.style.height = height
  el.innerHTML = ''
  el.style.opacity = 1
  let now,
  i=0,
  fps = 12,
  fpsInterval = 1000 / fps,
  then = Date.now(),
  elapsed


  (function tick() {
    if (i >= intermediateValues.length) return
    requestAnimationFrame(tick)
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      el.innerHTML = intermediateValues[i]
      i++
    }
  })()

}
