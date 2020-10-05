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
            var CutMapPanelView = tool.ui.map.CutMapPanelView;
            var CutMapPanelMdr = (function (_super) {
                __extends(CutMapPanelMdr, _super);
                function CutMapPanelMdr() {
                    var _this = _super.call(this, tool.EditorUI.top) || this;
                    _this._view = _this.mark("_view", CutMapPanelView);
                    return _this;
                }
                CutMapPanelMdr.prototype.onInit = function () {
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                };
                CutMapPanelMdr.prototype.addListeners = function () {
                    this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this._view.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                };
                CutMapPanelMdr.prototype.removeListeners = function () {
                    this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this._view.btn_confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                };
                CutMapPanelMdr.prototype.onShow = function () {
                    var name = this._showArgs;
                    this._view.txt_name.text = name;
                };
                CutMapPanelMdr.prototype.onHide = function () {
                };
                CutMapPanelMdr.prototype.onConfirm = function () {
                    var width = Number(this._view.txt_width.text);
                    var height = Number(this._view.txt_height.text);
                    var rate = Number(this._view.txt_rate.text);
                    var name = this._showArgs;
                    this._proxy.cutMap(name, width, height, rate);
                    this.hide();
                };
                return CutMapPanelMdr;
            }(MdrBase));
            map.CutMapPanelMdr = CutMapPanelMdr;
            __reflect(CutMapPanelMdr.prototype, "tool.mod.map.CutMapPanelMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
