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
        var editor;
        (function (editor) {
            var MdrBase = base.module.MdrBase;
            var StartView = tool.ui.editor.StartView;
            var KeyUtil = tool.utils.KeyUtil;
            var ViewMgr = game.utils.ViewMgr;
            var StartMdr = (function (_super) {
                __extends(StartMdr, _super);
                function StartMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", StartView);
                    ViewMgr.getIns().setMainView(_this);
                    return _this;
                }
                StartMdr.prototype.onInit = function () {
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = -80;
                };
                StartMdr.prototype.onShow = function () {
                    KeyUtil.init();
                    // this._view.addChild(new tool.tween.ui.TweenView());
                };
                StartMdr.prototype.onHide = function () {
                };
                StartMdr.prototype.showFont = function () {
                    ViewMgr.getIns().showView(mod.ModName.Editor, mod.EditorViewType.Font);
                };
                StartMdr.prototype.showMapEditor = function () {
                    ViewMgr.getIns().showView(mod.ModName.Map, mod.MapViewType.MapEditor);
                };
                StartMdr.prototype.showMapMask = function () {
                    ViewMgr.getIns().showView(mod.ModName.Map, mod.MapViewType.MapMask);
                };
                StartMdr.prototype.showAnimation = function () {
                    ViewMgr.getIns().showView(mod.ModName.Animation, mod.AnimationViewType.Animation);
                };
                StartMdr.prototype.showEftEditor = function () {
                    ViewMgr.getIns().showView(mod.ModName.Effect, mod.EftViewType.EftEditor);
                };
                StartMdr.prototype.showScene = function () {
                    ViewMgr.getIns().showView(mod.ModName.Map, mod.MapViewType.Edit);
                };
<<<<<<< HEAD
                StartMdr.prototype.showCutMap = function () {
                    ViewMgr.getIns().showView(mod.ModName.Map, mod.MapViewType.CutMap);
                };
=======
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
                StartMdr.prototype.addListeners = function () {
                    this._view.btnMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMapMask, this);
                    this._view.btnAnimation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAnimation, this);
                    this._view.btnEft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftEditor, this);
                    this._view.btnFont.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFont, this);
                    this._view.btnScene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showScene, this);
<<<<<<< HEAD
                    this._view.btnCutMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCutMap, this);
=======
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
                };
                StartMdr.prototype.removeListeners = function () {
                    this._view.btnMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showMapMask, this);
                    this._view.btnAnimation.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showAnimation, this);
                    this._view.btnEft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftEditor, this);
                    this._view.btnFont.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFont, this);
                    this._view.btnScene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showScene, this);
<<<<<<< HEAD
                    this._view.btnCutMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showCutMap, this);
=======
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
                };
                return StartMdr;
            }(MdrBase));
            editor.StartMdr = StartMdr;
            __reflect(StartMdr.prototype, "tool.mod.editor.StartMdr");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=StartMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
