module tool.mod.editor {

    import CmdBase = base.module.CmdBase;
    import Alert = tool.utils.Alert;

    export class OnConnectLostCmd extends CmdBase {

        public exec(n: base.module.GameNT): void {
            Alert.show("断开连接，请刷新重试！");
        }
    }
}