 class Dom {
  constructor (el){
    this.$el = el
  }
  findEl (selector) {
    return $(this.$el.querySelector(selector))
  }
  isClass (nameClass) {
    return this.$el.classList.contains(nameClass)
  }
  addClass (nameClass){
    if (!this.isClass(nameClass)) {
      this.$el.classList.add(nameClass)
    }
    return $(this.$el)
  }
  removeClass (nameClass) {
    if (this.isClass(nameClass)) {
      this.$el.classList.remove(nameClass)
    }
    return $(this.$el)
  }
  addStyle (styles) {
    Object.keys(styles).forEach(nameStyle => {
      this.$el.style[nameStyle] = styles[nameStyle]
    })
    return $(this.$el)
  }

}

export const $ = (el) => {return new Dom(el)}

