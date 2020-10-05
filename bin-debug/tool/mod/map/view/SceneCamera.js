var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var Rectangle = egret.Rectangle;
            var SceneCamera = (function () {
                function SceneCamera(scene) {
                    this._mw = 0; // map width
                    this._mh = 0; // map height
                    this._viewPort = new Rectangle();
                    this._scene = scene;
                }
                Object.defineProperty(SceneCamera.prototype, "fy", {
                    get: function () {
                        return this._fy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneCamera.prototype, "fx", {
                    get: function () {
                        return this._fx;
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneCamera.prototype.init = function (mapWidth, mapHeight, sliceWidth, sliceHeight) {
                    this._mw = mapWidth;
                    this._mh = mapHeight;
                    this._sliceW = sliceWidth;
                    this._sliceH = sliceHeight;
                    this._fx = NaN;
                    this._fy = NaN;
                };
                SceneCamera.prototype.onResize = function (sw, sh) {
                    this._sw = sw;
                    this._sh = sh;
                    if (this._mw == 0 || this._mh == 0) {
                        return;
                    }
                    if (!isNaN(this._fx) && !isNaN(this._fy)) {
                        var tx = this._fx;
                        var ty = this._fy;
                        this._fx = this._fy = 0;
                        this.setFocus(tx, ty, this._scale);
                    }
                };
                SceneCamera.prototype.equal = function (fx, fy) {
                    var Fix = SceneCamera.Fix;
                    var cx = Math.floor(this._fx * Fix);
                    var cy = Math.floor(this._fy * Fix);
                    var tx = Math.floor(fx * Fix);
                    var ty = Math.floor(fy * Fix);
                    return cx == tx && cy == ty;
                };
                SceneCamera.prototype.setFocus = function (focusX, focusY, scale) {
                    if (scale === void 0) { scale = 1; }
                    if (this.equal(focusX, focusY) && this._scale == scale) {
                        return;
                    }
                    this._fx = focusX;
                    this._fy = focusY;
                    this._scale = scale;
                    this.updateViewPort(focusX, focusY);
                    this.updateMapTiles(this._viewPort);
                };
                SceneCamera.prototype.updateViewPort = function (focusX, focusY) {
                    var self = this;
                    var sw = self._sw / self._scale;
                    var mw = self._mw;
                    var sh = self._sh / self._scale;
                    var mh = self._mh;
                    var hW = Math.min(sw, mw) / 2;
                    var hH = Math.min(sh, mh) / 2;
                    var cX = SceneCamera.clamp(focusX, hW, Math.max(sw, mw) - hW);
                    var cY = SceneCamera.clamp(focusY, hH, Math.max(sh, mh) - hH);
                    self._viewPort.setTo(cX - hW, cY - hH, Math.min(sw, mw - cX + hW), Math.min(sh, mh - cY + hH));
                    self._scene.updateViewPort(self._viewPort);
                };
                SceneCamera.prototype.updateMapTiles = function (viewRect) {
                    var self = this;
                    var viewSX = viewRect.x;
                    var viewSY = viewRect.y;
                    var viewW = viewRect.width;
                    var viewH = viewRect.height;
                    var viewEX = viewSX + viewW;
                    var viewEY = viewSY + viewH;
                    var sc = Math.floor(viewSX / self._sliceW);
                    var sr = Math.floor(viewSY / self._sliceH);
                    var ec = Math.floor(viewEX / self._sliceW) + ((viewEX % self._sliceW == 0) ? 0 : 1);
                    var er = Math.floor(viewEY / self._sliceH) + ((viewEY % self._sliceH == 0) ? 0 : 1);
                    this._scene.updateTiles(sc, sr, ec, er);
                };
                Object.defineProperty(SceneCamera.prototype, "viewPort", {
                    get: function () {
                        return this._viewPort;
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneCamera.clamp = function (input, min, max) {
                    var tmp = 0;
                    if (min > max) {
                        tmp = min;
                        min = max;
                        max = tmp;
                    }
                    if (input < min) {
                        input = min;
                    }
                    if (input > max) {
                        input = max;
                    }
                    return input;
                };
                SceneCamera.Fix = 100;
                return SceneCamera;
            }());
            map.SceneCamera = SceneCamera;
            __reflect(SceneCamera.prototype, "tool.mod.map.SceneCamera");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
