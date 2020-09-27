module tool.ui.map {

    export class SceneHelpView extends eui.Component {        

        btn_close: eui.Button;
        txt: eui.Label;
        constructor() {
            super();
            this.skinName = "skins.map.SceneHelp";
        }
    }
}