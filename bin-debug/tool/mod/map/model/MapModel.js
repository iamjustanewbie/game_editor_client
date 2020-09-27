var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var Handler = base.utils.Handler;
            var MapModel = (function () {
                function MapModel() {
                    this.curDrawStatus = map.SliceStatus.Enable;
                    this.telportPts = {};
                    this.isShowMask = true; //网格开关
                    this.curRange = 0; //笔刷
                    this.settingBlock = true; // 设置障碍点为true 设置遮挡点为false
                }
                Object.defineProperty(MapModel.prototype, "numCol", {
                    get: function () {
                        return this._numCol;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MapModel.prototype, "numRow", {
                    get: function () {
                        return this._numRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                MapModel.prototype.getIdx = function (r, c) {
                    return r * this._numCol + c;
                };
                MapModel.prototype.getRC = function (idx) {
                    var r = Math.floor(idx / this._numCol);
                    var c = idx % this._numCol;
                    return { r: r, c: c };
                };
                MapModel.prototype.setCurMapData = function (data) {
                    this.curMapData = data;
                    this._numCol = this.curMapData.imageWidth / this.curMapData.cellWidth;
                    this._numRow = this.curMapData.imageHeight / this.curMapData.cellHeight;
                };
                Object.defineProperty(MapModel.prototype, "ckBlock", {
                    get: function () {
                        if (this._ckBlock == null) {
                            this._ckBlock = Handler.alloc(this, this.isBlock);
                        }
                        return this._ckBlock;
                    },
                    enumerable: true,
                    configurable: true
                });
                MapModel.prototype.isBlock = function (x, y) {
                    return this.curMapData.data[this.getIdx(y, x)] == map.SliceStatus.Disable;
                };
                MapModel.DefaultCellW = 64;
                MapModel.DefaultCellH = 64;
                return MapModel;
            }());
            map.MapModel = MapModel;
            __reflect(MapModel.prototype, "tool.mod.map.MapModel");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=MapModel.js.map