module tool.mod.editor {
    import ModBase = base.module.ModBase;
    import ON_CONNECT_CREATE = base.network.ON_CONNECT_CREATE;
    import ON_CONNECT_LOST = base.network.ON_CONNECT_LOST;
    import ON_CONNECT_ERROR = base.network.ON_CONNECT_ERROR;

    export class EditorMod extends ModBase {
        constructor() {
            super(ModName.Editor);
        }

        protected initCmd() {
            this.regCmd(ON_CONNECT_CREATE, OnConnectCreateCmd);
            this.regCmd(ON_CONNECT_LOST, OnConnectLostCmd);
            this.regCmd(ON_CONNECT_ERROR, OnConnectErrorCmd);
        }

        protected initModel() {
        }

        protected initView(): void {
            this.regMdr(EditorViewType.Start, StartMdr);
            this.regMdr(EditorViewType.List, ListMdr);
            this.regMdr(EditorViewType.Alert, AlertMdr);
            this.regMdr(EditorViewType.Font, FontMdr);
        }

    }
}