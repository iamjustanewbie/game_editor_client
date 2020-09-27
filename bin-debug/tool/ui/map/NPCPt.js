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
            var DEL_NPC_PT = tool.mod.map.DEL_NPC_PT;
            var ProxyType = tool.mod.ProxyType;
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var Pool = base.pool.Pool;
            var ResUrlC1 = tool.mod.editor.ResUrlC1;
            var UIAnim = tool.comp.UIAnim;
            var GDirUtil = tool.utils.GDirUtil;
            var NPCPt = (function (_super) {
                __extends(NPCPt, _super);
                function NPCPt(data, mdr) {
                    var _this = _super.call(this) || this;
                    _this._dir = 4;
                    _this.skinName = "skins.map.MonsterItemSkin";
                    _this._mdr = mdr;
                    _this._proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Map);
                    _this._model = _this._proxy.getData();
                    _this._scene_proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Scene);
                    _this._scene_model = _this._scene_proxy.getData();
                    _this._npc = Pool.alloc(UIAnim);
                    _this._npc.touchEnabled = false;
                    _this.addChild(_this._npc);
                    if (typeof data == "number" || typeof data == "string") {
                        if (_this._model.npcConfig)
                            _this.setData(_this._model.npcConfig[data]);
                        else {
                            var url = ResUrlC1 + "/assets/data/npc.json";
                            RES.getResByUrl(url, function (cfg) {
                                _this.setData(cfg[data]);
                            }, _this, RES.ResourceItem.TYPE_JSON);
                        }
                    }
                    else {
                        _this.setData(data);
                    }
                    _this._npc.touchEnabled = false;
                    _this.addChild(_this._npc);
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    _this.rect.fillColor = 0x0000ff;
                    return _this;
                }
                Object.defineProperty(NPCPt.prototype, "c", {
                    get: function () {
                        return this._c;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NPCPt.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NPCPt.prototype, "dir", {
                    get: function () {
                        return this._dir;
                    },
                    enumerable: true,
                    configurable: true
                });
                NPCPt.prototype.setData = function (data) {
                    this._configData = data;
                    this.idx = this._configData ? this._configData.id : data;
                    this.npcName = this._configData ? this._configData.name : "???";
                    this.lab_idx.text = "id:" + this.idx + " No." + this._mdr._npcPts.indexOf(this);
                    this.lab_name.text = this.npcName;
                    this.loadModel();
                };
                NPCPt.prototype.onAddToStage = function () {
                    this.lab_idx.text = "id:" + this.idx + " No." + this._mdr._npcPts.indexOf(this);
                    this.lab_name.text = this.npcName;
                    this.btnRotate.visible = true;
                    this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this.btnRotate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
                    this.autoCreate.addEventListener(eui.UIEvent.CHANGE, this.onAutoChange, this);
                };
                NPCPt.prototype.onRemoveFromStage = function () {
                    this.btnDel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this.btnRotate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
                };
                NPCPt.prototype.onAutoChange = function () {
                    this.lbl_create.text = this.autoCreate.selected ? "自动创建" : "不自动创建";
                };
                NPCPt.prototype.onRotate = function () {
                    this._dir++;
                    if (this._dir > 8)
                        this._dir = 1;
                    this._scene_model.change = true;
                    this.loadModel();
                };
                NPCPt.prototype.updateDir = function (dir) {
                    this._dir = dir;
                    this.loadModel();
                };
                NPCPt.prototype.updateAutoCreate = function (value) {
                    this.autoCreate.selected = value;
                    this.onAutoChange();
                };
                NPCPt.prototype.updatePos = function (c, r) {
                    if (r != undefined) {
                        this._r = r;
                    }
                    if (c != undefined) {
                        this._c = c;
                    }
                    this.x = (this._c + 0.5) * this._model.curMapData.cellWidth;
                    this.y = (this._r + 0.5) * this._model.curMapData.cellWidth;
                };
                NPCPt.prototype.loadModel = function () {
                    if (this._configData) {
                        var dir = GDirUtil.getMir(this._dir);
                        this._npc.scaleX = dir != this._dir ? -1 : 1;
                        var url = ResUrlC1 + "/assets/anim/npc/" + this._configData.modelId + ("/std_" + dir + ".png");
                        this._npc.setSource(url, 0);
                    }
                };
                NPCPt.prototype.onDel = function (e) {
                    e.stopPropagation();
                    if (this.parent) {
                        this.parent.dispatchEventWith(DEL_NPC_PT, false, this);
                    }
                    this.dispose();
                };
                NPCPt.prototype.dispose = function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                    Pool.release(this._npc);
                    this._npc = null;
                };
                return NPCPt;
            }(eui.Component));
            map.NPCPt = NPCPt;
            __reflect(NPCPt.prototype, "tool.ui.map.NPCPt");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
//# sourceMappingURL=NPCPt.js.map