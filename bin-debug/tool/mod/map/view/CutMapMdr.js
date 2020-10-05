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
        var map;
        (function (map) {
            var MdrBase = base.module.MdrBase;
            var ResUrl = tool.mod.editor.ResUrl;
            var CutMapView = tool.ui.map.CutMapView;
            var CutMapMdr = (function (_super) {
                __extends(CutMapMdr, _super);
                function CutMapMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", CutMapView);
                    return _this;
                }
                CutMapMdr.prototype.onInit = function () {
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                    this._view.top = 0;
                    this._view.right = 0;
                    this._view.bottom = 0;
                    this._view.left = 0;
                };
                CutMapMdr.prototype.addListeners = function () {
                    this._view.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
                    this.onNt(map.CUT_MAP_LIST, this.onList, this);
                };
                CutMapMdr.prototype.removeListeners = function () {
                    this._view.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
                };
                CutMapMdr.prototype.onShow = function () {
                    this._proxy.getCutMapList();
                };
                CutMapMdr.prototype.onHide = function () {
                };
                CutMapMdr.prototype.onTapItem = function (e) {
                    var item = e.item;
                    this.showView(mod.MapViewType.CutMapPanel, item.name);
                };
                CutMapMdr.prototype.onList = function () {
                    var list = this._proxy.getData().cutMapList.map(function (l) {
                        return {
                            name: l,
                            src: ResUrl + "/cutmap/" + l,
                        };
                    });
                    this._view.list.dataProvider = new eui.ArrayCollection(list);
                };
                return CutMapMdr;
            }(MdrBase));
            map.CutMapMdr = CutMapMdr;
            __reflect(CutMapMdr.prototype, "tool.mod.map.CutMapMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
