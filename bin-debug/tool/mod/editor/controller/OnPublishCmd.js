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
        var editor;
        (function (editor) {
            var CmdBase = base.module.CmdBase;
            var Alert = tool.utils.Alert;
            var OnPublishCmd = (function (_super) {
                __extends(OnPublishCmd, _super);
                function OnPublishCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnPublishCmd.prototype.exec = function (n) {
                    var msg = n.body;
                    var txt = "";
                    switch (msg.res) {
                        case mod.PublishCode.start:
                            txt = "正在发布...";
                            Alert.show(txt);
                            return;
                        case mod.PublishCode.success:
                            txt = "发布成功";
                            break;
                        case mod.PublishCode.busy:
                            txt = "发布中...请稍后再试。";
                            break;
                        case mod.PublishCode.not_exists:
                            txt = "路径不存在！";
                            break;
                        case mod.PublishCode.not_init:
                            txt = "没有编辑过！";
                            break;
                    }
                    if (txt.trim() != "") {
                        Alert.confirm(txt);
                    }
                };
                return OnPublishCmd;
            }(CmdBase));
            editor.OnPublishCmd = OnPublishCmd;
            __reflect(OnPublishCmd.prototype, "tool.mod.editor.OnPublishCmd");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=OnPublishCmd.js.map