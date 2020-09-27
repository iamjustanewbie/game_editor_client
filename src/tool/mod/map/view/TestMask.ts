module tool.mod.map {
    import Sprite = egret.Sprite;
    import Rectangle = egret.Rectangle;
    import MapModel = tool.mod.map.MapModel;
    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import ProxyType = tool.mod.ProxyType;
    import SliceStatus = tool.mod.map.SliceStatus;

    export class TestMask extends Sprite {
        private _cw: number;
        private _ch: number;
        private _numCol: number;
        private _numRow: number;

        constructor() {
            super();
        }

        public init(cellWidth: number, cellHeight: number, numCol: number, numRow: number) {
            this._cw = cellWidth;
            this._ch = cellHeight;
            this._numCol = numCol;
            this._numRow = numRow;
        }

        public updateCur(): void {
            this.graphics.clear();
            for (let i = this._sx; i <= this._ex; i++) {
                for (let j = this._sy; j <= this._ey; j++) {
                    let data = this._model.curMapData.data[this._model.getIdx(j, i)];
                    let isBlock: boolean = !data || data == SliceStatus.Disable;
                    let color: number = isBlock ? 0xff0000 : 0x00ff00;
                    let isShelter = data == SliceStatus.Shelter;
                    let alpha: number = isBlock || isShelter ? 0.5 : 0;
                    this.graphics.beginFill(color, alpha);
                    this.graphics.drawRect(i * this._cw + 1, j * this._ch + 1, this._cw - 2, this._ch - 2);
                }
            }
        }

        private _sx: number;
        private _sy: number;
        private _ex: number;
        private _ey: number;

        public updateView(viewPort: Rectangle) {
            if (this._cw == 0 || this._ch == 0) {
                return;
            }
            let sx: number = Math.floor(viewPort.x / this._cw);
            let ex: number = sx + Math.ceil(viewPort.width / this._cw);
            if (ex > this._numCol - 1) {
                ex = this._numCol - 1;
            }
            let sy: number = Math.floor(viewPort.y / this._ch);
            let ey: number = sy + Math.ceil(viewPort.height / this._ch);
            if (ey > this._numRow - 1) {
                ey = this._numRow - 1;
            }
            this._sx = sx;
            this._sy = sy;
            this._ex = ex;
            this._ey = ey;
            this.updateCur();
        }

        public clean(): void {
            this._cw = this._ch = 0;
            this.graphics.clear();
        }

        private _model: MapModel = facade.retMod(ModName.Map).retProxy(ProxyType.Map).getData();

    }

}