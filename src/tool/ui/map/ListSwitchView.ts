module tool.ui.map {

    export class ListSwitchView extends eui.Component {

        public btn_monster: eui.RadioButton;
        public btn_npc: eui.RadioButton;

        constructor() {
            super();
            this.skinName = "skins.map.ListSwitchSkin";
        }
    }
}