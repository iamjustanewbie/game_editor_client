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
        var animation;
        (function (animation) {
            var MdrBase = base.module.MdrBase;
            var ImportView = tool.ui.animation.ImportView;
            var ArrayCollection = eui.ArrayCollection;
            var DirListRenderer = tool.ui.animation.DirListRenderer;
            var ListUtil = tool.utils.ListUtil;
            var Handler = base.utils.Handler;
            var ImportMdr = (function (_super) {
                __extends(ImportMdr, _super);
                function ImportMdr() {
                    var _this = _super.call(this, tool.EditorUI.top) || this;
                    _this._view = _this.mark("_view", ImportView);
                    return _this;
                }
                ImportMdr.prototype.onInit = function () {
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = -80;
                    this._dirPro = new ArrayCollection([0, 0]);
                    this._view.list_dir.dataProvider = this._dirPro;
                    this._view.list_dir.itemRenderer = DirListRenderer;
                    this._proxy = this.retProxy(mod.ProxyType.Animation);
                    this._model = this._proxy.getData();
                };
                ImportMdr.prototype.addListeners = function () {
                    this.onNt(animation.ON_GET_LIST, this.onGetList, this);
                    this.onNt(animation.IMPORT_SUCCESS, this.onImportSuccess, this);
                    this.onNt(animation.ON_ID_CHANGED, this.updateId, this);
                    this._view.list_dir.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
                    this._view.btnImport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnImport, this);
                    this._view.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                };
                ImportMdr.prototype.removeListeners = function () {
                    this._view.list_dir.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
                    this._view.btnImport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnImport, this);
                    this._view.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                };
                ImportMdr.prototype.onBtnClose = function () {
                    this.hide();
                };
                ImportMdr.prototype.onImportSuccess = function () {
                    this._model.importId = this._view.input.text;
                    this.sendNt(animation.ON_ID_CHANGED);
                    this.hide();
                };
                ImportMdr.prototype.onBtnImport = function () {
                    for (var i = 0, l = this._dirPro.length; i < l; ++i) {
                        var item = this._dirPro.getItemAt(i);
                        if (item == 0) {
                            alert("请选择动画目录");
                            return;
                        }
                    }
                    if (this._view.input.text.trim() == "") {
                        alert("请输入动画ID!");
                        return;
                    }
                    this._proxy.importAnimation(this._view.input.text.trim());
                };
                ImportMdr.prototype.onTapDir = function (e) {
                    if (e.itemIndex == animation.DirIdx.Model && this._model.importDir.length == 0) {
                        return;
                    }
                    this._model.importDir.length = e.itemIndex;
                    this._proxy.getList();
                };
                ImportMdr.prototype.updateId = function () {
                    this._view.input.text = this._model.importId == undefined ? "" : this._model.importId;
                    this._view.btnClose.visible = this._model.importId != undefined;
                };
                ImportMdr.prototype.onGetList = function (n) {
                    var _this = this;
                    var _a = n.body, list = _a.list, idx = _a.idx;
                    if (list.length == 0) {
                        return;
                    }
                    if (idx > animation.DirIdx.Model) {
                        return;
                    }
                    if (idx == animation.DirIdx.Part) {
                        this._dirPro.replaceItemAt(0, animation.DirIdx.Model);
                    }
                    ListUtil.show(list, this._view.list_dir.getChildAt(idx), Handler.alloc(this, function (e) {
                        _this._model.importDir[idx] = e.item;
                        _this._dirPro.replaceItemAt(e.item, idx);
                        if (idx == animation.DirIdx.Model) {
                            _this._proxy.getList();
                        }
                    }));
                };
                ImportMdr.prototype.onShow = function () {
                    for (var i = 0, l = this._dirPro.length; i < l; ++i) {
                        this._dirPro.replaceItemAt(this._model.importDir[i], i);
                    }
                    this.updateId();
                    this._view.list_dir.selectedIndex = -1;
                };
                ImportMdr.prototype.onHide = function () {
                };
                return ImportMdr;
            }(MdrBase));
            animation.ImportMdr = ImportMdr;
            __reflect(ImportMdr.prototype, "tool.mod.animation.ImportMdr");
        })(animation = mod.animation || (mod.animation = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=ImportMdr.js.map