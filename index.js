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
    var style, container, dialogCount, show;
    style = _dereq_("./style");
    container = _dereq_("./container");
    style.init();
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
        dialog.el = document.createElement("div");
        dialog.el.id = dialog.id;
        dialog.hide();
        if (options.html) {
            dialog.el.innerHTML = options.html;
        }
        dialogs.appendChild(dialog.el);
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
(function() {
    var self = this;
    module.exports.init = function() {
        var self = this;
        var head, style;
        head = document.getElementsByTagName("head");
        style = document.createElement("style");
        style.type = "text/css";
        style.id = "sidler-style";
        head[0].appendChild(style);
        return style.innerHTML = "\n#sidler-dialogs .dialog {\n  position: fixed; \n}\n\n#sidler-dialogs .dialog.hide {\n  -webkit-transform: translateY(-100px);\n}\n  \n#sidler-dialogs .dialog.top.show {\n  -webkit-animation: slideDown 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.right.show {\n  -webkit-animation: slideLeft 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.bottom.show {\n  -webkit-animation: slideUp 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.left.show {\n  -webkit-animation: slideRight 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.top.hide {\n  -webkit-animation: slideHideUp 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.right.hide {\n  -webkit-animation: slideHideRight 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.bottom.hide {\n  -webkit-animation: slideHideDown 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.left.hide {\n  -webkit-animation: slideHideLeft 0.5s 0s 1 ease forwards;\n}\n\n#sidler-dialogs .dialog.top {\n  top: 0px;\n}\n\n#sidler-dialogs .dialog.right {\n  right: 0px;\n}\n\n#sidler-dialogs .dialog.bottom {\n  bottom: 0px;\n}\n\n#sidler-dialogs .dialog.left {\n  left: 0px;\n}\n\n@-webkit-keyframes slideLeft {\n  0% { -webkit-transform: translateX(100px); }\n  100% { -webkit-transform: translateX(0px); }\n}\n\n@-webkit-keyframes slideDown {\n  0% { -webkit-transform: translateY(-100px); }\n  100% { -webkit-transform: translateY(0px); }\n}\n@-webkit-keyframes slideRight {\n  0% { -webkit-transform: translateX(-100px); }\n  100% { -webkit-transform: translateX(0px); }\n}\n\n@-webkit-keyframes slideUp {\n  0% { -webkit-transform: translateY(100px); }\n  100% { -webkit-transform: translateY(0px); }\n}\n\n@-webkit-keyframes slideHideLeft {\n  0% { -webkit-transform: translateX(0px); }\n  100% { -webkit-transform: translateX(-100px); }\n}\n\n@-webkit-keyframes slideHideDown {\n  0% { -webkit-transform: translateY(0px); }\n  100% { -webkit-transform: translateY(100px); }\n}\n@-webkit-keyframes slideHideRight {\n  0% { -webkit-transform: translateX(0px); }\n  100% { -webkit-transform: translateX(100px); }\n}\n\n@-webkit-keyframes slideHideUp {\n  0% { -webkit-transform: translateY(0px); }\n  100% { -webkit-transform: translateY(-100px); }\n}\n\n";
    };
}).call(this);
},{}]},{},[2])
(2)
});