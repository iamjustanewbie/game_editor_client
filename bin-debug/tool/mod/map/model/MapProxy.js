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
            var MsgId = tool.mod.editor.MsgId;
            var EditorPB = tool.mod.editor.EditorPB;
            var MapProxy = (function (_super) {
                __extends(MapProxy, _super);
                function MapProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MapProxy.prototype.initialize = function () {
                    this._model = new map.MapModel();
                    this.onMsg(MsgId.getMapList, this.onGetMapList, this);
                    this.onMsg(MsgId.getMapInfo, this.onGetMapInfo, this);
                    this.onMsg(MsgId.setMapInfo, this.onMapInfoUpdate, this);
                    this.onMsg(MsgId.getMonsterList, this.onGetMonsterList, this);
                    this.onMsg(MsgId.getTeleportList, this.onGetTeleportList, this);
                    this.onMsg(MsgId.cutMapList, this.onGetCutMapList, this);
                };
                MapProxy.prototype.getData = function () {
                    return this._model;
                };
                MapProxy.prototype.onGetMapList = function (n) {
                    this._model.mapList = n.body;
                    if (this._model.mapList.length > 0) {
                        this._model.curMapId = this._model.mapList[0];
                        this.sendNt(map.ON_MAP_LIST);
                    }
                };
                MapProxy.prototype.onGetMapInfo = function (n) {
                    this._model.setCurMapData(n.body);
                    this.sendNt(map.ON_MAP_CHANGE);
                };
                MapProxy.prototype.onMapInfoUpdate = function (n) {
                    var msg = n.body;
                    if (this._model.curMapId != msg.mapId) {
                        return;
                    }
                    var curStatus = this._model.curMapData.data[msg.idx];
                    if (curStatus == msg.status) {
                        return;
                    }
                    this._model.curMapData.data[msg.idx] = msg.status;
                    var rc = this._model.getRC(msg.idx);
                    this.sendNt(map.ON_SLICE_UPDATE, { r: rc.r, c: rc.c, status: msg.status });
                };
                MapProxy.prototype.setData = function (row, col, status) {
                    if (status == undefined) {
                        console.error("setData error!", status);
                        return;
                    }
                    var curData = this._model.curMapData;
                    var idx = this._model.getIdx(row, col);
                    curData.data[idx] = status;
                    this.sendMsg(MsgId.setMapInfo, { idx: idx, status: status, "mapId": this._model.curMapId });
                };
                MapProxy.prototype.getMapInfo = function (mapId) {
                    this.sendMsg(MsgId.getMapInfo, { mapId: mapId });
                };
                MapProxy.prototype.getMapList = function () {
                    this.sendMsg(MsgId.getMapList);
                };
                MapProxy.prototype.getCutMapList = function () {
                    this.sendMsg(MsgId.cutMapList);
                };
                MapProxy.prototype.cutMap = function (name, width, height, rate) {
                    this.sendMsg(MsgId.cutMap, {
                        name: name, width: width, height: height, rate: rate
                    });
                };
                MapProxy.prototype.getMonsterList = function (mapId) {
                    this.sendMsg(MsgId.getMonsterList, { mapId: mapId });
                };
                MapProxy.prototype.geTeleportList = function (mapId) {
                    this.sendMsg(MsgId.getTeleportList, { mapId: mapId });
                };
                MapProxy.prototype.onGetMonsterList = function (n) {
                    this.sendNt(map.ON_GET_MONSTERS);
                };
                MapProxy.prototype.onGetTeleportList = function (n) {
                    // let list: TeleportPtData[] = n.body;
                    // this._model.telportPts = {};
                    // for (const key in list) {
                    //     let data = list[key];
                    //     this._model.setTeleportPt(data);
                    // }
                    // this.sendNt(TELEPORT_CHANGE)
                };
                MapProxy.prototype.publishMap = function () {
                    var mapId = this._model.curMapId;
                    this.sendMsg(MsgId.publishMap, { mapId: mapId });
                };
                MapProxy.prototype.publishTeleport = function () {
                    var mapId = this._model.curMapId;
                    this.sendMsg(MsgId.publishTeleport, { mapId: mapId, list: this._model.telportPts });
                };
                MapProxy.prototype.publishMonster = function () {
                    // let mapId: number = this._model.curMapId;
                    // let monster = [];
                    // let pts = [];
                    // for (let b of this._model.birthPts) {
                    //     pts.push({ x: b.x, y: b.y });
                    //     if (b.monsters && b.monsters.length > 0) {
                    //         monster.push({ pts: pts, monsters: b.monsters });
                    //         pts = [];
                    //     }
                    // }
                    // if (pts.length > 0 && monster.length > 1) {
                    //     monster[0].pts = pts.concat(monster[0].pts);
                    // }
                    // this.sendMsg(MsgId.publishMonster, { mapId: mapId, monster: monster });
                };
                MapProxy.prototype.onGetCutMapList = function (n) {
                    this._model.cutMapList = n.body;
                    this.sendNt(map.CUT_MAP_LIST);
                };
                return MapProxy;
            }(EditorPB));
            map.MapProxy = MapProxy;
            __reflect(MapProxy.prototype, "tool.mod.map.MapProxy");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
