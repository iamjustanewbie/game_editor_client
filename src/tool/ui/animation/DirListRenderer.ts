module tool.ui.animation {


    export class DirListRenderer extends eui.ItemRenderer {

        public labelDisplay: eui.Label;


        protected childrenCreated(): void {
            this.labelDisplay.bold = true;
            this.width = 230;
        }

        protected dataChanged(): void {
            if (this.data != 0 && typeof this.data == "string") {
                this.labelDisplay.text = this.data;
                this.labelDisplay.alpha = 1;
            } else {
                this.labelDisplay.text = ["类型", "模型"][this.itemIndex];
                this.labelDisplay.alpha = 0.5;
            }
        }
    }
}