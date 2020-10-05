module tool.ui.effect {
    export class EftEditorView extends eui.Component {

        public group_editor: eui.Group;
        public list_eft: eui.List;
        public list_add: eui.List;
        public btnBack: eui.Button;
        public btnPublish: eui.Button;
        public btnReview: eui.Button;
        public loopPlay: eui.CheckBox;
        public group_actor: eui.Group;

        public group: eui.Group;
        public label_id: eui.Label;
        public group_bar: eui.Group;
        public scroll: eui.Scroller;
        public btnImport: eui.Button;
        public showIdx: eui.CheckBox;
        public group_idx: eui.Group;

        public editorRadius: eui.EditableText;
        public circle: eui.Rect;
        public label_totalTime: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.effect.EftEditorViewSkin";
        }
    }
}