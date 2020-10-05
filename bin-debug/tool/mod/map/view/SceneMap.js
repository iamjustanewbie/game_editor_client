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
        var map;
        (function (map) {
            var Sprite = egret.Sprite;
            var Texture = egret.Texture;
            var Bitmap = egret.Bitmap;
            var Pool = base.pool.Pool;
            var ResUrl = tool.mod.editor.ResUrl;
            var Event = egret.Event;
            var SceneMap = (function (_super) {
                __extends(SceneMap, _super);
                function SceneMap() {
                    var _this = _super.call(this) || this;
                    _this._mapId = 0;
                    _this._sliceW = 0;
                    _this._sliceH = 0;
                    _this.touchEnabled = true;
                    _this._bmpMap = {};
                    _this._curShow = [];
                    return _this;
                }
                SceneMap.prototype.init = function (mapId, sliceWidth, sliceHeight) {
                    this._mapId = mapId;
                    this._sliceW = sliceWidth;
                    this._sliceH = sliceHeight;
                };
                SceneMap.prototype.updateTiles = function (sc, sr, ec, er) {
                    if (this._mapId == 0) {
                        return;
                    }
                    if (this._curSC == sc && this._curSR == sr && this._curEC == ec && this._curER == er) {
                        return;
                    }
                    this._curSC = sc;
                    this._curSR = sr;
                    this._curEC = ec;
                    this._curER = er;
                    this._curShow.length = 0;
                    for (var c = sc; c < ec; c++) {
                        for (var r = sr; r < er; r++) {
                            this._curShow.push(SceneMap.getSliceId(c, r));
                        }
                    }
                    SceneMap.centerCol = sc - (ec - sc) / 2 - 1;
                    SceneMap.centerCol = sr - (er - sr) / 2 - 1;
                    this._curShow = this._curShow.sort(SceneMap.sortId).reverse();
                    for (var key in this._bmpMap) {
                        if (this._curShow.indexOf(parseInt(key)) == -1) {
                            Pool.release(this._bmpMap[key]);
                            delete this._bmpMap[key];
                        }
                    }
                    for (var i = 0, n = this._curShow.length; i < n; i++) {
                        this.loadOne(this._curShow[i]);
                    }
                };
                SceneMap.prototype.loadOne = function (id) {
                    var bmp = this._bmpMap[id];
                    if (bmp == null) {
                        bmp = Pool.alloc(MapBmp);
                        var col = SceneMap.getCol(id);
                        var row = SceneMap.getRow(id);
                        bmp.x = col * this._sliceW;
                        bmp.y = row * this._sliceH;
                        bmp.setIdx(col, row, this._mapId);
                        this._bmpMap[id] = bmp;
                        this.addChild(bmp);
                    }
                };
                SceneMap.prototype.clean = function () {
                    this._mapId = this._sliceW = this._sliceH = 0;
                    this._curSC = this._curSR = this._curEC = this._curER = 0;
                    for (var key in this._bmpMap) {
                        Pool.release(this._bmpMap[key]);
                        delete this._bmpMap[key];
                    }
                };
                SceneMap.getSliceId = function (col, row) {
                    return ((row + this.NRM) << this.ROW_SHIFT) + (col + this.NRM);
                };
                SceneMap.getCol = function (sliceId) {
                    return (sliceId & this.LOW_WORD) - this.NRM;
                };
                SceneMap.getRow = function (sliceId) {
                    return (sliceId >> this.ROW_SHIFT) - this.NRM;
                };
                SceneMap.sortId = function (id1, id2) {
                    var self = SceneMap;
                    var ca = self.getCol(id1) - self.centerCol;
                    var ra = self.getRow(id1) - self.centerRow;
                    var cb = self.getCol(id2) - self.centerCol;
                    var rb = self.getRow(id2) - self.centerRow;
                    var distA = ca * ca + ra * ra;
                    var distB = cb * cb + rb * rb;
                    if (distA < distB) {
                        return 1;
                    }
                    else if (distA > distB) {
                        return -1;
                    }
                    return 0;
                };
                SceneMap.ROW_SHIFT = 16;
                SceneMap.LOW_WORD = 0xFFFF;
                SceneMap.NRM = 1; // 0移位后还是0所以加1
                return SceneMap;
            }(Sprite));
            map.SceneMap = SceneMap;
            __reflect(SceneMap.prototype, "tool.mod.map.SceneMap");
            var MapBmp = (function (_super) {
                __extends(MapBmp, _super);
                function MapBmp() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MapBmp.prototype.setIdx = function (c, r, mapId) {
                    var _this = this;
                    var url = ResUrl + "/map/" + mapId + "/pic/" + c + "_" + r + ".jpg";
                    if (this._url == url) {
                        return;
                    }
                    this.removeCur();
                    this._url = url;
                    var loader = new egret.ImageLoader();
                    loader.crossOrigin = "anonymous";
                    loader.addEventListener(Event.COMPLETE, function (e) {
                        var loader = e.currentTarget;
                        var data = loader.data;
                        var tex = new Texture();
                        tex._setBitmapData(data);
                        _this.onLoaded(tex, url);
                    }, this);
                    loader.load(url);
                };
                MapBmp.prototype.onLoaded = function (data, url) {
                    if (this._url != url) {
                        return;
                    }
                    this.texture = data;
                };
                MapBmp.prototype.removeCur = function () {
                    this.texture = null;
                    this._url = undefined;
                };
                MapBmp.prototype.dispose = function () {
                    this.onRelease();
                };
                MapBmp.prototype.onAlloc = function () {
                };
                MapBmp.prototype.onRelease = function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                    this.removeCur();
                };
                return MapBmp;
            }(Bitmap));
            __reflect(MapBmp.prototype, "MapBmp", ["base.pool.PoolObject", "base.pool.DisposeObject"]);
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
