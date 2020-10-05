module tool.ui.effect {

    import PoolObject = base.pool.PoolObject;
    import Pool = base.pool.Pool;
    import Point = egret.Point;

    export class EftIndexView extends eui.Component implements PoolObject {

        public labelDisplay: eui.Label;

        public idx: number;

        private _isTouch: boolean = false;

        constructor() {
            super();
            this.skinName = "skins.eft.EftIndexSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.anchorOffsetX = 15;
            this.anchorOffsetY = 15;
        }

        private onAddToStage() {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this);
            gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTapMove, this);
        }

        private onRemoveFromStage() {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this);
            gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTapMove, this);
        }

        public setData(idx: number, x: number, y: number): void {
            this.idx = idx;
            this.labelDisplay.text = idx + "";
            this.x = x;
            this.y = y;
        }

        private onTapBegin(e: egret.TouchEvent) {
            this._isTouch = true;
        }

        private onTapEnd() {
            this._isTouch = false;
        }

        private onTapMove(e: egret.TouchEvent) {
            if (!this._isTouch) {
                return;
            }
            let pt = this.parent.globalToLocal(e.stageX, e.stageY, Pool.alloc(Point));
            this.x = +pt.x | 0;
            this.y = +pt.y | 0;
            Pool.release(pt);
            this.parent.dispatchEventWith("on_eft_move", false, {x: this.x, y: this.y, idx: this.idx});
        }

        dispose(): void {
        }

        onAlloc(): void {
        }

        onRelease(): void {
            this._isTouch = false;
            this.idx = undefined;
            this.x = 0;
            this.y = 0;
        }
    }
}
