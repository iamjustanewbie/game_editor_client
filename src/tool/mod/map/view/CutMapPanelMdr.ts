module tool.mod.map {
    import MdrBase = base.module.MdrBase;
    import ResUrl = tool.mod.editor.ResUrl;
    import KeyUtil = tool.utils.KeyUtil;
    import Pool = base.pool.Pool;
    import Point = egret.Point;
    import facade = base.module.facade;
    import Sprite = egret.Sprite;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import Rectangle = egret.Rectangle;
    import CutMapPanelView = tool.ui.map.CutMapPanelView;

    export class CutMapPanelMdr extends MdrBase {
        private _view = this.mark("_view", CutMapPanelView);


        private _proxy: MapProxy;

        constructor() {
            super(EditorUI.top);
        }

        protected onInit(): void {
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Map);
        }

        protected addListeners(): void {
            this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this._view.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        }

        protected removeListeners(): void {
            this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this._view.btn_confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        }



        protected onShow(): void {
            let name = this._showArgs as string;
            this._view.txt_name.text = name;
        }

        protected onHide(): void {

        }

        private onConfirm() {
            let width = Number(this._view.txt_width.text);
            let height = Number(this._view.txt_height.text);
            let rate = Number(this._view.txt_rate.text);
            let name = this._showArgs as string;
            this._proxy.cutMap(name, width, height, rate);
            this.hide();
        }
    }
}
