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
            var ON_DEL_EFT = tool.mod.effect.ON_DEL_EFT;
            var ON_EDITOR_SINGLE = tool.mod.effect.ON_EDITOR_SINGLE;
            var EftAddItem = (function (_super) {
                __extends(EftAddItem, _super);
                function EftAddItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EftAddItem.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenEditor, this);
                };
                EftAddItem.prototype.onDel = function () {
                    this.parent.dispatchEventWith(ON_DEL_EFT, false);
                };
                EftAddItem.prototype.onOpenEditor = function () {
                    var eft = this.data;
                    var render = this;
                    this.parent.dispatchEventWith(ON_EDITOR_SINGLE, false, { eft: eft, render: render });
                };
                EftAddItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.labelDisplay.text = this.itemIndex + 1 + "";
                };
                return EftAddItem;
            }(eui.ItemRenderer));
            effect.EftAddItem = EftAddItem;
            __reflect(EftAddItem.prototype, "tool.ui.effect.EftAddItem");
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EftAddItem.js.map