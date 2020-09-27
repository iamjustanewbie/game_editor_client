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
        var effect;
        (function (effect) {
            var ModBase = base.module.ModBase;
            var MsgId = tool.mod.editor.MsgId;
            var OnPublishCmd = tool.mod.editor.OnPublishCmd;
            var EftMod = (function (_super) {
                __extends(EftMod, _super);
                function EftMod() {
                    return _super.call(this, mod.ModName.Effect) || this;
                }
                EftMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                    this.regCmd("msg_" + MsgId.publishEft, OnPublishCmd);
                };
                EftMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(mod.ProxyType.Effect, effect.EftProxy);
                };
                EftMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr(mod.EftViewType.EftEditor, effect.EftEditorMdr);
                    this.regMdr(mod.EftViewType.EdtPanel, effect.EdtMdr);
                    this.regMdr(mod.EftViewType.EftImport, effect.EftImportMdr);
                };
                return EftMod;
            }(ModBase));
            effect.EftMod = EftMod;
            __reflect(EftMod.prototype, "tool.mod.effect.EftMod");
        })(effect = mod.effect || (mod.effect = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EftMod.js.map