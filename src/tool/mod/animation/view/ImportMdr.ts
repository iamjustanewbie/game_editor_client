module tool.mod.animation {

    import MdrBase = base.module.MdrBase;
    import ImportView = tool.ui.animation.ImportView;
    import ArrayCollection = eui.ArrayCollection;
    import DirListRenderer = tool.ui.animation.DirListRenderer;
    import GameNT = base.module.GameNT;
    import ListUtil = tool.utils.ListUtil;
    import Handler = base.utils.Handler;

    export class ImportMdr extends MdrBase {

        private _view: ImportView = this.mark("_view", ImportView);

        private _dirPro: ArrayCollection;

        private _proxy: AnimationProxy;
        private _model: AnimationModel;

        constructor() {
            super(EditorUI.top);
        }

        protected onInit(): void {
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = -80;

            this._dirPro = new ArrayCollection([0, 0]);
            this._view.list_dir.dataProvider = this._dirPro;
            this._view.list_dir.itemRenderer = DirListRenderer;

            this._proxy = this.retProxy(ProxyType.Animation);
            this._model = this._proxy.getData();
        }

        protected addListeners(): void {
            this.onNt(ON_GET_LIST, this.onGetList, this);
            this.onNt(IMPORT_SUCCESS, this.onImportSuccess, this);
            this.onNt(ON_ID_CHANGED, this.updateId, this);
            this._view.list_dir.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
            this._view.btnImport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnImport, this);
            this._view.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        }

        protected removeListeners(): void {
            this._view.list_dir.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
            this._view.btnImport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnImport, this);
            this._view.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        }

        private onBtnClose() {
            this.hide();
        }

        private onImportSuccess() {
            this._model.importId = this._view.input.text;
            this.sendNt(ON_ID_CHANGED);
            this.hide();
        }

        private onBtnImport() {
            for (let i = 0, l = this._dirPro.length; i < l; ++i) {
                let item = this._dirPro.getItemAt(i);
                if (item == 0) {
                    alert("请选择动画目录");
                    return;
                }
            }
            if (this._view.input.text.trim() == "") {
                alert("请输入动画ID!");
                return;
            }
            this._proxy.importAnimation(this._view.input.text.trim());
        }

        private onTapDir(e: eui.ItemTapEvent) {
            if (e.itemIndex == DirIdx.Model && this._model.importDir.length == 0) {
                return;
            }
            this._model.importDir.length = e.itemIndex;
            this._proxy.getList();
        }

        private updateId() {
            this._view.input.text = this._model.importId == undefined ? "" : this._model.importId;
            this._view.btnClose.visible = this._model.importId != undefined;
        }

        private onGetList(n: GameNT) {
            let {list, idx} = n.body;
            if (list.length == 0) {
                return;
            }
            if (idx > DirIdx.Model) {
                return;
            }
            if (idx == DirIdx.Part) {
                this._dirPro.replaceItemAt(0, DirIdx.Model);
            }
            ListUtil.show(list, this._view.list_dir.getChildAt(idx), Handler.alloc(this, (e: eui.ItemTapEvent) => {
                this._model.importDir[idx] = e.item;
                this._dirPro.replaceItemAt(e.item, idx);
                if (idx == DirIdx.Model) {
                    this._proxy.getList();
                }
            }));
        }

        protected onShow(): void {
            for (let i = 0, l = this._dirPro.length; i < l; ++i) {
                this._dirPro.replaceItemAt(this._model.importDir[i], i);
            }
            this.updateId();
            this._view.list_dir.selectedIndex = -1;
        }

        protected onHide(): void {
        }
    }
}