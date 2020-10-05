module tool.mod.map {
    import MdrBase = base.module.MdrBase;
    import ResUrl = tool.mod.editor.ResUrl;
    import KeyUtil = tool.utils.KeyUtil;
    import Pool = base.pool.Pool;
    import Point = egret.Point;
    import facade = base.module.facade;
    import Sprite = egret.Sprite;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import Rectangle = egret.Rectangle;
    import CutMapView = tool.ui.map.CutMapView;
    import ViewMgr = game.utils.ViewMgr;

    export class CutMapMdr extends MdrBase {
        private _view = this.mark("_view", CutMapView);


        private _proxy: MapProxy;

        constructor() {
            super(EditorUI.window);
        }

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.Map);
            this._view.top = 0;
            this._view.right = 0;
            this._view.bottom = 0;
            this._view.left = 0;
        }

        protected addListeners(): void {
            this._view.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
            this.onNt(CUT_MAP_LIST, this.onList, this);
        }

        protected removeListeners(): void {
            this._view.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        }



        protected onShow(): void {
            this._proxy.getCutMapList();
        }

        protected onHide(): void {
        }

        private onTapItem(e: eui.ItemTapEvent){
            let item = e.item;
            this.showView(MapViewType.CutMapPanel, item.name);            
        }

        private onList(){
            let list = this._proxy.getData().cutMapList.map(l=>{
                return {
                    name : l,
                    src : ResUrl + "/cutmap/" + l,
                }
            })
            this._view.list.dataProvider = new eui.ArrayCollection(list);
        }
    }
}
