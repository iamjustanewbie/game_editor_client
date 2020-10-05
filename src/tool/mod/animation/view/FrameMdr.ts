module tool.mod.animation {

    import MdrBase = base.module.MdrBase;
    import FrameView = tool.ui.animation.FrameView;
    import ArrayCollection = eui.ArrayCollection;
    import TextField = egret.TextField;
    import EditorDurationRenderer = tool.ui.animation.EditorDurationRenderer;

    export class FrameMdr extends MdrBase {

        private _view: FrameView = this.mark("_view", FrameView);

        private _framePro: ArrayCollection;
        private _cursorPro: ArrayCollection;
        private _durationPro: ArrayCollection;

        private _proxy: AnimationProxy;
        private _model: AnimationModel;
        private readonly MAX_FRAME: number = 60;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._view.left = 0;
            this._view.right = 0;
            this._view.bottom = 0;

            let tf: TextField = <TextField> this._view.loop.labelDisplay;
            tf.textColor = 0xFFFFFF;

            this._framePro = new ArrayCollection();
            this._view.frame.dataProvider = this._framePro;

            this._cursorPro = new ArrayCollection();
            this._view.cursor.dataProvider = this._cursorPro;

            this._durationPro = new ArrayCollection();
            this._view.duration.dataProvider = this._durationPro;
            this._view.duration.itemRenderer = EditorDurationRenderer;

            this._proxy = this.retProxy(ProxyType.Animation);
            this._model = this._proxy.getData();
        }

        protected addListeners(): void {
            this.onNt(ON_FRAME_CHANGE, this.onFrameChange, this);
            this.onNt(ANIMATION_PLAY_CHANGE, this.onPlayChange, this);
            this._view.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
            this._view.loop.addEventListener(egret.Event.CHANGE, this.onLoopChange, this);
            this._view.frameEditor.addEventListener(egret.Event.CHANGE, this.onEditorFrame, this);
            this._view.cursor.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapCursor, this);
        }

        protected removeListeners(): void {
            this._view.btnPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
            this._view.loop.removeEventListener(egret.Event.CHANGE, this.onLoopChange, this);
            this._view.frameEditor.removeEventListener(egret.Event.CHANGE, this.onEditorFrame, this);
            this._view.cursor.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapCursor, this);
        }

        private onBtnPlay() {
            this._model.play = !this._model.play;
        }

        private onPlayChange() {
            this._view.btnPlay.label = this._model.play ? "停止" : "播放";
        }

        private onTapCursor(e: eui.ItemTapEvent) {
            this._model.play = false;
            this.sendNt(ON_SELECTED_FRAME, e.itemIndex + 1);
        }

        private onEditorFrame() {
            let f = parseInt(this._view.frameEditor.text);
            if (f > this.MAX_FRAME || !f) {
                f = this.MAX_FRAME;
            }
            if (f <= 0) {
                f = 1;
            }
            this._view.frameEditor.text = f.toString();
            for (let i = 0, l = this._model.duration.length; i < l; ++i) {
                this._model.duration[i] = Math.floor(1000 / f);
            }
            this._model.curDuration = this._model.duration[this._model.curFrame - 1];
            this._durationPro.source = this._model.duration;
        }

        private onLoopChange() {
            this._model.isLoop = this._view.loop.selected;
        }

        private onFrameChange() {
            this._view.cursor.selectedIndex = Math.min(this._model.maxFrame, this._model.curFrame) - 1;
        }

        protected onShow(): void {
            let a = [];
            for (let i = 1; i <= this._model.maxFrame; ++i) {
                a.push(i);
            }
            this._view.frameEditor.text = Math.floor(1000 / this._model.duration[0]) + "";
            this._framePro.source = a;
            this._cursorPro.source = a;
            this._view.cursorBg.width = this._view.cursor.width;
            this._view.cursor.selectedIndex = this._model.curFrame - 1;
            this._durationPro.source = this._model.duration;
            this._view.loop.selected = this._model.isLoop;
            this._view.btnPlay.label = this._model.play ? "停止" : "播放";
        }

        protected onHide(): void {
        }
    }
}