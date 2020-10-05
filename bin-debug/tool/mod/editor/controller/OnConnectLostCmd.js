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
            var OnConnectLostCmd = (function (_super) {
                __extends(OnConnectLostCmd, _super);
                function OnConnectLostCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnConnectLostCmd.prototype.exec = function (n) {
                    Alert.show("断开连接，请刷新重试！");
                };
                return OnConnectLostCmd;
            }(CmdBase));
            editor.OnConnectLostCmd = OnConnectLostCmd;
            __reflect(OnConnectLostCmd.prototype, "tool.mod.editor.OnConnectLostCmd");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
