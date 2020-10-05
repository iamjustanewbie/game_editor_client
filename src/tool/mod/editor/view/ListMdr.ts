module tool.mod.editor {

    import MdrBase = base.module.MdrBase;
    import ListView = tool.ui.editor.ListView;
    import ArrayCollection = eui.ArrayCollection;
    import DisplayObject = egret.DisplayObject;
    import Pool = base.pool.Pool;
    import Handler = base.utils.Handler;
    import Rectangle = egret.Rectangle;

    export class ListMdr extends MdrBase {

        private _view: ListView = this.mark("_view", ListView);

        private _listPro: ArrayCollection;

        constructor() {
            super(EditorUI.tip);
        }

        protected onInit(): void {
            this._listPro = new ArrayCollection();
            this._view.listItem.dataProvider = this._listPro;
        }

        protected addListeners(): void {
            this._view.maxHeight = this._view.scroll.maxHeight = gso.gameStage.stageHeight * 0.5;
            this._view.listItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapList, this);
            gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this);
            this._view.listItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        }

        protected removeListeners(): void {
            this._view.listItem.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapList, this);
            gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this);
            this._view.listItem.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        }

        private onTapList(e: egret.TouchEvent) {
            e.stopImmediatePropagation();
        }

        private onTapItem(e: eui.ItemTapEvent) {
            let h: Handler = this._showArgs.handle;
            if (h) {
                h.exec(e);
            }
            this.hide();
        }

        protected onShow(): void {
            if (!this._showArgs) {
                return;
            }
            this._listPro.source = this._showArgs.src;
            this._view.listItem.selectedIndex = -1;
            let display = <DisplayObject>this._showArgs.display;
            let rect = display.getTransformedBounds(EditorUI.top, Pool.alloc(Rectangle));
            this._view.width = rect.width + 30;
            this._view.scroll.width = rect.width;
            this._view.x = rect.x + (rect.width * 0.5) - (this._view.width * 0.5);
            this._view.y = rect.y + rect.height;
            Pool.release(rect);
        }

        protected onHide(): void {
        }
    }
}
