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
            var ImportView = (function (_super) {
                __extends(ImportView, _super);
                function ImportView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.ImportViewSkin";
                    return _this;
                }
                return ImportView;
            }(eui.Component));
            animation.ImportView = ImportView;
            __reflect(ImportView.prototype, "tool.ui.animation.ImportView");
        })(animation = ui.animation || (ui.animation = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=ImportView.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
