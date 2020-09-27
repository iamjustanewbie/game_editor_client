module tool.mod.editor {

    import CmdBase = base.module.CmdBase;
    import facade = base.module.facade;

    export class OnConnectCreateCmd extends CmdBase {

        public exec(n: base.module.GameNT): void {
            facade.showView(ModName.Editor, EditorViewType.Start);
        }
    }
}