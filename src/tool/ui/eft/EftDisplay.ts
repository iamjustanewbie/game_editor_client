module tool.ui.effect {

    import Sprite = egret.Sprite;
    import UIAnim = tool.comp.UIAnim;
    import Pool = base.pool.Pool;
    import ResUrlC1 = tool.mod.editor.ResUrlC1;
    import PoolObject = base.pool.PoolObject;
    import Handler = base.utils.Handler;
    import Tween = egret.Tween;
    import UpdateItem = base.time.UpdateItem;
    import TimeMgr = base.time.TimeMgr;
    import EftChildren = tool.mod.effect.EftChildren;
    import EftProxy = tool.mod.effect.EftProxy;
    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import ProxyType = tool.mod.ProxyType;

    export class EftDisplay extends Sprite implements PoolObject, UpdateItem {

        private _eft: UIAnim;

        public startX: number;
        public startY: number;
        public endX: number;
        public endY: number;
        public delay: number;

        public showTime: number;

        public scaleX0: number;
        public scaleY0: number;
        public scaleX1: number;
        public scaleY1: number;

        public rotation0: number;
        public rotation1: number;

        public removeDelay: number;

        public tw: number[][];

        public times: number;
        public duration: number = 0;

        public id: string;

        public index: number;

        private _startTime: number;

        public totalTime: number;

        public tweenTime: number;

        private _eftName: string;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        public initData(id, x: number, y: number) {
            this.x = +x | 0;
            this.y = +y | 0;
            this.id = id;
            this.delay = 0;
            this.rotation = 0;
            this.times = 1;
            this.duration = 0;
            this.startX = this.x;
            this.startY = this.y;
            this.endX = this.startX;
            this.endY = this.startY;
            this.removeDelay = 0;
            this.scaleX = this.scaleY = this.scaleX0 = this.scaleY0 = this.scaleX1 = this.scaleY1 = 1;
            this.rotation0 = this.rotation1 = 0;
        }

        public setData(data: EftChildren) {
            this.id = data.id;
            this.x = data.x;
            this.y = data.y;
            this.startX = data.x;
            this.startY = data.y;
            this.endX = data.ex;
            this.endY = data.ey;
            this.delay = data.delay;
            this.rotation = data.r;
            this.times = data.times;
            this.duration = +data.duration | 0;
            this.removeDelay = data.rDelay;
            this.scaleX = data.sx == undefined ? 1 : data.sx;
            this.scaleY = data.sy == undefined ? 1 : data.sy;
            this.tw = data.tw;
            if (data.tw && data.tw.length > 2) {
                let start = data.tw[0];
                let end = data.tw[data.tw.length - 1];

                this.showTime = start[0];
                this.scaleX0 = start[3];
                this.scaleY0 = start[4];
                this.rotation0 = start[5];

                this.scaleX1 = end[3];
                this.scaleY1 = end[4];
                this.rotation1 = end[5];
            } else {
                this.scaleX0 = this.scaleY0 = this.scaleX1 = this.scaleY1 = 1;
                this.rotation0 = this.rotation1 = 0;
            }
        }

        private onAddToStage() {
            this._eft = Pool.alloc(UIAnim);
            let url = ResUrlC1 + "/assets/anim/effect/" + this.id + ".png";
            this._eft.complete = Handler.alloc(this, this.onComp);
            this._eft.startPlay = Handler.alloc(this, this.onStartPlay);
            this._eft.setSource(url, this.times, this.duration);
            this.addChild(this._eft);
        }

        private onRemoveFromStage() {
            this.removeEft();
        }

        public getName(): string {
            if (this._eftName == undefined) {
                let p: EftProxy = facade.retMod(ModName.Effect).retProxy(ProxyType.Effect);
                let idMap = p.getData().eftIdMap;
                if (!idMap) {
                    return;
                }
                for (let k in idMap) {
                    if (idMap[k] == this.id) {
                        let a = k.split("/");
                        this._eftName = a[a.length - 1];
                        break;
                    }
                }
            }
            return this._eftName;
        }

        public updateXY(x, y: number) {
            this.x = +x | 0;
            this.y = +y | 0;
            this.startX = x;
            this.startY = y;
            this.endX = this.startX;
            this.endY = this.startY;
        }

        public updatePos(x: number, y: number) {
            this.startX = x;
            this.startY = y;
            this.x = x;
            this.y = y;
        }

        public updateEndPos(x: number, y: number) {
            this.endX = x;
            this.endY = y;
        }

        public updateCfg(delay: number, times: number, duration: number) {
            this.delay = delay;
            this.times = times;
            this.duration = duration;
        }

        public onAlloc(): void {
        }

        private onStartPlay(totalTime: number) {
            this.totalTime = totalTime;
            if (this.scaleX0 == this.scaleX1
                && this.scaleY0 == this.scaleY1
                && this.rotation0 == this.rotation1
                && this.startX == this.endX
                && this.startY == this.endY
            ) {
                this.tw = undefined;
                return;
            }
            this.scaleX = this.scaleX0;
            this.scaleY = this.scaleY0;
            this.x = this.startX;
            this.y = this.startY;
            this.rotation = this.rotation0;
            let twTime = this.tweenTime || this.totalTime;
            Tween.get(this).to({
                x: this.endX,
                y: this.endY,
                scaleX: this.scaleX1,
                scaleY: this.scaleY1,
                rotation: this.rotation1,
            }, twTime);
            this.tw = [];
            let time = 0;
            let x = 0;
            let y = 0;
            let scaleX = this.scaleX0;
            let scaleY = this.scaleY0;
            let rotation = this.rotation0;
            let alpha = this.alpha;
            let obj = [time, x, y, scaleX, scaleY, rotation, alpha];
            this.tw.push(obj);
            this._startTime = TimeMgr.time.time;
            TimeMgr.addUpdateItem(this);
        }

        private onStop() {
            TimeMgr.removeUpdateItem(this);
            Tween.removeTweens(this);
            if (this.tw && this.tw.length > 2) {
                let t = TimeMgr.time.time - this._startTime;
                let tx = this.endX - this.startX;
                let ty = this.endY - this.startY;
                let scaleX = this.scaleX1;
                let scaleY = this.scaleY1;
                let rotation = this.rotation1;
                let alpha = this.alpha;
                this.tw[this.tw.length - 1] = [t, tx, ty, scaleX, scaleY, rotation, alpha];
            }
        }

        public update(time: base.time.Time) {
            let t = TimeMgr.time.time - this._startTime;
            let tx = Math.floor((this.x - this.startX) * 100) / 100;    //相较起点偏移量
            let ty = Math.floor((this.y - this.startY) * 100) / 100;    //相较起点偏移量
            let scaleX = Math.floor(this.scaleX * 100) / 100;
            let scaleY = Math.floor(this.scaleY * 100) / 100;
            let rotation = Math.floor(this.rotation * 100) / 100;
            let alpha = Math.floor(this.alpha * 100) / 100;
            let obj = [t, tx, ty, scaleX, scaleY, rotation, alpha];
            this.tw.push(obj);
        }

        private onComp() {
            if (this.removeDelay > 0) {
                Tween.get(this).to({alpha: 0}, this.removeDelay).call(this.removeEft, this);
            } else {
                this.removeEft();
            }
        }

        private removeEft() {
            this.onStop();
            this.alpha = 1;
            if (this._eft && this._eft.parent) {
                this._eft.parent.removeChild(this._eft);
            }
            Pool.release(this._eft);
            this._eft = null;
        }

        public get isEftComp(): boolean {
            return this._eft == null;
        }

        public dispose(): void {
        }

        public onRelease(): void {
            this.removeEft();
            this.x = 0;
            this.y = 0;
            this.id = undefined;
            this._eftName = undefined;
            this.tweenTime = undefined;
            this.delay = 0;
            this.alpha = 1;
            this.times = 1;
            this.duration = 0;
            this.endX = this.startX = this.x;
            this.endY = this.startY = this.y;
            this.scaleX = this.scaleY = this.scaleX0 = this.scaleY0 = this.scaleX1 = this.scaleY1 = 1;
            this.rotation = this.rotation0 = this.rotation1 = 0;
        }
    }
}