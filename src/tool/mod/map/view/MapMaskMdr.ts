module tool.mod.map {
    import MdrBase = base.module.MdrBase;
    import GameNT = base.module.GameNT;
    import KeyUtil = tool.utils.KeyUtil;
    import Pool = base.pool.Pool;
    import Point = egret.Point;
    import facade = base.module.facade;
    import Sprite = egret.Sprite;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import Rectangle = egret.Rectangle;

    export class MapMaskMdr extends MdrBase {
        private _view: Sprite = this.mark("_view", Sprite);

        private _camera: SceneCamera;
        private _map: SceneMap;
        private _testMask: TestMask;

        private _startX: number;
        private _startY: number;
        private _stageX: number;
        private _stageY: number;

        private _proxy: MapProxy;
        private _model: MapModel;

        private _tapIdx: number;

        private _tapBeginIdx: number;
        private _tapEndIdx: number;
        private _scale: number = 1;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._camera = new SceneCamera(this);
            this._map = <SceneMap>this._view.addChild(new SceneMap());
            this._testMask = <TestMask>this._view.addChild(new TestMask());
        }

        protected addListeners(): void {
            this.onNt(ON_MAP_CHANGE, this.updateMap, this);
            this.onNt(ON_SLICE_UPDATE, this.onSliceUpdate, this);
            this.onNt(ON_KEY_UPDATE, this.onKeyUpdate, this);
            this.onNt(ON_MAP_SCALE_CHANGE, this.onScaleChange, this);
            this.onNt(ON_SHOW_LINE_CHANGE, this.updateLine, this);
            this.onNt(ON_MAP_LIST, this.onGetMapList, this);
            this._view.addEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
            this._view.addEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
            gso.gameStage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            gso.gameStage.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            gso.gameStage.addEventListener(Event.RESIZE, this.onResize, this);
        }

        protected removeListeners(): void {
            this._view.removeEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
            this._view.removeEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
            gso.gameStage.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            gso.gameStage.removeEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            gso.gameStage.removeEventListener(Event.RESIZE, this.onResize, this);
        }

        private onScaleChange(n: GameNT) {
            let s: number = n.body;
            s /= 100;
            this._scale = s;
            this._view.scaleX = this._view.scaleY = s;
            this._camera.setFocus(this._camera.fx, this._camera.fy, s);
        }

        private updateXY(e: TouchEvent) {
            let c = Math.floor(e.localX / this._model.curMapData.cellWidth);
            let r = Math.floor(e.localY / this._model.curMapData.cellHeight);
            this.sendNt(ON_XY_CHANGE, {r, c});
        }

        private onGetMapList() {
            let p: MapProxy = this.retProxy(ProxyType.Map);
            if (this._model.curMapId) {
                p.getMapInfo(this._model.curMapId);
            }
        }

        protected onShow(): void {
            let p: MapProxy = this.retProxy(ProxyType.Map);
            p.getMapList();
            this.updateLine();
        }

        protected onHide(): void {
            facade.hideView(ModName.Map, MapViewType.TopBar);
        }

        private updateMap() {
            if (!this._model.curMapData) {
                return;
            }
            this.showView(MapViewType.TopBar, MapType.Mask);
            let m = this._model.curMapData;
            this._map.clean();
            this._map.init(this._model.curMapId, m.sliceWidth, m.sliceHeight);
            this._testMask.clean();
            this._testMask.init(m.cellWidth, m.cellHeight, this._model.numCol, this._model.numRow);
            this._camera.init(m.imageWidth, m.imageHeight, m.sliceWidth, m.sliceHeight);

            this._camera.setFocus(1, 1, this._scale);
            this.onResize(null);
        }

        private updateLine() {
            this._testMask.visible = this._model.isShowMask;
        }

        private onSliceUpdate(n: GameNT) {
            this._testMask.updateCur();
        }

        private updateSlice(r: number, c: number, status: number) {
            let range = this._model.curRange;
            for (let i = r - range; i <= r + range; ++i) {
                for (let j = c - range; j <= c + range; ++j) {
                    let curStatus = this._model.curMapData.data[this.getIdx(i, j)];
                    if (status == curStatus) {
                        continue;
                    }
                    this._proxy.setData(i, j, status);
                }
            }
            this._testMask.updateCur();
        }

        private getIdx(r, c) {
            return this._model.getIdx(r, c);
        }

        private onTapSlice(e: TouchEvent): void {
            let pt = this.getWorldPt(e.stageX, e.stageY);
            let c = Math.floor(pt.x / this._model.curMapData.cellWidth);
            let r = Math.floor(pt.y / this._model.curMapData.cellHeight);
            Pool.release(pt);
            this.sendNt(ON_XY_CHANGE, {r, c});
            if (!this.isEditable || !this._model.curMapData) {
                return;
            }
            if (this._tapBeginIdx != this._tapEndIdx) {
                return;
            }
            this.updateSlice(r, c, this._model.curDrawStatus);
        }

        private _lastState: boolean;

        private onTouchBegin(e: TouchEvent) {
            if (!this._model.curMapData) {
                return;
            }
            this._lastState = this.isEditable;
            this._startX = this._camera.fx;
            this._startY = this._camera.fy;
            this._stageX = e.stageX;
            this._stageY = e.stageY;

            let point: Point = this.getWorldPt(e.stageX, e.stageY);
            let c = Math.floor(point.x / this._model.curMapData.cellWidth);
            let r = Math.floor(point.y / this._model.curMapData.cellHeight);
            Pool.release(point);
            this._tapBeginIdx = this.getIdx(r, c);
            this._map.addEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }

        private onTouchEnd(e: TouchEvent) {
            if (!this._model.curMapData) {
                return;
            }
            let point: Point = this.getWorldPt(e.stageX, e.stageY);
            let c = Math.floor(point.x / this._model.curMapData.cellWidth);
            let r = Math.floor(point.y / this._model.curMapData.cellHeight);
            Pool.release(point);
            this._tapEndIdx = this.getIdx(r, c);
            this.endMove();
        }

        private endMove() {
            this._map.removeEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }

        private onTouchMove(e: TouchEvent) {
            if (!this._model.curMapData) {
                return;
            }
            let s = this._scale;
            //空格按下时，拖动地图
            if (!this.isEditable) {
                let x1 = (this._stageX - e.stageX) / s + this._startX;
                let y1 = (this._stageY - e.stageY) / s + this._startY;
                this._camera.setFocus(x1, y1, s);
                return;
            }
            let pt = this.getWorldPt(e.stageX, e.stageY);
            let tapCol = Math.floor(pt.x / this._model.curMapData.cellWidth);
            let tapRow = Math.floor(pt.y / this._model.curMapData.cellHeight);
            Pool.release(pt);
            let idx = this.getIdx(tapCol, tapRow);
            if (idx != this._tapIdx) {
                this._tapIdx = idx;
                if (KeyUtil.keyDown["Control"]) {
                    this.updateSlice(tapRow, tapCol, SliceStatus.Disable);
                } else {
                    this.updateSlice(tapRow, tapCol, this._model.curDrawStatus);
                }
            }
        }

        public getWorldPt(stageX: number, stageY: number, pt?: Point): Point {
            pt = pt || Pool.alloc(Point);
            pt.x = stageX / this._scale - this._view.x / this._scale;
            pt.y = stageY / this._scale - this._view.y / this._scale;
            return pt;
        }

        private onResize(e: Event): void {
            this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
        }

        public updateViewPort(viewPort: Rectangle): void {
            this._view.x = -viewPort.x * this._scale;
            this._view.y = -viewPort.y * this._scale;

            if (this._testMask) {
                this._testMask.updateView(viewPort);
            }
        }

        public updateTiles(sc: number, sr: number, ec: number, er: number): void {
            this._map.updateTiles(sc, sr, ec, er);
        }

        private onKeyUpdate(n: GameNT) {
            if (n.body == " ") {
                if (this._lastState != this.isEditable) {
                    this.endMove();
                }
            }
        }

        private get isEditable(): boolean {
            return !KeyUtil.keyDown[" "];
        }

    }
}
