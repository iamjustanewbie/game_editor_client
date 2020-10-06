var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var tool;
(function (tool) {
    var ui;
    (function (ui) {
        var animation;
        (function (animation) {
            var AnimationView = (function (_super) {
                __extends(AnimationView, _super);
                function AnimationView() {
                    var _this = _super.call(this) || this;
                    // let g = new Group();
                    // g.width = g.height = 910;
                    // g.verticalCenter = 0;
                    // g.horizontalCenter = 0;
                    // this.addChild(g);
                    _this.img = new egret.Bitmap();
                    _this.line = new egret.Shape();
                    _this.skinName = "skins.AnimationViewSkin";
                    return _this;
                }
                return AnimationView;
            }(eui.Component));
            animation.AnimationView = AnimationView;
            __reflect(AnimationView.prototype, "tool.ui.animation.AnimationView");
        })(animation = ui.animation || (ui.animation = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=AnimationView.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
