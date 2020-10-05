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
            var OnConnectErrorCmd = (function (_super) {
                __extends(OnConnectErrorCmd, _super);
                function OnConnectErrorCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnConnectErrorCmd.prototype.exec = function (n) {
                    Alert.show("连接失败，请刷新重试！");
                };
                return OnConnectErrorCmd;
            }(CmdBase));
            editor.OnConnectErrorCmd = OnConnectErrorCmd;
            __reflect(OnConnectErrorCmd.prototype, "tool.mod.editor.OnConnectErrorCmd");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
