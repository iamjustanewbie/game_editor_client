module tool.mod.editor {

    import MdrBase = base.module.MdrBase;
    import AlertView = tool.ui.editor.AlertView;
    import Pool = base.pool.Pool;

    export class AlertMdr extends MdrBase {

        private _view: AlertView = this.mark("_view", AlertView);

        constructor() {
            super(EditorUI.top);
        }

        protected onInit(): void {
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = -80;
        }


        protected addListeners(): void {
            this._view.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
            this._view.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
        }

        protected removeListeners(): void {
            this._view.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
            this._view.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
        }

        private onBtnConfirm() {
            if (this._showArgs.confirm) {
                this._showArgs.confirm.exec();
            }
            this.hide();
        }

        private onBtnCancel() {
            if (this._showArgs.cancel) {
                this._showArgs.cancel.exec();
            }
            this.hide();
        }

        protected onShow(): void {
            this._view.currentState = this._showArgs.state;
            if (typeof this._showArgs.lab == "string") {
                this._view.lab.text = this._showArgs.lab;
            } else {
                this._view.lab.textFlow = this._showArgs.lab;
            }
        }


        protected onHide(): void {
            if (this._showArgs.confirm) {
                Pool.release(this._showArgs.confirm);
                this._showArgs.confirm = undefined;
            }
            if (this._showArgs.cancel) {
                Pool.release(this._showArgs.cancel);
                this._showArgs.onCancel = undefined;
            }
        }
    }
}