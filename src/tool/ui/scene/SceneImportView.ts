module tool.ui.scene {


    export class SceneImportView extends eui.Component {

        public txt_sceneid: eui.EditableText;
        public btn_new: eui.Button;
        public btn_close: eui.Button;

        constructor() {
            super();
            this.skinName = "skins.scene.SceneImportSkin";
        }
    }
}