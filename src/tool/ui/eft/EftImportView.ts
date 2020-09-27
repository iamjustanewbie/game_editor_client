module tool.ui.effect {

    export class EftImportView extends eui.Component {

        public list_eft: eui.List;
        public btnBulid: eui.Button;
        public btnClose: eui.Button;
        public input: eui.EditableText;


        constructor() {
            super();
            this.skinName = "skins.effect.ImportEftSkin";
        }
    }
}