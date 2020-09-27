module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import SpecificPointPanelView = tool.ui.scene.SpecificPointPanelView;
    import Alert = tool.utils.Alert;
    import Handler = base.utils.Handler;
    import ListUtil = tool.utils.ListUtil;

    export class SpecificPointPanelMdr extends MdrBase {

        private _view: SpecificPointPanelView = this.mark("_view", SpecificPointPanelView);

        private _proxy: SceneProxy;
        private _model: SceneModel;

        private dir_: number = 0;
        private type_: TeleportType = 0;

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
        }


        protected removeListeners(): void {
            this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this._view.btn_new.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
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

            let data = this._proxy.getSpecificPt(args.x, args.y);
            if (data) {
                this._view.currentState = 'modify';
                this._view.txt_id.text = data.id.toString();
            }
            else {
                this._view.currentState = 'new';
                this._view.txt_id.prompt = '请输入';
            }
        }

        private onConfirm() {
            let id = parseInt(this._view.txt_id.text);
            if (isNaN(id)) {
                Alert.confirm('请输入正确的id');
                return;
            }
            let args = this._showArgs;
            let x = args.x;
            let y = args.y;

            let old = this._proxy.getSpecificPt(x, y);
            if (old)
                delete this._model.sceneInfo.points[old.id];
            this._model.sceneInfo.points[id] = {
                x : x,
                y : y,
                id: id,
            }
            this._model.change = true;
            this.sendNt(CHANGE_SPECIFIC_PT);
            this.hide();
        }
    }
}
