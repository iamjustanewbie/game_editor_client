var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var MdrBase = base.module.MdrBase;
            var SpecificPointPanelView = tool.ui.scene.SpecificPointPanelView;
            var Alert = tool.utils.Alert;
            var SpecificPointPanelMdr = (function (_super) {
                __extends(SpecificPointPanelMdr, _super);
                function SpecificPointPanelMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", SpecificPointPanelView);
                    _this.dir_ = 0;
                    _this.type_ = 0;
                    return _this;
                }
                SpecificPointPanelMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._proxy = this.retProxy(mod.ProxyType.Scene);
                    this._model = this._proxy.getData();
                };
                SpecificPointPanelMdr.prototype.addListeners = function () {
                    this.onNt(map.ON_MAP_CHANGE, this.hide, this);
                    this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    this._view.btn_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                };
                SpecificPointPanelMdr.prototype.removeListeners = function () {
                    this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    this._view.btn_new.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                };
                SpecificPointPanelMdr.prototype.onBtnClose = function () {
                    this.hide();
                };
                SpecificPointPanelMdr.prototype.onShow = function () {
                    if (!this._showArgs) {
                        return;
                    }
                    var args = this._showArgs;
                    this._view.txt_mapid.text = args.mapid;
                    this._view.txt_x.text = args.x;
                    this._view.txt_y.text = args.y;
                    var data = this._proxy.getSpecificPt(args.x, args.y);
                    if (data) {
                        this._view.currentState = 'modify';
                        this._view.txt_id.text = data.id.toString();
                    }
                    else {
                        this._view.currentState = 'new';
                        this._view.txt_id.prompt = '请输入';
                    }
                };
                SpecificPointPanelMdr.prototype.onConfirm = function () {
                    var id = parseInt(this._view.txt_id.text);
                    if (isNaN(id)) {
                        Alert.confirm('请输入正确的id');
                        return;
                    }
                    var args = this._showArgs;
                    var x = args.x;
                    var y = args.y;
                    var old = this._proxy.getSpecificPt(x, y);
                    if (old)
                        delete this._model.sceneInfo.points[old.id];
                    this._model.sceneInfo.points[id] = {
                        x: x,
                        y: y,
                        id: id,
                    };
                    this._model.change = true;
                    this.sendNt(map.CHANGE_SPECIFIC_PT);
                    this.hide();
                };
                return SpecificPointPanelMdr;
            }(MdrBase));
            map.SpecificPointPanelMdr = SpecificPointPanelMdr;
            __reflect(SpecificPointPanelMdr.prototype, "tool.mod.map.SpecificPointPanelMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=SpecificPointPanelMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
