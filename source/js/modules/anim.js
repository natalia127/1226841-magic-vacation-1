import {$} from '../dom'
import {PRIZES, TOP, GAME, RULES, STORY, RESULT1, RESULT2, RESULT3} from '../screenNames'

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
      animTimerGame( $(el).findEl('.game__counter').$el)
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
    [`anim${RESULT1}`]: (el) => {
     animTextSvg($(el).findEl('#victory1').$el)
     beginAnim(el, '#animTextV1')
    },
    [`anim${RESULT2}`]: (el) => {
      $(el).findEl('.result__images').addClass('anim-app-img')
      animTextSvg($(el).findEl('#victory2').$el)
      beginAnim(el, '#animTextV2')
    },
    [`anim${RESULT3}`]: (el) => {
      $(el).findEl('.result__button').addClass('anim-button')
      animJumpTextSvg($(el).findEl('#losing').$el)
      animTextSvg($(el).findEl('#losing').$el)
      beginAnim(el, '#animTextL')

    },
    [`anim${PRIZES}`]: (el) => {
      beginAnim(el, '#mainAnim')
      beginAnim(el, '#mainAnimPrize2')
      setTimeout(()=> {
        beginAnim(el, '#mainAnimPrize3') },
      1000)
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


function beginAnim(el, animElSelector){
  const animEl = el.querySelector(animElSelector);
  if (animEl) {
    animEl.beginElement();
  }
}

const animTextSvg = (el) => {
  const children = el.children
  for (let i = 0; i< children.length; i++) {
    if (children[i].nodeName !== 'path') continue
    const pathLength = Math.ceil(children[i].getTotalLength())
    children[i].setAttributeNS(null, 'stroke-dasharray', `0 ${pathLength}`)

    let  animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    animation.setAttributeNS(null, 'begin', 'indefinite')
    animation.setAttributeNS(null, 'attributeName',  'stroke-dasharray')
    animation.setAttributeNS(null, 'to',  `${pathLength/4} 0`)
    animation.setAttributeNS(null, 'from',  `3 ${pathLength/4}`)
    animation.setAttributeNS(null, 'fill', 'freeze')
    animation.setAttributeNS(null, 'dur', '0.5s')
    children[i].appendChild(animation)
    animation.beginElement()
  }
}

const animJumpTextSvg = (el) => {
  let height = window.getComputedStyle(el, null).height;
  let kHeight = 70
  el.style.height = `${parseInt(height) + kHeight}px`
  el.style.position = 'relative'
  el.style.bottom = `${kHeight/2}px`
  const children = el.children
  let del = 0
  for (let i = 0; i< children.length; i++) {
    if (children[i].nodeName !== 'path') continue

    let  animation = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform')
    animation.setAttributeNS(null, 'begin', 'indefinite')
    animation.setAttributeNS(null, 'attributeName',  'transform')
    animation.setAttributeNS(null, 'values', '-2 -50; -2 0;  -2 -10; -2 0;  -2 -5; -2 0')
    animation.setAttributeNS(null, 'dur', '1s')
    animation.setAttributeNS(null, 'fill', 'freeze')

    children[i].appendChild(animation)
    setTimeout(()=> {
      animation.beginElement()
    }, del)
    del+=50
  }
}
const animTimerGame = (el) => {
  const countMinute = 5
  localStorage.removeItem('timeGame')

  let now = Date.now()
  let next = null
  let dateTimer = null

  if (localStorage.getItem('timeGame')) {
    next = localStorage.getItem('timeGame')
  } else {
    next = AddMinutesToDate(now, countMinute).getTime()
    localStorage.setItem('timeGame', next)
  }

  function AddMinutesToDate(date, minutes) {
    return new Date(date + minutes*60000)
  }
  function DateFormat(date){
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds
    let strTime = `${minutes}:${seconds}`;
    return strTime;
  }

  (function tick() {
    let requestId = requestAnimationFrame(tick)
    now = Date.now()
    let diffTime = next - now
    let dateTimerLocal = DateFormat(new Date(diffTime))
    if (diffTime <= 1000) {
      cancelAnimationFrame(requestId)
      localStorage.removeItem('timeGame')
    }
    if (dateTimer !== dateTimerLocal) {
      const timeEl = document.createElement('span')
      timeEl.innerHTML = dateTimerLocal
      el.innerHTML = ``
      el.append(timeEl)
      dateTimer = dateTimerLocal
    }
  })()

}
