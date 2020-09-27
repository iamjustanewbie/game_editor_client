module tool.ui.map {

    import Sprite = egret.Sprite;
    import TextField = egret.TextField;
    import Shape = egret.Shape;
    import HorizontalAlign = egret.HorizontalAlign;
    import VerticalAlign = egret.VerticalAlign;
    import facade = base.module.facade;
    import TouchEvent = egret.TouchEvent;
    import MapModel = tool.mod.map.MapModel;
    import ModName = tool.mod.ModName;
    import ProxyType = tool.mod.ProxyType;
    import DEL_SPECIFIC_PT = tool.mod.map.DEL_SPECIFIC_PT;

    export class SpecificPt extends eui.Component {

        public lab_idx: eui.Label;

        public btnDel: eui.Label;
        private _model: MapModel = facade.retMod(ModName.Map).retProxy(ProxyType.Map).getData();

        private _r: number;
        private _c: number;
        private id: number;

        public get c(): number {
            return this._c;
        }

        public get r(): number {
            return this._r;
        }

        public get idx(): number {
            return this.id;
        }

        constructor(r, c, i: number) {
            super();
            this.skinName = "skins.map.SpecificPointSkin";
            this.width = this._model.curMapData.cellWidth;
            this.height = this._model.curMapData.cellHeight;


            this.updateLab(i);
            this.updatePos(c, r);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        private onAddToStage() {
            this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        }

        private onRemoveFromStage() {
            this.btnDel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        }

        public updateLab(i: number): void {
            this.id = i;
            this.lab_idx.text = i + "";
        }

        public updatePos(c: number, r: number): void {
            if (r != undefined) {
                this._r = r;
            }
            if (c != undefined) {
                this._c = c;
            }
            this.x = this._c * this.width;
            this.y = this._r * this.height;
        }

        private onDel(e: TouchEvent) {
            e.stopPropagation();
            if (this.parent) {
                this.parent.dispatchEventWith(DEL_SPECIFIC_PT, false, this.id);
            }
        }

        public dispose() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }


}