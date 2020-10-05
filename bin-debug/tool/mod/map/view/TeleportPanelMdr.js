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
            var TeleportPanelView = tool.ui.teleport.TeleportPanelView;
            var Alert = tool.utils.Alert;
            var Handler = base.utils.Handler;
            var ListUtil = tool.utils.ListUtil;
            var TeleportPanelMdr = (function (_super) {
                __extends(TeleportPanelMdr, _super);
                function TeleportPanelMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", TeleportPanelView);
                    _this.dir_ = 0;
                    _this.type_ = 0;
                    _this.dirName = ['正面', '反面'];
                    _this.typeName = [
                        '普通',
                        '无缝',
                        "分层",
                        "跳跃"
                    ];
                    return _this;
                }
                TeleportPanelMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._proxy = this.retProxy(mod.ProxyType.Scene);
                    this._model = this._proxy.getData();
                };
                TeleportPanelMdr.prototype.addListeners = function () {
                    this.onNt(map.ON_MAP_CHANGE, this.hide, this);
                    this._view.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    this._view.btn_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                    this._view.btn_del.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this._view.txt_type.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapType, this);
                    this._view.txt_dir.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapDir, this);
                };
                TeleportPanelMdr.prototype.removeListeners = function () {
                    this._view.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    this._view.btn_new.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                    this._view.btn_del.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                    this._view.txt_type.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapType, this);
                    this._view.txt_dir.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapDir, this);
                };
                TeleportPanelMdr.prototype.onBtnClose = function () {
                    this.hide();
                };
                TeleportPanelMdr.prototype.onShow = function () {
                    if (!this._showArgs) {
                        return;
                    }
                    var args = this._showArgs;
                    this._view.txt_mapid.text = args.mapid;
                    this._view.txt_x.text = args.x;
                    this._view.txt_y.text = args.y;
                    var data = this._proxy.getTeleportPt(args.x, args.y);
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
                };
                TeleportPanelMdr.prototype.onConfirm = function () {
                    var toscene = parseInt(this._view.txt_toscene.text);
                    if (isNaN(toscene)) {
                        Alert.confirm('请输入正确的场景id');
                        return;
                    }
                    if (this.type_ == map.TeleportType.Jump && toscene != this._model.curSceneId) {
                        Alert.confirm('跳跃点只能传送到本场景');
                        return;
                    }
                    var tx = parseInt(this._view.txt_tox.text);
                    if (isNaN(tx)) {
                        Alert.confirm('请输入正确的坐标');
                        return;
                    }
                    var ty = parseInt(this._view.txt_toy.text);
                    if (isNaN(ty)) {
                        Alert.confirm('请输入正确的坐标');
                        return;
                    }
                    var args = this._showArgs;
                    var x = args.x;
                    var y = args.y;
                    var data = {
                        toscene: toscene,
                        x: x,
                        y: y,
                        dir: this.dir_,
                        tx: tx,
                        ty: ty,
                        type: this.type_,
                        hide: this._view.cb_hide.selected
                    };
                    this._proxy.setTeleportPt(data);
                    this.sendNt(map.TELEPORT_CHANGE);
                    this.hide();
                };
                TeleportPanelMdr.prototype.onDel = function () {
                    var args = this._showArgs;
                    var x = args.x;
                    var y = args.y;
                    this._proxy.delTeleportPt(x, y);
                    this.sendNt(map.TELEPORT_CHANGE);
                    this.hide();
                };
                TeleportPanelMdr.prototype.onTapType = function () {
                    var handle = Handler.alloc(this, this.onChooseType);
                    ListUtil.show(this.typeName, this._view.txt_type, handle);
                };
                TeleportPanelMdr.prototype.onTapDir = function () {
                    var handle = Handler.alloc(this, this.onChooseDir);
                    ListUtil.show(this.dirName, this._view.txt_dir, handle);
                };
                TeleportPanelMdr.prototype.onChooseType = function (e) {
                    this.type_ = e.itemIndex;
                    this._view.txt_type.text = this.typeName[this.type_];
                    if (this.type_ == map.TeleportType.Jump) {
                        this._view.txt_toscene.text = this._model.curSceneId.toString();
                        this._view.txt_toscene.$inputEnabled = false;
                    }
                    else {
                        this._view.txt_toscene.$inputEnabled = true;
                    }
                };
                TeleportPanelMdr.prototype.onChooseDir = function (e) {
                    this.dir_ = e.itemIndex;
                    this._view.txt_dir.text = this.dirName[this.dir_];
                };
                return TeleportPanelMdr;
            }(MdrBase));
            map.TeleportPanelMdr = TeleportPanelMdr;
            __reflect(TeleportPanelMdr.prototype, "tool.mod.map.TeleportPanelMdr");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
