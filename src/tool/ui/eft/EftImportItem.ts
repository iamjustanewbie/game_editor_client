module tool.ui.effect {

    import EftProxy = tool.mod.effect.EftProxy;
    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import ProxyType = tool.mod.ProxyType;
    import Alert = tool.utils.Alert;
    import Handler = base.utils.Handler;
    import ON_IMPORT_DEL = tool.mod.effect.ON_IMPORT_DEL;

    export class EftImportItem extends eui.ItemRenderer {

        public labelDisplay: eui.Label;
        public btnDel: eui.Label;

        protected createChildren(): void {
            super.createChildren();
            this.btnDel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDel, this);
        }

        private onDel() {
            Alert.cancel("确定删除" + this.data.id + "?", Handler.alloc(this, this.delEft));
        }

        private delEft() {
            let _p: EftProxy = facade.retMod(ModName.Effect).retProxy(ProxyType.Effect);
            _p.delEft(this.data.id);
            this.parent.dispatchEventWith(ON_IMPORT_DEL);
        }

        protected dataChanged(): void {
            super.dataChanged();
            this.labelDisplay.text = this.data.id;
        }
    }
}