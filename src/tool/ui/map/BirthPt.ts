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
    import DEL_BIRTH_PT = tool.mod.map.DEL_BIRTH_PT;

    export class BirthPt extends Sprite {

        private _lab: TextField;
        private _sp: Shape;
        private _del: TextField;

        private _model: MapModel = facade.retMod(ModName.Map).retProxy(ProxyType.Map).getData();

        private _r: number;
        private _c: number;
        private _idx: number;

        public get c(): number {
            return this._c;
        }

        public get r(): number {
            return this._r;
        }

        public get idx(): number {
            return this._idx;
        }

        constructor(r, c, i: number) {
            super();
            this.width = this._model.curMapData.cellWidth;
            this.height = this._model.curMapData.cellHeight;

            this._sp = new Shape();
            this._sp.graphics.beginFill(0xffff00, 0.7);
            this._sp.graphics.drawRect(0, 0, this.width, this.height);
            this._sp.graphics.endFill();
            this.addChild(this._sp);

            this._lab = new TextField();
            this._lab.width = this.width;
            this._lab.height = this.height;
            this._lab.size = 20;
            this._lab.textColor = 0x0;
            this._lab.textAlign = HorizontalAlign.CENTER;
            this._lab.verticalAlign = VerticalAlign.MIDDLE;
            this.addChild(this._lab);

            this._del = new TextField();
            this._del.width = this.width * 0.3;
            this._del.height = this.height * 0.3;
            this._del.text = "×";
            this._del.size = 20;
            this._del.x = this.width * 0.7;
            this._del.textAlign = HorizontalAlign.CENTER;
            this._del.verticalAlign = VerticalAlign.MIDDLE;
            this._del.background = true;
            this._del.backgroundColor = 0xff0000;
            this._del.touchEnabled = true;
            this.addChild(this._del);

            this.updateLab(i);
            this.updatePos(c, r);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        private onAddToStage() {
            this._del.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        }

        private onRemoveFromStage() {
            this._del.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        }

        public updateLab(i: number): void {
            this._idx = i;
            this._lab.text = i + 1 + "";
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
                this.parent.dispatchEventWith(DEL_BIRTH_PT, false, this._idx);
                this.parent.removeChild(this);
            }
        }

        public dispose() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }


}