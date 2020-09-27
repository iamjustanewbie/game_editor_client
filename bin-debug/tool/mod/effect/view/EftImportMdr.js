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
        var effect;
        (function (effect) {
            var MdrBase = base.module.MdrBase;
            var EftImportView = tool.ui.effect.EftImportView;
            var ArrayCollection = eui.ArrayCollection;
            var EftImportItem = tool.ui.effect.EftImportItem;
            var Tips = game.comp.Tips;
            var EftImportMdr = (function (_super) {
                __extends(EftImportMdr, _super);
                function EftImportMdr() {
                    var _this = _super.call(this, tool.EditorUI.upper) || this;
                    _this._view = _this.mark("_view", EftImportView);
                    return _this;
                }
                EftImportMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = -80;
                    this._listPro = new ArrayCollection();
                    this._view.list_eft.dataProvider = this._listPro;
                    this._view.list_eft.itemRenderer = EftImportItem;
                    this._proxy = this.retProxy(mod.ProxyType.Effect);
                };
                EftImportMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt(effect.ON_GET_EFT, this.onGetEft, this);
                    this._view.list_eft.addEventListener(effect.ON_IMPORT_DEL, this.onImportDel, this);
                    this._view.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this._view.btnBulid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
                    this._view.list_eft.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onImport, this);
                };
                EftImportMdr.prototype.removeListeners = function () {
                    _super.prototype.removeListeners.call(this);
                    this._view.list_eft.removeEventListener(effect.ON_IMPORT_DEL, this.onImportDel, this);
                    this._view.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this._view.btnBulid.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
                    this._view.list_eft.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onImport, this);
                };
                EftImportMdr.prototype.onImportDel = function () {
                    this._proxy.getEft();
                };
                EftImportMdr.prototype.onBuild = function () {
                    if (!this.idEnabled()) {
                        Tips.getIns().show("请输入有效ID");
                        return;
                    }
                    this._proxy.getData().curEditor = new effect.EftData(this._view.input.text);
                    this.sendNt(effect.ON_BUILD_EFT);
                    this.hide();
                };
                EftImportMdr.prototype.onImport = function (e) {
                    this._proxy.getData().curEditor = e.item;
                    this.sendNt(effect.ON_BUILD_EFT);
                    this.hide();
                };
                EftImportMdr.prototype.onGetEft = function () {
                    this._listPro.source = this._proxy.getData().allEft;
                    this._view.list_eft.selectedIndex = -1;
                };
                EftImportMdr.prototype.idEnabled = function () {
                    var id = this._view.input.text;
                    return id && id.trim() !== "";
                };
                EftImportMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.input.text = "";
                    this._proxy.getEft();
                };
                return EftImportMdr;
            }(MdrBase));
            effect.EftImportMdr = EftImportMdr;
            __reflect(EftImportMdr.prototype, "tool.mod.effect.EftImportMdr");
        })(effect = mod.effect || (mod.effect = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EftImportMdr.js.map