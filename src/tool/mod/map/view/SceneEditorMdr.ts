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
    import BirthPt = tool.ui.map.BirthPt;
    import MonsterPt = tool.ui.map.MonsterPt;
    import NPCPt = tool.ui.map.NPCPt;
    import SceneMap = tool.mod.map.SceneMap;
    import TestMask = tool.mod.map.TestMask;
    import SceneCamera = tool.mod.map.SceneCamera;
    import MapProxy = tool.mod.map.MapProxy;
    import TeleportPt = tool.ui.map.TeleportPt;
    import SpecificPt = tool.ui.map.SpecificPt;

    export class SceneEditorMdr extends MdrBase {

        private _view: Sprite = this.mark("_view", Sprite);

        private _startX: number;
        private _startY: number;
        private _stageX: number;
        private _stageY: number;

        private _tapBeginIdx: number;
        private _tapEndIdx: number;

        private _proxy: SceneProxy;
        private _model: SceneModel;


        private _map_proxy: MapProxy;
        private _map_model: MapModel;

        private _camera: SceneCamera;
        private _map: SceneMap;
        private _testMask: TestMask;

        private _ptLine: Shape;
        private _pts: BirthPt[];
        private _monsterPts: MonsterPt[];
        public _npcPts: NPCPt[] = [];
        private _teleportPts: TeleportPt[] = [];
        private _specificPts: SpecificPt[] = [];

        private _scale: number = 1;


        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Scene) as SceneProxy;
            this._model = this._proxy.getData();

            this._map_proxy = this.retProxy(ProxyType.Map) as MapProxy;
            this._map_model = this._map_proxy.getData();

            this._camera = new SceneCamera(this);
            this._map = <SceneMap>this._view.addChild(new SceneMap());
            this._testMask = <TestMask>this._view.addChild(new TestMask());

            this._pts = [];
            this._monsterPts = [];
            this._ptLine = new Shape();
            this._view.addChild(this._ptLine);

            this._map_model.curMapData = null;
            this._model.curSceneId = null;
        }

        protected addListeners(): void {
            this.onNt(ON_KEY_UPDATE, this.onKeyUpdate, this);
            this.onNt(ON_MAP_SCALE_CHANGE, this.onScaleChange, this);
            this.onNt(ON_SHOW_LINE_CHANGE, this.updateTestMask, this);
            // this.onNt(PUBLISH_BIRTH_PT, this.onPublish, this);
            // this.onNt(ON_GET_MONSTERS, this.updateBirthPt, this);
            this.onNt(ON_MAP_CHANGE, this.updateMap, this);
            this.onNt(SCENE_LIST, this.onGetSceneList, this);
            this.onNt(NEW_SCENE, this.onNewScene, this);
            this.onNt(BEFORE_SAVE, this.saveMonster, this);
            this.onNt(TELEPORT_CHANGE, this.onTeleportChange, this);
            this.onNt(CHANGE_SPECIFIC_PT, this.onSpecificChange, this);
            this._view.addEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
            this._view.addEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
            this._view.addEventListener(DEL_BIRTH_PT, this.onDelBirthPt, this);
            this._view.addEventListener(DEL_MONSTER_PT, this.onDelMonsterPt, this);
            this._view.addEventListener(DEL_SPECIFIC_PT, this.onDelSpecificPt, this);
            this._view.addEventListener(DEL_NPC_PT, this.onDelNPCPt, this);
            gso.gameStage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            gso.gameStage.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            gso.gameStage.addEventListener(Event.RESIZE, this.onResize, this);
        }

        protected removeListeners(): void {
            this._view.removeEventListener(TouchEvent.TOUCH_TAP, this.onTapSlice, this);
            this._view.removeEventListener(TouchEvent.TOUCH_MOVE, this.updateXY, this);
            this._view.removeEventListener(DEL_BIRTH_PT, this.onDelBirthPt, this);
            this._view.removeEventListener(DEL_MONSTER_PT, this.onDelMonsterPt, this);
            this._view.removeEventListener(DEL_SPECIFIC_PT, this.onDelSpecificPt, this);
            this._view.removeEventListener(DEL_NPC_PT, this.onDelNPCPt, this);
            gso.gameStage.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            gso.gameStage.removeEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            gso.gameStage.removeEventListener(Event.RESIZE, this.onResize, this);
        }

        private onDelMonsterPt(e: Event) {
            let monster = e.data;
            let idx = this._monsterPts.indexOf(monster);
            if (idx > -1) {
                this._monsterPts.splice(idx, 1);
            }
        }

        private onDelSpecificPt(e: Event) {
            let id = e.data;
            delete this._model.sceneInfo.points[id];
            this._model.change = true;
            this.onSpecificChange();
        }

        private onDelNPCPt(e: Event) {
            let npc = e.data;
            let idx = this._npcPts.indexOf(npc);
            if (idx > -1) {
                this._npcPts.splice(idx, 1);
            }
            this._model.change = true;
        }

        private onDelBirthPt(e: Event) {
            let idx = e.data;
            this._model.sceneInfo.birthPts.splice(idx, 1);
            this._model.change = true;
            this._pts.splice(idx, 1);
            this.updatePtsIdx();
        }

        private updatePtsIdx() {
            this._ptLine.graphics.clear();
            for (let i = 0, l = this._pts.length; i < l; ++i) {
                this._pts[i].updateLab(i);
                if (i > 0) {
                    this.drawPtLine(i);
                }
            }
            this.updateMonster();
        }

        private updateMonster() {
            for (let m of this._monsterPts) {
                m.updateBirthIdx();
            }
        }

        private onPublish() {
            // this.saveMonster();
            // this._proxy.publishMonster();
        }

        private saveMonster() {
            for (let b of this._model.sceneInfo.birthPts) {
                b.monsters = [];
            }
            for (let m of this._monsterPts) {
                if (m.birthIdx >= 0) {
                    let monsters = this._model.sceneInfo.birthPts[m.birthIdx].monsters;
                    monsters.push(new MonsterData(m.c, m.r, m.idx, m.dir));
                }
            }
            this._model.sceneInfo.npcs = [];
            for (let m of this._npcPts) {
                this._model.sceneInfo.npcs.push({
                    x: m.c,
                    y: m.r,
                    dir: m.dir,
                    id: parseInt(m.idx),
                    autoCreate: m.autoCreate.selected
                })
            }
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

        protected onShow(): void {
            this._proxy.getSceneList();
        }

        private onTeleportChange() {
            this.clearPt();
            this.showTeleport();
        }

        private onSpecificChange() {
            this.clearSpecificPt();
            this.showSpecific();
        }

        private clearPt() {
            for (const tp of this._teleportPts) {
                tp.dispose();
            }
            this._teleportPts = [];
        }

        private clearSpecificPt() {
            for (const tp of this._specificPts) {
                tp.dispose();
            }
            this._specificPts = [];
        }

        private showTeleport() {
            if (!this._model.sceneInfo)
                return;
            for (const pt of this._model.sceneInfo.teleports) {
                this.drawTeleportPt(pt.y, pt.x, pt.dir);
            }
        }

        private showSpecific() {
            if (!this._model.sceneInfo)
                return;
            if (!this._model.sceneInfo.points)
                this._model.sceneInfo.points = {};
            for (const id in this._model.sceneInfo.points) {
                let p = this._model.sceneInfo.points[id];
                this.drawSpecificPt(p.y, p.x, id);
            }
        }

        private drawTeleportPt(r, c, dir) {
            let tp = new TeleportPt(r, c);
            this._view.addChild(tp);
            if (dir != 0)
                tp.scaleX = -1;
            this._teleportPts.push(tp);
        }

        private drawSpecificPt(r, c, id) {
            let tp = new SpecificPt(r, c, id);
            this._view.addChild(tp);

            this._specificPts.push(tp);
        }

        private onGetSceneList() {
            this.showView(MapViewType.SceneTopBar);
        }

        private onNewScene() {
            this._map.clean();
            this._testMask.clean();
            facade.hideView(ModName.Map, MapViewType.MonsterList);
            facade.hideView(ModName.Map, MapViewType.ListSwitch);
            facade.hideView(ModName.Map, MapViewType.NPCList);
        }

        private updateBirthPt() {
            if (!this._model.sceneInfo.birthPts)
                this._model.sceneInfo.birthPts = [];
            for (let i = 0, l = this._model.sceneInfo.birthPts.length; i < l; ++i) {
                let pt = this._model.sceneInfo.birthPts[i];
                this.drawBirthPt(pt.y, pt.x, i);
                for (let m of pt.monsters) {
                    this.drawMonsterPt(m.y, m.x, m.idx, m.dir);
                }
            }
        }

        private clearBirthPt() {
            for (let pt of this._pts) {
                pt.dispose();
            }
            for (let m of this._monsterPts) {
                m.dispose();
            }
            this._pts.length = 0;
            this._monsterPts.length = 0;
            this._ptLine.graphics.clear();
        }

        private clearNPCPt() {
            for (let m of this._npcPts) {
                m.dispose();
            }
            this._npcPts.length = 0;
        }

        private updateNPCPt() {
            if (!this._model.sceneInfo.npcs)
                this._model.sceneInfo.npcs = [];
            for (let i = 0, l = this._model.sceneInfo.npcs.length; i < l; ++i) {
                let pt = this._model.sceneInfo.npcs[i];
                this.drawNPCPt(pt.y, pt.x, pt.id, pt.dir, pt.autoCreate);
            }
        }

        protected onHide(): void {
            facade.hideView(ModName.Map, MapViewType.SceneTopBar);
            facade.hideView(ModName.Map, MapViewType.MonsterList);
            facade.hideView(ModName.Map, MapViewType.ListSwitch);
            facade.hideView(ModName.Map, MapViewType.NPCList);
        }

        private updateXY(e: TouchEvent) {
            let model = this.retProxy(ProxyType.Map).getData() as MapModel;
            let c = Math.floor(e.localX / model.curMapData.cellWidth);
            let r = Math.floor(e.localY / model.curMapData.cellHeight);
            this.sendNt(ON_XY_CHANGE, { r, c });
        }

        private updateMap() {
            let model = this.retProxy(ProxyType.Map).getData() as MapModel;
            if (!model.curMapData) {
                return;
            }
            let m = model.curMapData;
            AStar.initialize(model.numCol, model.numRow);
            AStar.ckIsBlock = model.ckBlock;
            this._map.clean();
            this._map.init(model.curMapId, m.sliceWidth, m.sliceHeight);
            this._testMask.clean();
            this._testMask.init(m.cellWidth, m.cellHeight, model.numCol, model.numRow);
            this._camera.init(m.imageWidth, m.imageHeight, m.sliceWidth, m.sliceHeight);

            this._camera.setFocus(1, 1, this._scale);

            this.onResize(null);
            this.clearPt();
            this.showTeleport();

            this.showView(MapViewType.ListSwitch);

            this.clearBirthPt();
            this.updateBirthPt();

            this.onSpecificChange();

            this.clearNPCPt();
            this.updateNPCPt();
        }

        private updateTestMask() {
            let model = this.retProxy(ProxyType.Map).getData();
            this._testMask.visible = model.isShowMask;
        }

        private onTapSlice(e: TouchEvent): void {
            let pt = this.getWorldPt(e.stageX, e.stageY);
            let cellW = this._map_model.curMapData.cellWidth;
            let cellH = this._map_model.curMapData.cellHeight;
            let c = Math.floor(pt.x / cellW);
            let r = Math.floor(pt.y / cellH);
            Pool.release(pt);
            this.sendNt(ON_XY_CHANGE, { r, c });

            if (this._tapBeginIdx != this._tapEndIdx)
                return;

            if (this.isEditableMonsterPt && !this.getMonsterPt(r, c) && this._map_model.curDrawMonster != null) {
                this.drawMonsterPt(r, c, this._map_model.curDrawMonster);
                this._model.change = true;
            }
            else if (this.isEditableMonsterPt && !this.getNPCPt(r, c) && this._map_model.curDrawNPC != null) {
                this.drawNPCPt(r, c, this._map_model.curDrawNPC);
                this._model.change = true;
            }
            else if (this.isEditableBirthPt && !this.getBirthPt(r, c)) {
                let data = new BirthPtData(c, r);
                this._model.sceneInfo.birthPts.push(data);
                this.drawBirthPt(r, c, this._model.sceneInfo.birthPts.length - 1);
                this._model.change = true;
                this.updateMonster();
            }

            else if (this.isEditableTeleportPt) {
                this.showView(MapViewType.TeleportPanel, {
                    mapid: this._model.sceneInfo.mapid,
                    x: c,
                    y: r,
                });
            }
            else if (this.isEditableSpecificPt) {
                this.showView(MapViewType.SpecificPointPanel, {
                    mapid: this._model.sceneInfo.mapid,
                    x: c,
                    y: r
                });
            }
        }

        private drawMonsterPt(r, c, idx, dir = 1) {
            let monster = new MonsterPt(idx);
            monster.updatePos(c, r);
            monster.updateDir(dir);
            this._monsterPts.push(monster);
            this._view.addChild(monster);
        }

        private drawNPCPt(r, c, idx, dir = 4, auto = true) {
            let NPC = new NPCPt(idx, this);
            NPC.updatePos(c, r);
            NPC.updateDir(dir);
            NPC.updateAutoCreate(auto);
            this._npcPts.push(NPC);
            this._view.addChild(NPC);
        }

        private drawBirthPt(r, c, i) {
            let birthPt = new BirthPt(r, c, i);
            this._view.addChild(birthPt);
            this._pts.push(birthPt);
            if (i > 0) {
                this.drawPtLine(i);
            }
        }

        private drawPtLine(idx: number) {
            if (idx < 1) {
                return;
            }
            let cellW = this._map_model.curMapData.cellWidth;
            let cellH = this._map_model.curMapData.cellHeight;
            let lastPt = this._model.sceneInfo.birthPts[idx - 1];
            let curPt = this._model.sceneInfo.birthPts[idx];
            let path = AStar.findPath(lastPt.x, lastPt.y, curPt.x, curPt.y);
            path = AStar.floyd(path);
            let color = path.length > 2 ? 0xff0000 : 0xffff00;
            if (path.length > 2) {
                Alert.confirm(idx + "与" + (idx + 1) + "之间有障碍点或不能直线行走");
            }
            this._ptLine.graphics.lineStyle(4, color);
            this._ptLine.graphics.moveTo(cellW * (0.5 + lastPt.x), cellH * (0.5 + lastPt.y));
            this._ptLine.graphics.lineTo(cellW * (0.5 + curPt.x), cellH * (0.5 + curPt.y));
            this._ptLine.graphics.endFill();
        }

        private _lastState: boolean;
        private _movePt: BirthPt;
        private _moveMonster: MonsterPt;
        private _moveTeleport: TeleportPt;

        private onTouchBegin(e: TouchEvent) {
            if (!this._map_model.curMapData) {
                return;
            }
            this._lastState = this.isEditableBirthPt;
            this._startX = this._camera.fx;
            this._startY = this._camera.fy;
            this._stageX = e.stageX;
            this._stageY = e.stageY;

            let point: Point = this.getWorldPt(e.stageX, e.stageY);
            let c = Math.floor(point.x / this._map_model.curMapData.cellWidth);
            let r = Math.floor(point.y / this._map_model.curMapData.cellHeight);
            Pool.release(point);
            this._tapBeginIdx = this._map_model.getIdx(r, c);

            let pt = this.getBirthPt(r, c);
            if (pt) {
                this._movePt = pt;
            }

            let monster = this.getMonsterPt(r, c);
            if (monster) {
                this._moveMonster = monster;
            }

            let tele = this.getTeleportPt(r, c);
            if (tele) {
                this._moveTeleport = tele;
            }
            this._map.addEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }

        private onTouchEnd(e: TouchEvent) {
            if (!this._map_model.curMapData) {
                return;
            }
            let point: Point = this.getWorldPt(e.stageX, e.stageY);
            let c = Math.floor(point.x / this._map_model.curMapData.cellWidth);
            let r = Math.floor(point.y / this._map_model.curMapData.cellHeight);
            Pool.release(point);
            this._tapEndIdx = this._map_model.getIdx(r, c);
            this.endMove();
        }

        private endMove() {
            this._movePt = null;
            this._moveMonster = null;
            this._moveTeleport = null;
            this._map.removeEventListener(TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }

        private onTouchMove(e: TouchEvent) {
            if (!this._map_model.curMapData) {
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

            let pt = this.getWorldPt(e.stageX, e.stageY);
            let cellW = this._map_model.curMapData.cellWidth;
            let cellH = this._map_model.curMapData.cellHeight;
            let c = Math.floor(pt.x / cellW);
            let r = Math.floor(pt.y / cellH);
            Pool.release(pt);

            let isBlock = this._map_model.isBlock(c, r);
            if (!isBlock && this._moveMonster && !this.getMonsterPt(r, c)) {
                this._moveMonster.updatePos(c, r);
                this._model.change = true;
                return;
            }
            if (!isBlock && !this._moveMonster && this._movePt && !this.getBirthPt(r, c)) {
                for (let birth of this._model.sceneInfo.birthPts) {
                    if (birth.x == this._movePt.c && birth.y == this._movePt.r) {
                        birth.x = c;
                        birth.y = r;
                        this._movePt.updatePos(c, r);
                        this._model.change = true;
                        break;
                    }
                }
                this.updatePtsIdx();
            }

            if (!isBlock && !this._moveMonster && !this._movePt && this._moveTeleport && !this.getTeleportPt(r, c)) {
                for (let t of this._model.sceneInfo.teleports) {
                    if (t.x == this._moveTeleport.c && t.y == this._moveTeleport.r) {
                        t.x = c;
                        t.y = r;
                        this._moveTeleport.updatePos(c, r);
                        this._model.change = true;
                        break;
                    }
                }
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

        private getBirthPt(r: number, c: number): BirthPt {
            for (let p of this._pts) {
                if (p.c == c && p.r == r) {
                    return p;
                }
            }
            return null;
        }

        private getMonsterPt(r: number, c: number): MonsterPt {
            for (let m of this._monsterPts) {
                if (m.c == c && m.r == r) {
                    return m;
                }
            }
            return null;
        }

        private getNPCPt(r: number, c: number): NPCPt {
            for (let m of this._npcPts) {
                if (m.c == c && m.r == r) {
                    return m;
                }
            }
            return null;
        }

        private getTeleportPt(r: number, c: number) {
            for (let m of this._teleportPts) {
                if (m.c == c && m.r == r) {
                    return m;
                }
            }
            return null;
        }

        public get isEditableBirthPt(): boolean {
            return !this.isMoveMap && KeyUtil.keyDown["Control"];
        }

        public get isEditableMonsterPt(): boolean {
            return !this.isMoveMap && KeyUtil.keyDown["Shift"];
        }

        public get isEditableTeleportPt(): boolean {
            return !this.isMoveMap && KeyUtil.keyDown["`"];
        }

        public get isEditableSpecificPt(): boolean {
            return !this.isMoveMap && KeyUtil.keyDown["1"];
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
    }
}
