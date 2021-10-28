export default () => {
  let handlers = {
    animtop: (el) => {
      addAnimClass(el,'.intro__message', 'intro__message--anim' )
    },
    animgame: (el) => {
      addAnimClass(el,'.chat__footer .form__field',  'form__field-anim')
    },
    animHeaderFooter: () => {
      addAnimClass(document, 'body', 'body--anim')
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

const addAnimClass = ($el, selector, newClass) => {
  let animEl = $el.querySelector(selector)
      if (animEl && !animEl.classList.contains(`.${newClass}`)) {
        animEl.classList.add(newClass)
      }
}
