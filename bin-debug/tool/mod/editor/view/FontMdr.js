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
            var FontView = tool.ui.editor.FontView;
            var Handler = base.utils.Handler;
            var delayCall = base.time.delayCall;
            var TimeMgr = base.time.TimeMgr;
            var FontMdr = (function (_super) {
                __extends(FontMdr, _super);
                function FontMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", FontView);
                    _this._idx = 0;
                    _this.delay = 100;
                    _this.arr = [];
                    return _this;
                }
                FontMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                };
                FontMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this._view.btnShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShow, this);
                };
                FontMdr.prototype.removeListeners = function () {
                    _super.prototype.removeListeners.call(this);
                    this._view.btnShow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShow, this);
                };
                FontMdr.prototype.onCom = function () {
                    delayCall(Handler.alloc(this, this.removeUpdate), 1350);
                };
                FontMdr.prototype.removeUpdate = function () {
                    for (var i = 0; i < this.arr.length; i++) {
                        var x = this.arr[i][0];
                        var y = this.arr[i][1];
                        var a = this.arr[i][2];
                        var sx = this.arr[i][3];
                        var sy = this.arr[i][4];
                        var t = this.arr[i][5];
                        console.log("x:" + x.toFixed(2) +
                            ",y:" + y.toFixed(2) +
                            ",a:" + a.toFixed(2) +
                            ",sx:" + sx.toFixed(2) +
                            ",sy:" + sy.toFixed(2) +
                            ",t:" + t);
                    }
                    TimeMgr.removeUpdateItem(this);
                };
                FontMdr.prototype.onBtnShow = function () {
                    // this.onCom();
                    this.arr.length = 0;
                    TimeMgr.addUpdateItem(this);
                    this._startTime = TimeMgr.time.time;
                    this._idx = 0;
                };
                FontMdr.prototype.startTw = function () {
                    this.onCom();
                    var lab = this._view["label" + this._idx];
                    lab.anchorOffsetX = lab.width * .5;
                    lab.anchorOffsetY = lab.height * .5;
                    // this.showAtk();
                    this.showPet();
                };
                FontMdr.prototype.showPet = function () {
                    var t = this._view["label" + this._idx];
                    t.alpha = 1;
                    t.scaleX = t.scaleY = 1;
                    t.x = t.y = 0;
                    TweenMax.from(t, 0.5, { scaleX: 2.5, scaleY: 2.5 });
                    TweenMax.to(t, .4, {
                        delay: .4,
                        alpha: 0.2,
                        y: t.y - 50
                    });
                };
                FontMdr.prototype.showAtk = function () {
                    var lab = this._view["label" + this._idx];
                    lab.alpha = 1;
                    lab.scaleY = lab.scaleX = 1;
                    lab.x = 40 * Math.random();
                    lab.y = 20 * Math.random();
                    var x0 = lab.x + 40;
                    var y0 = lab.y - 40;
                    var x1 = lab.x + 70;
                    var y1 = lab.y + 20;
                    TweenMax.from(lab, 0.5, { scaleX: 2.5, scaleY: 2.5 });
                    this.bezier(lab, 900, { x: x0, y: y0 }, { x: x1, y: y1 });
                    TweenMax.to(lab, 0.3, { delay: 0.59, alpha: 0, scaleX: 0.3, scaleY: 0.3 });
                };
                FontMdr.prototype.bezier = function (dsp, time, centerPt, endPt) {
                    function onUpdate() {
                        var val = obj.value;
                        dsp.x = (1 - val) * (1 - val) * startPt.x + 2 * val * (1 - val) * centerPt.x + val * val * endPt.x;
                        dsp.y = (1 - val) * (1 - val) * startPt.y + 2 * val * (1 - val) * centerPt.y + val * val * endPt.y;
                    }
                    var obj = {
                        value: 0
                    };
                    var startPt = {
                        x: dsp.x,
                        y: dsp.y
                    };
                    TweenMax.to(obj, 0.001 * time, {
                        value: 1,
                        onUpdate: onUpdate.bind(this),
                        ease: Linear.easeNone
                    });
                };
                FontMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                };
                FontMdr.prototype.update = function (time) {
                    var lab = this._view.label0;
                    var x = lab.x;
                    var y = lab.y;
                    var a = lab.alpha;
                    var sx = lab.scaleX;
                    var sy = lab.scaleY;
                    var t = time.time - this._startTime;
                    this.arr[this.arr.length] = [x, y, a, sx, sy, t];
                    if (this._idx > 4) {
                        this.removeUpdate();
                        return;
                    }
                    if (t >= this._idx * this.delay) {
                        this.startTw();
                        this._idx++;
                    }
                };
                return FontMdr;
            }(MdrBase));
            editor.FontMdr = FontMdr;
            __reflect(FontMdr.prototype, "tool.mod.editor.FontMdr", ["base.time.UpdateItem"]);
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
