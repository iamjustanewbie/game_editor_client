module tool.mod.map {

    import EditorPB = tool.mod.editor.EditorPB;
    import MsgId = tool.mod.editor.MsgId;
    import GameNT = base.module.GameNT;
    import Alert = tool.utils.Alert;

    export class SceneProxy extends EditorPB {

        private _model: SceneModel;

        public getData(): SceneModel {
            return this._model;
        }

        public initialize(): void {
            this._model = new SceneModel();
            this.onMsg(MsgId.getSceneInfo, this.onSceneInfo, this);
            this.onMsg(MsgId.getSceneList, this.onSceneList, this);
            this.onMsg(MsgId.saveInfo, this.onSaveInfo, this);
        }

        getSceneInfo(id: number) {
            this.sendMsg(MsgId.getSceneInfo, { id });
        }

        getSceneList() {
            this.sendMsg(MsgId.getSceneList);
        }

        saveInfo() {
            let id = this._model.curSceneId;
            let info = this._model.sceneInfo;
            this.sendNt(BEFORE_SAVE);
            this.sendMsg(MsgId.saveInfo, { id, info });
        }

        newSceneInfo(mapid: number) {
            this._model.sceneInfo = {
                mapid: mapid,
                teleports: [],
                birthPts: [],
                npcs: [],
                points : {},
            }
            this._model.change = true;
        }

        clearSceneInfo() {
            this._model.sceneInfo = null;
            this._model.change = false;
        }

        getTeleportPt(x: number, y: number) {
            if (!this._model.sceneInfo)
                return;
            else {
                for (let info of this._model.sceneInfo.teleports) {
                    if (x == info.x && y == info.y)
                        return info;
                }
            }
        }

       getSpecificPt(x: number, y: number) {
            if (!this._model.sceneInfo)
                return;
            else {
                for (let id in this._model.sceneInfo.points) {
                    let info = this._model.sceneInfo.points[id];
                    if (x == info.x && y == info.y)
                        return info;
                }
            }
        }

        setTeleportPt(data: TeleportPtData) {
            for(let i = 0; i< this._model.sceneInfo.teleports.length;i++){
                let info = this._model.sceneInfo.teleports[i];
                if (data.x == info.x && data.y == info.y) {
                    this._model.sceneInfo.teleports[i] = data;
                    this._model.change = true;
                    return;
                }
            }
            this._model.sceneInfo.teleports.push(data);
            this._model.change = true;
        }

        delTeleportPt(x: number, y: number) {
            for (let i = 0; i < this._model.sceneInfo.teleports.length; i++) {
                let info = this._model.sceneInfo.teleports[i];
                if (x == info.x && y == info.y) {
                    this._model.sceneInfo.teleports.splice(i, 1);
                    this._model.change = true;
                    return;
                }
            }
        }

        publish() {
            if (this._model.change) {
                Alert.confirm('先保存再发布');
                return;
            }
            this.sendMsg(MsgId.publishScene);
        }

        private onSceneInfo(n: GameNT) {
            this._model.change = false;
            let info = n.body;

            this._model.sceneInfo = info;
            this.sendNt(SCENE_INFO, info);
        }

        private onSceneList(n: GameNT) {
            this._model.sceneList = n.body;
            this.sendNt(SCENE_LIST);
        }

        private onSaveInfo() {
            this._model.change = false;
            this.getSceneList();
            Alert.confirm('保存成功');
        }
    }
}