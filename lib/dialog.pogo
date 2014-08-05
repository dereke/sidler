require './style'
container   = require './container'

dialog count = 0

module.exports.init(options)=
  defaults = {
    position = 'top'
  }

  if (!options)
    options := {}

  if (!options.position)
    options.position = defaults.position

  position = options.position


  ++dialog count
  dialog = {
    id = "sidler-dialog-#(dialog count)"
    show()=
      self.el.set attribute('class', "sidler-dialog #(position) show")

    hide()=
      self.el.set attribute('class', "sidler-dialog #(position) hide")

    toggle()=
      showing = (self.el.get attribute('class').index of('show') != -1)
      if (showing)
        self.hide()
      else
        self.show()

  }

  dialogs = container.get()
  if (options.selector)
    dialog.el = document.querySelector(options.selector)
    dialog.el.classList.add 'sidler-dialog'
    if (dialog.el.id)
      dialog.id = dialog.el.id
  else
    dialog.el = document.createElement 'div'
    dialog.el.id = dialog.id
    dialogs.appendChild(dialog.el)

  dialog.el.set attribute('class', "sidler-dialog #(position)")

  if (options.html)
    dialog.el.innerHTML = options.html


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
