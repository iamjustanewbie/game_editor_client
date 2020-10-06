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
            var BirthPt = tool.ui.map.BirthPt;
            var MonsterPt = tool.ui.map.MonsterPt;
            var NPCPt = tool.ui.map.NPCPt;
            var SceneMap = tool.mod.map.SceneMap;
            var TestMask = tool.mod.map.TestMask;
            var SceneCamera = tool.mod.map.SceneCamera;
            var TeleportPt = tool.ui.map.TeleportPt;
            var SpecificPt = tool.ui.map.SpecificPt;
            var SceneEditorMdr = (function (_super) {
                __extends(SceneEditorMdr, _super);
                function SceneEditorMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", Sprite);
                    _this._npcPts = [];
                    _this._teleportPts = [];
                    _this._specificPts = [];
                    _this._scale = 1;
                    return _this;
                }
                SceneEditorMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(mod.ProxyType.Scene);
                    this._model = this._proxy.getData();
                    this._map_proxy = this.retProxy(mod.ProxyType.Map);
                    this._map_model = this._map_proxy.getData();
                    this._camera = new SceneCamera(this);
                    this._map = this._view.addChild(new SceneMap());
                    this._testMask = this._view.addChild(new TestMask());
                    this._pts = [];
                    this._monsterPts = [];
                    this._ptLine = new Shape();
                    this._view.addChild(this._ptLine);
                    this._map_model.curMapData = null;
                    this._model.curSceneId = null;
                };
                SceneEditorMdr.prototype.addListeners = function () {
                    this.onNt(mod.ON_KEY_UPDATE, this.onKeyUpdate, this);
                    this.onNt(map.ON_MAP_SCALE_CHANGE, this.onScaleChange, this);
                    this.onNt(map.ON_SHOW_LINE_CHANGE, this.updateTestMask, this);
                    // this.onNt(PUBLISH_BIRTH_PT, this.onPublish, this);
                    // this.onNt(ON_GET_MONSTERS, this.updateBirthPt, this);
                    this.onNt(map.ON_MAP_CHANGE, this.updateMap, this);
                    this.onNt(map.SCENE_LIST, this.onGetSceneList, this);
                    this.onNt(map.NEW_SCENE, this.onNewScene, this);
                    this.onNt(map.BEFORE_SAVE, this.saveMonster, this);
                    this.onNt(map.TELEPORT_CHANGE, this.onTeleportChange, this);
                    this.onNt(map.CHANGE_SPECIFIC_PT, this.onSpecificChange, this);
                    this._view.addEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
                    this._view.addEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
                    this._view.addEventListener(map.DEL_BIRTH_PT, this.onDelBirthPt, this);
                    this._view.addEventListener(map.DEL_MONSTER_PT, this.onDelMonsterPt, this);
                    this._view.addEventListener(map.DEL_SPECIFIC_PT, this.onDelSpecificPt, this);
                    this._view.addEventListener(map.DEL_NPC_PT, this.onDelNPCPt, this);
                    gso.gameStage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    gso.gameStage.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    gso.gameStage.addEventListener(Event.RESIZE, this.onResize, this);
                };
                SceneEditorMdr.prototype.removeListeners = function () {
                    this._view.removeEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
                    this._view.removeEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
                    this._view.removeEventListener(map.DEL_BIRTH_PT, this.onDelBirthPt, this);
                    this._view.removeEventListener(map.DEL_MONSTER_PT, this.onDelMonsterPt, this);
                    this._view.removeEventListener(map.DEL_SPECIFIC_PT, this.onDelSpecificPt, this);
                    this._view.removeEventListener(map.DEL_NPC_PT, this.onDelNPCPt, this);
                    gso.gameStage.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    gso.gameStage.removeEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    gso.gameStage.removeEventListener(Event.RESIZE, this.onResize, this);
                };
                SceneEditorMdr.prototype.onDelMonsterPt = function (e) {
                    var monster = e.data;
                    var idx = this._monsterPts.indexOf(monster);
                    if (idx > -1) {
                        this._monsterPts.splice(idx, 1);
                    }
                };
                SceneEditorMdr.prototype.onDelSpecificPt = function (e) {
                    var id = e.data;
                    delete this._model.sceneInfo.points[id];
                    this._model.change = true;
                    this.onSpecificChange();
                };
                SceneEditorMdr.prototype.onDelNPCPt = function (e) {
                    var npc = e.data;
                    var idx = this._npcPts.indexOf(npc);
                    if (idx > -1) {
                        this._npcPts.splice(idx, 1);
                    }
                    this._model.change = true;
                };
                SceneEditorMdr.prototype.onDelBirthPt = function (e) {
                    var idx = e.data;
                    this._model.sceneInfo.birthPts.splice(idx, 1);
                    this._model.change = true;
                    this._pts.splice(idx, 1);
                    this.updatePtsIdx();
                };
                SceneEditorMdr.prototype.updatePtsIdx = function () {
                    this._ptLine.graphics.clear();
                    for (var i = 0, l = this._pts.length; i < l; ++i) {
                        this._pts[i].updateLab(i);
                        if (i > 0) {
                            this.drawPtLine(i);
                        }
                    }
                    this.updateMonster();
                };
                SceneEditorMdr.prototype.updateMonster = function () {
                    for (var _i = 0, _a = this._monsterPts; _i < _a.length; _i++) {
                        var m = _a[_i];
                        m.updateBirthIdx();
                    }
                };
                SceneEditorMdr.prototype.onPublish = function () {
                    // this.saveMonster();
                    // this._proxy.publishMonster();
                };
                SceneEditorMdr.prototype.saveMonster = function () {
                    for (var _i = 0, _a = this._model.sceneInfo.birthPts; _i < _a.length; _i++) {
                        var b = _a[_i];
                        b.monsters = [];
                    }
                    for (var _b = 0, _c = this._monsterPts; _b < _c.length; _b++) {
                        var m = _c[_b];
                        if (m.birthIdx >= 0) {
                            var monsters = this._model.sceneInfo.birthPts[m.birthIdx].monsters;
                            monsters.push(new map.MonsterData(m.c, m.r, m.idx, m.dir));
                        }
                    }
                    this._model.sceneInfo.npcs = [];
                    for (var _d = 0, _e = this._npcPts; _d < _e.length; _d++) {
                        var m = _e[_d];
                        this._model.sceneInfo.npcs.push({
                            x: m.c,
                            y: m.r,
                            dir: m.dir,
                            id: parseInt(m.idx),
                            autoCreate: m.autoCreate.selected
                        });
                    }
                };
                SceneEditorMdr.prototype.onScaleChange = function (n) {
                    if (n) {
                        var s = n.body;
                        s /= 100;
                        this._scale = s;
                    }
                    this._view.scaleX = this._view.scaleY = this._scale;
                    this._camera.setFocus(this._camera.fx, this._camera.fy, this._scale);
                };
                SceneEditorMdr.prototype.onShow = function () {
                    this._proxy.getSceneList();
                };
                SceneEditorMdr.prototype.onTeleportChange = function () {
                    this.clearPt();
                    this.showTeleport();
                };
                SceneEditorMdr.prototype.onSpecificChange = function () {
                    this.clearSpecificPt();
                    this.showSpecific();
                };
                SceneEditorMdr.prototype.clearPt = function () {
                    for (var _i = 0, _a = this._teleportPts; _i < _a.length; _i++) {
                        var tp = _a[_i];
                        tp.dispose();
                    }
                    this._teleportPts = [];
                };
                SceneEditorMdr.prototype.clearSpecificPt = function () {
                    for (var _i = 0, _a = this._specificPts; _i < _a.length; _i++) {
                        var tp = _a[_i];
                        tp.dispose();
                    }
                    this._specificPts = [];
                };
                SceneEditorMdr.prototype.showTeleport = function () {
                    if (!this._model.sceneInfo)
                        return;
                    for (var _i = 0, _a = this._model.sceneInfo.teleports; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        this.drawTeleportPt(pt.y, pt.x, pt.dir);
                    }
                };
                SceneEditorMdr.prototype.showSpecific = function () {
                    if (!this._model.sceneInfo)
                        return;
                    if (!this._model.sceneInfo.points)
                        this._model.sceneInfo.points = {};
                    for (var id in this._model.sceneInfo.points) {
                        var p = this._model.sceneInfo.points[id];
                        this.drawSpecificPt(p.y, p.x, id);
                    }
                };
                SceneEditorMdr.prototype.drawTeleportPt = function (r, c, dir) {
                    var tp = new TeleportPt(r, c);
                    this._view.addChild(tp);
                    if (dir != 0)
                        tp.scaleX = -1;
                    this._teleportPts.push(tp);
                };
                SceneEditorMdr.prototype.drawSpecificPt = function (r, c, id) {
                    var tp = new SpecificPt(r, c, id);
                    this._view.addChild(tp);
                    this._specificPts.push(tp);
                };
                SceneEditorMdr.prototype.onGetSceneList = function () {
                    this.showView(mod.MapViewType.SceneTopBar);
                };
                SceneEditorMdr.prototype.onNewScene = function () {
                    this._map.clean();
                    this._testMask.clean();
                    facade.hideView(mod.ModName.Map, mod.MapViewType.MonsterList);
                    facade.hideView(mod.ModName.Map, mod.MapViewType.ListSwitch);
                    facade.hideView(mod.ModName.Map, mod.MapViewType.NPCList);
                };
                SceneEditorMdr.prototype.updateBirthPt = function () {
                    if (!this._model.sceneInfo.birthPts)
                        this._model.sceneInfo.birthPts = [];
                    for (var i = 0, l = this._model.sceneInfo.birthPts.length; i < l; ++i) {
                        var pt = this._model.sceneInfo.birthPts[i];
                        this.drawBirthPt(pt.y, pt.x, i);
                        for (var _i = 0, _a = pt.monsters; _i < _a.length; _i++) {
                            var m = _a[_i];
                            this.drawMonsterPt(m.y, m.x, m.idx, m.dir);
                        }
                    }
                };
                SceneEditorMdr.prototype.clearBirthPt = function () {
                    for (var _i = 0, _a = this._pts; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        pt.dispose();
                    }
                    for (var _b = 0, _c = this._monsterPts; _b < _c.length; _b++) {
                        var m = _c[_b];
                        m.dispose();
                    }
                    this._pts.length = 0;
                    this._monsterPts.length = 0;
                    this._ptLine.graphics.clear();
                };
                SceneEditorMdr.prototype.clearNPCPt = function () {
                    for (var _i = 0, _a = this._npcPts; _i < _a.length; _i++) {
                        var m = _a[_i];
                        m.dispose();
                    }
                    this._npcPts.length = 0;
                };
                SceneEditorMdr.prototype.updateNPCPt = function () {
                    if (!this._model.sceneInfo.npcs)
                        this._model.sceneInfo.npcs = [];
                    for (var i = 0, l = this._model.sceneInfo.npcs.length; i < l; ++i) {
                        var pt = this._model.sceneInfo.npcs[i];
                        this.drawNPCPt(pt.y, pt.x, pt.id, pt.dir, pt.autoCreate);
                    }
                };
                SceneEditorMdr.prototype.onHide = function () {
                    facade.hideView(mod.ModName.Map, mod.MapViewType.SceneTopBar);
                    facade.hideView(mod.ModName.Map, mod.MapViewType.MonsterList);
                    facade.hideView(mod.ModName.Map, mod.MapViewType.ListSwitch);
                    facade.hideView(mod.ModName.Map, mod.MapViewType.NPCList);
                };
                SceneEditorMdr.prototype.updateXY = function (e) {
                    var model = this.retProxy(mod.ProxyType.Map).getData();
                    var c = Math.floor(e.localX / model.curMapData.cellWidth);
                    var r = Math.floor(e.localY / model.curMapData.cellHeight);
                    this.sendNt(map.ON_XY_CHANGE, { r: r, c: c });
                };
                SceneEditorMdr.prototype.updateMap = function () {
                    var model = this.retProxy(mod.ProxyType.Map).getData();
                    if (!model.curMapData) {
                        return;
                    }
                    var m = model.curMapData;
                    map.AStar.initialize(model.numCol, model.numRow);
                    map.AStar.ckIsBlock = model.ckBlock;
                    this._map.clean();
                    this._map.init(model.curMapId, m.sliceWidth, m.sliceHeight);
                    this._testMask.clean();
                    this._testMask.init(m.cellWidth, m.cellHeight, model.numCol, model.numRow);
                    this._camera.init(m.imageWidth, m.imageHeight, m.sliceWidth, m.sliceHeight);
                    this._camera.setFocus(1, 1, this._scale);
                    this.onResize(null);
                    this.clearPt();
                    this.showTeleport();
                    this.showView(mod.MapViewType.ListSwitch);
                    this.clearBirthPt();
                    this.updateBirthPt();
                    this.onSpecificChange();
                    this.clearNPCPt();
                    this.updateNPCPt();
                };
                SceneEditorMdr.prototype.updateTestMask = function () {
                    var model = this.retProxy(mod.ProxyType.Map).getData();
                    this._testMask.visible = model.isShowMask;
                };
                SceneEditorMdr.prototype.onTapSlice = function (e) {
                    var pt = this.getWorldPt(e.stageX, e.stageY);
                    var cellW = this._map_model.curMapData.cellWidth;
                    var cellH = this._map_model.curMapData.cellHeight;
                    var c = Math.floor(pt.x / cellW);
                    var r = Math.floor(pt.y / cellH);
                    Pool.release(pt);
                    this.sendNt(map.ON_XY_CHANGE, { r: r, c: c });
                    if (this._tapBeginIdx != this._tapEndIdx)
                        return;
                    if (this.isEditableMonsterPt && !this.getMonsterPt(r, c) && this._map_model.curDrawMonster != null) {
                        this.drawMonsterPt(r, c, this._map_model.curDrawMonster);
                        this._model.change = true;
                    }
                    else if (this.isEditableMonsterPt && !this.getNPCPt(r, c) && this._map_model.curDrawNPC != null) {
                        this.drawNPCPt(r, c, this._map_model.curDrawNPC);
                        this._model.change = true;
                    }
                    else if (this.isEditableBirthPt && !this.getBirthPt(r, c)) {
                        var data = new map.BirthPtData(c, r);
                        this._model.sceneInfo.birthPts.push(data);
                        this.drawBirthPt(r, c, this._model.sceneInfo.birthPts.length - 1);
                        this._model.change = true;
                        this.updateMonster();
                    }
                    else if (this.isEditableTeleportPt) {
                        this.showView(mod.MapViewType.TeleportPanel, {
                            mapid: this._model.sceneInfo.mapid,
                            x: c,
                            y: r,
                        });
                    }
                    else if (this.isEditableSpecificPt) {
                        this.showView(mod.MapViewType.SpecificPointPanel, {
                            mapid: this._model.sceneInfo.mapid,
                            x: c,
                            y: r
                        });
                    }
                };
                SceneEditorMdr.prototype.drawMonsterPt = function (r, c, idx, dir) {
                    if (dir === void 0) { dir = 1; }
                    var monster = new MonsterPt(idx);
                    monster.updatePos(c, r);
                    monster.updateDir(dir);
                    this._monsterPts.push(monster);
                    this._view.addChild(monster);
                };
                SceneEditorMdr.prototype.drawNPCPt = function (r, c, idx, dir, auto) {
                    if (dir === void 0) { dir = 4; }
                    if (auto === void 0) { auto = true; }
                    var NPC = new NPCPt(idx, this);
                    NPC.updatePos(c, r);
                    NPC.updateDir(dir);
                    NPC.updateAutoCreate(auto);
                    this._npcPts.push(NPC);
                    this._view.addChild(NPC);
                };
                SceneEditorMdr.prototype.drawBirthPt = function (r, c, i) {
                    var birthPt = new BirthPt(r, c, i);
                    this._view.addChild(birthPt);
                    this._pts.push(birthPt);
                    if (i > 0) {
                        this.drawPtLine(i);
                    }
                };
                SceneEditorMdr.prototype.drawPtLine = function (idx) {
                    if (idx < 1) {
                        return;
                    }
                    var cellW = this._map_model.curMapData.cellWidth;
                    var cellH = this._map_model.curMapData.cellHeight;
                    var lastPt = this._model.sceneInfo.birthPts[idx - 1];
                    var curPt = this._model.sceneInfo.birthPts[idx];
                    var path = map.AStar.findPath(lastPt.x, lastPt.y, curPt.x, curPt.y);
                    path = map.AStar.floyd(path);
                    var color = path.length > 2 ? 0xff0000 : 0xffff00;
                    if (path.length > 2) {
                        Alert.confirm(idx + "与" + (idx + 1) + "之间有障碍点或不能直线行走");
                    }
                    this._ptLine.graphics.lineStyle(4, color);
                    this._ptLine.graphics.moveTo(cellW * (0.5 + lastPt.x), cellH * (0.5 + lastPt.y));
                    this._ptLine.graphics.lineTo(cellW * (0.5 + curPt.x), cellH * (0.5 + curPt.y));
                    this._ptLine.graphics.endFill();
                };
                SceneEditorMdr.prototype.onTouchBegin = function (e) {
                    if (!this._map_model.curMapData) {
                        return;
                    }
                    this._lastState = this.isEditableBirthPt;
                    this._startX = this._camera.fx;
                    this._startY = this._camera.fy;
                    this._stageX = e.stageX;
                    this._stageY = e.stageY;
                    var point = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(point.x / this._map_model.curMapData.cellWidth);
                    var r = Math.floor(point.y / this._map_model.curMapData.cellHeight);
                    Pool.release(point);
                    this._tapBeginIdx = this._map_model.getIdx(r, c);
                    var pt = this.getBirthPt(r, c);
                    if (pt) {
                        this._movePt = pt;
                    }
                    var monster = this.getMonsterPt(r, c);
                    if (monster) {
                        this._moveMonster = monster;
                    }
                    var tele = this.getTeleportPt(r, c);
                    if (tele) {
                        this._moveTeleport = tele;
                    }
                    this._map.addEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                };
                SceneEditorMdr.prototype.onTouchEnd = function (e) {
                    if (!this._map_model.curMapData) {
                        return;
                    }
                    var point = this.getWorldPt(e.stageX, e.stageY);
                    var c = Math.floor(point.x / this._map_model.curMapData.cellWidth);
                    var r = Math.floor(point.y / this._map_model.curMapData.cellHeight);
                    Pool.release(point);
                    this._tapEndIdx = this._map_model.getIdx(r, c);
                    this.endMove();
                };
                SceneEditorMdr.prototype.endMove = function () {
                    this._movePt = null;
                    this._moveMonster = null;
                    this._moveTeleport = null;
                    this._map.removeEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                };
                SceneEditorMdr.prototype.onTouchMove = function (e) {
                    if (!this._map_model.curMapData) {
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
                    var pt = this.getWorldPt(e.stageX, e.stageY);
                    var cellW = this._map_model.curMapData.cellWidth;
                    var cellH = this._map_model.curMapData.cellHeight;
                    var c = Math.floor(pt.x / cellW);
                    var r = Math.floor(pt.y / cellH);
                    Pool.release(pt);
                    var isBlock = this._map_model.isBlock(c, r);
                    if (!isBlock && this._moveMonster && !this.getMonsterPt(r, c)) {
                        this._moveMonster.updatePos(c, r);
                        this._model.change = true;
                        return;
                    }
                    if (!isBlock && !this._moveMonster && this._movePt && !this.getBirthPt(r, c)) {
                        for (var _i = 0, _a = this._model.sceneInfo.birthPts; _i < _a.length; _i++) {
                            var birth = _a[_i];
                            if (birth.x == this._movePt.c && birth.y == this._movePt.r) {
                                birth.x = c;
                                birth.y = r;
                                this._movePt.updatePos(c, r);
                                this._model.change = true;
                                break;
                            }
                        }
                        this.updatePtsIdx();
                    }
                    if (!isBlock && !this._moveMonster && !this._movePt && this._moveTeleport && !this.getTeleportPt(r, c)) {
                        for (var _b = 0, _c = this._model.sceneInfo.teleports; _b < _c.length; _b++) {
                            var t = _c[_b];
                            if (t.x == this._moveTeleport.c && t.y == this._moveTeleport.r) {
                                t.x = c;
                                t.y = r;
                                this._moveTeleport.updatePos(c, r);
                                this._model.change = true;
                                break;
                            }
                        }
                    }
                };
                SceneEditorMdr.prototype.updateViewPort = function (viewPort) {
                    this._view.x = -viewPort.x * this._scale;
                    this._view.y = -viewPort.y * this._scale;
                    if (this._testMask) {
                        this._testMask.updateView(viewPort);
                    }
                };
                SceneEditorMdr.prototype.updateTiles = function (sc, sr, ec, er) {
                    this._map.updateTiles(sc, sr, ec, er);
                };
                SceneEditorMdr.prototype.onResize = function (e) {
                    this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
                };
                SceneEditorMdr.prototype.onKeyUpdate = function (n) {
                    if (n.body == " ") {
                        if (this._lastState == this.isMoveMap) {
                            this.endMove();
                        }
                    }
                };
                SceneEditorMdr.prototype.getBirthPt = function (r, c) {
                    for (var _i = 0, _a = this._pts; _i < _a.length; _i++) {
                        var p = _a[_i];
                        if (p.c == c && p.r == r) {
                            return p;
                        }
                    }
                    return null;
                };
                SceneEditorMdr.prototype.getMonsterPt = function (r, c) {
                    for (var _i = 0, _a = this._monsterPts; _i < _a.length; _i++) {
                        var m = _a[_i];
                        if (m.c == c && m.r == r) {
                            return m;
                        }
                    }
                    return null;
                };
                SceneEditorMdr.prototype.getNPCPt = function (r, c) {
                    for (var _i = 0, _a = this._npcPts; _i < _a.length; _i++) {
                        var m = _a[_i];
                        if (m.c == c && m.r == r) {
                            return m;
                        }
                    }
                    return null;
                };
                SceneEditorMdr.prototype.getTeleportPt = function (r, c) {
                    for (var _i = 0, _a = this._teleportPts; _i < _a.length; _i++) {
                        var m = _a[_i];
                        if (m.c == c && m.r == r) {
                            return m;
                        }
                    }
                    return null;
                };
                Object.defineProperty(SceneEditorMdr.prototype, "isEditableBirthPt", {
                    get: function () {
                        return !this.isMoveMap && KeyUtil.keyDown["Control"];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneEditorMdr.prototype, "isEditableMonsterPt", {
                    get: function () {
                        return !this.isMoveMap && KeyUtil.keyDown["Shift"];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneEditorMdr.prototype, "isEditableTeleportPt", {
                    get: function () {
                        return !this.isMoveMap && KeyUtil.keyDown["`"];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneEditorMdr.prototype, "isEditableSpecificPt", {
                    get: function () {
                        return !this.isMoveMap && KeyUtil.keyDown["1"];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneEditorMdr.prototype, "isMoveMap", {
                    get: function () {
                        return KeyUtil.keyDown[" "];
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneEditorMdr.prototype.getWorldPt = function (stageX, stageY, pt) {
                    pt = pt || Pool.alloc(Point);
                    pt.x = stageX / this._scale - this._view.x / this._scale;
                    pt.y = stageY / this._scale - this._view.y / this._scale;
                    return pt;
                };
                return SceneEditorMdr;
            }(MdrBase));
            map.SceneEditorMdr = SceneEditorMdr;
            __reflect(SceneEditorMdr.prototype, "tool.mod.map.SceneEditorMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=SceneEditorMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
