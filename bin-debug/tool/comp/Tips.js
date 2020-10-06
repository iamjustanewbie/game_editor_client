var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var comp;
    (function (comp) {
        var Sprite = egret.Sprite;
        var TextField = egret.TextField;
        var egretHorizontalAlign = egret.HorizontalAlign;
        var egretVerticalAlign = egret.VerticalAlign;
        var Tween = egret.Tween;
        var Ease = egret.Ease;
        var EditorUI = tool.EditorUI;
        var Tips = (function () {
            //构造器
            function Tips() {
                this._isShowing = false;
                this.MIN_W = 400;
                this.onInit();
            }
            Tips.getIns = function () {
                var self = this;
                if (self._instance == null) {
                    self._instance = new Tips();
                }
                return self._instance;
            };
            //初始化
            Tips.prototype.onInit = function () {
                var self = this;
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
            };
            //调用显示操作
            Tips.prototype.show = function (str) {
                var self = this;
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
            };
            //动画播放完后回调
            Tips.prototype.onTweenDone = function () {
                var self = this;
                self._isShowing = false;
                if (self._tips.parent) {
                    self._tips.parent.removeChild(self._tips);
                }
            };
            return Tips;
        }());
        comp.Tips = Tips;
        __reflect(Tips.prototype, "game.comp.Tips");
    })(comp = game.comp || (game.comp = {}));
})(game || (game = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=Tips.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
