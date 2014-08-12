require './style'
container   = require './container'

dialog count = 0

onAnimationEnd(el, func)=
  register(eventName)=
    handler()=
      el.removeEventListener(eventName, func, false)
      func.apply(this, arguments)

    el.addEventListener(eventName, func, false)

  register 'animationend'
  register 'webkitAnimationEnd'
  register 'MSAnimationEnd'
  register 'oanimationend'

remove classes(el, classes)=
  for each @(className) in (classes)
    el.classList.remove(className)

module.exports.init(position = 'top', selector = nil, html = nil, modal = true, anchor = true) =
  ++dialog count
  dialog = {
    id = "sidler-dialog-#(dialog count)"
    show()=
      onAnimationEnd(self.el)
        remove classes(self.el, ['hide', 'hidding', 'showing'])
        self.el.classList.add('show')

      self.el.classList.add('showing')

    hide()=
      onAnimationEnd(self.el)
        remove classes(self.el, ['show', 'showing', 'hiding'])
        self.el.classList.add('hide')

      self.el.classList.add('hiding')

    toggle()=
      showing = self.el.classList.contains('show')
      if (showing)
        self.hide()
      else
        self.show()
  }

  dialogs = container.get()
  if (selector)
    dialog.el = document.querySelector(selector)
    if (dialog.el.id)
      dialog.id = dialog.el.id
  else
    dialog.el = document.createElement 'div'
    dialog.el.id = dialog.id
    dialogs.appendChild(dialog.el)


  dialog.el.classList.add('sidler-dialog')
  dialog.el.classList.add(position)

  if (anchor)
    dialog.el.classList.add('anchor')
  else
    dialog.el.classList.add('flex')

  if (modal)
    dialog.el.classList.add('modal')

  if (html)
    dialog.el.innerHTML = html

  dialog

show(options)=
  dialog = module.exports.init(options)
  dialog.show()
  dialog

module.exports.top(options)=
  options.position = 'top'
  show(options)

module.exports.right(options)=
  options.position = 'right'
  show(options)

module.exports.bottom(options)=
  options.position = 'bottom'
  show(options)

module.exports.left(options)=
  options.position = 'left'
  show(options)
