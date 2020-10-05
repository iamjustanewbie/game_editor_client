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
    var mod;
    (function (mod) {
        var editor;
        (function (editor) {
            var MdrBase = base.module.MdrBase;
            var ListView = tool.ui.editor.ListView;
            var ArrayCollection = eui.ArrayCollection;
            var Pool = base.pool.Pool;
            var Rectangle = egret.Rectangle;
            var ListMdr = (function (_super) {
                __extends(ListMdr, _super);
                function ListMdr() {
                    var _this = _super.call(this, tool.EditorUI.tip) || this;
                    _this._view = _this.mark("_view", ListView);
                    return _this;
                }
                ListMdr.prototype.onInit = function () {
                    this._listPro = new ArrayCollection();
                    this._view.listItem.dataProvider = this._listPro;
                };
                ListMdr.prototype.addListeners = function () {
                    this._view.maxHeight = this._view.scroll.maxHeight = gso.gameStage.stageHeight * 0.5;
                    this._view.listItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapList, this);
                    gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this);
                    this._view.listItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
                };
                ListMdr.prototype.removeListeners = function () {
                    this._view.listItem.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapList, this);
                    gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hide, this);
                    this._view.listItem.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
                };
                ListMdr.prototype.onTapList = function (e) {
                    e.stopImmediatePropagation();
                };
                ListMdr.prototype.onTapItem = function (e) {
                    var h = this._showArgs.handle;
                    if (h) {
                        h.exec(e);
                    }
                    this.hide();
                };
                ListMdr.prototype.onShow = function () {
                    if (!this._showArgs) {
                        return;
                    }
                    this._listPro.source = this._showArgs.src;
                    this._view.listItem.selectedIndex = -1;
                    var display = this._showArgs.display;
                    var rect = display.getTransformedBounds(tool.EditorUI.top, Pool.alloc(Rectangle));
                    this._view.width = rect.width + 30;
                    this._view.scroll.width = rect.width;
                    this._view.x = rect.x + (rect.width * 0.5) - (this._view.width * 0.5);
                    this._view.y = rect.y + rect.height;
                    Pool.release(rect);
                };
                ListMdr.prototype.onHide = function () {
                };
                return ListMdr;
            }(MdrBase));
            editor.ListMdr = ListMdr;
            __reflect(ListMdr.prototype, "tool.mod.editor.ListMdr");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
