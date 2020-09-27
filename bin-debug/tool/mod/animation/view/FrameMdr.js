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
        var animation;
        (function (animation) {
            var MdrBase = base.module.MdrBase;
            var FrameView = tool.ui.animation.FrameView;
            var ArrayCollection = eui.ArrayCollection;
            var EditorDurationRenderer = tool.ui.animation.EditorDurationRenderer;
            var FrameMdr = (function (_super) {
                __extends(FrameMdr, _super);
                function FrameMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", FrameView);
                    _this.MAX_FRAME = 60;
                    return _this;
                }
                FrameMdr.prototype.onInit = function () {
                    this._view.left = 0;
                    this._view.right = 0;
                    this._view.bottom = 0;
                    var tf = this._view.loop.labelDisplay;
                    tf.textColor = 0xFFFFFF;
                    this._framePro = new ArrayCollection();
                    this._view.frame.dataProvider = this._framePro;
                    this._cursorPro = new ArrayCollection();
                    this._view.cursor.dataProvider = this._cursorPro;
                    this._durationPro = new ArrayCollection();
                    this._view.duration.dataProvider = this._durationPro;
                    this._view.duration.itemRenderer = EditorDurationRenderer;
                    this._proxy = this.retProxy(mod.ProxyType.Animation);
                    this._model = this._proxy.getData();
                };
                FrameMdr.prototype.addListeners = function () {
                    this.onNt(animation.ON_FRAME_CHANGE, this.onFrameChange, this);
                    this.onNt(animation.ANIMATION_PLAY_CHANGE, this.onPlayChange, this);
                    this._view.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
                    this._view.loop.addEventListener(egret.Event.CHANGE, this.onLoopChange, this);
                    this._view.frameEditor.addEventListener(egret.Event.CHANGE, this.onEditorFrame, this);
                    this._view.cursor.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapCursor, this);
                };
                FrameMdr.prototype.removeListeners = function () {
                    this._view.btnPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
                    this._view.loop.removeEventListener(egret.Event.CHANGE, this.onLoopChange, this);
                    this._view.frameEditor.removeEventListener(egret.Event.CHANGE, this.onEditorFrame, this);
                    this._view.cursor.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapCursor, this);
                };
                FrameMdr.prototype.onBtnPlay = function () {
                    this._model.play = !this._model.play;
                };
                FrameMdr.prototype.onPlayChange = function () {
                    this._view.btnPlay.label = this._model.play ? "停止" : "播放";
                };
                FrameMdr.prototype.onTapCursor = function (e) {
                    this._model.play = false;
                    this.sendNt(animation.ON_SELECTED_FRAME, e.itemIndex + 1);
                };
                FrameMdr.prototype.onEditorFrame = function () {
                    var f = parseInt(this._view.frameEditor.text);
                    if (f > this.MAX_FRAME || !f) {
                        f = this.MAX_FRAME;
                    }
                    if (f <= 0) {
                        f = 1;
                    }
                    this._view.frameEditor.text = f.toString();
                    for (var i = 0, l = this._model.duration.length; i < l; ++i) {
                        this._model.duration[i] = Math.floor(1000 / f);
                    }
                    this._model.curDuration = this._model.duration[this._model.curFrame - 1];
                    this._durationPro.source = this._model.duration;
                };
                FrameMdr.prototype.onLoopChange = function () {
                    this._model.isLoop = this._view.loop.selected;
                };
                FrameMdr.prototype.onFrameChange = function () {
                    this._view.cursor.selectedIndex = Math.min(this._model.maxFrame, this._model.curFrame) - 1;
                };
                FrameMdr.prototype.onShow = function () {
                    var a = [];
                    for (var i = 1; i <= this._model.maxFrame; ++i) {
                        a.push(i);
                    }
                    this._view.frameEditor.text = Math.floor(1000 / this._model.duration[0]) + "";
                    this._framePro.source = a;
                    this._cursorPro.source = a;
                    this._view.cursorBg.width = this._view.cursor.width;
                    this._view.cursor.selectedIndex = this._model.curFrame - 1;
                    this._durationPro.source = this._model.duration;
                    this._view.loop.selected = this._model.isLoop;
                    this._view.btnPlay.label = this._model.play ? "停止" : "播放";
                };
                FrameMdr.prototype.onHide = function () {
                };
                return FrameMdr;
            }(MdrBase));
            animation.FrameMdr = FrameMdr;
            __reflect(FrameMdr.prototype, "tool.mod.animation.FrameMdr");
        })(animation = mod.animation || (mod.animation = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=FrameMdr.js.map