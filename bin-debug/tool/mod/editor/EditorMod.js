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
            var ModBase = base.module.ModBase;
            var ON_CONNECT_CREATE = base.network.ON_CONNECT_CREATE;
            var ON_CONNECT_LOST = base.network.ON_CONNECT_LOST;
            var ON_CONNECT_ERROR = base.network.ON_CONNECT_ERROR;
            var EditorMod = (function (_super) {
                __extends(EditorMod, _super);
                function EditorMod() {
                    return _super.call(this, mod.ModName.Editor) || this;
                }
                EditorMod.prototype.initCmd = function () {
                    this.regCmd(ON_CONNECT_CREATE, editor.OnConnectCreateCmd);
                    this.regCmd(ON_CONNECT_LOST, editor.OnConnectLostCmd);
                    this.regCmd(ON_CONNECT_ERROR, editor.OnConnectErrorCmd);
                };
                EditorMod.prototype.initModel = function () {
                };
                EditorMod.prototype.initView = function () {
                    this.regMdr(mod.EditorViewType.Start, editor.StartMdr);
                    this.regMdr(mod.EditorViewType.List, editor.ListMdr);
                    this.regMdr(mod.EditorViewType.Alert, editor.AlertMdr);
                    this.regMdr(mod.EditorViewType.Font, editor.FontMdr);
                };
                return EditorMod;
            }(ModBase));
            editor.EditorMod = EditorMod;
            __reflect(EditorMod.prototype, "tool.mod.editor.EditorMod");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
