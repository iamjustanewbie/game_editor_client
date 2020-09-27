module tool.mod.animation {

    import MdrBase = base.module.MdrBase;
    import AnimationView = tool.ui.animation.AnimationView;
    import UpdateItem = base.time.UpdateItem;
    import TimeMgr = base.time.TimeMgr;
    import GameNT = base.module.GameNT;
    import ViewMgr = game.utils.ViewMgr;
    import facade = base.module.facade;
    import ArrayCollection = eui.ArrayCollection;
    import Time = base.time.Time;

    export class AnimationMdr extends MdrBase implements UpdateItem {

        private _view: AnimationView = this.mark("_view", AnimationView);

        private _proxy: AnimationProxy;
        private _model: AnimationModel;

        private _actPro: ArrayCollection;
        private _dirPro: ArrayCollection;

        private _lashShow: number = 0;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._view.right = 0;
            this._view.left = 0;
            this._view.top = 0;
            this._view.bottom = 0;

            this._actPro = new ArrayCollection();
            this._view.list_act.dataProvider = this._actPro;

            this._dirPro = new ArrayCollection();
            this._view.list_dir.dataProvider = this._dirPro;

            this._proxy = this.retProxy(ProxyType.Animation);
            this._model = this._proxy.getData();

            this._view.line.graphics.clear();
            this._view.line.graphics.lineStyle(1, 0x00ff00);
            this._view.line.graphics.moveTo(-300, 0);
            this._view.line.graphics.lineTo(300, 0);
            this._view.line.graphics.moveTo(0, -300);
            this._view.line.graphics.lineTo(0, 300);

            this._view.addChild(this._view.line);
            this._view.addChild(this._view.img);
        }

        protected addListeners(): void {
            this.onNt(ANIMATION_PLAY_CHANGE, this.onPlayChange, this);
            this.onNt(ON_SELECTED_FRAME, this.onFrameSelected, this);
            this.onNt(ON_IMPORT_ANIMATION, this.onImportAnimation, this);
            this.onNt(ON_GET_LIST, this.onGetList, this);
            this.onNt(ON_ID_CHANGED, this.updateId, this);

            this._view.btnImport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showImport, this);
            this._view.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
            this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPublish, this);
            this._view.list_act.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapAct, this);
            this._view.list_dir.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
        }

        protected removeListeners(): void {
            this._view.btnImport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showImport, this);
            this._view.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
            this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPublish, this);
            this._view.list_act.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapAct, this);
            this._view.list_dir.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
        }

        private onBtnBack() {
            ViewMgr.getIns().showMain();
        }

        private onBtnPublish() {
            this._proxy.saveDur(this._proxy.autoPublish.bind(this._proxy));
        }

        private showImport() {
            this._proxy.saveDur(()=>{
                this.showView(AnimationViewType.Import);
            })
        }

        private onTapAct(e: eui.ItemTapEvent) {
            let tmp = e.item;
            this._proxy.saveDur(() => {
                this._model.importDir.length = DirIdx.ActName;
                this._model.importDir.push(tmp);
                this._proxy.getList();
            });
        }

        private onTapDir(e: eui.ItemTapEvent) {
            let tmp = e.item;
            this._proxy.saveDur(() => {
                this._model.importDir.length = DirIdx.Dir;
                this._model.importDir.push(tmp);
                this._proxy.getList();
            });
        }

        private onGetList(n: GameNT) {
            let { list, idx } = n.body;
            this.updateId();
            if (idx < DirIdx.ActName) {
                this._actPro.removeAll();
            }
            if (idx < DirIdx.Dir) {
                this._dirPro.removeAll();
            }
            if (!list || list.length == 0) {
                return;
            }
            if (idx == DirIdx.ActName) {
                this._actPro.source = list;
                this._view.list_act.selectedIndex = 0;
                this._model.importDir[idx] = list[0];
                this._proxy.getList();
            }

            if (idx == DirIdx.Dir) {
                this._dirPro.source = list;
                this._view.list_dir.selectedIndex = 0;
                this._model.importDir[idx] = list[0];
                this._proxy.getList();
            }
        }

        private onPlayChange() {
            if (this._model.play) {
                if (this._model.curFrame >= this._model.maxFrame) {
                    this._model.curFrame = 1;
                }
                this._lashShow = TimeMgr.time.time;
                this.setImg();
                TimeMgr.addUpdateItem(this);
            } else {
                TimeMgr.removeUpdateItem(this);
            }
        }

        private onFrameSelected(n: GameNT) {
            this._model.play = false;
            this._model.curFrame = n.body;
            this.setImg();
        }

        private onImportAnimation() {
            this._view.btnPublish.visible = true;
            this._model.curFrame = 1;
            this.showView(AnimationViewType.Frame);
            this._model.play = true;
        }

        private updateId() {
            if (this._model.importId != undefined) {
                this._view.lab_id.text = "动画ID：" + this._model.importId;
                this._view.lab_id.visible = true;
            } else {
                this._view.lab_id.visible = false;
            }
        }

        protected onShow(): void {
            super.onShow();
            this._model.isAnimation = true;
            if (this._model.isImport) {
                this.onImportAnimation();
                this.onPlayChange();
            } else {
                this._view.btnPublish.visible = false;
                this._view.lab_id.visible = false;
            }
        }

        update(time: Time) {
            if (time.time - this._lashShow > this._model.curDuration) {
                this._lashShow = time.time;
                this._model.curFrame++;
                while (this._model.curDuration == 0) {
                    this._model.curFrame++;
                }
                if (this._model.curFrame > this._model.maxFrame) {
                    if (!this._model.isLoop) {
                        this._model.play = false;
                        this._model.curFrame = this._model.maxFrame;
                    } else {
                        this._model.curFrame = 1;
                    }
                }
                this.setImg();
            }
        }


        private setImg() {
            let config = this._model.getImgConfig();
            this._view.line.x = this._view.stage.stageWidth * 0.5;
            this._view.line.y = this._view.stage.stageHeight * 0.5;
            this._view.img.x = this._view.stage.stageWidth * 0.5 - config["sourceW"] / 2 + config["offX"];
            this._view.img.y = this._view.stage.stageHeight * 0.5 - config["sourceH"] / 2 + config["offY"];
            this._view.img.texture = this._model.getImgTex(this._model.curFrame);
            this._view.lab_path.text = "路径：" + this._model.importDir.join("/");
        }


        protected onHide(): void {
            this._model.isAnimation = false;
            TimeMgr.removeUpdateItem(this);
            facade.hideView(ModName.Animation, AnimationViewType.Frame);
        }
    }
}