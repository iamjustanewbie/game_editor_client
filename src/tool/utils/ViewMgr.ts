module game.utils {
    import facade = base.module.facade;
    import MdrBase = base.module.MdrBase;

    export class ViewMgr {
        private static _instance: ViewMgr;

        private _curName: string;
        private _curType: string;

        public static getIns(): ViewMgr {
            if (this._instance == null) {
                this._instance = new ViewMgr();
            }
            return this._instance;
        }

        private _mainView: MdrBase;

        public setMainView(m: MdrBase) {
            this._mainView = m;
        }

        public showMain() {
            facade.hideView(this._curName, this._curType);
            this._curName = undefined;
            this._curType = "";
            this._mainView.show();
        }

        public showView(mName: string, vType: string, data?: any): void {
            if (this._mainView) {
                this._mainView.hide();
            }
            if (this._curName && (this._curName != mName || this._curType != vType)) {
                facade.hideView(this._curName, this._curType);
            }
            this._curName = mName;
            this._curType = vType;
            facade.showView(mName, vType, data);
        }

        public hideThis(_this: MdrBase) {
            _this.hide();
        }
    }
}