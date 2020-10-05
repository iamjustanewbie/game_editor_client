module tool.mod.editor {

    import CmdBase = base.module.CmdBase;
    import Alert = tool.utils.Alert;

    export class OnConnectErrorCmd extends CmdBase {

        public exec(n: base.module.GameNT): void {
            Alert.show("连接失败，请刷新重试！");
        }
    }
}