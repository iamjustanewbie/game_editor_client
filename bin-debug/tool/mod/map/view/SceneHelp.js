var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var MdrBase = base.module.MdrBase;
            var SceneHelpView = tool.ui.map.SceneHelpView;
            var SceneHelp = (function (_super) {
                __extends(SceneHelp, _super);
                function SceneHelp() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", SceneHelpView);
                    return _this;
                }
                SceneHelp.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                };
                SceneHelp.prototype.addListeners = function () {
                    this.onNt(map.ON_MAP_CHANGE, this.hide, this);
                    this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                };
                SceneHelp.prototype.removeListeners = function () {
                    this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                };
                SceneHelp.prototype.onBtnClose = function () {
                    this.hide();
                };
                SceneHelp.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.txt.text =
                        "1\u3001\u6309\u4F4F\u7A7A\u683C\u62D6\u52A8\u9F20\u6807\u5DE6\u952E\u62D6\u52A8\u5730\u56FE\n2\u3001shift+\u5DE6\u952E\u6DFB\u52A0\u602A\u7269\u6216npc\n3\u3001ctrl+\u5DE6\u952E\u6DFB\u52A0\u51FA\u751F\u70B9\n4\u3001\u602A\u7269\u4F1A\u5173\u8054\u6700\u8FD1\u7684\u51FA\u751F\u70B9\n5\u3001`+\u5DE6\u952E\u6253\u5F00\u4F20\u9001\u70B9\u7A97\u53E3\n6\u30011+\u5DE6\u952E\u6253\u5F00\u7279\u5B9A\u70B9\u7A97\u53E3\n7\u3001\u7279\u5B9A\u70B9id0\u4E3A\u9ED8\u8BA4\u51FA\u751F\u70B9\u548C\u590D\u6D3B\u70B9\n8\u3001\u7279\u5B9A\u70B9\u5176\u4ED6id\u53EF\u4EE5\u914D\u7F6E\u5728\u76F8\u5173\u7684\u914D\u7F6E\u8868\u4F9B\u4F7F\u7528\n             ";
                };
                return SceneHelp;
            }(MdrBase));
            map.SceneHelp = SceneHelp;
            __reflect(SceneHelp.prototype, "tool.mod.map.SceneHelp");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=SceneHelp.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
