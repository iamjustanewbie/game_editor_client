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
            var SceneImportView = (function (_super) {
                __extends(SceneImportView, _super);
                function SceneImportView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.SceneImportSkin";
                    return _this;
                }
                return SceneImportView;
            }(eui.Component));
            scene.SceneImportView = SceneImportView;
            __reflect(SceneImportView.prototype, "tool.ui.scene.SceneImportView");
        })(scene = ui.scene || (ui.scene = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
