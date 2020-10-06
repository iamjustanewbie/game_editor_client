module tool.mod.map {

    import GameNT = base.module.GameNT;
    import MsgId = tool.mod.editor.MsgId;
    import EditorPB = tool.mod.editor.EditorPB;

    export class MapProxy extends EditorPB {
        private _model: MapModel;

        public initialize(): void {
            this._model = new MapModel();
            this.onMsg(MsgId.getMapList, this.onGetMapList, this);
            this.onMsg(MsgId.getMapInfo, this.onGetMapInfo, this);
            this.onMsg(MsgId.setMapInfo, this.onMapInfoUpdate, this);
            this.onMsg(MsgId.getMonsterList, this.onGetMonsterList, this);
            this.onMsg(MsgId.getTeleportList, this.onGetTeleportList, this);
            this.onMsg(MsgId.cutMapList, this.onGetCutMapList, this);
        }

        public getData(): MapModel {
            return this._model;
        }

        private onGetMapList(n: GameNT) {
            this._model.mapList = n.body;
            if (this._model.mapList.length > 0) {
                this._model.curMapId = this._model.mapList[0];
                this.sendNt(ON_MAP_LIST);
            }
        }

        private onGetMapInfo(n: GameNT) {
            this._model.setCurMapData(n.body);
            this.sendNt(ON_MAP_CHANGE);
        }

        private onMapInfoUpdate(n: GameNT) {
            let msg = n.body;
            if (this._model.curMapId != msg.mapId) {
                return;
            }
            let curStatus = this._model.curMapData.data[msg.idx];
            if (curStatus == msg.status) {
                return;
            }
            this._model.curMapData.data[msg.idx] = msg.status;
            let rc = this._model.getRC(msg.idx);
            this.sendNt(ON_SLICE_UPDATE, { r: rc.r, c: rc.c, status: msg.status });
        }

        public setData(row: number, col: number, status: number) {
            if (status == undefined) {
                console.error("setData error!", status);
                return;
            }
            let curData = this._model.curMapData;
            let idx: number = this._model.getIdx(row, col);
            curData.data[idx] = status;
            this.sendMsg(MsgId.setMapInfo, { idx, status, "mapId": this._model.curMapId });
        }

        public getMapInfo(mapId: number) {
            this.sendMsg(MsgId.getMapInfo, { mapId });
        }

        public getMapList() {
            this.sendMsg(MsgId.getMapList);
        }

        public getCutMapList() {
            this.sendMsg(MsgId.cutMapList);
        }

        public cutMap(name: string, width: number, height: number, rate: number) {
            this.sendMsg(MsgId.cutMap, {
                name, width, height, rate
            });
        }

        public getMonsterList(mapId: number) {
            this.sendMsg(MsgId.getMonsterList, { mapId });
        }

        public geTeleportList(mapId: number) {
            this.sendMsg(MsgId.getTeleportList, { mapId });
        }

        private onGetMonsterList(n: GameNT) {
            this.sendNt(ON_GET_MONSTERS);
        }

        private onGetTeleportList(n: GameNT) {
            // let list: TeleportPtData[] = n.body;
            // this._model.telportPts = {};
            // for (const key in list) {
            //     let data = list[key];
            //     this._model.setTeleportPt(data);
            // }
            // this.sendNt(TELEPORT_CHANGE)
        }

        public publishMap() {
            let mapId: number = this._model.curMapId;
            this.sendMsg(MsgId.publishMap, { mapId });
        }

        public publishTeleport() {
            let mapId: number = this._model.curMapId;
            this.sendMsg(MsgId.publishTeleport, { mapId, list: this._model.telportPts });
        }

        public publishMonster() {
            // let mapId: number = this._model.curMapId;
            // let monster = [];
            // let pts = [];
            // for (let b of this._model.birthPts) {
            //     pts.push({ x: b.x, y: b.y });
            //     if (b.monsters && b.monsters.length > 0) {
            //         monster.push({ pts: pts, monsters: b.monsters });
            //         pts = [];
            //     }
            // }
            // if (pts.length > 0 && monster.length > 1) {
            //     monster[0].pts = pts.concat(monster[0].pts);
            // }
            // this.sendMsg(MsgId.publishMonster, { mapId: mapId, monster: monster });
        }

        private onGetCutMapList(n: GameNT) {
            this._model.cutMapList = n.body;
            this.sendNt(CUT_MAP_LIST);
        }
    }
}