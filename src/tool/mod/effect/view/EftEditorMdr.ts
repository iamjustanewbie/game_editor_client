module tool.mod.effect {

    import MdrBase = base.module.MdrBase;
    import EftEditorView = tool.ui.effect.EftEditorView;
    import GameNT = base.module.GameNT;
    import ArrayCollection = eui.ArrayCollection;
    import KeyUtil = tool.utils.KeyUtil;
    import EftDisplay = tool.ui.effect.EftDisplay;
    import ViewMgr = game.utils.ViewMgr;
    import EftAddItem = tool.ui.effect.EftAddItem;
    import Pool = base.pool.Pool;
    import UpdateItem = base.time.UpdateItem;
    import TimeMgr = base.time.TimeMgr;
    import Tips = game.comp.Tips;
    import Shape = egret.Shape;
    import UIAnim = tool.comp.UIAnim;
    import EftIndexView = tool.ui.effect.EftIndexView;
    import Point = egret.Point;

    export class EftEditorMdr extends MdrBase implements UpdateItem {

        private _view: EftEditorView = this.mark("_view", EftEditorView);

        private _addPro: ArrayCollection;
        private _eftPro: ArrayCollection;
        private _proxy: EftProxy;

        private _line: Shape;

        private _actor: UIAnim;
        private _monsters: UIAnim[];

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._view.top = 0;
            this._view.left = 0;
            this._view.right = 0;
            this._view.bottom = 0;

            this._monsters = [];

            this._view.group.x = gso.gameStage.stageWidth * 0.5 - this._view.group.width * 0.5;
            this._view.group.y = gso.gameStage.stageHeight * 0.5 - this._view.group.height * 0.5;

            this._eftPro = new ArrayCollection();
            this._view.list_eft.dataProvider = this._eftPro;

            this._addPro = new ArrayCollection();
            this._view.list_add.dataProvider = this._addPro;
            this._view.list_add.itemRenderer = EftAddItem;

            this._proxy = this.retProxy(ProxyType.Effect);
            this._line = new Shape();
            this._view.group.addChildAt(this._line, 0);

            let grid: number = 20;
            let c: number = Math.floor(this._view.group.width / grid);
            let r: number = Math.floor(this._view.group.height / grid);
            for (let i = 0; i <= c; ++i) {
                this._line.graphics.lineStyle(1, 0x000000, 0.3);
                this._line.graphics.moveTo(i * grid, 0);
                this._line.graphics.lineTo(i * grid, this._view.group.height);
            }
            for (let i = 0; i <= r; ++i) {
                this._line.graphics.lineStyle(1, 0x000000, 0.3);
                this._line.graphics.moveTo(0, i * grid);
                this._line.graphics.lineTo(this._view.group.width, i * grid);
            }
        }

        protected addListeners(): void {
            super.addListeners();
            // let g = this._view.group_actor;
            // this._actor = Pool.alloc(UIAnim);
            // let url = ResUrlC1 + "/assets/anim/body/female_01/std1_5.png";
            // this._actor.setSource(url);
            // this._actor.x = 0;
            // this._actor.y = 0;
            // g.addChild(this._actor);
            //
            // let mUrl = ResUrlC1 + "/assets/anim/creature/monster_01/std1_4.png";
            // let pos: number[][] = [
            //     [0, -180],
            //     [90, -90],
            //     [180, 0],
            //     [90, 90],
            //     [0, 180],
            //     [-90, 90],
            //     [-180, 0],
            //     [-90, -90],
            // ];
            // for (let p of pos) {
            //     let m = Pool.alloc(UIAnim);
            //     m.setSource(mUrl);
            //     m.x = p[0];
            //     m.y = p[1];
            //     g.addChild(m);
            //     this._monsters.push(m);
            // }

            this.onNt(ON_BUILD_EFT, this.onBuild, this);
            this.onNt(ON_GET_ANIMATION, this.onGetEftList, this);
            this.onNt(ON_END_EDITOR_SINGLE, this.onEndEditorSingle, this);
            this._view.list_add.addEventListener(ON_DEL_EFT, this.onDel, this);
            this._view.list_add.addEventListener(ON_EDITOR_SINGLE, this.editorSingle, this);
            gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._view.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._view.btnReview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReview, this);
            this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
            this._view.loopPlay.addEventListener(egret.Event.CHANGE, this.onLoopPlayChanged, this);
            this._view.showIdx.addEventListener(egret.Event.CHANGE, this.onShowIdxChanged, this);
            this._view.btnImport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftImport, this);
            this._view.group_idx.addEventListener("on_eft_move", this.onEftMove, this);
            this._view.editorRadius.addEventListener(egret.Event.CHANGE, this.updateCircle, this);
        }

        protected removeListeners(): void {
            super.removeListeners();
            if (this._actor && this._actor.parent) {
                this._actor.parent.removeChild(this._actor);
            }
            Pool.release(this._actor);
            this._actor = null;

            while (this._monsters.length) {
                let m = this._monsters.pop();
                if (m.parent) {
                    m.parent.removeChild(m);
                }
                Pool.release(m);
            }
            this.clearAdd();
            this._view.list_add.removeEventListener(ON_DEL_EFT, this.onDel, this);
            this._view.list_add.removeEventListener(ON_EDITOR_SINGLE, this.editorSingle, this);
            this._view.loopPlay.removeEventListener(egret.Event.CHANGE, this.onLoopPlayChanged, this);
            this._view.showIdx.removeEventListener(egret.Event.CHANGE, this.onShowIdxChanged, this);
            gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._view.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this._view.btnReview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReview, this);
            this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
            this._view.btnImport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftImport, this);
            this._view.group_idx.removeEventListener("on_eft_move", this.onEftMove, this);
            this._view.editorRadius.addEventListener(egret.Event.CHANGE, this.updateCircle, this);
        }

        private updateCircle() {
            let radius = +this._view.editorRadius.text | 0;
            this._view.circle.visible = radius > 0;
            this._view.circle.width = this._view.circle.height = radius;
            this._view.circle.ellipseWidth = radius;
            this._view.circle.ellipseHeight = radius;
        }

        private onEftMove(e: egret.Event) {
            let msg: { x, y, idx } = e.data;
            let eft: EftDisplay = this._addPro.getItemAt(msg.idx - 1);
            if (eft) {
                eft.updateXY(msg.x, msg.y);
            }
        }

        private onBack() {
            ViewMgr.getIns().showMain();
        }

        private _curEditor: EftDisplay;

        private editorSingle(e: egret.Event) {
            let msg: { eft, render } = e.data;
            this.showView(EftViewType.EdtPanel, msg);
            this._curEditor = msg.eft;
        }

        private onEndEditorSingle() {
            this._view.list_add.selectedIndex = -1;
            this._curEditor = null;
            this.onBtnReview();
        }

        private onLoopPlayChanged() {
            if (this._view.loopPlay.selected) {
                this.onBtnReview();
            }
        }

        private onShowIdxChanged() {
            this._view.group_idx.visible = this._view.showIdx.selected;
        }

        private onGetEftList(n: GameNT) {
            this._eftPro.source = n.body || [];
            this._view.list_eft.selectedIndex = 0;
            this._view.scroll.visible = true;
        }

        private onPublish() {
            this._isPublish = true;
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.getData().isEft = true;
            this.updateCircle();
            this.showEftImport();
            this._view.group_bar.visible = false;
            this._view.group.visible = false;
            this._view.scroll.visible = false;
        }

        protected onHide(): void {
            super.onHide();
            this._proxy.getData().isEft = false;
            TimeMgr.removeUpdateItem(this);
        }

        private showEftImport() {
            this.showView(EftViewType.EftImport);
        }

        private _isPublish: boolean = false;

        private publish() {
            if (this._addPro.length <= 0) {
                Tips.getIns().show("请先添加特效！");
                return;
            }
            let eft = this._proxy.getData().curEditor;
            if (!eft.id) {
                Tips.getIns().show("特效ID错误！");
                return;
            }
            eft.children = [];
            for (let i = 0, l = this._addPro.length; i < l; ++i) {
                let eftDsp = this._addPro.getItemAt(i) as EftDisplay;
                let id = eftDsp.id;
                let x = +eftDsp.startX | 0;
                let y = +eftDsp.startY | 0;
                let ex = +eftDsp.endX | 0;
                let ey = +eftDsp.endY | 0;
                let delay = +eftDsp.delay | 0;
                let r = +eftDsp.rotation | 0;
                let times = +eftDsp.times | 0;
                let tw = eftDsp.tw;
                let rDelay = eftDsp.removeDelay;
                let duration = +eftDsp.duration | 0;
                let sx = eftDsp.scaleX;
                let sy = eftDsp.scaleY;
                eft.children.push({
                    id, x, y, ex, ey, sx, sy, r, times, duration, delay, rDelay, tw
                });
            }
            this._proxy.publishEft(eft);
            this._isPublish = false;
        }

        private onBuild() {
            this._view.label_id.text = "ID:" + this._proxy.getData().curEditor.id;
            this._view.group_bar.visible = true;
            this._view.group.visible = true;
            this._view.loopPlay.selected = true;
            this._view.showIdx.selected = true;
            this._proxy.getAnimation();
            this.clearAdd();
            let children = this._proxy.getData().curEditor.children;
            if (!children || children.length == 0) {
                return;
            }
            for (let i = 0, l = children.length; i < l; ++i) {
                let e = Pool.alloc(EftDisplay);
                let data = children[i];
                e.setData(data);
                this._addPro.addItem(e);
                let idx = Pool.alloc(EftIndexView);
                idx.setData(this._addPro.length, e.x, e.y);
                this._view.group_idx.addChild(idx);
            }
            this.playGroupEft();
        }


        private clearAdd() {
            this._view.group_idx.removeChildren();
            this._view.group_editor.removeChildren();
            while (this._addPro.length) {
                let del = this._addPro.removeItemAt(0);
                Pool.release(del);
            }
        }

        private onBtnReview() {
            if (this._addPro.length <= 0) {
                Tips.getIns().show("请先添加特效！");
                return;
            }
            this.playGroupEft();
        }

        public update(time: base.time.Time) {
            if (this._curEditor) {
                this._view.group_editor.addChild(this._curEditor);
            } else {
                for (let i = 0, l = this._addPro.length; i < l; ++i) {
                    let eft: EftDisplay = this._addPro.getItemAt(i) as EftDisplay;
                    if (time.time - this._startTime >= eft.delay && !eft.parent) {
                        this._view.group_editor.addChildAt(eft, i);
                    }
                }
            }
            if (this._view.group_editor.numChildren == this._addPro.length && this.isGroupEftComp()) {
                let totalTime = time.time - this._startTime;
                this._view.label_totalTime.text = "总时长：" + totalTime;
                TimeMgr.removeUpdateItem(this);
                if (this._isPublish) {
                    this.publish();
                    this._view.group_editor.removeChildren();
                    return;
                }
                if (this._view.loopPlay.selected || this._curEditor) {
                    this.playGroupEft();
                }
                this._view.group_editor.removeChildren();
            }
        }

        private isGroupEftComp(): boolean {
            let comp: boolean = true;
            for (let i = 0, l = this._view.group_editor.numChildren; i < l; ++i) {
                let eft: EftDisplay = this._view.group_editor.getChildAt(i) as EftDisplay;
                if (!eft.isEftComp) {
                    comp = false;
                    break;
                }
            }
            return comp;
        }

        private onTap(e: egret.TouchEvent) {
            if (!this.isAddEft) {
                return;
            }
            let selected = this._view.list_eft.selectedItem;
            if (!selected) {
                return;
            }
            let id = this._proxy.getData().eftIdMap["effect/" + selected];
            if (!id) {
                Tips.getIns().show("找不到特效路径！");
                return;
            }
            let localPt: Point = this._view.group_editor.globalToLocal(e.stageX, e.stageY, Pool.alloc(Point));
            let eft = Pool.alloc(EftDisplay);
            eft.initData(id, localPt.x, localPt.y);
            this._addPro.addItem(eft);
            let idx = Pool.alloc(EftIndexView);
            idx.setData(this._addPro.length, eft.x, eft.y);
            this._view.group_idx.addChild(idx);
            this.playGroupEft();
            Pool.release(localPt);
        }

        private _startTime: number = 0;

        private playGroupEft() {
            this._view.group_editor.removeChildren();
            this._startTime = TimeMgr.time.time;
            TimeMgr.addUpdateItem(this);
        }

        private onDel() {
            let eft = this._view.list_add.selectedItem;
            let idx = this._addPro.getItemIndex(eft);
            if (idx < 0) {
                return;
            }
            TimeMgr.removeUpdateItem(this);
            let del = this._addPro.removeItemAt(idx);
            if (del.parent) {
                del.parent.removeChild(del);
            }
            Pool.release(del);
            this.updateAddProIdx();
            if (this._view.loopPlay.selected) {
                this.playGroupEft();
            }
        }

        private updateAddProIdx() {
            this._view.group_idx.removeChildren();
            for (let i = 0, l = this._addPro.length; i < l; ++i) {
                let item: EftDisplay = this._addPro.getItemAt(i);
                this._addPro.itemUpdated(item);
                let idx = Pool.alloc(EftIndexView);
                idx.setData(i + 1, item.x, item.y);
                this._view.group_idx.addChild(idx);
            }
        }

        public get isAddEft(): boolean {
            return KeyUtil.keyDown["Control"];
        }
    }
}
