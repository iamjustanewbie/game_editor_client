module tool.ui.effect {

    export class EftEditorPanel extends eui.Component {

        public btnClose: eui.Button;
        public btnReview: eui.Button;
        public editorScaleX: eui.EditableText;
        public editorScaleY: eui.EditableText;
        public editorR: eui.EditableText;
        public editorDelay: eui.EditableText;
        public editorRemoveDelay: eui.EditableText;
        public editorTimes: eui.EditableText;
        public editorDuration: eui.EditableText;
        public editorX0: eui.EditableText;
        public editorY0: eui.EditableText;
        public editorScaleX0: eui.EditableText;
        public editorScaleY0: eui.EditableText;
        public editorMoveR0: eui.EditableText;
        public editorX1: eui.EditableText;
        public editorY1: eui.EditableText;
        public editorScaleX1: eui.EditableText;
        public editorScaleY1: eui.EditableText;
        public editorMoveR1: eui.EditableText;
        public label_name: eui.Label;
        public label_totalTime: eui.Label;

        public editorMoveTime: eui.EditableText;

        constructor() {
            super();
            this.skinName = "skins.effect.EditorPanelSkin";
        }
    }
}