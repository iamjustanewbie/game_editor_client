var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var utils;
    (function (utils) {
        var facade = base.module.facade;
        var ON_KEY_UPDATE = tool.mod.ON_KEY_UPDATE;
        var KeyUtil = (function () {
            function KeyUtil() {
            }
            KeyUtil.init = function () {
                KeyUtil.keyDown = {};
                document.addEventListener("keyup", function (ev) {
                    delete KeyUtil.keyDown[ev.key];
                    facade.sendNt(ON_KEY_UPDATE, ev.key);
                });
                document.addEventListener("keydown", function (ev) {
                    KeyUtil.keyDown[ev.key] = true;
                    facade.sendNt(ON_KEY_UPDATE, ev.key);
                });
            };
            return KeyUtil;
        }());
        utils.KeyUtil = KeyUtil;
        __reflect(KeyUtil.prototype, "tool.utils.KeyUtil");
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
//# sourceMappingURL=KeyUtil.js.map