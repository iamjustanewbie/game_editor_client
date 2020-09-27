module tool.mod.effect {

    import MdrBase = base.module.MdrBase;
    import EftEditorPanel = tool.ui.effect.EftEditorPanel;
    import Pool = base.pool.Pool;
    import EftDisplay = tool.ui.effect.EftDisplay;
    import Rectangle = egret.Rectangle;

    export class EdtMdr extends MdrBase {

        private _view: EftEditorPanel = this.mark("_view", EftEditorPanel);

        constructor() {
            super(EditorUI.upper);
        }

        protected addListeners(): void {
            this._view.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this._view.btnReview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.alter, this);
        }

        protected removeListeners(): void {
            this._view.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this._view.btnReview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.alter, this);
        }

        private onBtnClose() {
            this.hide();
        }

        protected onShow(): void {
            super.onShow();
            let eftDsp: EftDisplay = this._showArgs.eft;

            this._view.label_totalTime.text = eftDsp.totalTime + "ms";
            this._view.label_name.text = eftDsp.getName() + " ID:"+ eftDsp.id;

            this._view.editorMoveTime.text = (eftDsp.tweenTime || eftDsp.totalTime) + "";

            this._view.editorX0.text = eftDsp.startX + "";
            this._view.editorY0.text = eftDsp.startY + "";
            this._view.editorX1.text = eftDsp.endX + "";
            this._view.editorY1.text = eftDsp.endY + "";
            this._view.editorDelay.text = eftDsp.delay + "";
            this._view.editorTimes.text = eftDsp.times + "";
            this._view.editorDuration.text = eftDsp.duration + "";

            this._view.editorScaleX.text = eftDsp.scaleX + "";
            this._view.editorScaleY.text = eftDsp.scaleY + "";

            if (eftDsp.rotation1 == 0 && eftDsp.rotation0 == 0) {
                this._view.editorR.text = eftDsp.rotation + "";
            } else {
                this._view.editorR.text = "0";
            }

            this._view.editorMoveR0.text = eftDsp.rotation0 + "";
            this._view.editorMoveR1.text = eftDsp.rotation1 + "";
            this._view.editorScaleX0.text = eftDsp.scaleX0 + "";
            this._view.editorScaleX1.text = eftDsp.scaleX1 + "";
            this._view.editorScaleY0.text = eftDsp.scaleY0 + "";
            this._view.editorScaleY1.text = eftDsp.scaleY1 + "";
            this._view.editorRemoveDelay.text = eftDsp.removeDelay + "";

            let render = this._showArgs.render;
            let rect = render.getTransformedBounds(EditorUI.upper, Pool.alloc(Rectangle));
            this._view.x = rect.x - this._view.width;
            this._view.y = rect.y - this._view.height * 0.5 + rect.height * 0.5;
            Pool.release(rect);
        }

        private alter() {
            let eftDisplay: EftDisplay = <EftDisplay>this._showArgs.eft;
            if (!eftDisplay) {
                return;
            }
            let startX = +this._view.editorX0.text;
            let startY = +this._view.editorY0.text;
            let endX = +this._view.editorX1.text;
            let endY = +this._view.editorY1.text;
            let delay = +this._view.editorDelay.text;
            let times = +this._view.editorTimes.text;
            let duration = +this._view.editorDuration.text;
            let scaleX = +this._view.editorScaleX.text;
            let scaleY = +this._view.editorScaleY.text;
            eftDisplay.scaleX = scaleX;
            eftDisplay.scaleY = scaleY;
            eftDisplay.scaleX0 = parseFloat(this._view.editorScaleX0.text);
            eftDisplay.scaleY0 = parseFloat(this._view.editorScaleY0.text);
            eftDisplay.scaleX1 = parseFloat(this._view.editorScaleX1.text);
            eftDisplay.scaleY1 = parseFloat(this._view.editorScaleY1.text);
            eftDisplay.rotation0 = +this._view.editorMoveR0.text | 0;
            eftDisplay.rotation1 = +this._view.editorMoveR1.text | 0;
            eftDisplay.rotation = +this._view.editorR.text | 0;
            eftDisplay.removeDelay = +this._view.editorRemoveDelay.text | 0;
            let twTime = +this._view.editorMoveTime.text | 0
            eftDisplay.tweenTime = Math.min(twTime, eftDisplay.totalTime);
            eftDisplay.updateEndPos(endX, endY);
            eftDisplay.updatePos(startX, startY);
            eftDisplay.updateCfg(delay, times, duration);
        }

        protected onHide(): void {
            this.alter();
            this.sendNt(ON_END_EDITOR_SINGLE);
            super.onHide();
        }
    }
}
