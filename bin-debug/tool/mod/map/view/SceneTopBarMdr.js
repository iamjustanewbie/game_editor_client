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
            var SceneTopBarView = tool.ui.scene.SceneTopBarView;
            var ArrayCollection = eui.ArrayCollection;
            var Pool = base.pool.Pool;
            var ViewMgr = game.utils.ViewMgr;
            var Handler = base.utils.Handler;
            var ListUtil = tool.utils.ListUtil;
            var Rectangle = egret.Rectangle;
            var Alert = tool.utils.Alert;
            var SceneTopBarMdr = (function (_super) {
                __extends(SceneTopBarMdr, _super);
                function SceneTopBarMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", SceneTopBarView);
                    return _this;
                }
                SceneTopBarMdr.prototype.onInit = function () {
                    this._view.left = 0;
                    this._view.top = 0;
                    this._proxy = this.retProxy(mod.ProxyType.Scene);
                    this._model = this._proxy.getData();
                    this._map_proxy = this.retProxy(mod.ProxyType.Map);
                    this._map_model = this._map_proxy.getData();
                    this._btnPro = new ArrayCollection(["选择场景"]);
                    this._view.list_btn.dataProvider = this._btnPro;
                    this._view.hSlider.maximum = 100;
                    this._view.group_bar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, this._view.width, this._view.height);
                    this._view.hSlider.value = 100;
                    this._view.hSlider.validateNow();
                    this._view.lab_scale.text = "缩放:" + this._view.hSlider.value + "%";
                };
                SceneTopBarMdr.prototype.addListeners = function () {
                    this.onNt(map.ON_XY_CHANGE, this.updatePoint, this);
                    this._view.showLine.addEventListener(egret.Event.CHANGE, this.onLineChange, this);
                    this._view.hSlider.addEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
                    this._view.btnSwitch.addEventListener(egret.Event.CHANGE, this.updateBar, this);
                    this._view.list_btn.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
                    this._view.btnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
                    this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
                    this._view.btnNew.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickNew, this);
                    this._view.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickSave, this);
                    this._view.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickHelp, this);
                    this.onNt(map.NEW_SCENE, this.onNewScene, this);
                    this.onNt(map.SCENE_INFO, this.updateBtnMap, this);
                };
                SceneTopBarMdr.prototype.removeListeners = function () {
                    this._view.showLine.removeEventListener(egret.Event.CHANGE, this.onLineChange, this);
                    this._view.hSlider.removeEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
                    this._view.btnSwitch.removeEventListener(egret.Event.CHANGE, this.updateBar, this);
                    this._view.list_btn.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
                    this._view.btnMain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
                    this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
                    this._view.btnNew.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickNew, this);
                    this._view.btnSave.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickSave, this);
                    this._view.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickHelp, this);
                };
                SceneTopBarMdr.prototype.onNewScene = function (n) {
                    var sceneid = n.body;
                    if (sceneid != -1) {
                        this._model.curSceneId = sceneid;
                        this.onSelectScene();
                    }
                };
                SceneTopBarMdr.prototype.onSelectScene = function () {
                    this._proxy.getSceneInfo(this._model.curSceneId);
                    this.updateBtnScene();
                    if (this._btnPro.length < 2)
                        this._btnPro.addItem("选择地图");
                    this._btnPro.replaceItemAt("选择地图", 1);
                    var mp = this._map_proxy;
                    mp.getMapList();
                };
                SceneTopBarMdr.prototype.onLineChange = function () {
                    this._map_model.isShowMask = this._view.showLine.selected;
                    this.sendNt(map.ON_SHOW_LINE_CHANGE);
                };
                SceneTopBarMdr.prototype.onHSliderChange = function () {
                    var s = Math.round(this._view.hSlider.pendingValue);
                    this._view.lab_scale.text = "缩放:" + s + "%";
                    this.sendNt(map.ON_MAP_SCALE_CHANGE, s);
                };
                SceneTopBarMdr.prototype.onPublish = function () {
                    this._proxy.publish();
                };
                SceneTopBarMdr.prototype.updatePoint = function (n) {
                    var msg = n.body;
                    this._view.lab_point.text = "X:" + msg.c + ",Y:" + msg.r;
                };
                SceneTopBarMdr.prototype.onBack = function () {
                    ViewMgr.getIns().showMain();
                };
                SceneTopBarMdr.prototype.onTapListBtn = function (e) {
                    var src = [];
                    var handle;
                    switch (e.itemIndex) {
                        case 0:
                            src = this._model.sceneList;
                            handle = Handler.alloc(this, this.onSelectedScene);
                            break;
                        case 1:
                            src = this._map_model.mapList;
                            ;
                            handle = Handler.alloc(this, this.onSelectedMap);
                            break;
                    }
                    if (!src || src.length == 0)
                        return;
                    ListUtil.show(src, e.itemRenderer, handle);
                };
                SceneTopBarMdr.prototype.onSelectedSliceStatus = function (e) {
                    // if (this._model.curDrawStatus != e.itemIndex) {
                    //     this._model.curDrawStatus = e.itemIndex;
                    //     this.updateBtnSlice();
                    // }
                };
                SceneTopBarMdr.prototype.ClickNew = function () {
                    this.showView(mod.MapViewType.Import);
                };
                SceneTopBarMdr.prototype.ClickSave = function () {
                    if (!this._model.change) {
                        Alert.confirm("没发现修改");
                    }
                    else if (Object.keys(this._model.sceneInfo.points).length <= 0)
                        Alert.confirm("没配置 出生点");
                    else {
                        this._proxy.saveInfo();
                    }
                };
                SceneTopBarMdr.prototype.ClickHelp = function () {
                    this.showView(mod.MapViewType.SceneHelp);
                };
                SceneTopBarMdr.prototype.onSelectedMap = function (e) {
                    var _this = this;
                    var info = this._model.sceneInfo;
                    var mapid = parseInt(e.item);
                    if (!info) {
                        this._proxy.newSceneInfo(mapid);
                        this.updateBtnMap();
                    }
                    else if (mapid != info.mapid) {
                        var handle = Handler.alloc(this, function () {
                            _this._proxy.newSceneInfo(mapid);
                            _this.updateBtnMap();
                        });
                        Alert.cancel('切换地图会重置场景数据!', handle);
                    }
                };
                SceneTopBarMdr.prototype.onSelectedScene = function (e) {
                    var _this = this;
                    var sceneid = parseInt(e.item);
                    if (this._model.curSceneId != sceneid) {
                        var handle = Handler.alloc(this, function () {
                            _this._model.curSceneId = sceneid;
                            _this.onSelectScene();
                        });
                        if (this._model.change) {
                            Alert.cancel('你当前修改未保存!是否确定切换', handle);
                        }
                        else
                            handle.exec();
                    }
                };
                SceneTopBarMdr.prototype.updateBtnMap = function () {
                    this._btnPro.replaceItemAt("当前地图：" + this._model.sceneInfo.mapid, 1);
                    this.initHSlider();
                    var mp = this._map_proxy;
                    mp.getMapInfo(this._model.sceneInfo.mapid);
                    this._map_model.curMapId = this._model.sceneInfo.mapid;
                };
                SceneTopBarMdr.prototype.updateBtnScene = function () {
                    this._btnPro.replaceItemAt("当前场景：" + this._model.curSceneId, 0);
                };
                SceneTopBarMdr.prototype.onShow = function () {
                    this._view.showLine.selected = this._map_model.isShowMask;
                    this._view.btnSwitch.selected = true;
                    this.updateBar();
                };
                SceneTopBarMdr.prototype.onHide = function () {
                };
                SceneTopBarMdr.prototype.initHSlider = function () {
                    var data = this._map_model.curMapData;
                    if (data) {
                        var sX = gso.gameStage.stageWidth / data.imageWidth;
                        var sY = gso.gameStage.stageHeight / data.imageHeight;
                        var min = Math.min(sX, sY);
                        this._view.hSlider.minimum = Math.round(min * 100);
                    }
                };
                SceneTopBarMdr.prototype.initRangSlider = function () {
                    // this._view.rangeSlider.pendingValue = this._model.curRange;
                    // this._view.lab_range.text = "笔刷:" + this._view.rangeSlider.pendingValue;
                    // this._view.rangeSlider.validateNow();
                };
                SceneTopBarMdr.prototype.updateBar = function () {
                    this._view.btnSwitch.label = this._view.btnSwitch.selected ? "隐藏菜单" : "显示菜单";
                    var t = egret.Tween.get(this._view);
                    if (this._view.btnSwitch.selected) {
                        t.to({ left: 0 }, 300, egret.Ease.sineIn);
                    }
                    else {
                        t.to({ left: -this._view.group_bar.width }, 300, egret.Ease.sineOut);
                    }
                };
                return SceneTopBarMdr;
            }(MdrBase));
            map.SceneTopBarMdr = SceneTopBarMdr;
            __reflect(SceneTopBarMdr.prototype, "tool.mod.map.SceneTopBarMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
