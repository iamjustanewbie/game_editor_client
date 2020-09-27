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
            var facade = base.module.facade;
            var OnConnectCreateCmd = (function (_super) {
                __extends(OnConnectCreateCmd, _super);
                function OnConnectCreateCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnConnectCreateCmd.prototype.exec = function (n) {
                    facade.showView(mod.ModName.Editor, mod.EditorViewType.Start);
                };
                return OnConnectCreateCmd;
            }(CmdBase));
            editor.OnConnectCreateCmd = OnConnectCreateCmd;
            __reflect(OnConnectCreateCmd.prototype, "tool.mod.editor.OnConnectCreateCmd");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=OnConnectCreateCmd.js.map