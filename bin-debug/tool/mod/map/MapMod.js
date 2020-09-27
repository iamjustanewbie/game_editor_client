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
            var ModBase = base.module.ModBase;
            var MsgId = tool.mod.editor.MsgId;
            var OnPublishCmd = tool.mod.editor.OnPublishCmd;
            var MapMod = (function (_super) {
                __extends(MapMod, _super);
                function MapMod() {
                    return _super.call(this, mod.ModName.Map) || this;
                }
                MapMod.prototype.initCmd = function () {
                    this.regCmd("msg_" + MsgId.publishMap, OnPublishCmd);
                    this.regCmd("msg_" + MsgId.publishMonster, OnPublishCmd);
                    this.regCmd("msg_" + MsgId.publishScene, OnPublishCmd);
                };
                MapMod.prototype.initModel = function () {
                    this.regProxy(mod.ProxyType.Map, map.MapProxy);
                    this.regProxy(mod.ProxyType.Scene, map.SceneProxy);
                };
                MapMod.prototype.initView = function () {
                    this.regMdr(mod.MapViewType.MapMask, map.MapMaskMdr);
                    //this.regMdr(MapViewType.MapEditor, MapEditorMdr);
                    this.regMdr(mod.MapViewType.TopBar, map.TopBarMdr);
                    this.regMdr(mod.MapViewType.MonsterList, map.MonsterListMdr);
                    this.regMdr(mod.MapViewType.NPCList, map.NPCListMdr);
                    this.regMdr(mod.MapViewType.Teleport, map.MapTelePortMdr);
                    this.regMdr(mod.MapViewType.TeleportPanel, map.TeleportPanelMdr);
                    this.regMdr(mod.MapViewType.Edit, map.SceneEditorMdr);
                    this.regMdr(mod.MapViewType.SceneTopBar, map.SceneTopBarMdr);
                    this.regMdr(mod.MapViewType.Import, map.SceneImportMdr);
                    this.regMdr(mod.MapViewType.SpecificPointPanel, map.SpecificPointPanelMdr);
                    this.regMdr(mod.MapViewType.ListSwitch, map.ListSwitchMdr);
                    this.regMdr(mod.MapViewType.SceneHelp, map.SceneHelp);
                };
                return MapMod;
            }(ModBase));
            map.MapMod = MapMod;
            __reflect(MapMod.prototype, "tool.mod.map.MapMod");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=MapMod.js.map