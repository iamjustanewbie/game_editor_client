module tool.mod.animation {

    import facade = base.module.facade;
    import SpriteSheet = egret.SpriteSheet;
    import ImageLoader = egret.ImageLoader;
    import Texture = egret.Texture;
    import TYPE_JSON = RES.ResourceItem.TYPE_JSON;
    import ResUrl = tool.mod.editor.ResUrl;

    export class AnimationModel {

        constructor() {
            this.curFrame = 1;
        }

        public isAnimation: boolean = false;

        public importDir: string[] = []; //导入弹框缓存目录
        public importId: string;
        private _configs: object[];
        public maxFrame: number;
        private _curFrame: number;
        public curDuration: number;
        public duration: number[] = [];
        public origindur: number[] = [];
        public isLoop: boolean = true;
        private _play: boolean = false;
        public isImport: boolean = false;

        private _sheetLoaderMap: { [url: string]: ImageLoader } = {};
        private _sheetMap: { [url: string]: SpriteSheet } = {};
        private _jsonMap: { [url: string]: object } = {};

        public set play(v: boolean) {
            if (this._play == v) {
                return;
            }
            this._play = v;
            facade.sendNt(ANIMATION_PLAY_CHANGE);
        }

        public get play(): boolean {
            return this._play;
        }

        public set curFrame(v: number) {
            this._curFrame = v;
            if (this._curFrame <= this.duration.length) {
                this.curDuration = this.duration[this._curFrame - 1];
            } else {
                this.curDuration = null;
            }
            facade.sendNt(ON_FRAME_CHANGE);
        }

        public get curFrame(): number {
            return this._curFrame;
        }

        public loadCfg() {
            let url = this.getUrl();
            let key = this.importDir.join("/");
            let jsonUrl = url + ".json";
            let cfg = this._jsonMap[key];
            if (!cfg) {
                RES.getResByUrl(jsonUrl, (data) => {
                    cfg = this._jsonMap[key] = data;
                    this.updateCurImgSrc(cfg);
                    let imgUrl = url + ".png";
                    let imgLoad = this._sheetLoaderMap[key] = new egret.ImageLoader();
                    imgLoad.crossOrigin = "anonymous";
                    imgLoad.addEventListener(egret.Event.COMPLETE, this.onLoadedImg, this);
                    imgLoad.load(imgUrl);
                }, this, TYPE_JSON);
            } else {
                this.updateCurImgSrc(cfg);
                this.isImport = true;
                facade.sendNt(ON_IMPORT_ANIMATION);
            }
        }

        private onLoadedImg(e: egret.Event) {
            let loader = <ImageLoader>e.currentTarget;
            loader.removeEventListener(egret.Event.COMPLETE, this.onLoadedImg, this);

            let data = loader.data;
            let tex = new Texture();
            tex._setBitmapData(data);
            let sp = new SpriteSheet(tex);

            for (let k in this._sheetLoaderMap) {
                if (this._sheetLoaderMap[k] == loader) {
                    this._sheetMap[k] = sp;
                }
            }

            this.isImport = true;
            facade.sendNt(ON_IMPORT_ANIMATION);
        }

        private updateCurImgSrc(json: object) {
            let config: object = json["frames"];
            this._configs = [];
            let keys: string[] = Object.keys(config);
            keys.sort(function (a, b): number {
                return parseInt(a) - parseInt(b);
            });
            for (let k of keys) {
                this._configs.push(config[k]);
            }
            this.maxFrame = this._configs.length;
        }

        public getImgConfig() {
            return this._configs[this._curFrame - 1];
        }

        public getImgTex(frame: number): Texture {
            if (!this.isImport) {
                return;
            }
            let key = this.importDir.join("/");
            let sheet = this._sheetMap[key];
            let config = this._configs[frame - 1];
            let texture: Texture = sheet.getTexture(frame.toString());
            if (texture) {
                return texture;
            } else {
                let w = config["w"];
                let h = config["h"];
                let x = config["x"];
                let y = config["y"];
                return sheet.createTexture(frame.toString(), x, y, w, h);
            }
        }

        public getUrl() {
            return ResUrl + "/anim/" + this.importDir.join("/");
        }
    }
}