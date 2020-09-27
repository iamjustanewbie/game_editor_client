module tool.ui.editor {
    export class ListView extends eui.Component {

        public listItem: eui.List;
        public scroll: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.editor.ListViewSkin";
        }
    }
}