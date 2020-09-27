module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import SceneTopBarView = tool.ui.scene.SceneTopBarView;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.module.GameNT;
    import Pool = base.pool.Pool;
    import ViewMgr = game.utils.ViewMgr;
    import Handler = base.utils.Handler;
    import ListUtil = tool.utils.ListUtil;
    import Rectangle = egret.Rectangle;
    import Alert = tool.utils.Alert;
    export class SceneTopBarMdr extends MdrBase {

        private _view: SceneTopBarView = this.mark("_view", SceneTopBarView);

        private _btnPro: ArrayCollection;
        private _proxy: SceneProxy;
        private _model: SceneModel;

        private _map_proxy: MapProxy;
        private _map_model: MapModel;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._view.left = 0;
            this._view.top = 0;

            this._proxy = this.retProxy(ProxyType.Scene) as SceneProxy;
            this._model = this._proxy.getData();
            this._map_proxy = this.retProxy(ProxyType.Map) as MapProxy;
            this._map_model = this._map_proxy.getData();

            this._btnPro = new ArrayCollection(["选择场景"]);
            this._view.list_btn.dataProvider = this._btnPro;
            this._view.hSlider.maximum = 100;
            this._view.group_bar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, this._view.width, this._view.height);

            this._view.hSlider.value = 100;
            this._view.hSlider.validateNow();
            this._view.lab_scale.text = "缩放:" + this._view.hSlider.value + "%";
        }

        protected addListeners(): void {
            this.onNt(ON_XY_CHANGE, this.updatePoint, this);
            this._view.showLine.addEventListener(egret.Event.CHANGE, this.onLineChange, this);
            this._view.hSlider.addEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
            this._view.btnSwitch.addEventListener(egret.Event.CHANGE, this.updateBar, this);
            this._view.list_btn.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
            this._view.btnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
            this._view.btnNew.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickNew, this);
            this._view.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickSave, this);
            this._view.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickHelp, this);
            this.onNt(NEW_SCENE, this.onNewScene, this);
            this.onNt(SCENE_INFO, this.updateBtnMap, this);
        }

        protected removeListeners(): void {
            this._view.showLine.removeEventListener(egret.Event.CHANGE, this.onLineChange, this);
            this._view.hSlider.removeEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
            this._view.btnSwitch.removeEventListener(egret.Event.CHANGE, this.updateBar, this);
            this._view.list_btn.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
            this._view.btnMain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
            this._view.btnNew.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickNew, this);
            this._view.btnSave.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickSave, this);
            this._view.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickHelp, this);
        }

        private onNewScene(n: GameNT) {
            let sceneid = n.body;
            if (sceneid != -1) {
                this._model.curSceneId = sceneid;
                this.onSelectScene();
            }
        }


        private onSelectScene() {
            this._proxy.getSceneInfo(this._model.curSceneId);
            this.updateBtnScene();
            if (this._btnPro.length < 2)
                this._btnPro.addItem("选择地图");
            this._btnPro.replaceItemAt("选择地图", 1);
            let mp = this._map_proxy;
            mp.getMapList()
        }

        private onLineChange() {
            this._map_model.isShowMask = this._view.showLine.selected;
            this.sendNt(ON_SHOW_LINE_CHANGE);
        }

        private onHSliderChange() {
            let s = Math.round(this._view.hSlider.pendingValue);
            this._view.lab_scale.text = "缩放:" + s + "%";
            this.sendNt(ON_MAP_SCALE_CHANGE, s);
        }

        private onPublish() {
            this._proxy.publish();
        }

        private updatePoint(n: GameNT) {
            let msg = n.body;
            this._view.lab_point.text = "X:" + msg.c + ",Y:" + msg.r;
        }

        private onBack() {
            ViewMgr.getIns().showMain();
        }

        private onTapListBtn(e: eui.ItemTapEvent) {
            let src: any[] = [];
            let handle;
            switch (e.itemIndex) {
                case 0:
                    src = this._model.sceneList;
                    handle = Handler.alloc(this, this.onSelectedScene);
                    break;
                case 1:
                    src = this._map_model.mapList;;
                    handle = Handler.alloc(this, this.onSelectedMap);
                    break;
            }
            if (!src || src.length == 0)
                return;
            ListUtil.show(src, e.itemRenderer, handle);
        }

        private onSelectedSliceStatus(e: eui.ItemTapEvent) {
            // if (this._model.curDrawStatus != e.itemIndex) {
            //     this._model.curDrawStatus = e.itemIndex;
            //     this.updateBtnSlice();
            // }
        }

        private ClickNew() {
            this.showView(MapViewType.Import);
        }

        private ClickSave() {
            if (!this._model.change) {
                Alert.confirm("没发现修改");
            }
            else if (Object.keys(this._model.sceneInfo.points).length <= 0)
                Alert.confirm("没配置 出生点");
            else {
                this._proxy.saveInfo();
            }
        }

        private ClickHelp() {
            this.showView(MapViewType.SceneHelp);
        }

        private onSelectedMap(e: eui.ItemTapEvent) {
            let info = this._model.sceneInfo;
            let mapid = parseInt(e.item);
            if (!info) {
                this._proxy.newSceneInfo(mapid);
                this.updateBtnMap();
            }
            else if (mapid != info.mapid) {
                let handle = Handler.alloc(this, () => {
                    this._proxy.newSceneInfo(mapid);
                    this.updateBtnMap();
                });
                Alert.cancel('切换地图会重置场景数据!', handle);
            }
        }

        private onSelectedScene(e: eui.ItemTapEvent) {
            let sceneid = parseInt(e.item);
            if (this._model.curSceneId != sceneid) {
                
                let handle = Handler.alloc(this, () => {
                    this._model.curSceneId = sceneid;
                    this.onSelectScene();
                });
                if (this._model.change) {
                    Alert.cancel('你当前修改未保存!是否确定切换', handle);
                }
                else
                    handle.exec();
            }
        }

        private updateBtnMap() {
            this._btnPro.replaceItemAt("当前地图：" + this._model.sceneInfo.mapid, 1);
            this.initHSlider();
            let mp = this._map_proxy;
            mp.getMapInfo(this._model.sceneInfo.mapid);
            this._map_model.curMapId = this._model.sceneInfo.mapid;
        }

        private updateBtnScene() {
            this._btnPro.replaceItemAt("当前场景：" + this._model.curSceneId, 0);
        }

        protected onShow(): void {
            this._view.showLine.selected = this._map_model.isShowMask;
            this._view.btnSwitch.selected = true;
            this.updateBar();
        }

        protected onHide() {

        }

        private initHSlider() {
            let data = this._map_model.curMapData;
            if (data) {
                let sX = gso.gameStage.stageWidth / data.imageWidth;
                let sY = gso.gameStage.stageHeight / data.imageHeight;
                let min = Math.min(sX, sY);
                this._view.hSlider.minimum = Math.round(min * 100);
            }
        }

        private initRangSlider() {
            // this._view.rangeSlider.pendingValue = this._model.curRange;
            // this._view.lab_range.text = "笔刷:" + this._view.rangeSlider.pendingValue;
            // this._view.rangeSlider.validateNow();
        }

        private updateBar() {
            this._view.btnSwitch.label = this._view.btnSwitch.selected ? "隐藏菜单" : "显示菜单";
            let t = egret.Tween.get(this._view);
            if (this._view.btnSwitch.selected) {
                t.to({ left: 0 }, 300, egret.Ease.sineIn);
            } else {
                t.to({ left: -this._view.group_bar.width }, 300, egret.Ease.sineOut);
            }
        }
    }
}
