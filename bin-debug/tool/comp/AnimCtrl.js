var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var comp;
    (function (comp) {
        var Pool = base.pool.Pool;
        var AnimCtrl = (function () {
            function AnimCtrl() {
                this._durations = [];
                this._startTimes = [];
            }
            Object.defineProperty(AnimCtrl.prototype, "totalTime", {
                get: function () {
                    return this._totalTime;
                },
                enumerable: true,
                configurable: true
            });
            AnimCtrl.prototype.init = function (durations, onComp, onChange) {
                var self = this;
                Pool.release(self._compHandler);
                Pool.release(self._changeHandler);
                self._compHandler = onComp;
                self._changeHandler = onChange;
                self._finalFrame = durations.length - 1;
                self._totalTime = 0;
                self._durations.length = 0;
                self._startTimes.length = 0;
                for (var i = 0, n = durations.length; i < n; i++) {
                    var dur = durations[i];
                    self._durations[i] = dur;
                    self._startTimes[i] = self._totalTime;
                    self._totalTime += dur;
                }
                self._curFrame = 0;
                self._curTime = 0;
                self._playing = true;
                self._loop = true;
            };
            Object.defineProperty(AnimCtrl.prototype, "curFrame", {
                get: function () {
                    return this._curFrame;
                },
                set: function (value) {
                    var self = this;
                    self._curFrame = value;
                    self._curTime = 0;
                    for (var i = 0; i < value; i++) {
                        self._curTime += self._durations[i];
                    }
                    self.onFrameChange();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AnimCtrl.prototype, "loop", {
                get: function () {
                    return this._loop;
                },
                set: function (value) {
                    this._loop = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AnimCtrl.prototype, "isPlaying", {
                get: function () {
                    return this._playing;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AnimCtrl.prototype, "isComplete", {
                get: function () {
                    var self = this;
                    if (isNaN(self._totalTime) || isNaN(self._curTime)) {
                        return false;
                    }
                    return !self._loop && self._curTime >= self._totalTime;
                },
                enumerable: true,
                configurable: true
            });
            AnimCtrl.prototype.play = function () {
                this._playing = true;
            };
            AnimCtrl.prototype.stop = function () {
                this._playing = false;
            };
            AnimCtrl.prototype.advanceTime = function (elapseTime) {
                var self = this;
                if (!self._playing || elapseTime <= 0) {
                    return;
                }
                var preFrame = self._curFrame;
                var isComplete = false;
                if (self._loop && self._curTime >= self._totalTime) {
                    self._curTime = 0;
                    self._curFrame = 0;
                }
                if (self._curTime < self._totalTime) {
                    self._curTime += elapseTime;
                    while (self._curTime > self._startTimes[self._curFrame] + self._durations[self._curFrame]) {
                        if (self._curFrame == self._finalFrame) {
                            if (self._loop) {
                                self._curTime -= self._totalTime;
                                self._curFrame = 0;
                            }
                            else {
                                isComplete = true;
                                self._curTime = self._totalTime;
                                break;
                            }
                        }
                        else {
                            self._curFrame++;
                        }
                    }
                    if (self._curFrame == self._finalFrame && self._curTime == self._totalTime) {
                        isComplete = true;
                    }
                }
                if (self._curFrame != preFrame) {
                    self.onFrameChange();
                }
                if (isComplete) {
                    self.onComplete();
                }
            };
            AnimCtrl.prototype.onFrameChange = function () {
                if (this._changeHandler) {
                    this._changeHandler.exec(this._curFrame);
                }
            };
            AnimCtrl.prototype.onComplete = function () {
                if (this._compHandler) {
                    this._compHandler.exec();
                }
            };
            AnimCtrl.prototype.dispose = function () {
                var self = this;
                Pool.release(self._changeHandler);
                self._changeHandler = null;
                Pool.release(self._compHandler);
                self._compHandler = null;
            };
            return AnimCtrl;
        }());
        comp.AnimCtrl = AnimCtrl;
        __reflect(AnimCtrl.prototype, "tool.comp.AnimCtrl");
    })(comp = tool.comp || (tool.comp = {}));
})(tool || (tool = {}));
