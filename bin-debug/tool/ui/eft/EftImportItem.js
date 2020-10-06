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
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var ProxyType = tool.mod.ProxyType;
            var Alert = tool.utils.Alert;
            var Handler = base.utils.Handler;
            var ON_IMPORT_DEL = tool.mod.effect.ON_IMPORT_DEL;
            var EftImportItem = (function (_super) {
                __extends(EftImportItem, _super);
                function EftImportItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EftImportItem.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.btnDel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDel, this);
                };
                EftImportItem.prototype.onDel = function () {
                    Alert.cancel("确定删除" + this.data.id + "?", Handler.alloc(this, this.delEft));
                };
                EftImportItem.prototype.delEft = function () {
                    var _p = facade.retMod(ModName.Effect).retProxy(ProxyType.Effect);
                    _p.delEft(this.data.id);
                    this.parent.dispatchEventWith(ON_IMPORT_DEL);
                };
                EftImportItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.labelDisplay.text = this.data.id;
                };
                return EftImportItem;
            }(eui.ItemRenderer));
            effect.EftImportItem = EftImportItem;
            __reflect(EftImportItem.prototype, "tool.ui.effect.EftImportItem");
        })(effect = ui.effect || (ui.effect = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=EftImportItem.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
