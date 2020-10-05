module tool.ui.scene {


    export class SpecificPointPanelView extends eui.Component {
        public txt_mapid: eui.Label;
        public txt_x: eui.Label;
        public txt_y: eui.Label;
        public txt_id: eui.EditableText;

        public btn_new: eui.Button;
        public btn_close: eui.Button;

        constructor() {
            super();
            this.skinName = "skins.scene.SpecificPointPanelSkinSkin";
        }
    }
}