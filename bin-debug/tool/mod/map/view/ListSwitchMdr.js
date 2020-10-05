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
            var ListSwitchView = tool.ui.map.ListSwitchView;
            var facade = base.module.facade;
            var ListSwitchMdr = (function (_super) {
                __extends(ListSwitchMdr, _super);
                function ListSwitchMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", ListSwitchView);
                    _this.rbg = new eui.RadioButtonGroup();
                    return _this;
                }
                ListSwitchMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.left = 0;
                    this._view.top = 120;
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                    this._model = this._proxy.getData();
                    this._view.btn_monster.group = this.rbg;
                    this._view.btn_npc.group = this.rbg;
                };
                ListSwitchMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.rbg.addEventListener(egret.Event.CHANGE, this.onSelectedChange, this);
                };
                ListSwitchMdr.prototype.removeListeners = function () {
                    _super.prototype.removeListeners.call(this);
                };
                ListSwitchMdr.prototype.onSelectedChange = function () {
                    var selectNpc = this.rbg.selection == this._view.btn_npc;
                    if (!selectNpc) {
                        this.showView(mod.MapViewType.MonsterList);
                        facade.hideView(mod.ModName.Map, mod.MapViewType.NPCList);
                    }
                    else {
                        this.showView(mod.MapViewType.NPCList);
                        facade.hideView(mod.ModName.Map, mod.MapViewType.MonsterList);
                    }
                };
                ListSwitchMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.btn_monster.selected = true;
                    this.onSelectedChange();
                };
                return ListSwitchMdr;
            }(MdrBase));
            map.ListSwitchMdr = ListSwitchMdr;
            __reflect(ListSwitchMdr.prototype, "tool.mod.map.ListSwitchMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
