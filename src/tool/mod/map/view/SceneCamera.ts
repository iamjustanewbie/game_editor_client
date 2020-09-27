module tool.mod.map {
    import Rectangle = egret.Rectangle;

    export interface IScene {
        updateViewPort(rect: Rectangle): void;

        updateTiles(sc: number, sr: number, ec: number, er: number): void;
    }

    export class SceneCamera {
        private static Fix: number = 100;
        private _mw: number = 0; // map width
        private _mh: number = 0; // map height
        private _sliceW: number; // slice width
        private _sliceH: number; // slice height
        private _sw: number; // stage width
        private _sh: number; // stage height
        private _fx: number; // focus x
        private _fy: number; // focus y
        private _viewPort: Rectangle = new Rectangle();
        private _scale: number;
        private _scene: IScene;

        public get fy(): number {
            return this._fy;
        }

        public get fx(): number {
            return this._fx;
        }

        constructor(scene: IScene) {
            this._scene = scene;
        }

        public init(mapWidth: number, mapHeight: number, sliceWidth: number, sliceHeight: number): void {
            this._mw = mapWidth;
            this._mh = mapHeight;
            this._sliceW = sliceWidth;
            this._sliceH = sliceHeight;
            this._fx = NaN;
            this._fy = NaN;
        }

        public onResize(sw: number, sh: number): void {
            this._sw = sw;
            this._sh = sh;
            if (this._mw == 0 || this._mh == 0) {
                return;
            }
            if (!isNaN(this._fx) && !isNaN(this._fy)) {
                let tx: number = this._fx;
                let ty: number = this._fy;
                this._fx = this._fy = 0;
                this.setFocus(tx, ty, this._scale);
            }
        }

        private equal(fx: number, fy: number): boolean {
            let Fix = SceneCamera.Fix;
            let cx = Math.floor(this._fx * Fix);
            let cy = Math.floor(this._fy * Fix);
            let tx = Math.floor(fx * Fix);
            let ty = Math.floor(fy * Fix);
            return cx == tx && cy == ty;
        }

        public setFocus(focusX: number, focusY: number, scale: number = 1): void {
            if (this.equal(focusX, focusY) && this._scale == scale) {
                return;
            }
            this._fx = focusX;
            this._fy = focusY;
            this._scale = scale;
            this.updateViewPort(focusX, focusY);
            this.updateMapTiles(this._viewPort);
        }

        private updateViewPort(focusX: number, focusY: number): void {
            let self = this;
            let sw: number = self._sw / self._scale;
            let mw: number = self._mw;
            let sh: number = self._sh / self._scale;
            let mh: number = self._mh;
            let hW: number = Math.min(sw, mw) / 2;
            let hH: number = Math.min(sh, mh) / 2;
            let cX: number = SceneCamera.clamp(focusX, hW, Math.max(sw, mw) - hW);
            let cY: number = SceneCamera.clamp(focusY, hH, Math.max(sh, mh) - hH);
            self._viewPort.setTo(cX - hW, cY - hH, Math.min(sw,mw - cX + hW), Math.min(sh,mh - cY + hH));
            self._scene.updateViewPort(self._viewPort);
        }

        private updateMapTiles(viewRect: Rectangle): void {
            let self = this;
            let viewSX: number = viewRect.x;
            let viewSY: number = viewRect.y;
            let viewW: number = viewRect.width;
            let viewH: number = viewRect.height;
            let viewEX: number = viewSX + viewW;
            let viewEY: number = viewSY + viewH;
            let sc: number = Math.floor(viewSX / self._sliceW);
            let sr: number = Math.floor(viewSY / self._sliceH);
            let ec: number = Math.floor(viewEX / self._sliceW) + ((viewEX % self._sliceW == 0) ? 0 : 1);
            let er: number = Math.floor(viewEY / self._sliceH) + ((viewEY % self._sliceH == 0) ? 0 : 1);
            this._scene.updateTiles(sc, sr, ec, er);
        }

        public get viewPort(): Rectangle {
            return this._viewPort;
        }

        public static clamp(input: number, min: number, max: number): number {
            let tmp: number = 0;
            if (min > max) {
                tmp = min;
                min = max;
                max = tmp;
            }
            if (input < min) {
                input = min;
            }
            if (input > max) {
                input = max;
            }
            return input;
        }

    }

}