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
            var DirListRenderer = (function (_super) {
                __extends(DirListRenderer, _super);
                function DirListRenderer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DirListRenderer.prototype.childrenCreated = function () {
                    this.labelDisplay.bold = true;
                    this.width = 230;
                };
                DirListRenderer.prototype.dataChanged = function () {
                    if (this.data != 0 && typeof this.data == "string") {
                        this.labelDisplay.text = this.data;
                        this.labelDisplay.alpha = 1;
                    }
                    else {
                        this.labelDisplay.text = ["类型", "模型"][this.itemIndex];
                        this.labelDisplay.alpha = 0.5;
                    }
                };
                return DirListRenderer;
            }(eui.ItemRenderer));
            animation.DirListRenderer = DirListRenderer;
            __reflect(DirListRenderer.prototype, "tool.ui.animation.DirListRenderer");
        })(animation = ui.animation || (ui.animation = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=DirListRenderer.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
