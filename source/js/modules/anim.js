export default () => {
  let handlers = {
    animtop: (el) => {
      let animEl = el.querySelector('.intro__message')
      if (animEl && !animEl.classList.contains('.intro__message--anim')) {
        animEl.classList.add('intro__message--anim')
      }
    },
    animgame: (el) => {
      let animEl = el.querySelector('.chat__footer .form__field')
      if (animEl && !animEl.classList.contains('.form__field-anim')) {
        animEl.classList.add('form__field-anim')
      }
    }
  }
  document.body.addEventListener('screenChanged', (e)=> {
    let handler = handlers['anim' + e.detail.screenName]
    if (handler) {
      setTimeout(()=>{
        console.log(e.detail.screenElement);
        handler(e.detail.screenElement)
      }, 500)
    }
  })
}
