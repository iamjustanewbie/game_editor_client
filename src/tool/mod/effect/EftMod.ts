module tool.mod.effect {

    import ModBase = base.module.ModBase;
    import MsgId = tool.mod.editor.MsgId;
    import OnPublishCmd = tool.mod.editor.OnPublishCmd;

    export class EftMod extends ModBase {

        constructor() {
            super(ModName.Effect);
        }

        protected initCmd(): void {
            super.initCmd();
            this.regCmd("msg_" + MsgId.publishEft, OnPublishCmd);
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Effect, EftProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(EftViewType.EftEditor, EftEditorMdr);
            this.regMdr(EftViewType.EdtPanel, EdtMdr);
            this.regMdr(EftViewType.EftImport, EftImportMdr);
        }
    }
}