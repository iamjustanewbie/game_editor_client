module tool.ui.editor {
    export class TopBarView extends eui.Component {

        public group_bar: eui.Group;
        public btnMain: eui.Button;
        public btnPublish: eui.Button;
        public list_btn: eui.List;
        public shpStatus: eui.Rect;
        public lab_scale: eui.Label;
        public hSlider: eui.HSlider;
        public showLine: eui.CheckBox;
        public lab_point: eui.Label;
        public btnSwitch: eui.ToggleButton;

        public lab_range: eui.Label;
        public rangeSlider: eui.HSlider;        

        constructor() {
            super();
            this.skinName = "skins.editor.TopBarViewSkin";
        }
    }
}