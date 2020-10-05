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
        var animation;
        (function (animation) {
            var ModBase = base.module.ModBase;
            var OnPublishCmd = tool.mod.editor.OnPublishCmd;
            var MsgId = tool.mod.editor.MsgId;
            var AnimationMod = (function (_super) {
                __extends(AnimationMod, _super);
                function AnimationMod() {
                    return _super.call(this, mod.ModName.Animation) || this;
                }
                AnimationMod.prototype.initCmd = function () {
                    this.regCmd("msg_" + MsgId.publishAnimation, OnPublishCmd);
                    this.regCmd("msg_" + MsgId.autoPublish, OnPublishCmd);
                };
                AnimationMod.prototype.initModel = function () {
                    this.regProxy(mod.ProxyType.Animation, animation.AnimationProxy);
                };
                AnimationMod.prototype.initView = function () {
                    this.regMdr(mod.AnimationViewType.Animation, animation.AnimationMdr);
                    this.regMdr(mod.AnimationViewType.Frame, animation.FrameMdr);
                    this.regMdr(mod.AnimationViewType.Import, animation.ImportMdr);
                };
                return AnimationMod;
            }(ModBase));
            animation.AnimationMod = AnimationMod;
            __reflect(AnimationMod.prototype, "tool.mod.animation.AnimationMod");
        })(animation = mod.animation || (mod.animation = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
