module tool.ui.map {
    import DEL_NPC_PT = tool.mod.map.DEL_NPC_PT;
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

    export class NPCPt extends eui.Component {

        public title: eui.Group;
        public lab_idx: eui.Label;
        public lab_name: eui.Label;
        public btnDel: eui.Label;
        public lbl_create: eui.Label;
        public rect: eui.Rect;
        public btnRotate: eui.Button;
        public autoCreate: eui.ToggleButton;

        public idx: string;
        public npcName: string;

        private _r: number;
        private _c: number;
        private _dir: number = 4;

        private _proxy: MapProxy;
        private _model: MapModel;

        private _scene_proxy: SceneProxy;
        private _scene_model: SceneModel;

        private _npc: UIAnim;

        private _mdr: any;
        private _configData: any;

        public get c(): number {
            return this._c;
        }

        public get r(): number {
            return this._r;
        }

        public get dir(): number {
            return this._dir;
        }

        constructor(data: any, mdr: any) {
            super();
            this.skinName = "skins.map.MonsterItemSkin";
            this._mdr = mdr;
            this._proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._scene_proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Scene);
            this._scene_model = this._scene_proxy.getData();

            this._npc = Pool.alloc(UIAnim);
            this._npc.touchEnabled = false;
            this.addChild(this._npc);

            if (typeof data == "number" || typeof data == "string") {
                if (this._model.npcConfig)
                    this.setData(this._model.npcConfig[data]);
                else {
                    let url = ResUrlC1 + "/assets/data/npc.json";
                    RES.getResByUrl(url, (cfg) => {
                        this.setData(cfg[data]);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
            } else {
                this.setData(data);
            }

            this._npc.touchEnabled = false;
            this.addChild(this._npc);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

            this.rect.fillColor = 0x0000ff;
        }


        private setData(data) {
            this._configData = data;
            this.idx = this._configData ? this._configData.id : data;
            this.npcName = this._configData ? this._configData.name : "???";

            this.lab_idx.text = "id:"+this.idx + " No."+ this._mdr._npcPts.indexOf(this);
            this.lab_name.text = this.npcName;
            this.loadModel();
        }

        private onAddToStage() {
            this.lab_idx.text = "id:"+this.idx + " No."+ this._mdr._npcPts.indexOf(this);
            this.lab_name.text = this.npcName;
            this.btnRotate.visible = true;
            this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
            this.btnRotate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
            this.autoCreate.addEventListener(eui.UIEvent.CHANGE, this.onAutoChange, this);
        }

        private onRemoveFromStage() {
            this.btnDel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
            this.btnRotate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRotate, this);
        }

        private onAutoChange(){
            this.lbl_create.text = this.autoCreate.selected ? "自动创建" :"不自动创建"
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

        public updateAutoCreate(value: boolean){
            this.autoCreate.selected = value;
            this.onAutoChange();
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
        }

        public loadModel() {
            if (this._configData) {
                let dir = GDirUtil.getMir(this._dir);
                this._npc.scaleX = dir != this._dir ? -1 : 1;
                let url = ResUrlC1 + "/assets/anim/npc/" + this._configData.modelId + `/std_${dir}.png`;
                this._npc.setSource(url, 0);
            }
        }

        private onDel(e: TouchEvent) {
            e.stopPropagation();
            if (this.parent) {
                this.parent.dispatchEventWith(DEL_NPC_PT, false, this);
            }
            this.dispose();
        }

        public dispose() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this._npc);
            this._npc = null;
        }
    }
}