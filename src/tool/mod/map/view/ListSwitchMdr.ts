module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import ListSwitchView = tool.ui.map.ListSwitchView;
    import ArrayCollection = eui.ArrayCollection;
    import facade = base.module.facade;

    export class ListSwitchMdr extends MdrBase {

        private _view: ListSwitchView = this.mark("_view", ListSwitchView);


        private _proxy: MapProxy;
        private _model: MapModel;

        private rbg: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._view.left = 0;
            this._view.top = 120;

            this._proxy = this.retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._view.btn_monster.group = this.rbg;
            this._view.btn_npc.group = this.rbg;
        }

        protected addListeners(): void {
            super.addListeners();
            this.rbg.addEventListener(egret.Event.CHANGE, this.onSelectedChange, this);
        }

        protected removeListeners(): void {
            super.removeListeners();
        }

        private onSelectedChange() {
            let selectNpc = this.rbg.selection == this._view.btn_npc;
            if (!selectNpc){
                this.showView(MapViewType.MonsterList);
                facade.hideView(ModName.Map, MapViewType.NPCList);
            }
            else{
                this.showView(MapViewType.NPCList);
                facade.hideView(ModName.Map, MapViewType.MonsterList);
            }
        }

        protected onShow(): void {
            super.onShow();
            this._view.btn_monster.selected = true;
            this.onSelectedChange();
        }
    }
}