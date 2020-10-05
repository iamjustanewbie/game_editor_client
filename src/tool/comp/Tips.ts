module game.comp {

    import Sprite = egret.Sprite;
    import TextField = egret.TextField;
    import egretHorizontalAlign = egret.HorizontalAlign;
    import egretVerticalAlign = egret.VerticalAlign;
    import Tween = egret.Tween;
    import Ease = egret.Ease;
    import EditorUI = tool.EditorUI;

    export class Tips {

        private _tips: Sprite;
        private _txt: TextField;
        private _imgBg: eui.Image;

        private _isShowing: boolean = false;

        private readonly MIN_W: number = 400;

        //构造器
        constructor() {
            this.onInit();
        }

        //单例
        private static _instance: Tips;

        public static getIns(): Tips {
            let self = this;
            if (self._instance == null) {
                self._instance = new Tips();
            }
            return self._instance;
        }

        //初始化
        private onInit() {
            let self = this;
            self._tips = new Sprite();
            self._tips.width = this.MIN_W;
            self._tips.height = 40;
            this._tips.touchEnabled = false;
            this._tips.touchChildren = false;

            self._imgBg = new eui.Image();
            self._imgBg.source = "header_png";
            self._imgBg.height = self._tips.height;
            self._tips.addChild(self._imgBg);

            self._txt = new TextField();
            self._txt.textAlign = egretHorizontalAlign.CENTER;
            self._txt.verticalAlign = egretVerticalAlign.MIDDLE;
            self._txt.height = self._tips.height;
            self._txt.textColor = 0xff0000;
            self._txt.size = 20;
            self._tips.addChild(self._txt);
        }

        //调用显示操作
        public show(str: string) {
            let self = this;
            if (this._isShowing) {
                Tween.removeTweens(self._tips);
            }
            self._tips.alpha = 1;
            self._tips.x = (gso.gameStage.stageWidth - self._tips.width) * 0.5;
            self._tips.y = (gso.gameStage.stageHeight + self._tips.height) * 0.5;
            self._txt.text = str;
            this._tips.width = Math.max(this._txt.textWidth + 200, this.MIN_W);
            this._imgBg.width = this._tips.width;
            this._txt.width = this._tips.width;

            this._isShowing = true;
            if (!self._tips.parent) {
                EditorUI.tip.addChild(self._tips);
            }

            Tween.get(self._tips).to({
                y: self._tips.y - 60,
                alpha: 1
            }, 300, Ease.sineIn).wait(600)
                .to({
                    y: this._tips.y - 2 * self._tips.height,
                    alpha: 0
                }, 200, Ease.sineIn).call(self.onTweenDone, self);
        }

        //动画播放完后回调
        private onTweenDone() {
            let self = this;
            self._isShowing = false;
            if (self._tips.parent) {
                self._tips.parent.removeChild(self._tips);
            }
        }
    }
}