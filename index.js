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
    var container, dialogCount, onAnimationEnd, removeClasses, show;
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
    module.exports.init = function(gen3_options) {
        var self = this;
        var position, selector, html, modal, anchor;
        position = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "position") && gen3_options.position !== void 0 ? gen3_options.position : "top";
        selector = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "selector") && gen3_options.selector !== void 0 ? gen3_options.selector : void 0;
        html = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "html") && gen3_options.html !== void 0 ? gen3_options.html : void 0;
        modal = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "modal") && gen3_options.modal !== void 0 ? gen3_options.modal : true;
        anchor = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "anchor") && gen3_options.anchor !== void 0 ? gen3_options.anchor : true;
        var dialog, dialogs;
        ++dialogCount;
        dialog = {
            id: "sidler-dialog-" + dialogCount,
            show: function() {
                var self = this;
                onAnimationEnd(self.el, function() {
                    removeClasses(self.el, [ "hide", "hidding", "showing" ]);
                    return self.el.classList.add("show");
                });
                return self.el.classList.add("showing");
            },
            hide: function() {
                var self = this;
                onAnimationEnd(self.el, function() {
                    removeClasses(self.el, [ "show", "showing", "hiding" ]);
                    return self.el.classList.add("hide");
                });
                return self.el.classList.add("hiding");
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
        if (anchor) {
            dialog.el.classList.add("anchor");
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
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".sidler-dialog.modal{position:fixed}.sidler-dialog.flex.showing{-webkit-animation:flexGrow 500ms ease forwards;-ms-animation:flexGrow 500ms ease forwards;-moz-animation:flexGrow 500ms ease forwards;animation:flexGrow 500ms ease forwards}.sidler-dialog.flex.show{-webkit-flex:1;-ms-flex:1;-moz-flex:1;flex:1}.sidler-dialog.flex.hiding{-webkit-animation:flexShrink 500ms ease forwards;-ms-animation:flexShrink 500ms ease forwards;-moz-animation:flexShrink 500ms ease forwards;animation:flexShrink 500ms ease forwards;overflow:hidden}.sidler-dialog.flex.hide{-webkit-flex:.000001;-ms-flex:.000001;-moz-flex:.000001;flex:.000001;overflow:hidden}@-webkit-keyframes flexGrow{to{-webkit-flex:1;-ms-flex:1;-moz-flex:1;flex:1}}@-ms-keyframes flexGrow{to{-webkit-flex:1;-ms-flex:1;-moz-flex:1;flex:1}}@-moz-keyframes flexGrow{to{-webkit-flex:1;-ms-flex:1;-moz-flex:1;flex:1}}@keyframes flexGrow{to{-webkit-flex:1;-ms-flex:1;-moz-flex:1;flex:1}}@-webkit-keyframes flexShrink{to{-webkit-flex:.000001;-ms-flex:.000001;-moz-flex:.000001;flex:.000001}}@-ms-keyframes flexShrink{to{-webkit-flex:.000001;-ms-flex:.000001;-moz-flex:.000001;flex:.000001}}@-moz-keyframes flexShrink{to{-webkit-flex:.000001;-ms-flex:.000001;-moz-flex:.000001;flex:.000001}}@keyframes flexShrink{to{-webkit-flex:.000001;-ms-flex:.000001;-moz-flex:.000001;flex:.000001}}.sidler-dialog.anchor.show.bottom,.sidler-dialog.anchor.show.top{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}.sidler-dialog.anchor.show.left,.sidler-dialog.anchor.show.right{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}.sidler-dialog.anchor.showing.top{-webkit-animation:slideDown .5s 0s 1 ease forwards;-ms-animation:slideDown .5s 0s 1 ease forwards;-moz-animation:slideDown .5s 0s 1 ease forwards;animation:slideDown .5s 0s 1 ease forwards}.sidler-dialog.anchor.showing.right{-webkit-animation:slideLeft .5s 0s 1 ease forwards;-ms-animation:slideLeft .5s 0s 1 ease forwards;-moz-animation:slideLeft .5s 0s 1 ease forwards;animation:slideLeft .5s 0s 1 ease forwards}.sidler-dialog.anchor.showing.bottom{-webkit-animation:slideUp .5s 0s 1 ease forwards;-ms-animation:slideUp .5s 0s 1 ease forwards;-moz-animation:slideUp .5s 0s 1 ease forwards;animation:slideUp .5s 0s 1 ease forwards}.sidler-dialog.anchor.showing.left{-webkit-animation:slideRight .5s 0s 1 ease forwards;-ms-animation:slideRight .5s 0s 1 ease forwards;-moz-animation:slideRight .5s 0s 1 ease forwards;animation:slideRight .5s 0s 1 ease forwards}.sidler-dialog.anchor.hiding.top{-webkit-animation:slideHideUp .5s 0s 1 ease forwards;-ms-animation:slideHideUp .5s 0s 1 ease forwards;-moz-animation:slideHideUp .5s 0s 1 ease forwards;animation:slideHideUp .5s 0s 1 ease forwards}.sidler-dialog.anchor.hiding.right{-webkit-animation:slideHideRight .5s 0s 1 ease forwards;-ms-animation:slideHideRight .5s 0s 1 ease forwards;-moz-animation:slideHideRight .5s 0s 1 ease forwards;animation:slideHideRight .5s 0s 1 ease forwards}.sidler-dialog.anchor.hiding.bottom{-webkit-animation:slideHideDown .5s 0s 1 ease forwards;-ms-animation:slideHideDown .5s 0s 1 ease forwards;-moz-animation:slideHideDown .5s 0s 1 ease forwards;animation:slideHideDown .5s 0s 1 ease forwards}.sidler-dialog.anchor.hiding.left{-webkit-animation:slideHideLeft .5s 0s 1 ease forwards;-ms-animation:slideHideLeft .5s 0s 1 ease forwards;-moz-animation:slideHideLeft .5s 0s 1 ease forwards;animation:slideHideLeft .5s 0s 1 ease forwards}.sidler-dialog.anchor.top{top:0;-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}.sidler-dialog.anchor.right{right:0;-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}.sidler-dialog.anchor.bottom{bottom:0;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}.sidler-dialog.anchor.left{left:0;-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}@-webkit-keyframes slideLeft{0%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@-ms-keyframes slideLeft{0%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@-moz-keyframes slideLeft{0%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@keyframes slideLeft{0%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@-webkit-keyframes slideDown{0%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@-ms-keyframes slideDown{0%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@-moz-keyframes slideDown{0%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@keyframes slideDown{0%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@-webkit-keyframes slideRight{0%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@-ms-keyframes slideRight{0%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@-moz-keyframes slideRight{0%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@keyframes slideRight{0%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}}@-webkit-keyframes slideUp{0%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@-ms-keyframes slideUp{0%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@-moz-keyframes slideUp{0%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@keyframes slideUp{0%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}}@-webkit-keyframes slideHideLeft{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}}@-ms-keyframes slideHideLeft{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}}@-moz-keyframes slideHideLeft{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}}@keyframes slideHideLeft{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);-moz-transform:translateX(-100%);transform:translateX(-100%)}}@-webkit-keyframes slideHideDown{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}}@-ms-keyframes slideHideDown{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}}@-moz-keyframes slideHideDown{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}}@keyframes slideHideDown{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(100%);-ms-transform:translateY(100%);-moz-transform:translateY(100%);transform:translateY(100%)}}@-webkit-keyframes slideHideRight{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}}@-ms-keyframes slideHideRight{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}}@-moz-keyframes slideHideRight{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}}@keyframes slideHideRight{0%{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}100%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}}@-webkit-keyframes slideHideUp{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}}@-ms-keyframes slideHideUp{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}}@-moz-keyframes slideHideUp{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}}@keyframes slideHideUp{0%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-moz-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-moz-transform:translateY(-100%);transform:translateY(-100%)}}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}]},{},[2])
(2)
});