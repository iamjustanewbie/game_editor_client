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
    var ui;
    (function (ui) {
        var effect;
        (function (effect) {
            var Pool = base.pool.Pool;
            var Point = egret.Point;
            var EftIndexView = (function (_super) {
                __extends(EftIndexView, _super);
                function EftIndexView() {
                    var _this = _super.call(this) || this;
                    _this._isTouch = false;
                    _this.skinName = "skins.eft.EftIndexSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                EftIndexView.prototype.childrenCreated = function () {
                    _super.prototype.childrenCreated.call(this);
                    this.anchorOffsetX = 15;
                    this.anchorOffsetY = 15;
                };
                EftIndexView.prototype.onAddToStage = function () {
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapBegin, this);
                    this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this);
                    gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTapMove, this);
                };
                EftIndexView.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapBegin, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this);
                    gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTapMove, this);
                };
                EftIndexView.prototype.setData = function (idx, x, y) {
                    this.idx = idx;
                    this.labelDisplay.text = idx + "";
                    this.x = x;
                    this.y = y;
                };
                EftIndexView.prototype.onTapBegin = function (e) {
                    this._isTouch = true;
                };
                EftIndexView.prototype.onTapEnd = function () {
                    this._isTouch = false;
                };
                EftIndexView.prototype.onTapMove = function (e) {
                    if (!this._isTouch) {
                        return;
                    }
                    var pt = this.parent.globalToLocal(e.stageX, e.stageY, Pool.alloc(Point));
                    this.x = +pt.x | 0;
                    this.y = +pt.y | 0;
                    Pool.release(pt);
                    this.parent.dispatchEventWith("on_eft_move", false, { x: this.x, y: this.y, idx: this.idx });
                };
                EftIndexView.prototype.dispose = function () {
                };
                EftIndexView.prototype.onAlloc = function () {
                };
                EftIndexView.prototype.onRelease = function () {
                    this._isTouch = false;
                    this.idx = undefined;
                    this.x = 0;
                    this.y = 0;
                };
                return EftIndexView;
            }(eui.Component));
            effect.EftIndexView = EftIndexView;
            __reflect(EftIndexView.prototype, "tool.ui.effect.EftIndexView", ["base.pool.PoolObject", "base.pool.DisposeObject"]);
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
