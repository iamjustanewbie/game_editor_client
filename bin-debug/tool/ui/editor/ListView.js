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
            var ListView = (function (_super) {
                __extends(ListView, _super);
                function ListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.editor.ListViewSkin";
                    return _this;
                }
                return ListView;
            }(eui.Component));
            editor.ListView = ListView;
            __reflect(ListView.prototype, "tool.ui.editor.ListView");
        })(editor = ui.editor || (ui.editor = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
