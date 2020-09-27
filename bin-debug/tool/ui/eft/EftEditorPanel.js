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
            var EftEditorPanel = (function (_super) {
                __extends(EftEditorPanel, _super);
                function EftEditorPanel() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.effect.EditorPanelSkin";
                    return _this;
                }
                return EftEditorPanel;
            }(eui.Component));
            effect.EftEditorPanel = EftEditorPanel;
            __reflect(EftEditorPanel.prototype, "tool.ui.effect.EftEditorPanel");
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EftEditorPanel.js.map