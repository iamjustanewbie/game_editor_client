module tool.mod.editor {

    import MdrBase = base.module.MdrBase;
    import FontView = tool.ui.editor.FontView;
    import UpdateItem = base.time.UpdateItem;
    import Handler = base.utils.Handler;
    import delayCall = base.time.delayCall;
    import TimeMgr = base.time.TimeMgr;

    export class FontMdr extends MdrBase implements UpdateItem {

        private _view: FontView = this.mark("_view", FontView);

        private _startTime: number;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
        }

        protected addListeners(): void {
            super.addListeners();
            this._view.btnShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShow, this);
        }

        protected removeListeners(): void {
            super.removeListeners();
            this._view.btnShow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShow, this);
        }

        private onCom() {
            delayCall(Handler.alloc(this, this.removeUpdate), 1350);
        }

        private removeUpdate() {
            for (let i = 0; i < this.arr.length; i++) {
                let x = this.arr[i][0];
                let y = this.arr[i][1];
                let a = this.arr[i][2];
                let sx = this.arr[i][3];
                let sy = this.arr[i][4];
                let t = this.arr[i][5];
                console.log(
                    "x:" + x.toFixed(2) +
                    ",y:" + y.toFixed(2) +
                    ",a:" + a.toFixed(2) +
                    ",sx:" + sx.toFixed(2) +
                    ",sy:" + sy.toFixed(2) +
                    ",t:" + t
                );
            }
            TimeMgr.removeUpdateItem(this);
        }

        private onBtnShow() {
            // this.onCom();
            this.arr.length = 0;
            TimeMgr.addUpdateItem(this);
            this._startTime = TimeMgr.time.time;
            this._idx = 0;
        }

        private _idx: number = 0;
        private readonly delay: number = 100;

        private startTw() {
            this.onCom();
            let lab = this._view["label" + this._idx];
            lab.anchorOffsetX = lab.width * .5;
            lab.anchorOffsetY = lab.height * .5;
            // this.showAtk();
            this.showPet();
        }

        private showPet() {
            let t = this._view["label" + this._idx];
            t.alpha = 1;
            t.scaleX = t.scaleY = 1;
            t.x = t.y = 0;
            TweenMax.from(t, 0.5, {scaleX: 2.5, scaleY: 2.5});
            TweenMax.to(t, .4, {
                delay: .4,
                alpha: 0.2,
                y: t.y - 50
            });
        }

        private showAtk() {
            let lab = this._view["label" + this._idx];
            lab.alpha = 1;
            lab.scaleY = lab.scaleX = 1;
            lab.x = 40 * Math.random();
            lab.y = 20 * Math.random();
            let x0 = lab.x + 40;
            let y0 = lab.y - 40;
            let x1 = lab.x + 70;
            let y1 = lab.y + 20;
            TweenMax.from(lab, 0.5, {scaleX: 2.5, scaleY: 2.5});
            this.bezier(lab, 900, {x: x0, y: y0}, {x: x1, y: y1});
            TweenMax.to(lab, 0.3, {delay: 0.59, alpha: 0, scaleX: 0.3, scaleY: 0.3});
        }

        private bezier(dsp, time, centerPt, endPt) {
            function onUpdate() {
                let val = obj.value;
                dsp.x = (1 - val) * (1 - val) * startPt.x + 2 * val * (1 - val) * centerPt.x + val * val * endPt.x;
                dsp.y = (1 - val) * (1 - val) * startPt.y + 2 * val * (1 - val) * centerPt.y + val * val * endPt.y
            }

            let obj = {
                value: 0
            };
            let startPt = {
                x: dsp.x,
                y: dsp.y
            };
            TweenMax.to(obj, 0.001 * time, {
                value: 1,
                onUpdate: onUpdate.bind(this),
                ease: Linear.easeNone
            })
        }

        protected onShow(): void {
            super.onShow();
        }

        private arr = [];

        update(time: base.time.Time) {
            let lab = this._view.label0;
            let x = lab.x;
            let y = lab.y;
            let a = lab.alpha;
            let sx = lab.scaleX;
            let sy = lab.scaleY;
            let t = time.time - this._startTime;
            this.arr[this.arr.length] = [x, y, a, sx, sy, t];

            if (this._idx > 4) {
                this.removeUpdate();
                return;
            }

            if (t >= this._idx * this.delay) {
                this.startTw();
                this._idx++;
            }
        }
    }
}