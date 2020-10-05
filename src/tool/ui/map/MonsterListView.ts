module tool.ui.map {

    export class MonsterListView extends eui.Component {

        public list: eui.List;
        public editor_text: eui.EditableText;


        constructor() {
            super();
            this.skinName = "skins.map.MonsterListSkin";
        }
    }
}