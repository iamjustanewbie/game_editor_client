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
            var Sprite = egret.Sprite;
            var TouchEvent = egret.TouchEvent;
            var Event = egret.Event;
            var facade = base.module.facade;
            var KeyUtil = tool.utils.KeyUtil;
            var Pool = base.pool.Pool;
            var Point = egret.Point;
            var Shape = egret.Shape;
            var Alert = tool.utils.Alert;
            var TeleportPt = tool.ui.map.TeleportPt;
            var MapTelePortMdr = (function (_super) {
                __extends(MapTelePortMdr, _super);
                function MapTelePortMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", Sprite);
                    _this._teleportPts = [];
                    _this._scale = 1;
                    return _this;
                }
                MapTelePortMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                    this._model = this._proxy.getData();
                    this._camera = new map.SceneCamera(this);
                    this._map = this._view.addChild(new map.SceneMap());
                    this._testMask = this._view.addChild(new map.TestMask());
                    this._ptLine = new Shape();
                    this._view.addChild(this._ptLine);
                };
                MapTelePortMdr.prototype.addListeners = function () {
                    this.onNt(map.ON_MAP_CHANGE, this.updateMap, this);
                    this.onNt(mod.ON_KEY_UPDATE, this.onKeyUpdate, this);
                    this.onNt(map.ON_MAP_SCALE_CHANGE, this.onScaleChange, this);
                    this.onNt(map.ON_MAP_LIST, this.onGetMapList, this);
                    this.onNt(map.TELEPORT_CHANGE, this.onTeleportChange, this);
                    this.onNt(map.ON_SHOW_LINE_CHANGE, this.updateTestMask, this);
                    this._view.addEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
                    this._view.addEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
                    gso.gameStage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    gso.gameStage.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    gso.gameStage.addEventListener(Event.RESIZE, this.onResize, this);
                };
                MapTelePortMdr.prototype.removeListeners = function () {
                    this._view.removeEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
                    this._view.removeEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
                    gso.gameStage.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    gso.gameStage.removeEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    gso.gameStage.removeEventListener(Event.RESIZE, this.onResize, this);
                };
                MapTelePortMdr.prototype.onPublish = function () {
                    this._proxy.publishMonster();
                };
                MapTelePortMdr.prototype.onTeleportChange = function () {
                    this.clearPt();
                    this.showTeleport();
                };
                MapTelePortMdr.prototype.showTeleport = function () {
                    for (var key in this._model.telportPts) {
                        var pt = this._model.telportPts[key];
                        this.drawTeleportPt(pt.y, pt.x, pt.dir);
                    }
                };
                MapTelePortMdr.prototype.onShow = function () {
                    var p = this.retProxy(mod.ProxyType.Map);
                    p.getMapList();
                };
                MapTelePortMdr.prototype.onScaleChange = function (n) {
                    if (n) {
                        var s = n.body;
                        s /= 100;
                        this._scale = s;
                    }
                    this._view.scaleX = this._view.scaleY = this._scale;
                    this._camera.setFocus(this._camera.fx, this._camera.fy, this._scale);
                };
                MapTelePortMdr.prototype.onGetMapList = function () {
                    var p = this.retProxy(mod.ProxyType.Map);
                    if (this._model.curMapId) {
                        p.getMapInfo(this._model.curMapId);
                    }
                };
                MapTelePortMdr.prototype.clearPt = function () {
                    for (var _i = 0, _a = this._teleportPts; _i < _a.length; _i++) {
                        var tp = _a[_i];
                        tp.dispose();
                    }
                    this._teleportPts = [];
                };
                MapTelePortMdr.prototype.onHide = function () {
                    facade.hideView(mod.ModName.Map, mod.MapViewType.TopBar);
                    facade.hideView(mod.ModName.Map, mod.MapViewType.MonsterList);
                    this.clearPt();
                };
                MapTelePortMdr.prototype.updateXY = function (e) {
                    var c = Math.floor(e.localX / this._model.curMapData.cellWidth);
                    var r = Math.floor(e.localY / this._model.curMapData.cellHeight);
                    this.sendNt(map.ON_XY_CHANGE, { r: r, c: c });
                };
                MapTelePortMdr.prototype.updateMap = function () {
                    if (!this._model.curMapData) {
                        return;
                    }
                    this.clearPt();
                    this._proxy.geTeleportList(this._model.curMapId);
                    this.showView(mod.MapViewType.TopBar);
                    var m = this._model.curMapData;
                    this._map.clean();
                    this._map.init(this._model.curMapId, m.sliceWidth, m.sliceHeight);
                    this._testMask.clean();
                    this._testMask.init(m.cellWidth, m.cellHeight, this._model.numCol, this._model.numRow);
                    this._camera.init(m.imageWidth, m.imageHeight, m.sliceWidth, m.sliceHeight);
                    this._camera.setFocus(1, 1, this._scale);
                    this.onResize(null);
                };
                MapTelePortMdr.prototype.updateTestMask = function () {
                    this._testMask.visible = this._model.isShowMask;
                };
                MapTelePortMdr.prototype.onTapSlice = function (e) {
                    var pt = this.getWorldPt(e.stageX, e.stageY);
                    var cellW = this._model.curMapData.cellWidth;
                    var cellH = this._model.curMapData.cellHeight;
                    var c = Math.floor(pt.x / cellW);
                    var r = Math.floor(pt.y / cellH);
                    Pool.release(pt);
                    this.sendNt(map.ON_XY_CHANGE, { r: r, c: c });
                    if (this._tapBeginIdx != this._tapEndIdx)
                        return;
                    if (this.isMoveMap)
                        return;
                    if (this._model.isBlock(c, r)) {
                        Alert.confirm("障碍点不能设置传送点");
                        return;
                    }
                    this.showView(mod.MapViewType.TeleportPanel, {
                        mapid: this._model.curMapId,
                        x: c,
                        y: r
                    });
                };
                MapTelePortMdr.prototype.drawTeleportPt = function (r, c, dir) {
                    var tp = new TeleportPt(r, c);
                    this._view.addChild(tp);
                    if (dir != 0)
                        tp.scaleX = -1;
                    this._teleportPts.push(tp);
                };
                MapTelePortMdr.prototype.onTouchBegin = function (e) {
                    if (!this._model.curMapData) {
                        return;
                    }
                    this._startX = this._camera.fx;
                    this._startY = this._camera.fy;
                    this._stageX = e.stageX;
                    this._stageY = e.stageY;
                    var point = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(point.x / this._model.curMapData.cellWidth);
                    var r = Math.floor(point.y / this._model.curMapData.cellHeight);
                    Pool.release(point);
                    this._tapBeginIdx = this._model.getIdx(r, c);
                    this._map.addEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                };
                MapTelePortMdr.prototype.onTouchEnd = function (e) {
                    if (!this._model.curMapData) {
                        return;
                    }
                    var point = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(point.x / this._model.curMapData.cellWidth);
                    var r = Math.floor(point.y / this._model.curMapData.cellHeight);
                    Pool.release(point);
                    this._tapEndIdx = this._model.getIdx(r, c);
                    this.endMove();
                };
                MapTelePortMdr.prototype.endMove = function () {
                    this._map.removeEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                };
                MapTelePortMdr.prototype.onTouchMove = function (e) {
                    if (!this._model.curMapData) {
                        return;
                    }
                    var s = this._scale;
                    //空格按下时，拖动地图
                    if (this.isMoveMap) {
                        var x1 = (this._stageX - e.stageX) / s + this._startX;
                        var y1 = (this._stageY - e.stageY) / s + this._startY;
                        this._camera.setFocus(x1, y1, s);
                        return;
                    }
                };
                MapTelePortMdr.prototype.updateViewPort = function (viewPort) {
                    this._view.x = -viewPort.x * this._scale;
                    this._view.y = -viewPort.y * this._scale;
                    if (this._testMask) {
                        this._testMask.updateView(viewPort);
                    }
                };
                MapTelePortMdr.prototype.updateTiles = function (sc, sr, ec, er) {
                    this._map.updateTiles(sc, sr, ec, er);
                };
                MapTelePortMdr.prototype.onResize = function (e) {
                    this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
                };
                MapTelePortMdr.prototype.onKeyUpdate = function (n) {
                    if (n.body == " ") {
                        if (this._lastState == this.isMoveMap) {
                            this.endMove();
                        }
                    }
                };
                Object.defineProperty(MapTelePortMdr.prototype, "isMoveMap", {
                    get: function () {
                        return KeyUtil.keyDown[" "];
                    },
                    enumerable: true,
                    configurable: true
                });
                MapTelePortMdr.prototype.getWorldPt = function (stageX, stageY, pt) {
                    pt = pt || Pool.alloc(Point);
                    pt.x = stageX / this._scale - this._view.x / this._scale;
                    pt.y = stageY / this._scale - this._view.y / this._scale;
                    return pt;
                };
                Object.defineProperty(MapTelePortMdr.prototype, "isEditableTeleportPt", {
                    get: function () {
                        return !this.isMoveMap && KeyUtil.keyDown["Shift"];
                    },
                    enumerable: true,
                    configurable: true
                });
                return MapTelePortMdr;
            }(MdrBase));
            map.MapTelePortMdr = MapTelePortMdr;
            __reflect(MapTelePortMdr.prototype, "tool.mod.map.MapTelePortMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=MapTeleportMdr.js.map