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
        var effect;
        (function (effect) {
            var EftEditorView = (function (_super) {
                __extends(EftEditorView, _super);
                function EftEditorView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.effect.EftEditorViewSkin";
                    return _this;
                }
                return EftEditorView;
            }(eui.Component));
            effect.EftEditorView = EftEditorView;
            __reflect(EftEditorView.prototype, "tool.ui.effect.EftEditorView");
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
