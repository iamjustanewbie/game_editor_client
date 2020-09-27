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
    var comp;
    (function (comp) {
        var Sprite = egret.Sprite;
        var Bitmap = egret.Bitmap;
        var Handler = base.utils.Handler;
        var TimeMgr = base.time.TimeMgr;
        var Pool = base.pool.Pool;
        var delayCall = base.time.delayCall;
        var UIAnim = (function (_super) {
            __extends(UIAnim, _super);
            function UIAnim() {
                var _this = _super.call(this) || this;
                _this._curTimes = 0;
                _this._timeOutKey = 0;
                _this.duration = 0;
                _this.times = 0;
                _this._bmp = new Bitmap();
                _this.addChild(_this._bmp);
                _this._ctrl = new comp.AnimCtrl();
                _this.onAlloc();
                return _this;
            }
            UIAnim.prototype.setSource = function (source, times, duration) {
                if (times === void 0) { times = 1; }
                if (duration === void 0) { duration = 0; }
                var self = this;
                if (self._source == source && self._merged && self._merged.isLoaded) {
                    this.onLoaded();
                    return;
                }
                self.removeCurrent();
                self._curTimes = 0;
                self.times = times;
                self.duration = duration;
                self._source = source;
                self._merged.load(source, Handler.alloc(self, self.onLoaded));
            };
            UIAnim.prototype.onLoaded = function () {
                var self = this;
                var durList = [];
                for (var i = 0, n = self._merged.numFrames; i < n; i++) {
                    durList.push(self._merged.getVal(i, "dur"));
                }
                self._ctrl.init(durList, Handler.alloc(self, self.onComplete), Handler.alloc(self, self.onFrameChange));
                self._ctrl.loop = false;
                self.play();
                self.onFrameChange(0);
            };
            UIAnim.prototype.removeCurrent = function () {
                var self = this;
                self._source = null;
                self.stop();
                self._bmp.texture = null;
            };
            UIAnim.prototype.play = function () {
                this._ctrl.play();
                TimeMgr.addUpdateItem(this);
                if (this.startPlay) {
                    this.startPlay.exec(this._ctrl.totalTime);
                }
            };
            UIAnim.prototype.stop = function () {
                this._ctrl.stop();
                TimeMgr.removeUpdateItem(this);
            };
            UIAnim.prototype.update = function (time) {
                this._ctrl.advanceTime(TimeMgr.getElapseTime(this));
            };
            UIAnim.prototype.onFrameChange = function (frame) {
                var self = this;
                var key = frame.toString();
                self._bmp.x = -self._merged.getVal(frame, "sourceW") / 2 + self._merged.getVal(frame, "offX");
                self._bmp.y = -self._merged.getVal(frame, "sourceH") / 2 + self._merged.getVal(frame, "offY");
                self._bmp.texture = self._merged.getTexture(key);
            };
            UIAnim.prototype.onComplete = function () {
                var self = this;
                self._curTimes++;
                if (self.times <= 0 || self._curTimes < self.times) {
                    if (self.duration > 0) {
                        self._bmp.texture = null;
                        self._timeOutKey = delayCall(Handler.alloc(this, this.replay), self.duration);
                    }
                    else {
                        this.replay();
                    }
                }
                else {
                    if (self.complete) {
                        self.complete.exec(self);
                    }
                }
            };
            UIAnim.prototype.replay = function () {
                this._ctrl.curFrame = 0;
                this._ctrl.play();
            };
            UIAnim.prototype.dispose = function () {
                this.onRelease();
            };
            UIAnim.prototype.onAlloc = function () {
                this._merged = Pool.alloc(comp.MergedBmp);
            };
            UIAnim.prototype.onRelease = function () {
                this.removeCurrent();
                this.x = 0;
                this.y = 0;
                Pool.release(this.startPlay);
                this.startPlay = null;
                Pool.release(this.complete);
                this.complete = undefined;
                Pool.release(this._merged);
                this._merged = undefined;
            };
            return UIAnim;
        }(Sprite));
        comp.UIAnim = UIAnim;
        __reflect(UIAnim.prototype, "tool.comp.UIAnim", ["base.time.UpdateItem", "base.pool.PoolObject", "base.pool.DisposeObject"]);
    })(comp = tool.comp || (tool.comp = {}));
})(tool || (tool = {}));
//# sourceMappingURL=UIAnim.js.map