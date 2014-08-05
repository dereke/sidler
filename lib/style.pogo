module.exports.init()=
  head    = document.getElementsByTagName('head')
  style   = document.createElement('style')
  style.type = 'text/css'
  style.id = 'sidler-style'
  head.0.appendChild(style)

  style.innerHTML = "
#sidler-dialogs .dialog {
  position: absolute; 
}

#sidler-dialogs .dialog.hide {
  -webkit-transform: translateY(-100px);
}
  
#sidler-dialogs .dialog.top.show {
  -webkit-animation: slideDown 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.right.show {
  -webkit-animation: slideLeft 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.bottom.show {
  -webkit-animation: slideUp 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.left.show {
  -webkit-animation: slideRight 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.top.hide {
  -webkit-animation: slideHideUp 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.right.hide {
  -webkit-animation: slideHideRight 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.bottom.hide {
  -webkit-animation: slideHideDown 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.left.hide {
  -webkit-animation: slideHideLeft 0.5s 0s 1 ease forwards;
}

#sidler-dialogs .dialog.top {
  top: 0px;
}

#sidler-dialogs .dialog.right {
  right: 0px;
}

#sidler-dialogs .dialog.bottom {
  bottom: 0px;
}

#sidler-dialogs .dialog.left {
  left: 0px;
}

@-webkit-keyframes slideLeft {
  0% { -webkit-transform: translateX(100px); }
  100% { -webkit-transform: translateX(0px); }
}

@-webkit-keyframes slideDown {
  0% { -webkit-transform: translateY(-100px); }
  100% { -webkit-transform: translateY(0px); }
}
@-webkit-keyframes slideRight {
  0% { -webkit-transform: translateX(-100px); }
  100% { -webkit-transform: translateX(0px); }
}

@-webkit-keyframes slideUp {
  0% { -webkit-transform: translateY(100px); }
  100% { -webkit-transform: translateY(0px); }
}

@-webkit-keyframes slideHideLeft {
  0% { -webkit-transform: translateX(0px); }
  100% { -webkit-transform: translateX(-100px); }
}

@-webkit-keyframes slideHideDown {
  0% { -webkit-transform: translateY(0px); }
  100% { -webkit-transform: translateY(100px); }
}
@-webkit-keyframes slideHideRight {
  0% { -webkit-transform: translateX(0px); }
  100% { -webkit-transform: translateX(100px); }
}

@-webkit-keyframes slideHideUp {
  0% { -webkit-transform: translateY(0px); }
  100% { -webkit-transform: translateY(-100px); }
}

"
