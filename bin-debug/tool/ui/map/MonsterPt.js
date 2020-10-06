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
    var ui;
    (function (ui) {
        var map;
        (function (map) {
            var DEL_MONSTER_PT = tool.mod.map.DEL_MONSTER_PT;
            var ProxyType = tool.mod.ProxyType;
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var PointUtil = tool.utils.PointUtil;
            var Pool = base.pool.Pool;
            var ResUrlC1 = tool.mod.editor.ResUrlC1;
            var UIAnim = tool.comp.UIAnim;
            var GDirUtil = tool.utils.GDirUtil;
            var MonsterPt = (function (_super) {
                __extends(MonsterPt, _super);
                function MonsterPt(data) {
                    var _this = _super.call(this) || this;
                    _this._birthIdx = -1;
                    _this._dir = 1;
                    _this.skinName = "skins.map.MonsterItemSkin";
                    _this._proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Map);
                    _this._model = _this._proxy.getData();
                    _this._scene_proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Scene);
                    _this._scene_model = _this._scene_proxy.getData();
                    _this._monster = Pool.alloc(UIAnim);
                    _this._monster.touchEnabled = false;
                    _this.addChild(_this._monster);
                    if (typeof data == "number" || typeof data == "string") {
                        if (_this._model.monstersConfig)
                            _this.setData(_this._model.monstersConfig[data]);
                        else {
                            var url = ResUrlC1 + "/assets/data/monsterconf.json";
                            RES.getResByUrl(url, function (cfg) {
                                _this.setData(cfg[data]);
                            }, _this, RES.ResourceItem.TYPE_JSON);
                        }
                    }
                    else {
                        _this.setData(data);
                    }
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                Object.defineProperty(MonsterPt.prototype, "dir", {
                    get: function () {
                        return this._dir;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonsterPt.prototype, "c", {
                    get: function () {
                        return this._c;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonsterPt.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonsterPt.prototype, "birthIdx", {
                    get: function () {
                        return this._birthIdx;
                    },
                    enumerable: true,
                    configurable: true
                });
                MonsterPt.prototype.setData = function (data) {
                    this._configData = data;
                    this.idx = this._configData ? this._configData.id : data;
                    this.monsterName = this._configData ? this._configData.name : "???";
                    this.lab_idx.text = this.idx + "";
                    this.lab_name.text = this.monsterName;
                    this.loadModel();
                };
                MonsterPt.prototype.onAddToStage = function () {
                    this.lab_idx.text = this.idx + "";
                    this.lab_name.text = this.monsterName;
                    this.autoCreate.visible = false;
                    this.lbl_create.visible = false;
                    this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this.btnRotate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
                };
                MonsterPt.prototype.onRemoveFromStage = function () {
                    this.btnDel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this.btnRotate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
                };
                MonsterPt.prototype.updatePos = function (c, r) {
                    if (r != undefined) {
                        this._r = r;
                    }
                    if (c != undefined) {
                        this._c = c;
                    }
                    this.x = (this._c + 0.5) * this._model.curMapData.cellWidth;
                    this.y = (this._r + 0.5) * this._model.curMapData.cellWidth;
                    this.updateBirthIdx();
                };
                MonsterPt.prototype.updateBirthIdx = function () {
                    if (this._scene_model.sceneInfo.birthPts.length <= 0) {
                        this.setBirthIdx(-1);
                        return;
                    }
                    var birthPt = this._scene_model.sceneInfo.birthPts[0];
                    var minIdx = 0;
                    var minDis = PointUtil.distanceSquare(this._c, this._r, birthPt.x, birthPt.y);
                    for (var i = 1, l = this._scene_model.sceneInfo.birthPts.length; i < l; ++i) {
                        birthPt = this._scene_model.sceneInfo.birthPts[i];
                        var dis = PointUtil.distanceSquare(this._c, this._r, birthPt.x, birthPt.y);
                        if (dis < minDis) {
                            minDis = dis;
                            minIdx = i;
                        }
                    }
                    this.setBirthIdx(minIdx);
                };
                MonsterPt.prototype.setBirthIdx = function (idx) {
                    this._birthIdx = idx;
                    this.lab_birthPt.text = idx + 1 + "";
                };
                MonsterPt.prototype.onDel = function (e) {
                    e.stopPropagation();
                    if (this.parent) {
                        this.parent.dispatchEventWith(DEL_MONSTER_PT, false, this);
                    }
                    this.dispose();
                };
                MonsterPt.prototype.dispose = function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                    Pool.release(this._monster);
                    this._monster = null;
                };
                MonsterPt.prototype.onRotate = function () {
                    this._dir++;
                    if (this._dir > 8)
                        this._dir = 1;
                    this._scene_model.change = true;
                    this.loadModel();
                };
                MonsterPt.prototype.updateDir = function (dir) {
                    this._dir = dir;
                    this.loadModel();
                };
                MonsterPt.prototype.loadModel = function () {
                    if (this._configData) {
                        var dir = GDirUtil.getMir(this._dir);
                        this._monster.scaleX = dir != this._dir ? -1 : 1;
                        var url = ResUrlC1 + "/assets/anim/creature/" + this._configData.modelId + ("/std_" + dir + ".png");
                        this._monster.setSource(url, 0);
                    }
                };
                return MonsterPt;
            }(eui.Component));
            map.MonsterPt = MonsterPt;
            __reflect(MonsterPt.prototype, "tool.ui.map.MonsterPt");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=MonsterPt.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
