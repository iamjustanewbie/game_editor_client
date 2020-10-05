var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var utils;
    (function (utils) {
        var facade = base.module.facade;
        var ViewMgr = (function () {
            function ViewMgr() {
            }
            ViewMgr.getIns = function () {
                if (this._instance == null) {
                    this._instance = new ViewMgr();
                }
                return this._instance;
            };
            ViewMgr.prototype.setMainView = function (m) {
                this._mainView = m;
            };
            ViewMgr.prototype.showMain = function () {
                facade.hideView(this._curName, this._curType);
                this._curName = undefined;
                this._curType = "";
                this._mainView.show();
            };
            ViewMgr.prototype.showView = function (mName, vType, data) {
                if (this._mainView) {
                    this._mainView.hide();
                }
                if (this._curName && (this._curName != mName || this._curType != vType)) {
                    facade.hideView(this._curName, this._curType);
                }
                this._curName = mName;
                this._curType = vType;
                facade.showView(mName, vType, data);
            };
            ViewMgr.prototype.hideThis = function (_this) {
                _this.hide();
            };
            return ViewMgr;
        }());
        utils.ViewMgr = ViewMgr;
        __reflect(ViewMgr.prototype, "game.utils.ViewMgr");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
