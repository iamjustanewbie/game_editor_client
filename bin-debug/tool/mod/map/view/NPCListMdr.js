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
            var MonsterListView = tool.ui.map.MonsterListView;
            var ArrayCollection = eui.ArrayCollection;
            var ResUrlC1 = tool.mod.editor.ResUrlC1;
            var NPCListMdr = (function (_super) {
                __extends(NPCListMdr, _super);
                function NPCListMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", MonsterListView);
                    return _this;
                }
                NPCListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.left = 0;
                    this._view.top = 170;
                    this._view.bottom = 100;
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                    this._model = this._proxy.getData();
                    this._npcPro = new ArrayCollection();
                    this._view.list.dataProvider = this._npcPro;
                    this._view.list.itemRenderer = ListItem;
                };
                NPCListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this._view.list.addEventListener(egret.Event.CHANGE, this.onSelectedChange, this);
                    this._view.editor_text.addEventListener(egret.Event.CHANGE, this.FilterList, this);
                };
                NPCListMdr.prototype.removeListeners = function () {
                    _super.prototype.removeListeners.call(this);
                    this._view.list.removeEventListener(egret.Event.CHANGE, this.onSelectedChange, this);
                    this._view.editor_text.removeEventListener(egret.Event.CHANGE, this.FilterList, this);
                };
                NPCListMdr.prototype.onSelectedChange = function () {
                    this._model.curDrawNPC = this._npcPro.getItemAt(this._view.list.selectedIndex);
                    this._model.curDrawMonster = null;
                };
                NPCListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._model.npcConfig) {
                        var url = ResUrlC1 + "/assets/data/npc.json";
                        RES.getResByUrl(url, this.onLoadedCfg, this, RES.ResourceItem.TYPE_JSON);
                    }
                    else {
                        this.onLoadedCfg();
                    }
                };
                NPCListMdr.prototype.FilterList = function () {
                    var json = this._model.npcConfig;
                    var keys = Object.keys(json);
                    keys.sort(function (a, b) {
                        return a.id - b.id;
                    });
                    var npc = [];
                    var keyword = this._view.editor_text.text;
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        var obj = json[k];
                        if (k.indexOf(keyword) > -1 || obj.name.indexOf(keyword) > -1)
                            npc.push(obj);
                    }
                    this._npcPro.source = npc;
                };
                NPCListMdr.prototype.onLoadedCfg = function (json) {
                    if (json) {
                        this._model.npcConfig = json;
                    }
                    this.FilterList();
                    this._view.list.selectedIndex = 0;
                    this.onSelectedChange();
                };
                NPCListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return NPCListMdr;
            }(MdrBase));
            map.NPCListMdr = NPCListMdr;
            __reflect(NPCListMdr.prototype, "tool.mod.map.NPCListMdr");
            var ListItem = (function (_super) {
                __extends(ListItem, _super);
                function ListItem() {
                    var _this = _super.call(this) || this;
                    _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
                    return _this;
                }
                ListItem.prototype.onComplete = function () {
                    this.labelDisplay.textAlign = 'left';
                };
                ListItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.labelDisplay.text = this.data.id + " " + this.data.name;
                };
                return ListItem;
            }(eui.ItemRenderer));
            __reflect(ListItem.prototype, "ListItem");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
