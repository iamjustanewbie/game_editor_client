module tool.mod.map {
    import ModBase = base.module.ModBase;
    import MsgId = tool.mod.editor.MsgId;
    import OnPublishCmd = tool.mod.editor.OnPublishCmd;

    export class MapMod extends ModBase {
        constructor() {
            super(ModName.Map);
        }

        protected initCmd() {
            this.regCmd("msg_" + MsgId.publishMap, OnPublishCmd);
            this.regCmd("msg_" + MsgId.publishMonster, OnPublishCmd);
            this.regCmd("msg_" + MsgId.publishScene, OnPublishCmd);
        }

        protected initModel() {
            this.regProxy(ProxyType.Map, MapProxy);
            this.regProxy(ProxyType.Scene, SceneProxy);
        }

        protected initView(): void {
            this.regMdr(MapViewType.MapMask, MapMaskMdr);
            //this.regMdr(MapViewType.MapEditor, MapEditorMdr);
            this.regMdr(MapViewType.TopBar, TopBarMdr);
            this.regMdr(MapViewType.MonsterList, MonsterListMdr);
            this.regMdr(MapViewType.NPCList, NPCListMdr);
            this.regMdr(MapViewType.Teleport, MapTelePortMdr);
            this.regMdr(MapViewType.TeleportPanel, TeleportPanelMdr);

            this.regMdr(MapViewType.Edit, SceneEditorMdr);
            this.regMdr(MapViewType.SceneTopBar, SceneTopBarMdr);
            this.regMdr(MapViewType.Import, SceneImportMdr);
            this.regMdr(MapViewType.SpecificPointPanel, SpecificPointPanelMdr);
            this.regMdr(MapViewType.ListSwitch, ListSwitchMdr);
            this.regMdr(MapViewType.SceneHelp, SceneHelp);
        }

    }
}