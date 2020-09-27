module tool.mod.effect {

    import MdrBase = base.module.MdrBase;
    import EftImportView = tool.ui.effect.EftImportView;
    import ArrayCollection = eui.ArrayCollection;
    import EftImportItem = tool.ui.effect.EftImportItem;
    import Tips = game.comp.Tips;

    export class EftImportMdr extends MdrBase {

        private _view: EftImportView = this.mark("_view", EftImportView);

        private _listPro: ArrayCollection;

        private _proxy: EftProxy;

        constructor() {
            super(EditorUI.upper);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = -80;

            this._listPro = new ArrayCollection();
            this._view.list_eft.dataProvider = this._listPro;
            this._view.list_eft.itemRenderer = EftImportItem;

            this._proxy = this.retProxy(ProxyType.Effect);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ON_GET_EFT, this.onGetEft, this);
            this._view.list_eft.addEventListener(ON_IMPORT_DEL, this.onImportDel, this);
            this._view.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this._view.btnBulid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
            this._view.list_eft.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onImport, this);
        }

        protected removeListeners(): void {
            super.removeListeners();
            this._view.list_eft.removeEventListener(ON_IMPORT_DEL, this.onImportDel, this);
            this._view.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this._view.btnBulid.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
            this._view.list_eft.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onImport, this);
        }

        private onImportDel() {
            this._proxy.getEft();
        }

        private onBuild() {
            if (!this.idEnabled()) {
                Tips.getIns().show("请输入有效ID");
                return;
            }
            this._proxy.getData().curEditor = new EftData(this._view.input.text);
            this.sendNt(ON_BUILD_EFT);
            this.hide();
        }

        private onImport(e: eui.ItemTapEvent) {
            this._proxy.getData().curEditor = e.item;
            this.sendNt(ON_BUILD_EFT);
            this.hide();
        }

        private onGetEft() {
            this._listPro.source = this._proxy.getData().allEft;
            this._view.list_eft.selectedIndex = -1;
        }

        private idEnabled() {
            let id = this._view.input.text;
            return id && id.trim() !== "";
        }

        protected onShow(): void {
            super.onShow();
            this._view.input.text = "";
            this._proxy.getEft();
        }
    }
}