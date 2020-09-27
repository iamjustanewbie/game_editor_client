module tool.ui.animation {


    export class AnimationView extends eui.Component {

        public btnImport: eui.Button;
        public img: egret.Bitmap;
        public line: egret.Shape;
        public lab_path: eui.Label;
        public btnBack: eui.Button;
        public btnPublish: eui.Button;

        public list_act: eui.List;
        public list_dir: eui.List;
        public lab_id: eui.Label;

        public group: eui.Group;

        constructor() {
            super();
            // let g = new Group();
            // g.width = g.height = 910;
            // g.verticalCenter = 0;
            // g.horizontalCenter = 0;
            // this.addChild(g);
            this.img = new egret.Bitmap();
            this.line = new egret.Shape();
            this.skinName = "skins.AnimationViewSkin";
        }
    }
}