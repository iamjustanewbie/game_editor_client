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
        var effect;
        (function (effect) {
            var MdrBase = base.module.MdrBase;
            var EftEditorView = tool.ui.effect.EftEditorView;
            var ArrayCollection = eui.ArrayCollection;
            var KeyUtil = tool.utils.KeyUtil;
            var EftDisplay = tool.ui.effect.EftDisplay;
            var ViewMgr = game.utils.ViewMgr;
            var EftAddItem = tool.ui.effect.EftAddItem;
            var Pool = base.pool.Pool;
            var TimeMgr = base.time.TimeMgr;
            var Tips = game.comp.Tips;
            var Shape = egret.Shape;
            var EftIndexView = tool.ui.effect.EftIndexView;
            var Point = egret.Point;
            var EftEditorMdr = (function (_super) {
                __extends(EftEditorMdr, _super);
                function EftEditorMdr() {
                    var _this = _super.call(this, tool.EditorUI.window) || this;
                    _this._view = _this.mark("_view", EftEditorView);
                    _this._isPublish = false;
                    _this._startTime = 0;
                    return _this;
                }
                EftEditorMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.top = 0;
                    this._view.left = 0;
                    this._view.right = 0;
                    this._view.bottom = 0;
                    this._monsters = [];
                    this._view.group.x = gso.gameStage.stageWidth * 0.5 - this._view.group.width * 0.5;
                    this._view.group.y = gso.gameStage.stageHeight * 0.5 - this._view.group.height * 0.5;
                    this._eftPro = new ArrayCollection();
                    this._view.list_eft.dataProvider = this._eftPro;
                    this._addPro = new ArrayCollection();
                    this._view.list_add.dataProvider = this._addPro;
                    this._view.list_add.itemRenderer = EftAddItem;
                    this._proxy = this.retProxy(mod.ProxyType.Effect);
                    this._line = new Shape();
                    this._view.group.addChildAt(this._line, 0);
                    var grid = 20;
                    var c = Math.floor(this._view.group.width / grid);
                    var r = Math.floor(this._view.group.height / grid);
                    for (var i = 0; i <= c; ++i) {
                        this._line.graphics.lineStyle(1, 0x000000, 0.3);
                        this._line.graphics.moveTo(i * grid, 0);
                        this._line.graphics.lineTo(i * grid, this._view.group.height);
                    }
                    for (var i = 0; i <= r; ++i) {
                        this._line.graphics.lineStyle(1, 0x000000, 0.3);
                        this._line.graphics.moveTo(0, i * grid);
                        this._line.graphics.lineTo(this._view.group.width, i * grid);
                    }
                };
                EftEditorMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    // let g = this._view.group_actor;
                    // this._actor = Pool.alloc(UIAnim);
                    // let url = ResUrlC1 + "/assets/anim/body/female_01/std1_5.png";
                    // this._actor.setSource(url);
                    // this._actor.x = 0;
                    // this._actor.y = 0;
                    // g.addChild(this._actor);
                    //
                    // let mUrl = ResUrlC1 + "/assets/anim/creature/monster_01/std1_4.png";
                    // let pos: number[][] = [
                    //     [0, -180],
                    //     [90, -90],
                    //     [180, 0],
                    //     [90, 90],
                    //     [0, 180],
                    //     [-90, 90],
                    //     [-180, 0],
                    //     [-90, -90],
                    // ];
                    // for (let p of pos) {
                    //     let m = Pool.alloc(UIAnim);
                    //     m.setSource(mUrl);
                    //     m.x = p[0];
                    //     m.y = p[1];
                    //     g.addChild(m);
                    //     this._monsters.push(m);
                    // }
                    this.onNt(effect.ON_BUILD_EFT, this.onBuild, this);
                    this.onNt(effect.ON_GET_ANIMATION, this.onGetEftList, this);
                    this.onNt(effect.ON_END_EDITOR_SINGLE, this.onEndEditorSingle, this);
                    this._view.list_add.addEventListener(effect.ON_DEL_EFT, this.onDel, this);
                    this._view.list_add.addEventListener(effect.ON_EDITOR_SINGLE, this.editorSingle, this);
                    gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                    this._view.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
                    this._view.btnReview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReview, this);
                    this._view.btnPublish.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
                    this._view.loopPlay.addEventListener(egret.Event.CHANGE, this.onLoopPlayChanged, this);
                    this._view.showIdx.addEventListener(egret.Event.CHANGE, this.onShowIdxChanged, this);
                    this._view.btnImport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftImport, this);
                    this._view.group_idx.addEventListener("on_eft_move", this.onEftMove, this);
                    this._view.editorRadius.addEventListener(egret.Event.CHANGE, this.updateCircle, this);
                };
                EftEditorMdr.prototype.removeListeners = function () {
                    _super.prototype.removeListeners.call(this);
                    if (this._actor && this._actor.parent) {
                        this._actor.parent.removeChild(this._actor);
                    }
                    Pool.release(this._actor);
                    this._actor = null;
                    while (this._monsters.length) {
                        var m = this._monsters.pop();
                        if (m.parent) {
                            m.parent.removeChild(m);
                        }
                        Pool.release(m);
                    }
                    this.clearAdd();
                    this._view.list_add.removeEventListener(effect.ON_DEL_EFT, this.onDel, this);
                    this._view.list_add.removeEventListener(effect.ON_EDITOR_SINGLE, this.editorSingle, this);
                    this._view.loopPlay.removeEventListener(egret.Event.CHANGE, this.onLoopPlayChanged, this);
                    this._view.showIdx.removeEventListener(egret.Event.CHANGE, this.onShowIdxChanged, this);
                    gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                    this._view.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
                    this._view.btnReview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReview, this);
                    this._view.btnPublish.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublish, this);
                    this._view.btnImport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEftImport, this);
                    this._view.group_idx.removeEventListener("on_eft_move", this.onEftMove, this);
                    this._view.editorRadius.addEventListener(egret.Event.CHANGE, this.updateCircle, this);
                };
                EftEditorMdr.prototype.updateCircle = function () {
                    var radius = +this._view.editorRadius.text | 0;
                    this._view.circle.visible = radius > 0;
                    this._view.circle.width = this._view.circle.height = radius;
                    this._view.circle.ellipseWidth = radius;
                    this._view.circle.ellipseHeight = radius;
                };
                EftEditorMdr.prototype.onEftMove = function (e) {
                    var msg = e.data;
                    var eft = this._addPro.getItemAt(msg.idx - 1);
                    if (eft) {
                        eft.updateXY(msg.x, msg.y);
                    }
                };
                EftEditorMdr.prototype.onBack = function () {
                    ViewMgr.getIns().showMain();
                };
                EftEditorMdr.prototype.editorSingle = function (e) {
                    var msg = e.data;
                    this.showView(mod.EftViewType.EdtPanel, msg);
                    this._curEditor = msg.eft;
                };
                EftEditorMdr.prototype.onEndEditorSingle = function () {
                    this._view.list_add.selectedIndex = -1;
                    this._curEditor = null;
                    this.onBtnReview();
                };
                EftEditorMdr.prototype.onLoopPlayChanged = function () {
                    if (this._view.loopPlay.selected) {
                        this.onBtnReview();
                    }
                };
                EftEditorMdr.prototype.onShowIdxChanged = function () {
                    this._view.group_idx.visible = this._view.showIdx.selected;
                };
                EftEditorMdr.prototype.onGetEftList = function (n) {
                    this._eftPro.source = n.body || [];
                    this._view.list_eft.selectedIndex = 0;
                    this._view.scroll.visible = true;
                };
                EftEditorMdr.prototype.onPublish = function () {
                    this._isPublish = true;
                };
                EftEditorMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.getData().isEft = true;
                    this.updateCircle();
                    this.showEftImport();
                    this._view.group_bar.visible = false;
                    this._view.group.visible = false;
                    this._view.scroll.visible = false;
                };
                EftEditorMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._proxy.getData().isEft = false;
                    TimeMgr.removeUpdateItem(this);
                };
                EftEditorMdr.prototype.showEftImport = function () {
                    this.showView(mod.EftViewType.EftImport);
                };
                EftEditorMdr.prototype.publish = function () {
                    if (this._addPro.length <= 0) {
                        Tips.getIns().show("请先添加特效！");
                        return;
                    }
                    var eft = this._proxy.getData().curEditor;
                    if (!eft.id) {
                        Tips.getIns().show("特效ID错误！");
                        return;
                    }
                    eft.children = [];
                    for (var i = 0, l = this._addPro.length; i < l; ++i) {
                        var eftDsp = this._addPro.getItemAt(i);
                        var id = eftDsp.id;
                        var x = +eftDsp.startX | 0;
                        var y = +eftDsp.startY | 0;
                        var ex = +eftDsp.endX | 0;
                        var ey = +eftDsp.endY | 0;
                        var delay = +eftDsp.delay | 0;
                        var r = +eftDsp.rotation | 0;
                        var times = +eftDsp.times | 0;
                        var tw = eftDsp.tw;
                        var rDelay = eftDsp.removeDelay;
                        var duration = +eftDsp.duration | 0;
                        var sx = eftDsp.scaleX;
                        var sy = eftDsp.scaleY;
                        eft.children.push({
                            id: id, x: x, y: y, ex: ex, ey: ey, sx: sx, sy: sy, r: r, times: times, duration: duration, delay: delay, rDelay: rDelay, tw: tw
                        });
                    }
                    this._proxy.publishEft(eft);
                    this._isPublish = false;
                };
                EftEditorMdr.prototype.onBuild = function () {
                    this._view.label_id.text = "ID:" + this._proxy.getData().curEditor.id;
                    this._view.group_bar.visible = true;
                    this._view.group.visible = true;
                    this._view.loopPlay.selected = true;
                    this._view.showIdx.selected = true;
                    this._proxy.getAnimation();
                    this.clearAdd();
                    var children = this._proxy.getData().curEditor.children;
                    if (!children || children.length == 0) {
                        return;
                    }
                    for (var i = 0, l = children.length; i < l; ++i) {
                        var e = Pool.alloc(EftDisplay);
                        var data = children[i];
                        e.setData(data);
                        this._addPro.addItem(e);
                        var idx = Pool.alloc(EftIndexView);
                        idx.setData(this._addPro.length, e.x, e.y);
                        this._view.group_idx.addChild(idx);
                    }
                    this.playGroupEft();
                };
                EftEditorMdr.prototype.clearAdd = function () {
                    this._view.group_idx.removeChildren();
                    this._view.group_editor.removeChildren();
                    while (this._addPro.length) {
                        var del = this._addPro.removeItemAt(0);
                        Pool.release(del);
                    }
                };
                EftEditorMdr.prototype.onBtnReview = function () {
                    if (this._addPro.length <= 0) {
                        Tips.getIns().show("请先添加特效！");
                        return;
                    }
                    this.playGroupEft();
                };
                EftEditorMdr.prototype.update = function (time) {
                    if (this._curEditor) {
                        this._view.group_editor.addChild(this._curEditor);
                    }
                    else {
                        for (var i = 0, l = this._addPro.length; i < l; ++i) {
                            var eft = this._addPro.getItemAt(i);
                            if (time.time - this._startTime >= eft.delay && !eft.parent) {
                                this._view.group_editor.addChildAt(eft, i);
                            }
                        }
                    }
                    if (this._view.group_editor.numChildren == this._addPro.length && this.isGroupEftComp()) {
                        var totalTime = time.time - this._startTime;
                        this._view.label_totalTime.text = "总时长：" + totalTime;
                        TimeMgr.removeUpdateItem(this);
                        if (this._isPublish) {
                            this.publish();
                            this._view.group_editor.removeChildren();
                            return;
                        }
                        if (this._view.loopPlay.selected || this._curEditor) {
                            this.playGroupEft();
                        }
                        this._view.group_editor.removeChildren();
                    }
                };
                EftEditorMdr.prototype.isGroupEftComp = function () {
                    var comp = true;
                    for (var i = 0, l = this._view.group_editor.numChildren; i < l; ++i) {
                        var eft = this._view.group_editor.getChildAt(i);
                        if (!eft.isEftComp) {
                            comp = false;
                            break;
                        }
                    }
                    return comp;
                };
                EftEditorMdr.prototype.onTap = function (e) {
                    if (!this.isAddEft) {
                        return;
                    }
                    var selected = this._view.list_eft.selectedItem;
                    if (!selected) {
                        return;
                    }
                    var id = this._proxy.getData().eftIdMap["effect/" + selected];
                    if (!id) {
                        Tips.getIns().show("找不到特效路径！");
                        return;
                    }
                    var localPt = this._view.group_editor.globalToLocal(e.stageX, e.stageY, Pool.alloc(Point));
                    var eft = Pool.alloc(EftDisplay);
                    eft.initData(id, localPt.x, localPt.y);
                    this._addPro.addItem(eft);
                    var idx = Pool.alloc(EftIndexView);
                    idx.setData(this._addPro.length, eft.x, eft.y);
                    this._view.group_idx.addChild(idx);
                    this.playGroupEft();
                    Pool.release(localPt);
                };
                EftEditorMdr.prototype.playGroupEft = function () {
                    this._view.group_editor.removeChildren();
                    this._startTime = TimeMgr.time.time;
                    TimeMgr.addUpdateItem(this);
                };
                EftEditorMdr.prototype.onDel = function () {
                    var eft = this._view.list_add.selectedItem;
                    var idx = this._addPro.getItemIndex(eft);
                    if (idx < 0) {
                        return;
                    }
                    TimeMgr.removeUpdateItem(this);
                    var del = this._addPro.removeItemAt(idx);
                    if (del.parent) {
                        del.parent.removeChild(del);
                    }
                    Pool.release(del);
                    this.updateAddProIdx();
                    if (this._view.loopPlay.selected) {
                        this.playGroupEft();
                    }
                };
                EftEditorMdr.prototype.updateAddProIdx = function () {
                    this._view.group_idx.removeChildren();
                    for (var i = 0, l = this._addPro.length; i < l; ++i) {
                        var item = this._addPro.getItemAt(i);
                        this._addPro.itemUpdated(item);
                        var idx = Pool.alloc(EftIndexView);
                        idx.setData(i + 1, item.x, item.y);
                        this._view.group_idx.addChild(idx);
                    }
                };
                Object.defineProperty(EftEditorMdr.prototype, "isAddEft", {
                    get: function () {
                        return KeyUtil.keyDown["Control"];
                    },
                    enumerable: true,
                    configurable: true
                });
                return EftEditorMdr;
            }(MdrBase));
            effect.EftEditorMdr = EftEditorMdr;
            __reflect(EftEditorMdr.prototype, "tool.mod.effect.EftEditorMdr", ["base.time.UpdateItem"]);
        })(effect = mod.effect || (mod.effect = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=EftEditorMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
