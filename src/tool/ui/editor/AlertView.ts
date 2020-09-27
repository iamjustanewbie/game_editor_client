module tool.ui.editor {
    export class AlertView extends eui.Component {

        public lab: eui.Label;
        public btnConfirm: eui.Button;
        public btnCancel: eui.Button;

        constructor() {
            super();
            this.skinName = "skins.editor.AlertViewSkin";
        }
    }
}