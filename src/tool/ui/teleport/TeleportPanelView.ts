module tool.ui.teleport {


    export class TeleportPanelView extends eui.Component {
        public txt_mapid: eui.Label;
        public txt_x: eui.Label;
        public txt_y: eui.Label;
        public txt_type: eui.Label;
        public txt_dir: eui.Label;
        public txt_tox: eui.EditableText;
        public txt_toy: eui.EditableText;
        public txt_toscene: eui.EditableText;

        public btn_new: eui.Button;
        public btn_del: eui.Button;
        public btn_type: eui.Button;
        public btn_dir: eui.Button;
        public btn_close: eui.Button;
        public cb_hide: eui.CheckBox;


        constructor() {
            super();
            this.skinName = "skins.teleport.TeleportPanelSkin";
        }
    }
}