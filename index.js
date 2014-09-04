!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.sidler=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {
    var self = this;
    var dialogsId;
    dialogsId = "sidler-dialogs";
    module.exports.get = function() {
        var self = this;
        var dialogs;
        dialogs = document.getElementById(dialogsId);
        if (!dialogs) {
            dialogs = document.createElement("div");
            document.body.appendChild(dialogs);
            dialogs.id = dialogsId;
        }
        return dialogs;
    };
}).call(this);
},{}],2:[function(_dereq_,module,exports){
(function() {
    var self = this;
    var container, dialogCount, onAnimationEnd, removeClasses, overlay, show;
    _dereq_("./style");
    container = _dereq_("./container");
    dialogCount = 0;
    onAnimationEnd = function(el, func) {
        var register;
        register = function(eventName) {
            var handler;
            handler = function() {
                el.removeEventListener(eventName, func, false);
                return func.apply(this, arguments);
            };
            return el.addEventListener(eventName, func, false);
        };
        register("animationend");
        register("webkitAnimationEnd");
        register("MSAnimationEnd");
        return register("oanimationend");
    };
    removeClasses = function(el, classes) {
        var gen1_items, gen2_i, className;
        gen1_items = classes;
        for (gen2_i = 0; gen2_i < gen1_items.length; ++gen2_i) {
            className = gen1_items[gen2_i];
            el.classList.remove(className);
        }
        return void 0;
    };
    overlay = '<div class="sidler-overlay"></div>';
    module.exports.init = function(gen3_options) {
        var self = this;
        var position, selector, html, modal, edge;
        position = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "position") && gen3_options.position !== void 0 ? gen3_options.position : "top";
        selector = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "selector") && gen3_options.selector !== void 0 ? gen3_options.selector : void 0;
        html = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "html") && gen3_options.html !== void 0 ? gen3_options.html : void 0;
        modal = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "modal") && gen3_options.modal !== void 0 ? gen3_options.modal : true;
        edge = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "edge") && gen3_options.edge !== void 0 ? gen3_options.edge : true;
        var modalDialog, makeModal, dialog, dialogs;
        ++dialogCount;
        modalDialog = void 0;
        makeModal = function() {
            var overlay, closeModal;
            overlay = document.createElement("div");
            overlay.className = "sidler-overlay";
            document.body.insertBefore(overlay, document.body.firstChild);
            closeModal = function(e) {
                var parentElement, clickedWithinDialog;
                parentElement = e.target;
                clickedWithinDialog = false;
                while (parentElement !== null) {
                    if (parentElement === dialog.el) {
                        clickedWithinDialog = true;
                        parentElement = null;
                    } else {
                        parentElement = parentElement.parentElement;
                    }
                }
                if (!clickedWithinDialog) {
                    return dialog.hide();
                }
            };
            overlay.addEventListener("click", closeModal, false);
            return modalDialog = {
                remove: function() {
                    var self = this;
                    document.body.removeChild(overlay);
                    overlay.removeEventListener("click", closeModal, false);
                    return modalDialog = void 0;
                }
            };
        };
        dialog = {
            id: "sidler-dialog-" + dialogCount,
            show: function() {
                var self = this;
                onAnimationEnd(self.el, function() {
                    removeClasses(self.el, [ "hide", "hidding", "showing" ]);
                    return self.el.classList.add("show");
                });
                if (modal) {
                    makeModal();
                }
                return self.el.classList.add("showing");
            },
            hide: function() {
                var self = this;
                onAnimationEnd(self.el, function() {
                    removeClasses(self.el, [ "show", "showing", "hiding" ]);
                    return self.el.classList.add("hide");
                });
                self.el.classList.add("hiding");
                if (modalDialog) {
                    return modalDialog.remove();
                }
            },
            toggle: function() {
                var self = this;
                var showing;
                showing = self.el.classList.contains("show");
                if (showing) {
                    return self.hide();
                } else {
                    return self.show();
                }
            }
        };
        dialogs = container.get();
        if (selector) {
            dialog.el = document.querySelector(selector);
            if (dialog.el.id) {
                dialog.id = dialog.el.id;
            }
        } else {
            dialog.el = document.createElement("div");
            dialog.el.id = dialog.id;
            dialogs.appendChild(dialog.el);
        }
        dialog.el.classList.add("sidler-dialog");
        dialog.el.classList.add(position);
        if (edge) {
            dialog.el.classList.add("edge");
        } else {
            dialog.el.classList.add("flex");
        }
        if (modal) {
            dialog.el.classList.add("modal");
        }
        if (html) {
            dialog.el.innerHTML = html;
        }
        return dialog;
    };
    show = function(options) {
        var dialog;
        dialog = module.exports.init(options);
        dialog.show();
        return dialog;
    };
    module.exports.top = function(options) {
        var self = this;
        options.position = "top";
        return show(options);
    };
    module.exports.right = function(options) {
        var self = this;
        options.position = "right";
        return show(options);
    };
    module.exports.bottom = function(options) {
        var self = this;
        options.position = "bottom";
        return show(options);
    };
    module.exports.left = function(options) {
        var self = this;
        options.position = "left";
        return show(options);
    };
}).call(this);
},{"./container":1,"./style":3}],3:[function(_dereq_,module,exports){
var css = "@-webkit-keyframes slideLeft {\n  0% {\n    -webkit-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n  100% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n}\n@-moz-keyframes slideLeft {\n  0% {\n    -webkit-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n  100% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n}\n@keyframes slideLeft {\n  0% {\n    -webkit-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n  100% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n}\n@-webkit-keyframes slideDown {\n  0% {\n    -webkit-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    transform: translateY(-100%);\n  }\n  100% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n}\n@-moz-keyframes slideDown {\n  0% {\n    -webkit-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    transform: translateY(-100%);\n  }\n  100% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n}\n@keyframes slideDown {\n  0% {\n    -webkit-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    transform: translateY(-100%);\n  }\n  100% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n}\n@-webkit-keyframes slideRight {\n  0% {\n    -webkit-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transform: translateX(-100%);\n  }\n  100% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n}\n@-moz-keyframes slideRight {\n  0% {\n    -webkit-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transform: translateX(-100%);\n  }\n  100% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n}\n@keyframes slideRight {\n  0% {\n    -webkit-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transform: translateX(-100%);\n  }\n  100% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n}\n@-webkit-keyframes slideUp {\n  0% {\n    -webkit-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    transform: translateY(100%);\n  }\n  100% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n}\n@-moz-keyframes slideUp {\n  0% {\n    -webkit-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    transform: translateY(100%);\n  }\n  100% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n}\n@keyframes slideUp {\n  0% {\n    -webkit-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    transform: translateY(100%);\n  }\n  100% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n}\n@-webkit-keyframes slideHideLeft {\n  0% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transform: translateX(-100%);\n  }\n}\n@-moz-keyframes slideHideLeft {\n  0% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transform: translateX(-100%);\n  }\n}\n@keyframes slideHideLeft {\n  0% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transform: translateX(-100%);\n  }\n}\n@-webkit-keyframes slideHideDown {\n  0% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  100% {\n    -webkit-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    transform: translateY(100%);\n  }\n}\n@-moz-keyframes slideHideDown {\n  0% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  100% {\n    -webkit-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    transform: translateY(100%);\n  }\n}\n@keyframes slideHideDown {\n  0% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  100% {\n    -webkit-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    transform: translateY(100%);\n  }\n}\n@-webkit-keyframes slideHideRight {\n  0% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n@-moz-keyframes slideHideRight {\n  0% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n@keyframes slideHideRight {\n  0% {\n    -webkit-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n@-webkit-keyframes slideHideUp {\n  0% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  100% {\n    -webkit-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    transform: translateY(-100%);\n  }\n}\n@-moz-keyframes slideHideUp {\n  0% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  100% {\n    -webkit-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    transform: translateY(-100%);\n  }\n}\n@keyframes slideHideUp {\n  0% {\n    -webkit-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    transform: translateY(0px);\n  }\n  100% {\n    -webkit-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    transform: translateY(-100%);\n  }\n}\n@-webkit-keyframes flexGrow {\n  from {\n    width: 0%;\n  }\n  to {\n    width: 1000%;\n  }\n}\n@-moz-keyframes flexGrow {\n  from {\n    width: 0%;\n  }\n  to {\n    width: 1000%;\n  }\n}\n@keyframes flexGrow {\n  from {\n    width: 0%;\n  }\n  to {\n    width: 1000%;\n  }\n}\n@-webkit-keyframes flexShrink {\n  from {\n    width: 1000%;\n  }\n  to {\n    width: 0%;\n  }\n}\n@-moz-keyframes flexShrink {\n  from {\n    width: 1000%;\n  }\n  to {\n    width: 0%;\n  }\n}\n@keyframes flexShrink {\n  from {\n    width: 1000%;\n  }\n  to {\n    width: 0%;\n  }\n}\n.sidler-dialog.modal {\n  position: fixed;\n}\n.sidler-dialog.flex.showing {\n  -webkit-animation: flexGrow 500ms ease forwards;\n  -ms-animation: flexGrow 500ms ease forwards;\n  -moz-animation: flexGrow 500ms ease forwards;\n  animation: flexGrow 500ms ease forwards;\n}\n.sidler-dialog.flex.show {\n  width: 1000%;\n}\n.sidler-dialog.flex.hiding {\n  -webkit-animation: flexShrink 500ms ease forwards;\n  -ms-animation: flexShrink 500ms ease forwards;\n  -moz-animation: flexShrink 500ms ease forwards;\n  animation: flexShrink 500ms ease forwards;\n  overflow: hidden;\n}\n.sidler-dialog.flex.hide {\n  width: 0%;\n  overflow: hidden;\n}\n.sidler-dialog.edge.show.top,\n.sidler-dialog.edge.show.bottom {\n  -webkit-transform: translateY(0px);\n  -ms-transform: translateY(0px);\n  -moz-transform: translateY(0px);\n  transform: translateY(0px);\n}\n.sidler-dialog.edge.show.right,\n.sidler-dialog.edge.show.left {\n  -webkit-transform: translateX(0px);\n  -ms-transform: translateX(0px);\n  -moz-transform: translateX(0px);\n  transform: translateX(0px);\n}\n.sidler-dialog.edge.showing.top {\n  -webkit-animation: slideDown 0.5s 0s 1 ease forwards;\n  -ms-animation: slideDown 0.5s 0s 1 ease forwards;\n  -moz-animation: slideDown 0.5s 0s 1 ease forwards;\n  animation: slideDown 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.showing.right {\n  -webkit-animation: slideLeft 0.5s 0s 1 ease forwards;\n  -ms-animation: slideLeft 0.5s 0s 1 ease forwards;\n  -moz-animation: slideLeft 0.5s 0s 1 ease forwards;\n  animation: slideLeft 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.showing.bottom {\n  -webkit-animation: slideUp 0.5s 0s 1 ease forwards;\n  -ms-animation: slideUp 0.5s 0s 1 ease forwards;\n  -moz-animation: slideUp 0.5s 0s 1 ease forwards;\n  animation: slideUp 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.showing.left {\n  -webkit-animation: slideRight 0.5s 0s 1 ease forwards;\n  -ms-animation: slideRight 0.5s 0s 1 ease forwards;\n  -moz-animation: slideRight 0.5s 0s 1 ease forwards;\n  animation: slideRight 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.hiding.top {\n  -webkit-animation: slideHideUp 0.5s 0s 1 ease forwards;\n  -ms-animation: slideHideUp 0.5s 0s 1 ease forwards;\n  -moz-animation: slideHideUp 0.5s 0s 1 ease forwards;\n  animation: slideHideUp 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.hiding.right {\n  -webkit-animation: slideHideRight 0.5s 0s 1 ease forwards;\n  -ms-animation: slideHideRight 0.5s 0s 1 ease forwards;\n  -moz-animation: slideHideRight 0.5s 0s 1 ease forwards;\n  animation: slideHideRight 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.hiding.bottom {\n  -webkit-animation: slideHideDown 0.5s 0s 1 ease forwards;\n  -ms-animation: slideHideDown 0.5s 0s 1 ease forwards;\n  -moz-animation: slideHideDown 0.5s 0s 1 ease forwards;\n  animation: slideHideDown 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.hiding.left {\n  -webkit-animation: slideHideLeft 0.5s 0s 1 ease forwards;\n  -ms-animation: slideHideLeft 0.5s 0s 1 ease forwards;\n  -moz-animation: slideHideLeft 0.5s 0s 1 ease forwards;\n  animation: slideHideLeft 0.5s 0s 1 ease forwards;\n}\n.sidler-dialog.edge.top {\n  top: 0px;\n  -webkit-transform: translateY(-100%);\n  -ms-transform: translateY(-100%);\n  -moz-transform: translateY(-100%);\n  transform: translateY(-100%);\n}\n.sidler-dialog.edge.right {\n  right: 0px;\n  -webkit-transform: translateX(100%);\n  -ms-transform: translateX(100%);\n  -moz-transform: translateX(100%);\n  transform: translateX(100%);\n}\n.sidler-dialog.edge.bottom {\n  bottom: 0px;\n  -webkit-transform: translateY(100%);\n  -ms-transform: translateY(100%);\n  -moz-transform: translateY(100%);\n  transform: translateY(100%);\n}\n.sidler-dialog.edge.left {\n  left: 0px;\n  -webkit-transform: translateX(-100%);\n  -ms-transform: translateX(-100%);\n  -moz-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n.sidler-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: black;\n  opacity: 0.4;\n}\n";(_dereq_('lessify'))(css); module.exports = css;
},{"lessify":5}],4:[function(_dereq_,module,exports){
module.exports = function (css) {
  var head = document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  
  head.appendChild(style);
};

module.exports.byUrl = function(url) {
  var head = document.getElementsByTagName('head')[0],
      link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = url;
  
  head.appendChild(link);
};
},{}],5:[function(_dereq_,module,exports){
module.exports = _dereq_('cssify');

},{"cssify":4}]},{},[2])
(2)
});