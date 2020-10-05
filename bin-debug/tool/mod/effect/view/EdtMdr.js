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
            var EftEditorPanel = tool.ui.effect.EftEditorPanel;
            var Pool = base.pool.Pool;
            var Rectangle = egret.Rectangle;
            var EdtMdr = (function (_super) {
                __extends(EdtMdr, _super);
                function EdtMdr() {
                    var _this = _super.call(this, tool.EditorUI.upper) || this;
                    _this._view = _this.mark("_view", EftEditorPanel);
                    return _this;
                }
                EdtMdr.prototype.addListeners = function () {
                    this._view.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    this._view.btnReview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.alter, this);
                };
                EdtMdr.prototype.removeListeners = function () {
                    this._view.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    this._view.btnReview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.alter, this);
                };
                EdtMdr.prototype.onBtnClose = function () {
                    this.hide();
                };
                EdtMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var eftDsp = this._showArgs.eft;
                    this._view.label_totalTime.text = eftDsp.totalTime + "ms";
                    this._view.label_name.text = eftDsp.getName() + " ID:" + eftDsp.id;
                    this._view.editorMoveTime.text = (eftDsp.tweenTime || eftDsp.totalTime) + "";
                    this._view.editorX0.text = eftDsp.startX + "";
                    this._view.editorY0.text = eftDsp.startY + "";
                    this._view.editorX1.text = eftDsp.endX + "";
                    this._view.editorY1.text = eftDsp.endY + "";
                    this._view.editorDelay.text = eftDsp.delay + "";
                    this._view.editorTimes.text = eftDsp.times + "";
                    this._view.editorDuration.text = eftDsp.duration + "";
                    this._view.editorScaleX.text = eftDsp.scaleX + "";
                    this._view.editorScaleY.text = eftDsp.scaleY + "";
                    if (eftDsp.rotation1 == 0 && eftDsp.rotation0 == 0) {
                        this._view.editorR.text = eftDsp.rotation + "";
                    }
                    else {
                        this._view.editorR.text = "0";
                    }
                    this._view.editorMoveR0.text = eftDsp.rotation0 + "";
                    this._view.editorMoveR1.text = eftDsp.rotation1 + "";
                    this._view.editorScaleX0.text = eftDsp.scaleX0 + "";
                    this._view.editorScaleX1.text = eftDsp.scaleX1 + "";
                    this._view.editorScaleY0.text = eftDsp.scaleY0 + "";
                    this._view.editorScaleY1.text = eftDsp.scaleY1 + "";
                    this._view.editorRemoveDelay.text = eftDsp.removeDelay + "";
                    var render = this._showArgs.render;
                    var rect = render.getTransformedBounds(tool.EditorUI.upper, Pool.alloc(Rectangle));
                    this._view.x = rect.x - this._view.width;
                    this._view.y = rect.y - this._view.height * 0.5 + rect.height * 0.5;
                    Pool.release(rect);
                };
                EdtMdr.prototype.alter = function () {
                    var eftDisplay = this._showArgs.eft;
                    if (!eftDisplay) {
                        return;
                    }
                    var startX = +this._view.editorX0.text;
                    var startY = +this._view.editorY0.text;
                    var endX = +this._view.editorX1.text;
                    var endY = +this._view.editorY1.text;
                    var delay = +this._view.editorDelay.text;
                    var times = +this._view.editorTimes.text;
                    var duration = +this._view.editorDuration.text;
                    var scaleX = +this._view.editorScaleX.text;
                    var scaleY = +this._view.editorScaleY.text;
                    eftDisplay.scaleX = scaleX;
                    eftDisplay.scaleY = scaleY;
                    eftDisplay.scaleX0 = parseFloat(this._view.editorScaleX0.text);
                    eftDisplay.scaleY0 = parseFloat(this._view.editorScaleY0.text);
                    eftDisplay.scaleX1 = parseFloat(this._view.editorScaleX1.text);
                    eftDisplay.scaleY1 = parseFloat(this._view.editorScaleY1.text);
                    eftDisplay.rotation0 = +this._view.editorMoveR0.text | 0;
                    eftDisplay.rotation1 = +this._view.editorMoveR1.text | 0;
                    eftDisplay.rotation = +this._view.editorR.text | 0;
                    eftDisplay.removeDelay = +this._view.editorRemoveDelay.text | 0;
                    var twTime = +this._view.editorMoveTime.text | 0;
                    eftDisplay.tweenTime = Math.min(twTime, eftDisplay.totalTime);
                    eftDisplay.updateEndPos(endX, endY);
                    eftDisplay.updatePos(startX, startY);
                    eftDisplay.updateCfg(delay, times, duration);
                };
                EdtMdr.prototype.onHide = function () {
                    this.alter();
                    this.sendNt(effect.ON_END_EDITOR_SINGLE);
                    _super.prototype.onHide.call(this);
                };
                return EdtMdr;
            }(MdrBase));
            effect.EdtMdr = EdtMdr;
            __reflect(EdtMdr.prototype, "tool.mod.effect.EdtMdr");
        })(effect = mod.effect || (mod.effect = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
