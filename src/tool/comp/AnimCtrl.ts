module tool.comp {
    import Handler = base.utils.Handler;
    import Pool = base.pool.Pool;

    export class AnimCtrl {

        private _durations: number[] = [];
        private _startTimes: number[] = [];

        private _curFrame: number;
        private _playing: boolean;
        private _loop: boolean;

        private _curTime: number;
        private _totalTime: number;
        private _finalFrame: number;

        private _compHandler: Handler;
        private _changeHandler: Handler;

        public get totalTime(): number {
            return this._totalTime;
        }

        constructor() {
        }

        public init(durations: number[], onComp?: Handler, onChange?: Handler) {
            let self = this;
            Pool.release(self._compHandler);
            Pool.release(self._changeHandler);
            self._compHandler = onComp;
            self._changeHandler = onChange;
            self._finalFrame = durations.length - 1;
            self._totalTime = 0;
            self._durations.length = 0;
            self._startTimes.length = 0;
            for (let i: number = 0, n: number = durations.length; i < n; i++) {
                let dur = durations[i];
                self._durations[i] = dur;
                self._startTimes[i] = self._totalTime;
                self._totalTime += dur;
            }
            self._curFrame = 0;
            self._curTime = 0;
            self._playing = true;
            self._loop = true;
        }

        public set curFrame(value: number) {
            let self = this;
            self._curFrame = value;
            self._curTime = 0;
            for (let i: number = 0; i < value; i++) {
                self._curTime += self._durations[i];
            }
            self.onFrameChange();
        }

        public get curFrame(): number {
            return this._curFrame;
        }

        public set loop(value: boolean) {
            this._loop = value;
        }

        public get loop(): boolean {
            return this._loop;
        }

        public get isPlaying(): boolean {
            return this._playing;
        }

        public get isComplete(): boolean {
            let self = this;
            if (isNaN(self._totalTime) || isNaN(self._curTime)) {
                return false;
            }
            return !self._loop && self._curTime >= self._totalTime;
        }

        public play(): void {
            this._playing = true;
        }

        public stop(): void {
            this._playing = false;
        }

        public advanceTime(elapseTime: number) {
            let self = this;
            if (!self._playing || elapseTime <= 0) {
                return;
            }
            let preFrame: number = self._curFrame;
            let isComplete: boolean = false;
            if (self._loop && self._curTime >= self._totalTime) {
                self._curTime = 0;
                self._curFrame = 0;
            }
            if (self._curTime < self._totalTime) {
                self._curTime += elapseTime;
                while (self._curTime > self._startTimes[self._curFrame] + self._durations[self._curFrame]) {
                    if (self._curFrame == self._finalFrame) {
                        if (self._loop) {
                            self._curTime -= self._totalTime;
                            self._curFrame = 0;
                        } else {
                            isComplete = true;
                            self._curTime = self._totalTime;
                            break;
                        }
                    } else {
                        self._curFrame++;
                    }
                }
                if (self._curFrame == self._finalFrame && self._curTime == self._totalTime) {
                    isComplete = true;
                }
            }
            if (self._curFrame != preFrame) {
                self.onFrameChange();
            }
            if (isComplete) {
                self.onComplete();
            }
        }

        private onFrameChange() {
            if (this._changeHandler) {
                this._changeHandler.exec(this._curFrame);
            }
        }

        private onComplete() {
            if (this._compHandler) {
                this._compHandler.exec();
            }
        }

        public dispose(): void {
            let self = this;
            Pool.release(self._changeHandler);
            self._changeHandler = null;
            Pool.release(self._compHandler);
            self._compHandler = null;
        }

    }

}