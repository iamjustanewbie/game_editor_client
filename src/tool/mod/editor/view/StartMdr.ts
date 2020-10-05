module tool.mod.editor {
    import MdrBase = base.module.MdrBase;
    import StartView = tool.ui.editor.StartView;
    import KeyUtil = tool.utils.KeyUtil;
    import ViewMgr = game.utils.ViewMgr;

    export class StartMdr extends MdrBase {
        private _view: StartView = this.mark("_view", StartView);

        constructor() {
            super(EditorUI.window);
            ViewMgr.getIns().setMainView(this);
        }

        protected onInit(): void {
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = -80;
        }

        protected onShow(): void {
            KeyUtil.init();
            // this._view.addChild(new tool.tween.ui.TweenView());
        }

        protected onHide(): void {
        }

        private showFont() {
            ViewMgr.getIns().showView(ModName.Editor, EditorViewType.Font);
        }

        private showMapEditor() {
            ViewMgr.getIns().showView(ModName.Map, MapViewType.MapEditor);
        }

        private showMapMask() {
            ViewMgr.getIns().showView(ModName.Map, MapViewType.MapMask);
        }

        private showAnimation() {
            ViewMgr.getIns().showView(ModName.Animation, AnimationViewType.Animation);
        }

        private showEftEditor() {
            ViewMgr.getIns().showView(ModName.Effect, EftViewType.EftEditor);
        }

        private showScene(){
            ViewMgr.getIns().showView(ModName.Map, MapViewType.Edit);
        }

        private showCutMap(){
            ViewMgr.getIns().showView(ModName.Map, MapViewType.CutMap);
        }

        protected addListeners(): void {
            this._view.btnMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMapMask, this);
            this._view.btnAnimation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAnimation, this);
            this._view.btnEft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftEditor, this);
            this._view.btnFont.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFont, this);
            this._view.btnScene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showScene, this);
            this._view.btnCutMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCutMap, this);
        }

        protected removeListeners(): void {
            this._view.btnMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showMapMask, this);
            this._view.btnAnimation.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showAnimation, this);
            this._view.btnEft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftEditor, this);
            this._view.btnFont.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFont, this);
            this._view.btnScene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showScene, this);
            this._view.btnCutMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showCutMap, this);
        }

    }
}