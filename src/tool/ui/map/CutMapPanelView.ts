module tool.ui.map {

    export class CutMapPanelView extends eui.Component {

        public btn_close: eui.Button;
        public txt_width: eui.Label;
        public txt_height: eui.Label;
        public txt_rate: eui.Label;
        public txt_name: eui.Label;
        public btn_confirm: eui.Button;
        constructor() {
            super();
            this.skinName = "skins.map.CutMapPanelSkin";
        }
    }
}