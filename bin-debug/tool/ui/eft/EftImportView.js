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
            var EftImportView = (function (_super) {
                __extends(EftImportView, _super);
                function EftImportView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.effect.ImportEftSkin";
                    return _this;
                }
                return EftImportView;
            }(eui.Component));
            effect.EftImportView = EftImportView;
            __reflect(EftImportView.prototype, "tool.ui.effect.EftImportView");
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));