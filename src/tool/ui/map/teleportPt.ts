module tool.ui.map {
    import DEL_MONSTER_PT = tool.mod.map.DEL_MONSTER_PT;
    import MapModel = tool.mod.map.MapModel;
    import MapProxy = tool.mod.map.MapProxy;
    import ProxyType = tool.mod.ProxyType;
    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import Pool = base.pool.Pool;
    import ResUrlC1 = tool.mod.editor.ResUrlC1;
    import UIAnim = tool.comp.UIAnim;
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    export class TeleportPt extends DisplayObjectContainer {

        public idx: string;

        private _r: number;
        private _c: number;

        private _proxy: MapProxy;
        private _model: MapModel;

        private _anim: UIAnim;


        public get c(): number {
            return this._c;
        }

        public get r(): number {
            return this._r;
        }

        constructor(r: number, c: number) {
            super();

            this._proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Map);
            this._model = this._proxy.getData();

            this._c = c;
            this._r = r;
            this.x = (this._c + 0.5) * this._model.curMapData.cellWidth;
            this.y = (this._r + 0.5) * this._model.curMapData.cellWidth;

            let url = ResUrlC1 + "/assets/anim/effect/portal.png";

            this._anim = Pool.alloc(UIAnim);
            this._anim.setSource(url, 0);
            this._anim.touchEnabled = false;
            this.addChild(this._anim);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }


        public updatePos(c: number, r: number): void {
            if (r != undefined) {
                this._r = r;
            }
            if (c != undefined) {
                this._c = c;
            }
            this.x = (this._c + 0.5) * this._model.curMapData.cellWidth;
            this.y = (this._r + 0.5) * this._model.curMapData.cellWidth;
        }

        private onAddToStage() {

        }

        private onRemoveFromStage() {

        }

        private onDel(e: TouchEvent) {
            e.stopPropagation();
            if (this.parent) {
                this.parent.dispatchEventWith(DEL_MONSTER_PT, false, this);
            }
            this.dispose();
        }

        public dispose() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this._anim);
            this._anim = null;
        }
    }
}