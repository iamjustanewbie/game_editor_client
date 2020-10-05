module tool.comp {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import Time = base.time.Time;
    import UpdateItem = base.time.UpdateItem;
    import PoolObject = base.pool.PoolObject;
    import Handler = base.utils.Handler;
    import TimeMgr = base.time.TimeMgr;
    import Pool = base.pool.Pool;
    import delayCall = base.time.delayCall;

    export class UIAnim extends Sprite implements UpdateItem, PoolObject {
        private readonly _bmp: Bitmap;
        private _ctrl: AnimCtrl;
        private _merged: MergedBmp;

        private _source: string;

        private _curTimes: number = 0;

        private _timeOutKey: number = 0;

        public duration: number = 0;
        public times: number = 0;
        public complete: Handler;
        public startPlay: Handler;
        public id: number;

        constructor() {
            super();
            this._bmp = new Bitmap();
            this.addChild(this._bmp);
            this._ctrl = new AnimCtrl();
            this.onAlloc();
        }

        public setSource(source: string, times: number = 1, duration = 0) {
            let self = this;
            if (self._source == source && self._merged && self._merged.isLoaded) {
                this.onLoaded();
                return;
            }
            self.removeCurrent();
            self._curTimes = 0;
            self.times = times;
            self.duration = duration;
            self._source = source;
            self._merged.load(source, Handler.alloc(self, self.onLoaded));
        }

        private onLoaded(): void {
            let self = this;
            let durList = [];
            for (let i: number = 0, n: number = self._merged.numFrames; i < n; i++) {
                durList.push(self._merged.getVal(i, "dur"));
            }
            self._ctrl.init(durList, Handler.alloc(self, self.onComplete), Handler.alloc(self, self.onFrameChange));
            self._ctrl.loop = false;
            self.play();
            self.onFrameChange(0);
        }

        private removeCurrent() {
            let self = this;
            self._source = null;
            self.stop();
            self._bmp.texture = null;
        }

        public play() {
            this._ctrl.play();
            TimeMgr.addUpdateItem(this);
            if (this.startPlay) {
                this.startPlay.exec(this._ctrl.totalTime);
            }
        }

        public stop() {
            this._ctrl.stop();
            TimeMgr.removeUpdateItem(this);
        }

        public update(time: Time) {
            this._ctrl.advanceTime(TimeMgr.getElapseTime(this));
        }

        private onFrameChange(frame: number) {
            let self = this;
            let key: string = frame.toString();
            self._bmp.x = -self._merged.getVal(frame, "sourceW") / 2 + self._merged.getVal(frame, "offX");
            self._bmp.y = -self._merged.getVal(frame, "sourceH") / 2 + self._merged.getVal(frame, "offY");
            self._bmp.texture = self._merged.getTexture(key);
        }

        private onComplete() {
            let self = this;
            self._curTimes++;
            if (self.times <= 0 || self._curTimes < self.times) {
                if (self.duration > 0) {
                    self._bmp.texture = null;
                    self._timeOutKey = delayCall(Handler.alloc(this, this.replay), self.duration);
                } else {
                    this.replay();
                }
            } else {
                if (self.complete) {
                    self.complete.exec(self);
                }
            }
        }

        private replay() {
            this._ctrl.curFrame = 0;
            this._ctrl.play();
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
            this._merged = Pool.alloc(MergedBmp);
        }

        public onRelease(): void {
            this.removeCurrent();
            this.x = 0;
            this.y = 0;
            Pool.release(this.startPlay);
            this.startPlay = null;
            Pool.release(this.complete);
            this.complete = undefined;
            Pool.release(this._merged);
            this._merged = undefined;
        }

    }

}