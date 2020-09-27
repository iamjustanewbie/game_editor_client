module tool {
    import Sprite = egret.Sprite;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    import TouchEvent = egret.TouchEvent;
    import MdrBase = base.module.MdrBase;
    import UILayer = eui.UILayer;

    enum LayerIndex {
        window,
        upper,
        top,
        tip
    }

    export class EditorUI extends UILayer {
        public static get Ins(): EditorUI {
            return this._instance;
        }

        public static init(): EditorUI {
            if (this._instance) {
                return this._instance;
            }
            this._instance = new EditorUI();
            return this._instance;
        }

        public static get window(): DisplayObjectContainer {
            return this._instance._window;
        }

        public static get upper(): DisplayObjectContainer {
            return this._instance._upper;
        }

        public static get top(): DisplayObjectContainer {
            return this._instance._top;
        }

        public static get tip(): DisplayObjectContainer {
            return this._instance._tip;
        }

        public static remove() {
            this._instance.remChl(this._instance._window);
            this._instance.remChl(this._instance._upper);
        }

        public static add() {
            this._instance.addChl(this._instance._window);
            this._instance.addChl(this._instance._upper);
        }

        public static hideAllMdr(): void {
            this._instance._window.hideMdr();
            this._instance._upper.hideMdr();
            this._instance._top.hideMdr();
            this._instance._tip.hideMdr();
        }

        private static _instance: EditorUI;

        private _window: GameUILayer;
        private _upper: GameUILayer;
        private _top: GameUILayer;
        private _tip: GameUILayer;

        constructor() {
            super();

            super.addChild(this._window = new GameUILayer(LayerIndex.window));
            super.addChild(this._upper = new GameUILayer(LayerIndex.upper));
            super.addChild(this._top = new GameUILayer(LayerIndex.top));
            super.addChild(this._tip = new GameUILayer(LayerIndex.tip));
        }

        private addChl(layer: GameUILayer) {
            super.addChildAt(layer, layer._idx);
        }

        private remChl(layer: GameUILayer) {
            if (this.contains(layer)) {
                super.removeChild(layer);
            }
        }
    }

    class GameUILayer extends UILayer {
        private static modalSp: Sprite;

        public _idx: number;

        constructor(idx: number) {
            super();
            this._idx = idx;
            this.touchEnabled = false;
            this.name = "GameUILayer_" + this._idx;
            this.verticalCenter = 0;
            this.horizontalCenter = 0;
        }

        $childAdded(child: DisplayObject, index: number): void {
            super.$childAdded(child, index);
            if (child == GameUILayer.modalSp) {
                return;
            }
            if (this._idx == LayerIndex.top || this._idx == LayerIndex.upper) {
                this.hideMdr(child);
                this.addModal();
            }
        }

        $childRemoved(child: DisplayObject, index: number): void {
            super.$childRemoved(child, index);
            if (child == GameUILayer.modalSp) {
                return;
            }
            if (this._idx == LayerIndex.top || this._idx == LayerIndex.upper) {
                this.remModal();
            }
            if (this._idx == LayerIndex.top) {
                let upper: GameUILayer = <GameUILayer>EditorUI.upper;
                upper.updateModal();
            }
        }

        $onAddToStage(stage: egret.Stage, nestLevel: number): void {
            super.$onAddToStage(stage, nestLevel);
            if (this._idx == LayerIndex.top || this._idx == LayerIndex.upper) {
                this.updateModal();
            }
        }

        private updateModal() {
            if (this.numChildren > 0 && this.getChildAt(0) != GameUILayer.modalSp) {
                this.addModal();
            }
        }

        private addModal() {
            if (gso.gameStage == null) {
                return;
            }
            let modalSp: Sprite = GameUILayer.modalSp;
            if (modalSp == null) {
                GameUILayer.modalSp = modalSp = new Sprite();
                modalSp.touchEnabled = true;
            }
            if (this.contains(modalSp)) {
                return;
            }
            modalSp.graphics.clear();
            modalSp.graphics.beginFill(0, 0.5);
            let sw = gso.gameStage.stageWidth;
            let sh = gso.gameStage.stageHeight;
            modalSp.graphics.drawRect(0, 0, sw, sh);
            modalSp.graphics.endFill();
            this.addChildAt(modalSp, 0);
            modalSp.addEventListener(TouchEvent.TOUCH_TAP, GameUILayer.onSpTap, GameUILayer);
        }

        private remModal() {
            let modalSp: Sprite = GameUILayer.modalSp;
            if (modalSp == null) {
                return;
            }
            if (!this.contains(modalSp)) {
                return;
            }
            this.removeChild(modalSp);
            modalSp.removeEventListener(TouchEvent.TOUCH_TAP, GameUILayer.onSpTap, GameUILayer);
        }

        private static onSpTap(e: TouchEvent) {
            let layer: GameUILayer = <GameUILayer><any>GameUILayer.modalSp.parent;
            if (layer && layer._idx == LayerIndex.upper) {
                layer.hideMdr();
            }
        }

        private getViewMdr(view): MdrBase {
            let property: PropertyDescriptor = Object.getOwnPropertyDescriptor(view, "__mdr__");
            if (property) {
                return property.value;
            }
            return null;
        }

        public hideMdr(exclude?: DisplayObject) {
            for (let i: number = 0; i < this.numChildren; i++) {
                let tmp: DisplayObject = this.getChildAt(i);
                if (tmp == GameUILayer.modalSp || tmp == exclude) {
                    continue;
                }
                let mdr: MdrBase = this.getViewMdr(tmp);
                if (mdr) {
                    mdr.hide();
                    i--;
                }
            }
        }

    }
}