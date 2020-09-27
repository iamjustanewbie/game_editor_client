module tool.mod.animation {

    import EditorPB = tool.mod.editor.EditorPB;
    import MsgId = tool.mod.editor.MsgId;
    import GameNT = base.module.GameNT;

    export class AnimationProxy extends EditorPB {

        private _model: AnimationModel;

        public getData(): AnimationModel {
            return this._model;
        }

        public initialize(): void {
            this._model = new AnimationModel();

            this.onMsg(MsgId.getAnimationList, this.onGetList, this);
            this.onMsg(MsgId.importAnimation, this.onImportAnimation, this);
        }

        public publishAnimation() {
            let duration = this._model.duration;
            let p = this._model.importDir.join("/");
            this.sendMsg(MsgId.publishAnimation, { duration, p });
        }

        public saveDur(nextOp?: Function) {
            let duration = this._model.duration;
            let same = true;
            for (let i = 0; i < duration.length; i++) {
                if (this._model.origindur[i] != duration[i]) {
                    same = false;
                    break;
                }
            }
            if (same) {
                if (nextOp)
                    nextOp();
                return;
            }

            let p = this._model.importDir.join("/");
            this.sendMsg(MsgId.saveDur, { duration, p });
            if (nextOp) {
                let func = () => {
                    this.offMsg(MsgId.saveDur, func, this);
                    this._model.origindur = duration;
                    nextOp();
                }
                this.onMsg(MsgId.saveDur, func, this);
            }
        }

        public autoPublish() {
            this.sendMsg(MsgId.autoPublish, { list: [this._model.importDir[0]] });
        }

        public importAnimation(id) {
            let p = this._model.importDir.join("/");
            this.sendMsg(MsgId.importAnimation, { id, p });
        }

        private onImportAnimation(n: GameNT) {
            let msg = n.body;
            if (msg.res == PublishCode.success) {
                this.getList();
                this.sendNt(IMPORT_SUCCESS);
            }
            if (msg.res == PublishCode.id_exists) {
                alert("动画id已存在！");
            }
        }

        public getList() {
            this._model.play = false;
            this._model.isImport = false;
            let p = "";
            if (this._model.importDir.length > 0) {
                p = this._model.importDir.join("/");
            }
            this.sendMsg(MsgId.getAnimationList, { p });
        }

        private onGetList(n: GameNT) {
            if (!this._model.isAnimation) {
                return;
            }
            let msg = n.body;
            this._model.importId = msg.id;
            this.sendNt(ON_ID_CHANGED);
            if (msg.p != undefined) {
                this._model.importDir = msg.p == "" ? [] : msg.p.split("/");
            }
            if (msg.time != undefined) {
                this._model.duration = msg.time;
                this._model.origindur = [].concat(msg.time);
                this._model.loadCfg();
                return;
            }
            if (msg.list != undefined) {
                let list = msg.list;
                let idx = this._model.importDir.length;
                this.sendNt(ON_GET_LIST, { idx, list: list });
            }
        }

    }
}