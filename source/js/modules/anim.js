import {$} from '../dom'
import {PRIZES, TOP, GAME} from '../screenNames'
export default () => {
  let handlers = {
    [`anim${TOP}`]: (el) => {
      $(el).findEl('.intro__message').addClass('intro__message--anim')
    },
    [`anim${GAME}`]: (el) => {
      $(el).findEl('.chat__footer .form__field').addClass('form__field-anim')
    },
    animHeaderFooter: () => {
      $(document.body).addClass('body--anim')
    },
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
