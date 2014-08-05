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
      self.el.classList.remove('hide')
      self.el.classList.add('show')

    hide()=
      self.el.classList.remove('show')
      self.el.classList.add('hide')

    toggle()=
      showing = self.el.classList.contains('show')
      if (showing)
        self.hide()
      else
        self.show()

  }

  dialogs = container.get()
  if (options.selector)
    dialog.el = document.querySelector(options.selector)
    if (dialog.el.id)
      dialog.id = dialog.el.id
  else
    dialog.el = document.createElement 'div'
    dialog.el.id = dialog.id
    dialogs.appendChild(dialog.el)


  dialog.el.classList.add('sidler-dialog')
  dialog.el.classList.add(position)

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
