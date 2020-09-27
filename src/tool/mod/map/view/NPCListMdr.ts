module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import MonsterListView = tool.ui.map.MonsterListView;
    import ArrayCollection = eui.ArrayCollection;
    import ResUrlC1 = tool.mod.editor.ResUrlC1;

    export class NPCListMdr extends MdrBase {

        private _view: MonsterListView = this.mark("_view", MonsterListView);

        private _npcPro: ArrayCollection;

        private _proxy: MapProxy;
        private _model: MapModel;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._view.left = 0;
            this._view.top = 170;
            this._view.bottom = 100;

            this._proxy = this.retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._npcPro = new ArrayCollection();
            this._view.list.dataProvider = this._npcPro;
            this._view.list.itemRenderer = ListItem;
        }

        protected addListeners(): void {
            super.addListeners();
            this._view.list.addEventListener(egret.Event.CHANGE, this.onSelectedChange, this);
            this._view.editor_text.addEventListener(egret.Event.CHANGE, this.FilterList, this);
        }

        protected removeListeners(): void {
            super.removeListeners();
            this._view.list.removeEventListener(egret.Event.CHANGE, this.onSelectedChange, this);
            this._view.editor_text.removeEventListener(egret.Event.CHANGE, this.FilterList, this);
        }

        private onSelectedChange() {
            this._model.curDrawNPC = this._npcPro.getItemAt(this._view.list.selectedIndex);
            this._model.curDrawMonster = null;
        }

        protected onShow(): void {
            super.onShow();
            if (!this._model.npcConfig) {
                let url = ResUrlC1 + "/assets/data/npc.json";
                RES.getResByUrl(url, this.onLoadedCfg, this, RES.ResourceItem.TYPE_JSON);
            }
            else {
                this.onLoadedCfg();
            }
        }

        protected FilterList() {
            let json = this._model.npcConfig;
            let keys = Object.keys(json);
            keys.sort(function (a: any, b: any): number {
                return a.id - b.id;
            });
            let npc = [];
            let keyword = this._view.editor_text.text;
            for (let k of keys) {
                let obj = json[k];
                if (k.indexOf(keyword) > -1 || obj.name.indexOf(keyword) > -1)
                    npc.push(obj);
            }
            this._npcPro.source = npc;
        }

        onLoadedCfg(json?: Object) {
            if (json) {
                this._model.npcConfig = json;
            }
            this.FilterList();

            this._view.list.selectedIndex = 0;
            this.onSelectedChange();
        }

        protected onHide(): void {
            super.onHide();
        }
    }

    class ListItem extends eui.ItemRenderer {

        public labelDisplay: eui.Label;

        constructor() {
            super();
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);

        }

        private onComplete() {
            this.labelDisplay.textAlign = 'left'
        }

        protected dataChanged(): void {
            super.dataChanged();
            this.labelDisplay.text = `${this.data.id} ${this.data.name}`;
        }
    }
}