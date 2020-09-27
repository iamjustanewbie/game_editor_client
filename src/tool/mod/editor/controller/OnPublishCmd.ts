module tool.mod.editor {

    import CmdBase = base.module.CmdBase;
    import Alert = tool.utils.Alert;

    export class OnPublishCmd extends CmdBase {

        public exec(n: base.module.GameNT): void {
            let msg = n.body;
            let txt = "";
            switch (msg.res) {
                case PublishCode.start:
                    txt = "正在发布...";
                    Alert.show(txt);
                    return;
                case PublishCode.success:
                    txt = "发布成功";
                    break;
                case PublishCode.busy:
                    txt = "发布中...请稍后再试。";
                    break;
                case PublishCode.not_exists:
                    txt = "路径不存在！";
                    break;
                case PublishCode.not_init:
                    txt = "没有编辑过！";
                    break;
            }
            if (txt.trim() != "") {
                Alert.confirm(txt);
            }
        }
    }
}