module tool.ui.editor {


    export class MapView extends eui.Component {
        public map: eui.Group;
        public slice: eui.Group;
        public line: egret.Shape;

        constructor() {
            super();
            this.map = new eui.Group();
            this.addChild(this.map);

            this.slice = new eui.Group();
            this.addChild(this.slice);

            this.line = new egret.Shape;
            this.addChild(this.line);
        }
    }
}