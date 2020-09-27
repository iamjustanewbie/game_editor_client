module tool.ui.scene {
    export class SceneTopBarView extends eui.Component {

        public group_bar: eui.Group;
        public btnMain: eui.Button;
        public btnPublish: eui.Button;
        public btnNew: eui.Button;
        public btnSave: eui.Button;
        public list_btn: eui.List;
        public shpStatus: eui.Rect;
        public lab_scale: eui.Label;
        public btnHelp: eui.Label;
        public hSlider: eui.HSlider;
        public showLine: eui.CheckBox;
        public lab_point: eui.Label;
        public btnSwitch: eui.ToggleButton;        

        constructor() {
            super();
            this.skinName = "skins.scene.SceneTopBarViewSkin";
        }
    }
}