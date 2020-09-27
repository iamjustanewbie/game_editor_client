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
            var SceneImportView = tool.ui.scene.SceneImportView;
            var Alert = tool.utils.Alert;
            var SceneImportMdr = (function (_super) {
                __extends(SceneImportMdr, _super);
                function SceneImportMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", SceneImportView);
                    return _this;
                }
                SceneImportMdr.prototype.onInit = function () {
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._proxy = this.retProxy(mod.ProxyType.Scene);
                    this._model = this._proxy.getData();
                    this._view.txt_sceneid.prompt = '请输入';
                };
                SceneImportMdr.prototype.addListeners = function () {
                    this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this._view.btn_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNew, this);
                };
                SceneImportMdr.prototype.removeListeners = function () {
                    this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this._view.btn_new.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNew, this);
                };
                SceneImportMdr.prototype.OnNew = function () {
                    var txt = this._view.txt_sceneid.text;
                    var sceneid = parseInt(txt);
                    if (isNaN(sceneid) || sceneid < 0) {
                        Alert.confirm('请输入正确的场景id');
                        return;
                    }
                    if (this._model.sceneList.indexOf(sceneid) >= 0) {
                        Alert.confirm('场景id重复');
                        return;
                    }
                    this.hide();
                    this._proxy.clearSceneInfo();
                    this.sendNt(map.NEW_SCENE, sceneid);
                };
                return SceneImportMdr;
            }(MdrBase));
            map.SceneImportMdr = SceneImportMdr;
            __reflect(SceneImportMdr.prototype, "tool.mod.map.SceneImportMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=SceneImportMdr.js.map