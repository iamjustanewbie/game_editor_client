var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var comp;
    (function (comp) {
        var Texture = egret.Texture;
        var ByteArray = egret.ByteArray;
        var Pool = base.pool.Pool;
        var ImageLoader = egret.ImageLoader;
        var MergedBmp = (function () {
            function MergedBmp() {
                this._bitmapX = 0;
                this._bitmapY = 0;
                this._subMap = {};
            }
            Object.defineProperty(MergedBmp.prototype, "numFrames", {
                get: function () {
                    if (this._jsonKeys) {
                        return this._jsonKeys.length;
                    }
                    if (this._frames) {
                        return this._frames.length;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MergedBmp.prototype, "isLoaded", {
                get: function () {
                    return this._texture != null && (this._frames != null || this._json != null);
                },
                enumerable: true,
                configurable: true
            });
            /**
             *
             * @param {string} url
             * @param {base.utils.Handler} onLoaded
             * @param {string} type
             */
            MergedBmp.prototype.load = function (url, onLoaded, type) {
                if (type === void 0) { type = "json"; }
                var self = this;
                if (self._imgUrl === url) {
                    return;
                }
                this.clear();
                self._imgUrl = url;
                self._cfgUrl = url.replace(".png", "." + type);
                self._onLoaded = onLoaded;
                RES.getResByUrl(self._cfgUrl, self.cfgLoaded, self, type);
                if (!self._imgLoad) {
                    self._imgLoad = new ImageLoader();
                }
                self._imgLoad.crossOrigin = "anonymous";
                self._imgLoad.addEventListener(egret.Event.COMPLETE, self.imgLoaded, this);
                self._imgLoad.load(self._imgUrl);
                // RES.getResByUrl(self._imgUrl, self.imgLoaded, self, RES.ResourceItem.TYPE_IMAGE);
            };
            MergedBmp.prototype.cfgLoaded = function (data, url) {
                if (url != this._cfgUrl) {
                    return;
                }
                if (data instanceof ArrayBuffer) {
                    this.setBytes(new ByteArray(data));
                }
                else if (Array.isArray(data)) {
                    this._frames = data;
                }
                else {
                    this.setJson(data);
                }
                this.checkComp();
            };
            MergedBmp.prototype.imgLoaded = function (e) {
                var self = this;
                self._imgLoad.removeEventListener(egret.Event.COMPLETE, self.imgLoaded, this);
                var data = e.currentTarget.data;
                var texture = new Texture();
                texture._setBitmapData(data);
                this._texture = texture;
                this._bitmapX = texture.$bitmapX - texture.$offsetX;
                this._bitmapY = texture.$bitmapY - texture.$offsetY;
                this.checkComp();
            };
            MergedBmp.prototype.setBytes = function (bytes, pos) {
                if (pos === void 0) { pos = 0; }
                var s = MergedBmp;
                bytes.position = pos;
                var n = bytes.readShort();
                var frames = this._frames = [];
                frames.length = n;
                var len = s.Pos.length;
                for (var i = 0; i < n; i++) {
                    frames[i] = [];
                    frames[i].length = len;
                    for (var j = 0; j < len; j++) {
                        bytes.position = pos + s.HeadSize + (s.Pos.length * i + j) * s.Size;
                        frames[i][j] = bytes.readShort();
                    }
                }
            };
            MergedBmp.prototype.setJson = function (json) {
                this._json = json;
                this._jsonKeys = Object.keys(json.frames);
            };
            MergedBmp.prototype.checkComp = function () {
                var self = this;
                if (self.isLoaded) {
                    var h = self._onLoaded;
                    self._onLoaded = undefined;
                    if (h) {
                        h.exec();
                        Pool.release(h);
                    }
                }
            };
            MergedBmp.prototype.getTexture = function (frame) {
                var self = this;
                if (self._texture == null) {
                    return null;
                }
                var texture = self._subMap[frame];
                if (texture == null) {
                    var source = self._texture;
                    var x = self.getVal(frame, "x") + self._bitmapX;
                    var y = self.getVal(frame, "y") + self._bitmapY;
                    var w = self.getVal(frame, "w");
                    var h = self.getVal(frame, "h");
                    texture = new Texture();
                    texture.disposeBitmapData = false;
                    texture.$bitmapData = source.$bitmapData;
                    texture.$initData(x, y, w, h, 0, 0, w, h, source.$sourceWidth, source.$sourceHeight);
                    self._subMap[frame] = texture;
                }
                return texture;
            };
            MergedBmp.prototype.getVal = function (frame, key) {
                var self = this;
                if (self._frames) {
                    var f = typeof frame === "string" ? parseInt(frame) : frame;
                    return self.getValFromBin(f, key);
                }
                if (this._json) {
                    var f = void 0;
                    if (typeof frame === "number") {
                        f = frame.toString();
                    }
                    else {
                        f = frame;
                    }
                    if (this._json.frames.hasOwnProperty(f)) {
                        return this._json.frames[f][key];
                    }
                }
                return 0;
            };
            MergedBmp.prototype.getValFromBin = function (frame, key) {
                var self = this;
                var s = MergedBmp;
                var idx = s.Pos.indexOf(key);
                if (idx < 0) {
                    return 0;
                }
                return self._frames[frame][idx];
            };
            MergedBmp.prototype.clear = function () {
                var self = this;
                self._frames = null;
                self._json = undefined;
                self._jsonKeys = undefined;
                this._texture = undefined;
                for (var k in this._subMap) {
                    var t = this._subMap[k];
                    t.dispose();
                    this._subMap[k] = undefined;
                    delete this._subMap[k];
                }
                this._imgUrl = undefined;
                this._cfgUrl = undefined;
                Pool.release(this._onLoaded);
                this._onLoaded = undefined;
            };
            MergedBmp.prototype.dispose = function () {
                this.onRelease();
            };
            MergedBmp.prototype.onAlloc = function () {
            };
            MergedBmp.prototype.onRelease = function () {
                this.clear();
            };
            MergedBmp.HeadSize = 2;
            MergedBmp.Size = 2;
            MergedBmp.Pos = ["x", "y", "w", "h", "offX", "offY", "sourceW", "sourceH", "dur"];
            return MergedBmp;
        }());
        comp.MergedBmp = MergedBmp;
        __reflect(MergedBmp.prototype, "tool.comp.MergedBmp", ["base.pool.PoolObject", "base.pool.DisposeObject"]);
    })(comp = tool.comp || (tool.comp = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=MergedBmp.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
