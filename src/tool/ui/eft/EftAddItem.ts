module tool.ui.effect {

    import ON_DEL_EFT = tool.mod.effect.ON_DEL_EFT;
    import ON_EDITOR_SINGLE = tool.mod.effect.ON_EDITOR_SINGLE;

    export class EftAddItem extends eui.ItemRenderer {

        public labelDisplay: eui.Label;
        public btnDel: eui.Label;

        public group: eui.Group;

        protected createChildren(): void {
            super.createChildren();
            this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
            this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenEditor, this);
        }

        private onDel() {
            this.parent.dispatchEventWith(ON_DEL_EFT, false);
        }

        private onOpenEditor() {
            let eft = this.data;
            let render = this;
            this.parent.dispatchEventWith(ON_EDITOR_SINGLE, false, {eft, render})
        }

        protected dataChanged(): void {
            super.dataChanged();
            this.labelDisplay.text = this.itemIndex + 1 + "";
        }
    }
}