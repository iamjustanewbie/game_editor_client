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
            var TopBarView = (function (_super) {
                __extends(TopBarView, _super);
                function TopBarView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.editor.TopBarViewSkin";
                    return _this;
                }
                return TopBarView;
            }(eui.Component));
            editor.TopBarView = TopBarView;
            __reflect(TopBarView.prototype, "tool.ui.editor.TopBarView");
        })(editor = ui.editor || (ui.editor = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
