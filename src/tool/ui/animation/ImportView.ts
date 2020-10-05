module tool.ui.animation {

    export class ImportView extends eui.Component {

        public list_dir: eui.List;
        public btnImport: eui.Button;
        public btnClose: eui.Button;
        public input: eui.EditableText;
        
        constructor() {
            super();
            this.skinName = "skins.ImportViewSkin";
        }
    }
}