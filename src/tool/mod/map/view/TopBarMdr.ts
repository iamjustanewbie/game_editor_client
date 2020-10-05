module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import TopBarView = tool.ui.editor.TopBarView;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.module.GameNT;
    import Pool = base.pool.Pool;
    import ViewMgr = game.utils.ViewMgr;
    import Handler = base.utils.Handler;
    import ListUtil = tool.utils.ListUtil;
    import Rectangle = egret.Rectangle;

    export class TopBarMdr extends MdrBase {

        private _view: TopBarView = this.mark("_view", TopBarView);

        private _btnPro: ArrayCollection;
        private _proxy: MapProxy;
        private _model: MapModel;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._view.left = 0;
            this._view.top = 0;

            this._proxy = this.retProxy(ProxyType.Map) as MapProxy;
            this._model = this._proxy.getData();
            this._btnPro = new ArrayCollection(["选择地图", "选择格子状态"]);
            this._view.list_btn.dataProvider = this._btnPro;
            this._view.hSlider.maximum = 100;
            this._view.rangeSlider.minimum = 0;
            this._view.rangeSlider.maximum = 10;
            this._view.group_bar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, this._view.width, this._view.height);
        }

        protected addListeners(): void {
            this.onNt(ON_XY_CHANGE, this.updatePoint, this);
            this._view.showLine.addEventListener(egret.Event.CHANGE, this.onLineChange, this);
            this._view.hSlider.addEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
            this._view.rangeSlider.addEventListener(egret.Event.CHANGE, this.onRangeSliderChange, this);
            this._view.btnSwitch.addEventListener(egret.Event.CHANGE, this.updateBar, this);
            this._view.list_btn.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
            this._view.btnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
        }

        protected removeListeners(): void {
            this._view.showLine.removeEventListener(egret.Event.CHANGE, this.onLineChange, this);
            this._view.hSlider.removeEventListener(egret.Event.CHANGE, this.onHSliderChange, this);
            this._view.rangeSlider.removeEventListener(egret.Event.CHANGE, this.onRangeSliderChange, this);
            this._view.btnSwitch.removeEventListener(egret.Event.CHANGE, this.updateBar, this);
            this._view.list_btn.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapListBtn, this);
            this._view.btnMain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
        }

        private onLineChange() {
            this._model.isShowMask = this._view.showLine.selected;
            this.sendNt(ON_SHOW_LINE_CHANGE);
        }

        private onHSliderChange() {
            let s = Math.round(this._view.hSlider.pendingValue);
            this._view.lab_scale.text = "缩放:" + s + "%";
            this.sendNt(ON_MAP_SCALE_CHANGE, s);
        }

        private onRangeSliderChange() {
            let s = this._view.rangeSlider.pendingValue;
            this._view.lab_range.text = "笔刷:" + s;
            this._model.curRange = +s | 0;
        }

        private onPublish() {
            if (this._showArgs == MapType.Mask) {
                this._proxy.publishMap();
            }
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
                    src = this._model.mapList;
                    handle = Handler.alloc(this, this.onSelectedMap);
                    break;
                case 1:
                    src = SliceStatusName;
                    handle = Handler.alloc(this, this.onSelectedSliceStatus);
                    break;
            }
            if (!src || src.length == 0) {
                return;
            }
            ListUtil.show(src, e.itemRenderer, handle);
        }

        private onSelectedSliceStatus(e: eui.ItemTapEvent) {
            if (this._model.curDrawStatus != e.itemIndex) {
                this._model.curDrawStatus = e.itemIndex;
                this.updateBtnSlice();
            }
        }

        private onSelectedMap(e: eui.ItemTapEvent) {
            if (this._model.curMapId != parseInt(e.item)) {
                this._model.curMapId = parseInt(e.item);
                this._proxy.getMapInfo(this._model.curMapId);
                this.updateBtnMap();
            }
        }

        private updateBtnSlice() {
            this._btnPro.replaceItemAt("格子状态：" + SliceStatusName[this._model.curDrawStatus], 1);
            this._view.shpStatus.fillColor = SliceColor[this._model.curDrawStatus];
            this._view.shpStatus.fillAlpha = this._model.curDrawStatus == SliceStatus.Enable ? 0 : 0.8;
        }

        private updateBtnMap() {
            this._btnPro.replaceItemAt("当前地图：" + this._model.curMapId, 0);
        }

        protected onShow(): void {
            this._view.showLine.selected = this._model.isShowMask;
            this._view.btnSwitch.selected = true;
            this._view.left = 0;

            this._btnPro.removeAll();
            this._btnPro.addItem("选择地图");
            this.initHSlider();
            this.initRangSlider();
            this.updateBar();
            this.updateBtnMap();

            this._view.shpStatus.visible = this._showArgs == MapType.Mask;
            if (this._showArgs == MapType.Mask) {
                this._btnPro.addItem("选择格子状态");
                this.updateBtnSlice();
            }
        }

        private initHSlider() {
            let sX = gso.gameStage.stageWidth / this._model.curMapData.imageWidth;
            let sY = gso.gameStage.stageHeight / this._model.curMapData.imageHeight;
            let min = Math.min(sX, sY);
            this._view.hSlider.minimum = Math.round(min * 100);
            this._view.hSlider.validateNow();
            this._view.hSlider.pendingValue = 100;
            this._view.lab_scale.text = "缩放:" + this._view.hSlider.pendingValue + "%";
        }

        private initRangSlider() {
            this._view.rangeSlider.pendingValue = this._model.curRange;
            this._view.lab_range.text = "笔刷:" + this._view.rangeSlider.pendingValue;
            this._view.rangeSlider.validateNow();
        }

        private updateBar() {
            this._view.btnSwitch.label = this._view.btnSwitch.selected ? "隐藏菜单" : "显示菜单";
            let t = egret.Tween.get(this._view);
            if (this._view.btnSwitch.selected) {
                t.to({left: 0}, 300, egret.Ease.sineIn);
            } else {
                t.to({left: -this._view.group_bar.width}, 300, egret.Ease.sineOut);
            }
        }
    }
}
