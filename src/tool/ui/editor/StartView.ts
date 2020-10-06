module tool.ui.editor {


    export class StartView extends eui.Component {
        public btnMap: eui.Button;
        public btnAnimation: eui.Button;
        public btnEft: eui.Button;
        public btnFont: eui.Button;
        public btnCutMap: eui.Button;
        public btnScene: eui.Button;

        constructor() {
            super();
            this.skinName = "skins.main.StartViewSkin";
        }
    }
}