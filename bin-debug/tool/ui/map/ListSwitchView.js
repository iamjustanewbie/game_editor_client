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
            var ListSwitchView = (function (_super) {
                __extends(ListSwitchView, _super);
                function ListSwitchView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.map.ListSwitchSkin";
                    return _this;
                }
                return ListSwitchView;
            }(eui.Component));
            map.ListSwitchView = ListSwitchView;
            __reflect(ListSwitchView.prototype, "tool.ui.map.ListSwitchView");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=ListSwitchView.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
