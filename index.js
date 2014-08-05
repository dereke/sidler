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
    var container, dialogCount, show;
    _dereq_("./style");
    container = _dereq_("./container");
    dialogCount = 0;
    module.exports.init = function(options) {
        var self = this;
        var defaults, position, dialog, dialogs;
        defaults = {
            position: "top"
        };
        if (!options) {
            options = {};
        }
        if (!options.position) {
            options.position = defaults.position;
        }
        position = options.position;
        ++dialogCount;
        dialog = {
            id: "sidler-dialog-" + dialogCount,
            show: function() {
                var self = this;
                return self.el.setAttribute("class", "dialog " + position + " show");
            },
            hide: function() {
                var self = this;
                return self.el.setAttribute("class", "dialog " + position + " hide");
            },
            toggle: function() {
                var self = this;
                var showing;
                showing = self.el.getAttribute("class").indexOf("show") !== -1;
                if (showing) {
                    return self.hide();
                } else {
                    return self.show();
                }
            }
        };
        dialogs = container.get();
        if (options.selector) {
            dialog.el = document.querySelector(options.selector);
            dialog.el.classList.add("dialog");
            if (dialog.el.id) {
                dialog.id = dialog.el.id;
            }
        } else {
            dialog.el = document.createElement("div");
            dialog.el.id = dialog.id;
            dialogs.appendChild(dialog.el);
        }
        dialog.el.setAttribute("class", "dialog " + position);
        if (options.html) {
            dialog.el.innerHTML = options.html;
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
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".dialog{position:fixed}.dialog.top.show{-webkit-animation:slideDown .5s 0s 1 ease forwards}.dialog.right.show{-webkit-animation:slideLeft .5s 0s 1 ease forwards}.dialog.bottom.show{-webkit-animation:slideUp .5s 0s 1 ease forwards}.dialog.left.show{-webkit-animation:slideRight .5s 0s 1 ease forwards}.dialog.top.hide{-webkit-animation:slideHideUp .5s 0s 1 ease forwards}.dialog.right.hide{-webkit-animation:slideHideRight .5s 0s 1 ease forwards}.dialog.bottom.hide{-webkit-animation:slideHideDown .5s 0s 1 ease forwards}.dialog.left.hide{-webkit-animation:slideHideLeft .5s 0s 1 ease forwards}.dialog.top{top:0;-webkit-transform:translateY(-100%)}.dialog.right{right:0;-webkit-transform:translateX(100%)}.dialog.bottom{bottom:0;-webkit-transform:translateY(100%)}.dialog.left{left:0;-webkit-transform:translateX(-100%)}@-webkit-keyframes slideLeft{0%{-webkit-transform:translateX(100%)}100%{-webkit-transform:translateX(0px)}}@-webkit-keyframes slideDown{0%{-webkit-transform:translateY(-100%)}100%{-webkit-transform:translateY(0px)}}@-webkit-keyframes slideRight{0%{-webkit-transform:translateX(-100%)}100%{-webkit-transform:translateX(0px)}}@-webkit-keyframes slideUp{0%{-webkit-transform:translateY(100%)}100%{-webkit-transform:translateY(0px)}}@-webkit-keyframes slideHideLeft{0%{-webkit-transform:translateX(0px)}100%{-webkit-transform:translateX(-100%)}}@-webkit-keyframes slideHideDown{0%{-webkit-transform:translateY(0px)}100%{-webkit-transform:translateY(100%)}}@-webkit-keyframes slideHideRight{0%{-webkit-transform:translateX(0px)}100%{-webkit-transform:translateX(100%)}}@-webkit-keyframes slideHideUp{0%{-webkit-transform:translateY(0px)}100%{-webkit-transform:translateY(-100%)}}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}]},{},[2])
(2)
});