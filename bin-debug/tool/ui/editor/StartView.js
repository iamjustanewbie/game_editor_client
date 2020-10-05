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
            var StartView = (function (_super) {
                __extends(StartView, _super);
                function StartView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.StartViewSkin";
                    return _this;
                }
                return StartView;
            }(eui.Component));
            editor.StartView = StartView;
            __reflect(StartView.prototype, "tool.ui.editor.StartView");
        })(editor = ui.editor || (ui.editor = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
