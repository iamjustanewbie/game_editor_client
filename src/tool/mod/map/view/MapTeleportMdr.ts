module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import Sprite = egret.Sprite;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import GameNT = base.module.GameNT;
    import facade = base.module.facade;
    import KeyUtil = tool.utils.KeyUtil;
    import Pool = base.pool.Pool;
    import Point = egret.Point;
    import Rectangle = egret.Rectangle;
    import Shape = egret.Shape;
    import Alert = tool.utils.Alert;
    import TeleportPt = tool.ui.map.TeleportPt;
    import ResUrlC1 = tool.mod.editor.ResUrlC1;

    export class MapTelePortMdr extends MdrBase {

        private _view: Sprite = this.mark("_view", Sprite);

        private _startX: number;
        private _startY: number;
        private _stageX: number;
        private _stageY: number;

        private _tapBeginIdx: number;
        private _tapEndIdx: number;

        private _proxy: MapProxy;
        private _model: MapModel;

        private _camera: SceneCamera;
        private _map: SceneMap;
        private _testMask: TestMask;

        private _ptLine: Shape;
        private _teleportPts: TeleportPt[] = [];
        private _scale: number = 1;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._camera = new SceneCamera(this);
            this._map = <SceneMap>this._view.addChild(new SceneMap());
            this._testMask = <TestMask>this._view.addChild(new TestMask());

            this._ptLine = new Shape();
            this._view.addChild(this._ptLine);
        }

        protected addListeners(): void {
            this.onNt(ON_MAP_CHANGE, this.updateMap, this);
            this.onNt(ON_KEY_UPDATE, this.onKeyUpdate, this);
            this.onNt(ON_MAP_SCALE_CHANGE, this.onScaleChange, this);
            this.onNt(ON_MAP_LIST, this.onGetMapList, this);
            this.onNt(TELEPORT_CHANGE, this.onTeleportChange, this);
            this.onNt(ON_SHOW_LINE_CHANGE, this.updateTestMask, this);
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

        private onPublish() {

            this._proxy.publishMonster();
        }

        private onTeleportChange() {
            this.clearPt();
            this.showTeleport();
        }

        private showTeleport(){
            for (const key in this._model.telportPts) {
                let pt = this._model.telportPts[key];
                this.drawTeleportPt(pt.y, pt.x, pt.dir);
            }
        }

        protected onShow(): void {
            let p: MapProxy = this.retProxy(ProxyType.Map);
            p.getMapList();
        }

        private onScaleChange(n?: GameNT) {
            if (n) {
                let s: number = n.body;
                s /= 100;
                this._scale = s;
            }
            this._view.scaleX = this._view.scaleY = this._scale;
            this._camera.setFocus(this._camera.fx, this._camera.fy, this._scale);
        }

        private onGetMapList() {
            let p: MapProxy = this.retProxy(ProxyType.Map);
            if (this._model.curMapId) {
                p.getMapInfo(this._model.curMapId);
            }
        }


        private clearPt() {
            for (const tp of this._teleportPts) {
                tp.dispose();
            }
            this._teleportPts = [];
        }

        protected onHide(): void {
            facade.hideView(ModName.Map, MapViewType.TopBar);
            facade.hideView(ModName.Map, MapViewType.MonsterList);
            this.clearPt();
        }

        private updateXY(e: TouchEvent) {
            let c = Math.floor(e.localX / this._model.curMapData.cellWidth);
            let r = Math.floor(e.localY / this._model.curMapData.cellHeight);
            this.sendNt(ON_XY_CHANGE, { r, c });
        }

        private updateMap() {
            if (!this._model.curMapData) {
                return;
            }
            this.clearPt();
            this._proxy.geTeleportList(this._model.curMapId);
            this.showView(MapViewType.TopBar);
            let m = this._model.curMapData;
            this._map.clean();
            this._map.init(this._model.curMapId, m.sliceWidth, m.sliceHeight);
            this._testMask.clean();
            this._testMask.init(m.cellWidth, m.cellHeight, this._model.numCol, this._model.numRow);
            this._camera.init(m.imageWidth, m.imageHeight, m.sliceWidth, m.sliceHeight);

            this._camera.setFocus(1, 1, this._scale);
            this.onResize(null);
        }

        private updateTestMask() {
            this._testMask.visible = this._model.isShowMask;
        }

        private onTapSlice(e: TouchEvent): void {
            let pt = this.getWorldPt(e.stageX, e.stageY);
            let cellW = this._model.curMapData.cellWidth;
            let cellH = this._model.curMapData.cellHeight;
            let c = Math.floor(pt.x / cellW);
            let r = Math.floor(pt.y / cellH);
            Pool.release(pt);
            this.sendNt(ON_XY_CHANGE, { r, c });
            if (this._tapBeginIdx != this._tapEndIdx)
                return;

            if (this.isMoveMap)
                return;
            if (this._model.isBlock(c, r)) {
                Alert.confirm("障碍点不能设置传送点")
                return;
            }
            this.showView(MapViewType.TeleportPanel, {
                mapid: this._model.curMapId,
                x: c,
                y: r
            });
        }

        private drawTeleportPt(r, c, dir) {
            let tp = new TeleportPt(r, c);
            this._view.addChild(tp);
            if (dir != 0)
                tp.scaleX = -1;
            this._teleportPts.push(tp);
        }

        private _lastState: boolean;

        private onTouchBegin(e: TouchEvent) {
            if (!this._model.curMapData) {
                return;
            }

            this._startX = this._camera.fx;
            this._startY = this._camera.fy;
            this._stageX = e.stageX;
            this._stageY = e.stageY;

            let point: Point = this.getWorldPt(e.stageX, e.stageY);
            let c = Math.floor(point.x / this._model.curMapData.cellWidth);
            let r = Math.floor(point.y / this._model.curMapData.cellHeight);
            Pool.release(point);
            this._tapBeginIdx = this._model.getIdx(r, c);

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
            this._tapEndIdx = this._model.getIdx(r, c);
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
            if (this.isMoveMap) {
                let x1 = (this._stageX - e.stageX) / s + this._startX;
                let y1 = (this._stageY - e.stageY) / s + this._startY;
                this._camera.setFocus(x1, y1, s);
                return;
            }
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

        private onResize(e: Event): void {
            this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
        }

        private onKeyUpdate(n: GameNT) {
            if (n.body == " ") {
                if (this._lastState == this.isMoveMap) {
                    this.endMove();
                }
            }
        }

        private get isMoveMap(): boolean {
            return KeyUtil.keyDown[" "];
        }

        public getWorldPt(stageX: number, stageY: number, pt?: Point): Point {
            pt = pt || Pool.alloc(Point);
            pt.x = stageX / this._scale - this._view.x / this._scale;
            pt.y = stageY / this._scale - this._view.y / this._scale;
            return pt;
        }

        public get isEditableTeleportPt(): boolean {
            return !this.isMoveMap && KeyUtil.keyDown["Shift"];
        }
    }
}
