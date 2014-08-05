dialogs id = 'sidler-dialogs'

module.exports.get()=
  dialogs = document.getElementById(dialogs id)
  if (!dialogs)
    dialogs := document.createElement 'div'
    document.body.appendChild(dialogs)
    dialogs.id = dialogs id

  dialogs

