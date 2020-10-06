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
            var TopBarView = tool.ui.editor.TopBarView;
            var ArrayCollection = eui.ArrayCollection;
            var Pool = base.pool.Pool;
            var ViewMgr = game.utils.ViewMgr;
            var Handler = base.utils.Handler;
            var ListUtil = tool.utils.ListUtil;
            var Rectangle = egret.Rectangle;
            var TopBarMdr = (function (_super) {
                __extends(TopBarMdr, _super);
                function TopBarMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", TopBarView);
                    return _this;
                }
                TopBarMdr.prototype.onInit = function () {
                    this._view.left = 0;
                    this._view.top = 0;
                    this._proxy = this.retProxy(mod.ProxyType.Map);
                    this._model = this._proxy.getData();
                    this._btnPro = new ArrayCollection(["选择地图", "选择格子状态"]);
                    this._view.list_btn.dataProvider = this._btnPro;
                    this._view.hSlider.maximum = 100;
                    this._view.rangeSlider.minimum = 0;
                    this._view.rangeSlider.maximum = 10;
                    this._view.group_bar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, this._view.width, this._view.height);
                };
                TopBarMdr.prototype.addListeners = function () {
                    this.onNt(map.ON_XY_CHANGE, this.updatePoint, this);
                    this._view.showLine.addEventListener(egret.Event.CHANGE, this.onLineChange, this);
                    this._view.hSlider.addEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
                    this._view.rangeSlider.addEventListener(egret.Event.CHANGE, this.onRangeSliderChange, this);
                    this._view.btnSwitch.addEventListener(egret.Event.CHANGE, this.updateBar, this);
                    this._view.list_btn.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
                    this._view.btnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
                    this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
                };
                TopBarMdr.prototype.removeListeners = function () {
                    this._view.showLine.removeEventListener(egret.Event.CHANGE, this.onLineChange, this);
                    this._view.hSlider.removeEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
                    this._view.rangeSlider.removeEventListener(egret.Event.CHANGE, this.onRangeSliderChange, this);
                    this._view.btnSwitch.removeEventListener(egret.Event.CHANGE, this.updateBar, this);
                    this._view.list_btn.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
                    this._view.btnMain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
                    this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
                };
                TopBarMdr.prototype.onLineChange = function () {
                    this._model.isShowMask = this._view.showLine.selected;
                    this.sendNt(map.ON_SHOW_LINE_CHANGE);
                };
                TopBarMdr.prototype.onHSliderChange = function () {
                    var s = Math.round(this._view.hSlider.pendingValue);
                    this._view.lab_scale.text = "缩放:" + s + "%";
                    this.sendNt(map.ON_MAP_SCALE_CHANGE, s);
                };
                TopBarMdr.prototype.onRangeSliderChange = function () {
                    var s = this._view.rangeSlider.pendingValue;
                    this._view.lab_range.text = "笔刷:" + s;
                    this._model.curRange = +s | 0;
                };
                TopBarMdr.prototype.onPublish = function () {
                    if (this._showArgs == map.MapType.Mask) {
                        this._proxy.publishMap();
                    }
                };
                TopBarMdr.prototype.updatePoint = function (n) {
                    var msg = n.body;
                    this._view.lab_point.text = "X:" + msg.c + ",Y:" + msg.r;
                };
                TopBarMdr.prototype.onBack = function () {
                    ViewMgr.getIns().showMain();
                };
                TopBarMdr.prototype.onTapListBtn = function (e) {
                    var src = [];
                    var handle;
                    switch (e.itemIndex) {
                        case 0:
                            src = this._model.mapList;
                            handle = Handler.alloc(this, this.onSelectedMap);
                            break;
                        case 1:
                            src = map.SliceStatusName;
                            handle = Handler.alloc(this, this.onSelectedSliceStatus);
                            break;
                    }
                    if (!src || src.length == 0) {
                        return;
                    }
                    ListUtil.show(src, e.itemRenderer, handle);
                };
                TopBarMdr.prototype.onSelectedSliceStatus = function (e) {
                    if (this._model.curDrawStatus != e.itemIndex) {
                        this._model.curDrawStatus = e.itemIndex;
                        this.updateBtnSlice();
                    }
                };
                TopBarMdr.prototype.onSelectedMap = function (e) {
                    if (this._model.curMapId != parseInt(e.item)) {
                        this._model.curMapId = parseInt(e.item);
                        this._proxy.getMapInfo(this._model.curMapId);
                        this.updateBtnMap();
                    }
                };
                TopBarMdr.prototype.updateBtnSlice = function () {
                    this._btnPro.replaceItemAt("格子状态：" + map.SliceStatusName[this._model.curDrawStatus], 1);
                    this._view.shpStatus.fillColor = map.SliceColor[this._model.curDrawStatus];
                    this._view.shpStatus.fillAlpha = this._model.curDrawStatus == map.SliceStatus.Enable ? 0 : 0.8;
                };
                TopBarMdr.prototype.updateBtnMap = function () {
                    this._btnPro.replaceItemAt("当前地图：" + this._model.curMapId, 0);
                };
                TopBarMdr.prototype.onShow = function () {
                    this._view.showLine.selected = this._model.isShowMask;
                    this._view.btnSwitch.selected = true;
                    this._view.left = 0;
                    this._btnPro.removeAll();
                    this._btnPro.addItem("选择地图");
                    this.initHSlider();
                    this.initRangSlider();
                    this.updateBar();
                    this.updateBtnMap();
                    this._view.shpStatus.visible = this._showArgs == map.MapType.Mask;
                    if (this._showArgs == map.MapType.Mask) {
                        this._btnPro.addItem("选择格子状态");
                        this.updateBtnSlice();
                    }
                };
                TopBarMdr.prototype.initHSlider = function () {
                    var sX = gso.gameStage.stageWidth / this._model.curMapData.imageWidth;
                    var sY = gso.gameStage.stageHeight / this._model.curMapData.imageHeight;
                    var min = Math.min(sX, sY);
                    this._view.hSlider.minimum = Math.round(min * 100);
                    this._view.hSlider.validateNow();
                    this._view.hSlider.pendingValue = 100;
                    this._view.lab_scale.text = "缩放:" + this._view.hSlider.pendingValue + "%";
                };
                TopBarMdr.prototype.initRangSlider = function () {
                    this._view.rangeSlider.pendingValue = this._model.curRange;
                    this._view.lab_range.text = "笔刷:" + this._view.rangeSlider.pendingValue;
                    this._view.rangeSlider.validateNow();
                };
                TopBarMdr.prototype.updateBar = function () {
                    this._view.btnSwitch.label = this._view.btnSwitch.selected ? "隐藏菜单" : "显示菜单";
                    var t = egret.Tween.get(this._view);
                    if (this._view.btnSwitch.selected) {
                        t.to({ left: 0 }, 300, egret.Ease.sineIn);
                    }
                    else {
                        t.to({ left: -this._view.group_bar.width }, 300, egret.Ease.sineOut);
                    }
                };
                return TopBarMdr;
            }(MdrBase));
            map.TopBarMdr = TopBarMdr;
            __reflect(TopBarMdr.prototype, "tool.mod.map.TopBarMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=TopBarMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
