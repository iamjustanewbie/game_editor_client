module tool.comp {
    import PoolObject = base.pool.PoolObject;
    import Handler = base.utils.Handler;
    import Texture = egret.Texture;
    import ByteArray = egret.ByteArray;
    import Pool = base.pool.Pool;
    import ImageLoader = egret.ImageLoader;

    export class MergedBmp implements PoolObject {
        private static HeadSize: number = 2;
        private static Size: number = 2;
        private static Pos = ["x", "y", "w", "h", "offX", "offY", "sourceW", "sourceH", "dur"];

        private _json: {
            frames: {
                [key: string]: { x: number, y: number, w: number, h: number, offX: number, offY: number, sourceW: number, sourceH: number }
            }
        };
        private _jsonKeys: string[];

        private _frames: number[][];

        private _texture: Texture;
        private _bitmapX: number = 0;
        private _bitmapY: number = 0;
        private _subMap: { [key: string]: Texture } = {};

        private _imgUrl: string;
        private _cfgUrl: string;
        private _onLoaded: Handler;

        private _imgLoad: ImageLoader;

        public get numFrames(): number {
            if (this._jsonKeys) {
                return this._jsonKeys.length;
            }
            if (this._frames) {
                return this._frames.length;
            }
            return 0;
        }

        public get isLoaded(): boolean {
            return this._texture != null && (this._frames != null || this._json != null);
        }

        /**
         *
         * @param {string} url
         * @param {base.utils.Handler} onLoaded
         * @param {string} type
         */
        public load(url: string, onLoaded?: Handler, type: string = "json"): void {
            let self = this;
            if (self._imgUrl === url) {
                return;
            }
            this.clear();
            self._imgUrl = url;
            self._cfgUrl = url.replace(".png", "." + type);
            self._onLoaded = onLoaded;

            RES.getResByUrl(self._cfgUrl, self.cfgLoaded, self, type);

            if (!self._imgLoad) {
                self._imgLoad = new ImageLoader();
            }
            self._imgLoad.crossOrigin = "anonymous";
            self._imgLoad.addEventListener(egret.Event.COMPLETE, self.imgLoaded, this);
            self._imgLoad.load(self._imgUrl);

            // RES.getResByUrl(self._imgUrl, self.imgLoaded, self, RES.ResourceItem.TYPE_IMAGE);
        }

        private cfgLoaded(data: any, url: string): void {
            if (url != this._cfgUrl) {
                return;
            }
            if (data instanceof ArrayBuffer) {
                this.setBytes(new ByteArray(data));
            } else if (Array.isArray(data)) {
                this._frames = data;
            } else {
                this.setJson(data);
            }
            this.checkComp();
        }

        private imgLoaded(e: egret.Event): void {
            let self = this;
            self._imgLoad.removeEventListener(egret.Event.COMPLETE, self.imgLoaded, this);

            let data = e.currentTarget.data;
            let texture = new Texture();
            texture._setBitmapData(data);
            this._texture = texture;
            this._bitmapX = texture.$bitmapX - texture.$offsetX;
            this._bitmapY = texture.$bitmapY - texture.$offsetY;
            this.checkComp();
        }

        private setBytes(bytes: ByteArray, pos: number = 0): void {
            let s = MergedBmp;
            bytes.position = pos;
            let n: number = bytes.readShort();
            let frames: number[][] = this._frames = [];
            frames.length = n;
            let len = s.Pos.length;
            for (let i = 0; i < n; i++) {
                frames[i] = [];
                frames[i].length = len;
                for (let j = 0; j < len; j++) {
                    bytes.position = pos + s.HeadSize + (s.Pos.length * i + j) * s.Size;
                    frames[i][j] = bytes.readShort();
                }
            }
        }

        private setJson(json: any): void {
            this._json = json;
            this._jsonKeys = Object.keys(json.frames);
        }

        private checkComp(): void {
            let self = this;
            if (self.isLoaded) {
                let h = self._onLoaded;
                self._onLoaded = undefined;
                if (h) {
                    h.exec();
                    Pool.release(h);
                }
            }
        }

        public getTexture(frame: string): Texture {
            let self = this;
            if (self._texture == null) {
                return null;
            }
            let texture: Texture = self._subMap[frame];
            if (texture == null) {
                let source: Texture = self._texture;
                let x: number = self.getVal(frame, "x") + self._bitmapX;
                let y: number = self.getVal(frame, "y") + self._bitmapY;
                let w: number = self.getVal(frame, "w");
                let h: number = self.getVal(frame, "h");

                texture = new Texture();
                texture.disposeBitmapData = false;
                texture.$bitmapData = source.$bitmapData;
                texture.$initData(x, y, w, h, 0, 0, w, h, source.$sourceWidth, source.$sourceHeight);

                self._subMap[frame] = texture;
            }
            return texture;
        }

        public getVal(frame: string | number, key: string): number {
            let self = this;
            if (self._frames) {
                let f: number = typeof frame === "string" ? parseInt(frame) : frame;
                return self.getValFromBin(f, key);
            }
            if (this._json) {
                let f: string;
                if (typeof frame === "number") {
                    f = frame.toString();
                } else {
                    f = frame;
                }
                if (this._json.frames.hasOwnProperty(f)) {
                    return this._json.frames[f][key];
                }
            }
            return 0;
        }

        private getValFromBin(frame: number, key: string): number {
            let self = this;
            let s = MergedBmp;
            let idx: number = s.Pos.indexOf(key);
            if (idx < 0) {
                return 0;
            }
            return self._frames[frame][idx];
        }

        private clear(): void {
            let self = this;
            self._frames = null;
            self._json = undefined;
            self._jsonKeys = undefined;
            this._texture = undefined;
            for (let k in this._subMap) {
                let t = this._subMap[k];
                t.dispose();
                this._subMap[k] = undefined;
                delete this._subMap[k];
            }
            this._imgUrl = undefined;
            this._cfgUrl = undefined;
            Pool.release(this._onLoaded);
            this._onLoaded = undefined;
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            this.clear();
        }

    }

}