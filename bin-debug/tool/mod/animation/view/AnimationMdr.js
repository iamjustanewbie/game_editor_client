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
        var animation;
        (function (animation) {
            var MdrBase = base.module.MdrBase;
            var AnimationView = tool.ui.animation.AnimationView;
            var TimeMgr = base.time.TimeMgr;
            var ViewMgr = game.utils.ViewMgr;
            var facade = base.module.facade;
            var ArrayCollection = eui.ArrayCollection;
            var AnimationMdr = (function (_super) {
                __extends(AnimationMdr, _super);
                function AnimationMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", AnimationView);
                    _this._lashShow = 0;
                    return _this;
                }
                AnimationMdr.prototype.onInit = function () {
                    this._view.right = 0;
                    this._view.left = 0;
                    this._view.top = 0;
                    this._view.bottom = 0;
                    this._actPro = new ArrayCollection();
                    this._view.list_act.dataProvider = this._actPro;
                    this._dirPro = new ArrayCollection();
                    this._view.list_dir.dataProvider = this._dirPro;
                    this._proxy = this.retProxy(mod.ProxyType.Animation);
                    this._model = this._proxy.getData();
                    this._view.line.graphics.clear();
                    this._view.line.graphics.lineStyle(1, 0x00ff00);
                    this._view.line.graphics.moveTo(-300, 0);
                    this._view.line.graphics.lineTo(300, 0);
                    this._view.line.graphics.moveTo(0, -300);
                    this._view.line.graphics.lineTo(0, 300);
                    this._view.addChild(this._view.line);
                    this._view.addChild(this._view.img);
                };
                AnimationMdr.prototype.addListeners = function () {
                    this.onNt(animation.ANIMATION_PLAY_CHANGE, this.onPlayChange, this);
                    this.onNt(animation.ON_SELECTED_FRAME, this.onFrameSelected, this);
                    this.onNt(animation.ON_IMPORT_ANIMATION, this.onImportAnimation, this);
                    this.onNt(animation.ON_GET_LIST, this.onGetList, this);
                    this.onNt(animation.ON_ID_CHANGED, this.updateId, this);
                    this._view.btnImport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showImport, this);
                    this._view.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
                    this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPublish, this);
                    this._view.list_act.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapAct, this);
                    this._view.list_dir.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
                };
                AnimationMdr.prototype.removeListeners = function () {
                    this._view.btnImport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showImport, this);
                    this._view.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
                    this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPublish, this);
                    this._view.list_act.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapAct, this);
                    this._view.list_dir.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapDir, this);
                };
                AnimationMdr.prototype.onBtnBack = function () {
                    ViewMgr.getIns().showMain();
                };
                AnimationMdr.prototype.onBtnPublish = function () {
                    this._proxy.saveDur(this._proxy.autoPublish.bind(this._proxy));
                };
                AnimationMdr.prototype.showImport = function () {
                    var _this = this;
                    this._proxy.saveDur(function () {
                        _this.showView(mod.AnimationViewType.Import);
                    });
                };
                AnimationMdr.prototype.onTapAct = function (e) {
                    var _this = this;
                    var tmp = e.item;
                    this._proxy.saveDur(function () {
                        _this._model.importDir.length = animation.DirIdx.ActName;
                        _this._model.importDir.push(tmp);
                        _this._proxy.getList();
                    });
                };
                AnimationMdr.prototype.onTapDir = function (e) {
                    var _this = this;
                    var tmp = e.item;
                    this._proxy.saveDur(function () {
                        _this._model.importDir.length = animation.DirIdx.Dir;
                        _this._model.importDir.push(tmp);
                        _this._proxy.getList();
                    });
                };
                AnimationMdr.prototype.onGetList = function (n) {
                    var _a = n.body, list = _a.list, idx = _a.idx;
                    this.updateId();
                    if (idx < animation.DirIdx.ActName) {
                        this._actPro.removeAll();
                    }
                    if (idx < animation.DirIdx.Dir) {
                        this._dirPro.removeAll();
                    }
                    if (!list || list.length == 0) {
                        return;
                    }
                    if (idx == animation.DirIdx.ActName) {
                        this._actPro.source = list;
                        this._view.list_act.selectedIndex = 0;
                        this._model.importDir[idx] = list[0];
                        this._proxy.getList();
                    }
                    if (idx == animation.DirIdx.Dir) {
                        this._dirPro.source = list;
                        this._view.list_dir.selectedIndex = 0;
                        this._model.importDir[idx] = list[0];
                        this._proxy.getList();
                    }
                };
                AnimationMdr.prototype.onPlayChange = function () {
                    if (this._model.play) {
                        if (this._model.curFrame >= this._model.maxFrame) {
                            this._model.curFrame = 1;
                        }
                        this._lashShow = TimeMgr.time.time;
                        this.setImg();
                        TimeMgr.addUpdateItem(this);
                    }
                    else {
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                AnimationMdr.prototype.onFrameSelected = function (n) {
                    this._model.play = false;
                    this._model.curFrame = n.body;
                    this.setImg();
                };
                AnimationMdr.prototype.onImportAnimation = function () {
                    this._view.btnPublish.visible = true;
                    this._model.curFrame = 1;
                    this.showView(mod.AnimationViewType.Frame);
                    this._model.play = true;
                };
                AnimationMdr.prototype.updateId = function () {
                    if (this._model.importId != undefined) {
                        this._view.lab_id.text = "动画ID：" + this._model.importId;
                        this._view.lab_id.visible = true;
                    }
                    else {
                        this._view.lab_id.visible = false;
                    }
                };
                AnimationMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._model.isAnimation = true;
                    if (this._model.isImport) {
                        this.onImportAnimation();
                        this.onPlayChange();
                    }
                    else {
                        this._view.btnPublish.visible = false;
                        this._view.lab_id.visible = false;
                    }
                };
                AnimationMdr.prototype.update = function (time) {
                    if (time.time - this._lashShow > this._model.curDuration) {
                        this._lashShow = time.time;
                        this._model.curFrame++;
                        while (this._model.curDuration == 0) {
                            this._model.curFrame++;
                        }
                        if (this._model.curFrame > this._model.maxFrame) {
                            if (!this._model.isLoop) {
                                this._model.play = false;
                                this._model.curFrame = this._model.maxFrame;
                            }
                            else {
                                this._model.curFrame = 1;
                            }
                        }
                        this.setImg();
                    }
                };
                AnimationMdr.prototype.setImg = function () {
                    var config = this._model.getImgConfig();
                    this._view.line.x = this._view.stage.stageWidth * 0.5;
                    this._view.line.y = this._view.stage.stageHeight * 0.5;
                    this._view.img.x = this._view.stage.stageWidth * 0.5 - config["sourceW"] / 2 + config["offX"];
                    this._view.img.y = this._view.stage.stageHeight * 0.5 - config["sourceH"] / 2 + config["offY"];
                    this._view.img.texture = this._model.getImgTex(this._model.curFrame);
                    this._view.lab_path.text = "路径：" + this._model.importDir.join("/");
                };
                AnimationMdr.prototype.onHide = function () {
                    this._model.isAnimation = false;
                    TimeMgr.removeUpdateItem(this);
                    facade.hideView(mod.ModName.Animation, mod.AnimationViewType.Frame);
                };
                return AnimationMdr;
            }(MdrBase));
            animation.AnimationMdr = AnimationMdr;
            __reflect(AnimationMdr.prototype, "tool.mod.animation.AnimationMdr", ["base.time.UpdateItem"]);
        })(animation = mod.animation || (mod.animation = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=AnimationMdr.js.map