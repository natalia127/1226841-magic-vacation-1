import {$} from '../dom'
import {PRIZES, TOP, GAME} from '../screenNames'
export default () => {
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
    animHeaderFooter: () => {
      $(document.body).addClass('body--anim')
    },
    animresult2: (el) => {
      $(el).findEl('.result__images').addClass('anim-app-img')
    }
  }
  document.body.addEventListener('screenChanged', (e)=> {
    let handler = handlers['anim' + e.detail.screenName]
    if (handler) {
      setTimeout(()=>{
        handler(e.detail.screenElement)
      }, 500)
    }
  })

  window.addEventListener('load', ()=> {
    handlers.animHeaderFooter()
  })
}


export const animJumpScreen = (screenEl, screenName) => {
  if (screenName !== PRIZES) return

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
