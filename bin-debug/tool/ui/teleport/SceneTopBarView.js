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
        var scene;
        (function (scene) {
            var SceneTopBarView = (function (_super) {
                __extends(SceneTopBarView, _super);
                function SceneTopBarView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.SceneTopBarViewSkin";
                    return _this;
                }
                return SceneTopBarView;
            }(eui.Component));
            scene.SceneTopBarView = SceneTopBarView;
            __reflect(SceneTopBarView.prototype, "tool.ui.scene.SceneTopBarView");
        })(scene = ui.scene || (ui.scene = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=SceneTopBarView.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
