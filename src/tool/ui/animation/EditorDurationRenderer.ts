module tool.ui.animation {

    import AnimationModel = tool.mod.animation.AnimationModel;
    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import ProxyType = tool.mod.ProxyType;

    export class EditorDurationRenderer extends eui.ItemRenderer {

        public lab: eui.EditableText;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAdd() {
            this.lab.addEventListener(egret.Event.CHANGE, this.onEditor, this);
            this.lab.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }

        private onRemove() {
            this.lab.addEventListener(egret.Event.CHANGE, this.onEditor, this);
            this.lab.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }

        private onFocusOut() {
            if (this.lab.text.trim() == "") {
                this.lab.text = "0";
                this.onEditor();
            }
        }

        private onEditor() {
            if (this.lab.text.trim() == "") {
                return;
            }
            let _model: AnimationModel = facade.retMod(ModName.Animation).retProxy(ProxyType.Animation).getData();
            let d = parseInt(this.lab.text);
            _model.duration[this.itemIndex] = +d | 0;
            if (_model.curFrame <= _model.duration.length) {
                _model.curDuration = _model.duration[_model.curFrame - 1];
            }
        }

        protected dataChanged(): void {

        }
    }
}