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
        var editor;
        (function (editor) {
            var MapView = (function (_super) {
                __extends(MapView, _super);
                function MapView() {
                    var _this = _super.call(this) || this;
                    _this.map = new eui.Group();
                    _this.addChild(_this.map);
                    _this.slice = new eui.Group();
                    _this.addChild(_this.slice);
                    _this.line = new egret.Shape;
                    _this.addChild(_this.line);
                    return _this;
                }
                return MapView;
            }(eui.Component));
            editor.MapView = MapView;
            __reflect(MapView.prototype, "tool.ui.editor.MapView");
        })(editor = ui.editor || (ui.editor = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
//# sourceMappingURL=MapView.js.map