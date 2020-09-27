module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import TeleportPanelView = tool.ui.teleport.TeleportPanelView;
    import Alert = tool.utils.Alert;
    import Handler = base.utils.Handler;
    import ListUtil = tool.utils.ListUtil;

    export class TeleportPanelMdr extends MdrBase {

        private _view: TeleportPanelView = this.mark("_view", TeleportPanelView);

        private _proxy: SceneProxy;
        private _model: SceneModel;

        private dir_: number = 0;
        private type_: TeleportType = 0;

        private dirName = ['正面', '反面'];
        private typeName = [
            '普通',
            '无缝',
            "分层",
            "跳跃"
        ];
        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Scene);
            this._model = this._proxy.getData();
        }

        protected addListeners(): void {
            this.onNt(ON_MAP_CHANGE, this.hide, this);
            this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this._view.btn_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
            this._view.btn_del.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
            this._view.txt_type.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapType, this);
            this._view.txt_dir.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapDir, this);
        }


        protected removeListeners(): void {
            this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this._view.btn_new.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
            this._view.btn_del.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);

            this._view.txt_type.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapType, this);
            this._view.txt_dir.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapDir, this);
        }

        private onBtnClose() {
            this.hide();
        }

        protected onShow(): void {
            if (!this._showArgs) {
                return;
            }

            let args = this._showArgs;
            this._view.txt_mapid.text = args.mapid;
            this._view.txt_x.text = args.x;
            this._view.txt_y.text = args.y;

            let data = this._proxy.getTeleportPt(args.x, args.y);
            if (data) {
                this._view.currentState = 'modify';
                this._view.txt_toscene.text = data.toscene.toString();
                this._view.txt_tox.text = data.tx.toString();
                this._view.txt_toy.text = data.ty.toString();
                this.type_ = data.type;
                this.dir_ = data.dir;
                this._view.cb_hide.selected = data.hide;
            }
            else {
                this._view.currentState = 'new';
                this._view.txt_toscene.prompt = '请输入';
                this._view.txt_tox.prompt = '请输入';
                this._view.txt_toy.prompt = '请输入';
                this._view.txt_toscene.text = "";
                this._view.txt_tox.text = "";
                this._view.txt_toy.text = "";
                this.type_ = 0;
                this.dir_ = 0;
                this._view.cb_hide.selected = false;
            }

            this._view.txt_type.text = this.typeName[this.type_];
            this._view.txt_dir.text = this.dirName[this.dir_];
        }

        private onConfirm() {
            let toscene = parseInt(this._view.txt_toscene.text);
            if (isNaN(toscene)) {
                Alert.confirm('请输入正确的场景id');
                return;
            }
            if (this.type_ == TeleportType.Jump && toscene != this._model.curSceneId){
                Alert.confirm('跳跃点只能传送到本场景');
                return;
            }
            let tx = parseInt(this._view.txt_tox.text);
            if (isNaN(tx)) {
                Alert.confirm('请输入正确的坐标');
                return;
            }
            let ty = parseInt(this._view.txt_toy.text);
            if (isNaN(ty)) {
                Alert.confirm('请输入正确的坐标');
                return;
            }
            let args = this._showArgs;
            let x = args.x;
            let y = args.y;
            let data: TeleportPtData = {
                toscene: toscene,
                x: x,
                y: y,
                dir: this.dir_,
                tx: tx,
                ty: ty,
                type: this.type_,
                hide: this._view.cb_hide.selected
            }

            this._proxy.setTeleportPt(data);
            this.sendNt(TELEPORT_CHANGE);
            this.hide();
        }

        private onDel() {
            let args = this._showArgs;
            let x = args.x;
            let y = args.y;

            this._proxy.delTeleportPt(x, y);
            this.sendNt(TELEPORT_CHANGE);
            this.hide();
        }

        private onTapType() {
            let handle = Handler.alloc(this, this.onChooseType)
            ListUtil.show(this.typeName, this._view.txt_type, handle)
        }

        private onTapDir() {
            let handle = Handler.alloc(this, this.onChooseDir);
            ListUtil.show(this.dirName, this._view.txt_dir, handle)
        }

        private onChooseType(e: eui.ItemTapEvent) {
            this.type_ = e.itemIndex;
            this._view.txt_type.text = this.typeName[this.type_];
            if (this.type_ == TeleportType.Jump){
                this._view.txt_toscene.text = this._model.curSceneId.toString();
                this._view.txt_toscene.$inputEnabled = false;
            }
            else{
                this._view.txt_toscene.$inputEnabled = true;
            }
        }

        private onChooseDir(e: eui.ItemTapEvent) {
            this.dir_ = e.itemIndex;
            this._view.txt_dir.text = this.dirName[this.dir_];
        }
    }
}
