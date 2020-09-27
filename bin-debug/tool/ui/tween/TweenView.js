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
    var tween;
    (function (tween) {
        var ui;
        (function (ui) {
            var TimeMgr = base.time.TimeMgr;
            var delayCall = base.time.delayCall;
            var Handler = base.utils.Handler;
            var TweenView = (function (_super) {
                __extends(TweenView, _super);
                function TweenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.TweenSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                TweenView.prototype.onAddToStage = function () {
                    for (var i = 1; i <= 26; ++i) {
                        var x = this["r_" + i].x;
                        var y = this["r_" + i].y;
                        console.log(x + "," + y);
                    }
                };
                TweenView.prototype.onRemoveFromStage = function () {
                    TimeMgr.removeUpdateItem(this);
                };
                TweenView.prototype.onCom = function () {
                    delayCall(Handler.alloc(this, this.removeUpdate), 50);
                };
                TweenView.prototype.removeUpdate = function () {
                    TimeMgr.removeUpdateItem(this);
                };
                TweenView.prototype.update = function (time) {
                };
                return TweenView;
            }(eui.Component));
            ui.TweenView = TweenView;
            __reflect(TweenView.prototype, "tool.tween.ui.TweenView", ["base.time.UpdateItem"]);
        })(ui = tween.ui || (tween.ui = {}));
    })(tween = tool.tween || (tool.tween = {}));
})(tool || (tool = {}));
//# sourceMappingURL=TweenView.js.map