module tool.mod.map {

    import Handler = base.utils.Handler;

    export class MapModel {

        public static DefaultCellW: number = 64;
        public static DefaultCellH: number = 64;

        public curDrawStatus: number = SliceStatus.Enable;
        public mapList: number[];
        public curMapData: MapConfig;
        public curMapId: number;

        public curDrawMonster: any;
        public curDrawNPC: any;
        public monstersConfig: any;
        public npcConfig: any;
        public telportPts: { [id: number]: TeleportPtData } = {};

        public isShowMask: boolean = true;  //网格开关

        public curRange: number = 0; //笔刷

        public settingBlock = true; // 设置障碍点为true 设置遮挡点为false
        private _numCol: number;
        public get numCol(): number {
            return this._numCol;
        }

        private _numRow: number;
        public get numRow(): number {
            return this._numRow;
        }

        public getIdx(r: number, c: number): number {
            return r * this._numCol + c;
        }

        public getRC(idx: number): { r, c } {
            let r = Math.floor(idx / this._numCol);
            let c = idx % this._numCol;
            return { r, c };
        }

        public setCurMapData(data: MapConfig) {
            this.curMapData = data;
            this._numCol = this.curMapData.imageWidth / this.curMapData.cellWidth;
            this._numRow = this.curMapData.imageHeight / this.curMapData.cellHeight;
        }

        private _ckBlock: Handler;
        public get ckBlock(): Handler {
            if (this._ckBlock == null) {
                this._ckBlock = Handler.alloc(this, this.isBlock);
            }
            return this._ckBlock;
        }

        public isBlock(x: number, y: number): boolean {
            return this.curMapData.data[this.getIdx(y, x)] == SliceStatus.Disable;
        }
    }

    export interface MapConfig {
        imageWidth: number;
        imageHeight: number;
        sliceWidth: number;
        sliceHeight: number;
        cellWidth: number;
        cellHeight: number;
        data: number[];
    }
}