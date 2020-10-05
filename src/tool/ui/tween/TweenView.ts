module tool.tween.ui {

    import UpdateItem = base.time.UpdateItem;
    import Time = base.time.Time;
    import TimeMgr = base.time.TimeMgr;
    import delayCall = base.time.delayCall;
    import Handler = base.utils.Handler;

    export class TweenView extends eui.Component implements UpdateItem {

        public r_1: eui.Rect;
        public r_2: eui.Rect;
        public r_3: eui.Rect;
        public r_6: eui.Rect;
        public r_4: eui.Rect;
        public r_7: eui.Rect;
        public r_8: eui.Rect;
        public r_5: eui.Rect;
        public r_24: eui.Rect;
        public r_25: eui.Rect;
        public r_26: eui.Rect;
        public r_18: eui.Rect;
        public r_13: eui.Rect;
        public r_12: eui.Rect;
        public r_11: eui.Rect;
        public r_17: eui.Rect;
        public r_20: eui.Rect;
        public r_21: eui.Rect;
        public r_22: eui.Rect;
        public r_23: eui.Rect;
        public r_19: eui.Rect;
        public r_16: eui.Rect;
        public r_15: eui.Rect;
        public r_9: eui.Rect;
        public r_10: eui.Rect;
        public r_14: eui.Rect;
        public r_0: eui.Rect;


        constructor() {
            super();
            this.skinName = "skins.TweenSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onAddToStage() {

            for (let i = 1; i <= 26; ++i) {
                let x = this["r_" + i].x;
                let y = this["r_" + i].y;
                console.log(x + "," + y);
            }
        }

        private _startTime: number;

        protected onRemoveFromStage() {
            TimeMgr.removeUpdateItem(this);
        }

        private onCom() {
            delayCall(Handler.alloc(this, this.removeUpdate), 50);
        }

        private removeUpdate() {
            TimeMgr.removeUpdateItem(this);
        }

        update(time: Time) {
        }
    }
}