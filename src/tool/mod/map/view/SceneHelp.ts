module tool.mod.map {

    import MdrBase = base.module.MdrBase;
    import SceneHelpView = tool.ui.map.SceneHelpView;
    import Alert = tool.utils.Alert;
    import Handler = base.utils.Handler;
    import ListUtil = tool.utils.ListUtil;

    export class SceneHelp extends MdrBase {

        private _view: SceneHelpView = this.mark("_view", SceneHelpView);


        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
        }

        protected addListeners(): void {
            this.onNt(ON_MAP_CHANGE, this.hide, this);
            this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        }


        protected removeListeners(): void {
            this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        }

        private onBtnClose() {
            this.hide();
        }

        protected onShow() {
            super.onShow();
            this._view.txt.text =
                `1、按住空格拖动鼠标左键拖动地图
2、shift+左键添加怪物或npc
3、ctrl+左键添加出生点
4、怪物会关联最近的出生点
5、\`+左键打开传送点窗口
6、1+左键打开特定点窗口
7、特定点id0为默认出生点和复活点
8、特定点其他id可以配置在相关的配置表供使用
             `
        }
    }
}
