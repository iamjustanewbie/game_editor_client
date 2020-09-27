module tool.mod.animation {

    import ModBase = base.module.ModBase;
    import OnPublishCmd = tool.mod.editor.OnPublishCmd;
    import MsgId = tool.mod.editor.MsgId;

    export class AnimationMod extends ModBase {

        constructor() {
            super(ModName.Animation);
        }

        protected initCmd(): void {
            this.regCmd("msg_" + MsgId.publishAnimation, OnPublishCmd);
            this.regCmd("msg_" + MsgId.autoPublish, OnPublishCmd);
        }

        protected initModel(): void {
            this.regProxy(ProxyType.Animation, AnimationProxy);
        }

        protected initView(): void {
            this.regMdr(AnimationViewType.Animation, AnimationMdr);
            this.regMdr(AnimationViewType.Frame, FrameMdr);
            this.regMdr(AnimationViewType.Import, ImportMdr);
        }
    }
}