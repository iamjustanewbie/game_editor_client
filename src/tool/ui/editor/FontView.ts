module tool.ui.editor {

    export class FontView extends eui.Component {

        public label0: eui.BitmapLabel;
        public label1: eui.BitmapLabel;
        public label2: eui.BitmapLabel;
        public label3: eui.BitmapLabel;
        public label4: eui.BitmapLabel;
        public label5: eui.BitmapLabel;
        public label6: eui.BitmapLabel;
        public btnShow: eui.Button;
        
        constructor() {
            super();
            this.skinName = "skins.FontSkin";
        }
    }
}