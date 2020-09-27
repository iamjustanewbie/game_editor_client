module tool.mod.effect {

    import MsgId = tool.mod.editor.MsgId;
    import EditorPB = tool.mod.editor.EditorPB;
    import GameNT = base.module.GameNT;

    export class EftProxy extends EditorPB {

        private _model: EftModel;

        public getData(): EftModel {
            return this._model;
        }

        public initialize(): void {
            super.initialize();
            this._model = new EftModel();
            this.onMsg(MsgId.getAnimationList, this.onGetAnimation, this);
            this.onMsg(MsgId.getEftList, this.onGetEft, this);
        }

        public publishEft(eft: EftData) {
            let data = JSON.stringify(eft, null, "    ");
            let id = eft.id;
            this.sendMsg(MsgId.publishEft, {id, data});
        }

        public delEft(id: string) {
            let data = null;
            this.sendMsg(MsgId.publishEft, {id, data});
        }

        public getEft() {
            this.sendMsg(MsgId.getEftList);
        }

        private onGetEft(n: GameNT) {
            let msg: { list } = n.body;
            let eft = [];
            for (let i of msg.list) {
                eft.push(JSON.parse(i));
            }
            this._model.allEft = eft;
            this.sendNt(ON_GET_EFT);
        }

        public getAnimation(eftName?: string) {
            let p = "effect" + (eftName ? "/" + eftName : "");
            this.sendMsg(MsgId.getAnimationList, {p, eft: true});
        }

        private onGetAnimation(n: GameNT) {
            if (!this._model.isEft) {
                return;
            }
            let msg = n.body;
            if (msg.id != undefined && this._model.eftIdMap != undefined) {
                this._model.eftIdMap[msg.p] = msg.id;
                return;
            }
            if (msg.list != undefined) {
                this.sendNt(ON_GET_ANIMATION, msg.list);
                if (!this._model.eftIdMap) {
                    this._model.eftIdMap = {};
                    for (let i of msg.list) {
                        this.getAnimation(i);
                    }
                }
            }
        }
    }
}