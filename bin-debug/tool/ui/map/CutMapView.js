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
        var map;
        (function (map) {
            var CutMapView = (function (_super) {
                __extends(CutMapView, _super);
                function CutMapView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.map.CutMapViewSkin";
                    return _this;
                }
                return CutMapView;
            }(eui.Component));
            map.CutMapView = CutMapView;
            __reflect(CutMapView.prototype, "tool.ui.map.CutMapView");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
