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
      self.el.set attribute('class', "dialog #(position) show")

    hide()=
      self.el.set attribute('class', "dialog #(position) hide")

    toggle()=
      showing = (self.el.get attribute('class').index of('show') != -1)
      if (showing)
        self.hide()
      else
        self.show()

  }

  dialogs = container.get()
  dialog.el = document.createElement 'div'
  dialog.el.id = dialog.id
  dialog.hide()

  if (options.html)
    dialog.el.innerHTML = options.html

  dialogs.appendChild(dialog.el)

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
