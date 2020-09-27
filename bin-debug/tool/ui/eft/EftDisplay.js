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
            var Sprite = egret.Sprite;
            var UIAnim = tool.comp.UIAnim;
            var Pool = base.pool.Pool;
            var ResUrlC1 = tool.mod.editor.ResUrlC1;
            var Handler = base.utils.Handler;
            var Tween = egret.Tween;
            var TimeMgr = base.time.TimeMgr;
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var ProxyType = tool.mod.ProxyType;
            var EftDisplay = (function (_super) {
                __extends(EftDisplay, _super);
                function EftDisplay() {
                    var _this = _super.call(this) || this;
                    _this.duration = 0;
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                EftDisplay.prototype.initData = function (id, x, y) {
                    this.x = +x | 0;
                    this.y = +y | 0;
                    this.id = id;
                    this.delay = 0;
                    this.rotation = 0;
                    this.times = 1;
                    this.duration = 0;
                    this.startX = this.x;
                    this.startY = this.y;
                    this.endX = this.startX;
                    this.endY = this.startY;
                    this.removeDelay = 0;
                    this.scaleX = this.scaleY = this.scaleX0 = this.scaleY0 = this.scaleX1 = this.scaleY1 = 1;
                    this.rotation0 = this.rotation1 = 0;
                };
                EftDisplay.prototype.setData = function (data) {
                    this.id = data.id;
                    this.x = data.x;
                    this.y = data.y;
                    this.startX = data.x;
                    this.startY = data.y;
                    this.endX = data.ex;
                    this.endY = data.ey;
                    this.delay = data.delay;
                    this.rotation = data.r;
                    this.times = data.times;
                    this.duration = +data.duration | 0;
                    this.removeDelay = data.rDelay;
                    this.scaleX = data.sx == undefined ? 1 : data.sx;
                    this.scaleY = data.sy == undefined ? 1 : data.sy;
                    this.tw = data.tw;
                    if (data.tw && data.tw.length > 2) {
                        var start = data.tw[0];
                        var end = data.tw[data.tw.length - 1];
                        this.showTime = start[0];
                        this.scaleX0 = start[3];
                        this.scaleY0 = start[4];
                        this.rotation0 = start[5];
                        this.scaleX1 = end[3];
                        this.scaleY1 = end[4];
                        this.rotation1 = end[5];
                    }
                    else {
                        this.scaleX0 = this.scaleY0 = this.scaleX1 = this.scaleY1 = 1;
                        this.rotation0 = this.rotation1 = 0;
                    }
                };
                EftDisplay.prototype.onAddToStage = function () {
                    this._eft = Pool.alloc(UIAnim);
                    var url = ResUrlC1 + "/assets/anim/effect/" + this.id + ".png";
                    this._eft.complete = Handler.alloc(this, this.onComp);
                    this._eft.startPlay = Handler.alloc(this, this.onStartPlay);
                    this._eft.setSource(url, this.times, this.duration);
                    this.addChild(this._eft);
                };
                EftDisplay.prototype.onRemoveFromStage = function () {
                    this.removeEft();
                };
                EftDisplay.prototype.getName = function () {
                    if (this._eftName == undefined) {
                        var p = facade.retMod(ModName.Effect).retProxy(ProxyType.Effect);
                        var idMap = p.getData().eftIdMap;
                        if (!idMap) {
                            return;
                        }
                        for (var k in idMap) {
                            if (idMap[k] == this.id) {
                                var a = k.split("/");
                                this._eftName = a[a.length - 1];
                                break;
                            }
                        }
                    }
                    return this._eftName;
                };
                EftDisplay.prototype.updateXY = function (x, y) {
                    this.x = +x | 0;
                    this.y = +y | 0;
                    this.startX = x;
                    this.startY = y;
                    this.endX = this.startX;
                    this.endY = this.startY;
                };
                EftDisplay.prototype.updatePos = function (x, y) {
                    this.startX = x;
                    this.startY = y;
                    this.x = x;
                    this.y = y;
                };
                EftDisplay.prototype.updateEndPos = function (x, y) {
                    this.endX = x;
                    this.endY = y;
                };
                EftDisplay.prototype.updateCfg = function (delay, times, duration) {
                    this.delay = delay;
                    this.times = times;
                    this.duration = duration;
                };
                EftDisplay.prototype.onAlloc = function () {
                };
                EftDisplay.prototype.onStartPlay = function (totalTime) {
                    this.totalTime = totalTime;
                    if (this.scaleX0 == this.scaleX1
                        && this.scaleY0 == this.scaleY1
                        && this.rotation0 == this.rotation1
                        && this.startX == this.endX
                        && this.startY == this.endY) {
                        this.tw = undefined;
                        return;
                    }
                    this.scaleX = this.scaleX0;
                    this.scaleY = this.scaleY0;
                    this.x = this.startX;
                    this.y = this.startY;
                    this.rotation = this.rotation0;
                    var twTime = this.tweenTime || this.totalTime;
                    Tween.get(this).to({
                        x: this.endX,
                        y: this.endY,
                        scaleX: this.scaleX1,
                        scaleY: this.scaleY1,
                        rotation: this.rotation1,
                    }, twTime);
                    this.tw = [];
                    var time = 0;
                    var x = 0;
                    var y = 0;
                    var scaleX = this.scaleX0;
                    var scaleY = this.scaleY0;
                    var rotation = this.rotation0;
                    var alpha = this.alpha;
                    var obj = [time, x, y, scaleX, scaleY, rotation, alpha];
                    this.tw.push(obj);
                    this._startTime = TimeMgr.time.time;
                    TimeMgr.addUpdateItem(this);
                };
                EftDisplay.prototype.onStop = function () {
                    TimeMgr.removeUpdateItem(this);
                    Tween.removeTweens(this);
                    if (this.tw && this.tw.length > 2) {
                        var t = TimeMgr.time.time - this._startTime;
                        var tx = this.endX - this.startX;
                        var ty = this.endY - this.startY;
                        var scaleX = this.scaleX1;
                        var scaleY = this.scaleY1;
                        var rotation = this.rotation1;
                        var alpha = this.alpha;
                        this.tw[this.tw.length - 1] = [t, tx, ty, scaleX, scaleY, rotation, alpha];
                    }
                };
                EftDisplay.prototype.update = function (time) {
                    var t = TimeMgr.time.time - this._startTime;
                    var tx = Math.floor((this.x - this.startX) * 100) / 100; //相较起点偏移量
                    var ty = Math.floor((this.y - this.startY) * 100) / 100; //相较起点偏移量
                    var scaleX = Math.floor(this.scaleX * 100) / 100;
                    var scaleY = Math.floor(this.scaleY * 100) / 100;
                    var rotation = Math.floor(this.rotation * 100) / 100;
                    var alpha = Math.floor(this.alpha * 100) / 100;
                    var obj = [t, tx, ty, scaleX, scaleY, rotation, alpha];
                    this.tw.push(obj);
                };
                EftDisplay.prototype.onComp = function () {
                    if (this.removeDelay > 0) {
                        Tween.get(this).to({ alpha: 0 }, this.removeDelay).call(this.removeEft, this);
                    }
                    else {
                        this.removeEft();
                    }
                };
                EftDisplay.prototype.removeEft = function () {
                    this.onStop();
                    this.alpha = 1;
                    if (this._eft && this._eft.parent) {
                        this._eft.parent.removeChild(this._eft);
                    }
                    Pool.release(this._eft);
                    this._eft = null;
                };
                Object.defineProperty(EftDisplay.prototype, "isEftComp", {
                    get: function () {
                        return this._eft == null;
                    },
                    enumerable: true,
                    configurable: true
                });
                EftDisplay.prototype.dispose = function () {
                };
                EftDisplay.prototype.onRelease = function () {
                    this.removeEft();
                    this.x = 0;
                    this.y = 0;
                    this.id = undefined;
                    this._eftName = undefined;
                    this.tweenTime = undefined;
                    this.delay = 0;
                    this.alpha = 1;
                    this.times = 1;
                    this.duration = 0;
                    this.endX = this.startX = this.x;
                    this.endY = this.startY = this.y;
                    this.scaleX = this.scaleY = this.scaleX0 = this.scaleY0 = this.scaleX1 = this.scaleY1 = 1;
                    this.rotation = this.rotation0 = this.rotation1 = 0;
                };
                return EftDisplay;
            }(Sprite));
            effect.EftDisplay = EftDisplay;
            __reflect(EftDisplay.prototype, "tool.ui.effect.EftDisplay", ["base.pool.PoolObject", "base.pool.DisposeObject", "base.time.UpdateItem"]);
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EftDisplay.js.map