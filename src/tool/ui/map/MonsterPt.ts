module tool.ui.map {
    import DEL_MONSTER_PT = tool.mod.map.DEL_MONSTER_PT;
    import MapModel = tool.mod.map.MapModel;
    import MapProxy = tool.mod.map.MapProxy;
    import SceneModel = tool.mod.map.SceneModel;
    import SceneProxy = tool.mod.map.SceneProxy;
    import ProxyType = tool.mod.ProxyType;
    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import PointUtil = tool.utils.PointUtil;
    import Pool = base.pool.Pool;
    import ResUrlC1 = tool.mod.editor.ResUrlC1;
    import UIAnim = tool.comp.UIAnim;
    import GDirUtil = tool.utils.GDirUtil;

    export class MonsterPt extends eui.Component {

        public title: eui.Group;
        public lab_idx: eui.Label;
        public lab_name: eui.Label;
        public btnDel: eui.Label;
        public btnRotate: eui.Button;
        public autoCreate: eui.ToggleButton;
        public lab_birthPt: eui.Label;
        public lbl_create: eui.Label;

        public idx: string;
        public monsterName: string;

        private _r: number;
        private _c: number;
        private _birthIdx: number = -1;

        private _proxy: MapProxy;
        private _model: MapModel;

        private _scene_proxy: SceneProxy;
        private _scene_model: SceneModel;

        private _monster: UIAnim;

        private _configData: any;

        private _dir: number = 1;

        public get dir(): number {
            return this._dir;
        }

        public get c(): number {
            return this._c;
        }

        public get r(): number {
            return this._r;
        }

        public get birthIdx(): number {
            return this._birthIdx;
        }

        constructor(data: any) {
            super();
            this.skinName = "skins.map.MonsterItemSkin";

            this._proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._scene_proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Scene);
            this._scene_model = this._scene_proxy.getData();


            this._monster = Pool.alloc(UIAnim);
            this._monster.touchEnabled = false;
            this.addChild(this._monster);

            if (typeof data == "number" || typeof data == "string") {
                if (this._model.monstersConfig)
                    this.setData(this._model.monstersConfig[data]);
                else {
                    let url = ResUrlC1 + "/assets/data/monsterconf.json";
                    RES.getResByUrl(url, (cfg) => {
                        this.setData(cfg[data]);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
            } else {
                this.setData(data);
            }

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        private setData(data) {
            this._configData = data;
            this.idx = this._configData ? this._configData.id : data;
            this.monsterName = this._configData ? this._configData.name : "???";

            this.lab_idx.text = this.idx + "";
            this.lab_name.text = this.monsterName;
            this.loadModel();
        }

        private onAddToStage() {
            this.lab_idx.text = this.idx + "";
            this.lab_name.text = this.monsterName;
            this.autoCreate.visible = false;
            this.lbl_create.visible = false;
            this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
            this.btnRotate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
        }

        private onRemoveFromStage() {
            this.btnDel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
            this.btnRotate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
        }

        public updatePos(c: number, r: number): void {
            if (r != undefined) {
                this._r = r;
            }
            if (c != undefined) {
                this._c = c;
            }
            this.x = (this._c + 0.5) * this._model.curMapData.cellWidth;
            this.y = (this._r + 0.5) * this._model.curMapData.cellWidth;
            this.updateBirthIdx();
        }

        public updateBirthIdx() {
            if (this._scene_model.sceneInfo.birthPts.length <= 0) {
                this.setBirthIdx(-1);
                return;
            }
            let birthPt = this._scene_model.sceneInfo.birthPts[0];
            let minIdx: number = 0;
            let minDis: number = PointUtil.distanceSquare(this._c, this._r, birthPt.x, birthPt.y);
            for (let i = 1, l = this._scene_model.sceneInfo.birthPts.length; i < l; ++i) {
                birthPt = this._scene_model.sceneInfo.birthPts[i];
                let dis = PointUtil.distanceSquare(this._c, this._r, birthPt.x, birthPt.y);
                if (dis < minDis) {
                    minDis = dis;
                    minIdx = i;
                }
            }
            this.setBirthIdx(minIdx);
        }

        private setBirthIdx(idx: number) {
            this._birthIdx = idx;
            this.lab_birthPt.text = idx + 1 + "";
        }

        private onDel(e: TouchEvent) {
            e.stopPropagation();
            if (this.parent) {
                this.parent.dispatchEventWith(DEL_MONSTER_PT, false, this);
            }
            this.dispose();
        }

        public dispose() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this._monster);
            this._monster = null;
        }

        public onRotate() {
            this._dir++;
            if (this._dir > 8)
                this._dir = 1;
            this._scene_model.change = true;
            this.loadModel();
        }

        public updateDir(dir: number) {
            this._dir = dir;
            this.loadModel();
        }

        public loadModel() {
            if (this._configData) {
                let dir = GDirUtil.getMir(this._dir);
                this._monster.scaleX = dir != this._dir ? -1 : 1;
                let url = ResUrlC1 + "/assets/anim/creature/" + this._configData.modelId + `/std_${dir}.png`;
                this._monster.setSource(url, 0);
            }
        }
    }
}