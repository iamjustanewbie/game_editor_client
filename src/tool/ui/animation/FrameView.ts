module tool.ui.animation {

    export class FrameView extends eui.Component {

        public frame: eui.DataGroup;
        public cursor: eui.List;
        public duration: eui.DataGroup;
        public cursorBg: eui.Rect;

        public loop: eui.CheckBox;
        public frameEditor: eui.EditableText;

        public btnPlay: eui.Button;
        
        constructor() {
            super();
            this.skinName = "skins.FrameViewSkin";
        }
    }
}