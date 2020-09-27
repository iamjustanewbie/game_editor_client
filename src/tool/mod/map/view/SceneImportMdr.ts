module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import SceneImportView = tool.ui.scene.SceneImportView;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.module.GameNT;
    import Pool = base.pool.Pool;
    import ViewMgr = game.utils.ViewMgr;
    import Handler = base.utils.Handler;
    import ListUtil = tool.utils.ListUtil;
    import Alert = tool.utils.Alert;
    import Rectangle = egret.Rectangle;

    export class SceneImportMdr extends MdrBase {

        private _view: SceneImportView = this.mark("_view", SceneImportView);

        private _btnPro: ArrayCollection;
        private _proxy: SceneProxy;
        private _model: SceneModel;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Scene) as SceneProxy;
            this._model = this._proxy.getData();
            this._view.txt_sceneid.prompt = '请输入'
        }

        protected addListeners(): void {
            this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this._view.btn_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNew, this);

        }

        protected removeListeners(): void {
            this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this._view.btn_new.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNew, this);

        }

        private OnNew() {
            let txt = this._view.txt_sceneid.text;
            let sceneid = parseInt(txt);
            if (isNaN(sceneid) || sceneid < 0) {
                Alert.confirm('请输入正确的场景id');
                return;
            }
            if (this._model.sceneList.indexOf(sceneid) >= 0) {
                Alert.confirm('场景id重复');
                return;
            }
            this.hide();
            this._proxy.clearSceneInfo();
            this.sendNt(NEW_SCENE, sceneid);
        }
    }
}
