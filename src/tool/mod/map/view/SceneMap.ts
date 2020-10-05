module tool.mod.map {
    import Sprite = egret.Sprite;
    import Texture = egret.Texture;
    import Bitmap = egret.Bitmap;
    import PoolObject = base.pool.PoolObject;
    import Pool = base.pool.Pool;
    import ResUrl = tool.mod.editor.ResUrl;
    import Event = egret.Event;
    import ImageLoader = egret.ImageLoader;

    export class SceneMap extends Sprite {
        private _mapId: number = 0;
        private _sliceW: number = 0;
        private _sliceH: number = 0;

        private _curSC: number;
        private _curSR: number;
        private _curEC: number;
        private _curER: number;

        private readonly _bmpMap: { [key: number]: MapBmp };
        private _curShow: number[];

        constructor() {
            super();
            this.touchEnabled = true;
            this._bmpMap = {};
            this._curShow = [];
        }

        public init(mapId: number, sliceWidth: number, sliceHeight: number) {
            this._mapId = mapId;
            this._sliceW = sliceWidth;
            this._sliceH = sliceHeight;
        }

        public updateTiles(sc: number, sr: number, ec: number, er: number) {
            if (this._mapId == 0) {
                return;
            }
            if (this._curSC == sc && this._curSR == sr && this._curEC == ec && this._curER == er) {
                return;
            }
            this._curSC = sc;
            this._curSR = sr;
            this._curEC = ec;
            this._curER = er;
            this._curShow.length = 0;
            for (let c = sc; c < ec; c++) {
                for (let r = sr; r < er; r++) {
                    this._curShow.push(SceneMap.getSliceId(c, r));
                }
            }
            SceneMap.centerCol = sc - (ec - sc) / 2 - 1;
            SceneMap.centerCol = sr - (er - sr) / 2 - 1;
            this._curShow = this._curShow.sort(SceneMap.sortId).reverse();

            for (let key in this._bmpMap) {
                if (this._curShow.indexOf(parseInt(key)) == -1) {
                    Pool.release(this._bmpMap[key]);
                    delete this._bmpMap[key];
                }
            }
            for (let i = 0, n = this._curShow.length; i < n; i++) {
                this.loadOne(this._curShow[i]);
            }
        }

        private loadOne(id: number): void {
            let bmp: MapBmp = this._bmpMap[id];
            if (bmp == null) {
                bmp = Pool.alloc(MapBmp);
                let col: number = SceneMap.getCol(id);
                let row: number = SceneMap.getRow(id);
                bmp.x = col * this._sliceW;
                bmp.y = row * this._sliceH;
                bmp.setIdx(col, row, this._mapId);

                this._bmpMap[id] = bmp;
                this.addChild(bmp);
            }
        }

        public clean(): void {
            this._mapId = this._sliceW = this._sliceH = 0;
            this._curSC = this._curSR = this._curEC = this._curER = 0;
            for (let key in this._bmpMap) {
                Pool.release(this._bmpMap[key]);
                delete this._bmpMap[key];
            }
        }

        private static ROW_SHIFT: number = 16;
        private static LOW_WORD: number = 0xFFFF;
        private static NRM: number = 1; // 0移位后还是0所以加1

        private static getSliceId(col: number, row: number): number {
            return ((row + this.NRM) << this.ROW_SHIFT) + (col + this.NRM);
        }

        private static getCol(sliceId: number): number {
            return (sliceId & this.LOW_WORD) - this.NRM;
        }

        private static getRow(sliceId: number): number {
            return (sliceId >> this.ROW_SHIFT) - this.NRM;
        }

        private static centerCol: number;
        private static centerRow: number;

        public static sortId(id1: number, id2: number): number {
            let self = SceneMap;
            let ca: number = self.getCol(id1) - self.centerCol;
            let ra: number = self.getRow(id1) - self.centerRow;
            let cb: number = self.getCol(id2) - self.centerCol;
            let rb: number = self.getRow(id2) - self.centerRow;
            let distA: number = ca * ca + ra * ra;
            let distB: number = cb * cb + rb * rb;
            if (distA < distB) {
                return 1;
            } else if (distA > distB) {
                return -1;
            }
            return 0;
        }

    }

    class MapBmp extends Bitmap implements PoolObject {
        private _url: string;

        public setIdx(c: number, r: number, mapId: number) {
            let url: string = ResUrl + "/map/" + mapId + "/pic/" + c + "_" + r + ".jpg";
            if (this._url == url) {
                return;
            }
            this.removeCur();
            this._url = url;

            let loader = new egret.ImageLoader();
            loader.crossOrigin = "anonymous";
            loader.addEventListener(Event.COMPLETE, (e: Event) => {
                let loader = <ImageLoader>e.currentTarget;
                let data = loader.data;
                let tex = new Texture();
                tex._setBitmapData(data);
                this.onLoaded(tex, url);
            }, this);
            loader.load(url);
        }

        private onLoaded(data: Texture, url: string) {
            if (this._url != url) {
                return;
            }
            this.texture = data;
        }

        private removeCur(): void {
            this.texture = null;
            this._url = undefined;
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.removeCur();
        }

    }

}