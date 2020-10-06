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
            var MdrBase = base.module.MdrBase;
            var KeyUtil = tool.utils.KeyUtil;
            var Pool = base.pool.Pool;
            var Point = egret.Point;
            var facade = base.module.facade;
            var Sprite = egret.Sprite;
            var TouchEvent = egret.TouchEvent;
            var Event = egret.Event;
            var MapMaskMdr = (function (_super) {
                __extends(MapMaskMdr, _super);
                function MapMaskMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", Sprite);
                    _this._scale = 1;
                    return _this;
                }
                MapMaskMdr.prototype.onInit = function () {
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                    this._model = this._proxy.getData();
                    this._camera = new map.SceneCamera(this);
                    this._map = this._view.addChild(new map.SceneMap());
                    this._testMask = this._view.addChild(new map.TestMask());
                };
                MapMaskMdr.prototype.addListeners = function () {
                    this.onNt(map.ON_MAP_CHANGE, this.updateMap, this);
                    this.onNt(map.ON_SLICE_UPDATE, this.onSliceUpdate, this);
                    this.onNt(mod.ON_KEY_UPDATE, this.onKeyUpdate, this);
                    this.onNt(map.ON_MAP_SCALE_CHANGE, this.onScaleChange, this);
                    this.onNt(map.ON_SHOW_LINE_CHANGE, this.updateLine, this);
                    this.onNt(map.ON_MAP_LIST, this.onGetMapList, this);
                    this._view.addEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
                    this._view.addEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
                    gso.gameStage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    gso.gameStage.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    gso.gameStage.addEventListener(Event.RESIZE, this.onResize, this);
                };
                MapMaskMdr.prototype.removeListeners = function () {
                    this._view.removeEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
                    this._view.removeEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
                    gso.gameStage.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    gso.gameStage.removeEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    gso.gameStage.removeEventListener(Event.RESIZE, this.onResize, this);
                };
                MapMaskMdr.prototype.onScaleChange = function (n) {
                    var s = n.body;
                    s /= 100;
                    this._scale = s;
                    this._view.scaleX = this._view.scaleY = s;
                    this._camera.setFocus(this._camera.fx, this._camera.fy, s);
                };
                MapMaskMdr.prototype.updateXY = function (e) {
                    var c = Math.floor(e.localX / this._model.curMapData.cellWidth);
                    var r = Math.floor(e.localY / this._model.curMapData.cellHeight);
                    this.sendNt(map.ON_XY_CHANGE, { r: r, c: c });
                };
                MapMaskMdr.prototype.onGetMapList = function () {
                    var p = this.retProxy(mod.ProxyType.Map);
                    if (this._model.curMapId) {
                        p.getMapInfo(this._model.curMapId);
                    }
                };
                MapMaskMdr.prototype.onShow = function () {
                    var p = this.retProxy(mod.ProxyType.Map);
                    p.getMapList();
                    this.updateLine();
                };
                MapMaskMdr.prototype.onHide = function () {
                    facade.hideView(mod.ModName.Map, mod.MapViewType.TopBar);
                };
                MapMaskMdr.prototype.updateMap = function () {
                    if (!this._model.curMapData) {
                        return;
                    }
                    this.showView(mod.MapViewType.TopBar, map.MapType.Mask);
                    var m = this._model.curMapData;
                    this._map.clean();
                    this._map.init(this._model.curMapId, m.sliceWidth, m.sliceHeight);
                    this._testMask.clean();
                    this._testMask.init(m.cellWidth, m.cellHeight, this._model.numCol, this._model.numRow);
                    this._camera.init(m.imageWidth, m.imageHeight, m.sliceWidth, m.sliceHeight);
                    this._camera.setFocus(1, 1, this._scale);
                    this.onResize(null);
                };
                MapMaskMdr.prototype.updateLine = function () {
                    this._testMask.visible = this._model.isShowMask;
                };
                MapMaskMdr.prototype.onSliceUpdate = function (n) {
                    this._testMask.updateCur();
                };
                MapMaskMdr.prototype.updateSlice = function (r, c, status) {
                    var range = this._model.curRange;
                    for (var i = r - range; i <= r + range; ++i) {
                        for (var j = c - range; j <= c + range; ++j) {
                            var curStatus = this._model.curMapData.data[this.getIdx(i, j)];
                            if (status == curStatus) {
                                continue;
                            }
                            this._proxy.setData(i, j, status);
                        }
                    }
                    this._testMask.updateCur();
                };
                MapMaskMdr.prototype.getIdx = function (r, c) {
                    return this._model.getIdx(r, c);
                };
                MapMaskMdr.prototype.onTapSlice = function (e) {
                    var pt = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(pt.x / this._model.curMapData.cellWidth);
                    var r = Math.floor(pt.y / this._model.curMapData.cellHeight);
                    Pool.release(pt);
                    this.sendNt(map.ON_XY_CHANGE, { r: r, c: c });
                    if (!this.isEditable || !this._model.curMapData) {
                        return;
                    }
                    if (this._tapBeginIdx != this._tapEndIdx) {
                        return;
                    }
                    this.updateSlice(r, c, this._model.curDrawStatus);
                };
                MapMaskMdr.prototype.onTouchBegin = function (e) {
                    if (!this._model.curMapData) {
                        return;
                    }
                    this._lastState = this.isEditable;
                    this._startX = this._camera.fx;
                    this._startY = this._camera.fy;
                    this._stageX = e.stageX;
                    this._stageY = e.stageY;
                    var point = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(point.x / this._model.curMapData.cellWidth);
                    var r = Math.floor(point.y / this._model.curMapData.cellHeight);
                    Pool.release(point);
                    this._tapBeginIdx = this.getIdx(r, c);
                    this._map.addEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                };
                MapMaskMdr.prototype.onTouchEnd = function (e) {
                    if (!this._model.curMapData) {
                        return;
                    }
                    var point = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(point.x / this._model.curMapData.cellWidth);
                    var r = Math.floor(point.y / this._model.curMapData.cellHeight);
                    Pool.release(point);
                    this._tapEndIdx = this.getIdx(r, c);
                    this.endMove();
                };
                MapMaskMdr.prototype.endMove = function () {
                    this._map.removeEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                };
                MapMaskMdr.prototype.onTouchMove = function (e) {
                    if (!this._model.curMapData) {
                        return;
                    }
                    var s = this._scale;
                    //空格按下时，拖动地图
                    if (!this.isEditable) {
                        var x1 = (this._stageX - e.stageX) / s + this._startX;
                        var y1 = (this._stageY - e.stageY) / s + this._startY;
                        this._camera.setFocus(x1, y1, s);
                        return;
                    }
                    var pt = this.getWorldPt(e.stageX, e.stageY);
                    var tapCol = Math.floor(pt.x / this._model.curMapData.cellWidth);
                    var tapRow = Math.floor(pt.y / this._model.curMapData.cellHeight);
                    Pool.release(pt);
                    var idx = this.getIdx(tapCol, tapRow);
                    if (idx != this._tapIdx) {
                        this._tapIdx = idx;
                        if (KeyUtil.keyDown["Control"]) {
                            this.updateSlice(tapRow, tapCol, map.SliceStatus.Disable);
                        }
                        else {
                            this.updateSlice(tapRow, tapCol, this._model.curDrawStatus);
                        }
                    }
                };
                MapMaskMdr.prototype.getWorldPt = function (stageX, stageY, pt) {
                    pt = pt || Pool.alloc(Point);
                    pt.x = stageX / this._scale - this._view.x / this._scale;
                    pt.y = stageY / this._scale - this._view.y / this._scale;
                    return pt;
                };
                MapMaskMdr.prototype.onResize = function (e) {
                    this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
                };
                MapMaskMdr.prototype.updateViewPort = function (viewPort) {
                    this._view.x = -viewPort.x * this._scale;
                    this._view.y = -viewPort.y * this._scale;
                    if (this._testMask) {
                        this._testMask.updateView(viewPort);
                    }
                };
                MapMaskMdr.prototype.updateTiles = function (sc, sr, ec, er) {
                    this._map.updateTiles(sc, sr, ec, er);
                };
                MapMaskMdr.prototype.onKeyUpdate = function (n) {
                    if (n.body == " ") {
                        if (this._lastState != this.isEditable) {
                            this.endMove();
                        }
                    }
                };
                Object.defineProperty(MapMaskMdr.prototype, "isEditable", {
                    get: function () {
                        return !KeyUtil.keyDown[" "];
                    },
                    enumerable: true,
                    configurable: true
                });
                return MapMaskMdr;
            }(MdrBase));
            map.MapMaskMdr = MapMaskMdr;
            __reflect(MapMaskMdr.prototype, "tool.mod.map.MapMaskMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=MapMaskMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
