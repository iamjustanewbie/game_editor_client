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
            var EditorPB = tool.mod.editor.EditorPB;
            var MsgId = tool.mod.editor.MsgId;
            var Alert = tool.utils.Alert;
            var SceneProxy = (function (_super) {
                __extends(SceneProxy, _super);
                function SceneProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SceneProxy.prototype.getData = function () {
                    return this._model;
                };
                SceneProxy.prototype.initialize = function () {
                    this._model = new map.SceneModel();
                    this.onMsg(MsgId.getSceneInfo, this.onSceneInfo, this);
                    this.onMsg(MsgId.getSceneList, this.onSceneList, this);
                    this.onMsg(MsgId.saveInfo, this.onSaveInfo, this);
                };
                SceneProxy.prototype.getSceneInfo = function (id) {
                    this.sendMsg(MsgId.getSceneInfo, { id: id });
                };
                SceneProxy.prototype.getSceneList = function () {
                    this.sendMsg(MsgId.getSceneList);
                };
                SceneProxy.prototype.saveInfo = function () {
                    var id = this._model.curSceneId;
                    var info = this._model.sceneInfo;
                    this.sendNt(map.BEFORE_SAVE);
                    this.sendMsg(MsgId.saveInfo, { id: id, info: info });
                };
                SceneProxy.prototype.newSceneInfo = function (mapid) {
                    this._model.sceneInfo = {
                        mapid: mapid,
                        teleports: [],
                        birthPts: [],
                        npcs: [],
                        points: {},
                    };
                    this._model.change = true;
                };
                SceneProxy.prototype.clearSceneInfo = function () {
                    this._model.sceneInfo = null;
                    this._model.change = false;
                };
                SceneProxy.prototype.getTeleportPt = function (x, y) {
                    if (!this._model.sceneInfo)
                        return;
                    else {
                        for (var _i = 0, _a = this._model.sceneInfo.teleports; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (x == info.x && y == info.y)
                                return info;
                        }
                    }
                };
                SceneProxy.prototype.getSpecificPt = function (x, y) {
                    if (!this._model.sceneInfo)
                        return;
                    else {
                        for (var id in this._model.sceneInfo.points) {
                            var info = this._model.sceneInfo.points[id];
                            if (x == info.x && y == info.y)
                                return info;
                        }
                    }
                };
                SceneProxy.prototype.setTeleportPt = function (data) {
                    for (var i = 0; i < this._model.sceneInfo.teleports.length; i++) {
                        var info = this._model.sceneInfo.teleports[i];
                        if (data.x == info.x && data.y == info.y) {
                            this._model.sceneInfo.teleports[i] = data;
                            this._model.change = true;
                            return;
                        }
                    }
                    this._model.sceneInfo.teleports.push(data);
                    this._model.change = true;
                };
                SceneProxy.prototype.delTeleportPt = function (x, y) {
                    for (var i = 0; i < this._model.sceneInfo.teleports.length; i++) {
                        var info = this._model.sceneInfo.teleports[i];
                        if (x == info.x && y == info.y) {
                            this._model.sceneInfo.teleports.splice(i, 1);
                            this._model.change = true;
                            return;
                        }
                    }
                };
                SceneProxy.prototype.publish = function () {
                    if (this._model.change) {
                        Alert.confirm('先保存再发布');
                        return;
                    }
                    this.sendMsg(MsgId.publishScene);
                };
                SceneProxy.prototype.onSceneInfo = function (n) {
                    this._model.change = false;
                    var info = n.body;
                    this._model.sceneInfo = info;
                    this.sendNt(map.SCENE_INFO, info);
                };
                SceneProxy.prototype.onSceneList = function (n) {
                    this._model.sceneList = n.body;
                    this.sendNt(map.SCENE_LIST);
                };
                SceneProxy.prototype.onSaveInfo = function () {
                    this._model.change = false;
                    this.getSceneList();
                    Alert.confirm('保存成功');
                };
                return SceneProxy;
            }(EditorPB));
            map.SceneProxy = SceneProxy;
            __reflect(SceneProxy.prototype, "tool.mod.map.SceneProxy");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
