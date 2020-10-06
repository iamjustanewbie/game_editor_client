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
            var EditorPB = tool.mod.editor.EditorPB;
            var MsgId = tool.mod.editor.MsgId;
            var AnimationProxy = (function (_super) {
                __extends(AnimationProxy, _super);
                function AnimationProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AnimationProxy.prototype.getData = function () {
                    return this._model;
                };
                AnimationProxy.prototype.initialize = function () {
                    this._model = new animation.AnimationModel();
                    this.onMsg(MsgId.getAnimationList, this.onGetList, this);
                    this.onMsg(MsgId.importAnimation, this.onImportAnimation, this);
                };
                AnimationProxy.prototype.publishAnimation = function () {
                    var duration = this._model.duration;
                    var p = this._model.importDir.join("/");
                    this.sendMsg(MsgId.publishAnimation, { duration: duration, p: p });
                };
                AnimationProxy.prototype.saveDur = function (nextOp) {
                    var _this = this;
                    var duration = this._model.duration;
                    var same = true;
                    for (var i = 0; i < duration.length; i++) {
                        if (this._model.origindur[i] != duration[i]) {
                            same = false;
                            break;
                        }
                    }
                    if (same) {
                        if (nextOp)
                            nextOp();
                        return;
                    }
                    var p = this._model.importDir.join("/");
                    this.sendMsg(MsgId.saveDur, { duration: duration, p: p });
                    if (nextOp) {
                        var func_1 = function () {
                            _this.offMsg(MsgId.saveDur, func_1, _this);
                            _this._model.origindur = duration;
                            nextOp();
                        };
                        this.onMsg(MsgId.saveDur, func_1, this);
                    }
                };
                AnimationProxy.prototype.autoPublish = function () {
                    this.sendMsg(MsgId.autoPublish, { list: [this._model.importDir[0]] });
                };
                AnimationProxy.prototype.importAnimation = function (id) {
                    var p = this._model.importDir.join("/");
                    this.sendMsg(MsgId.importAnimation, { id: id, p: p });
                };
                AnimationProxy.prototype.onImportAnimation = function (n) {
                    var msg = n.body;
                    if (msg.res == mod.PublishCode.success) {
                        this.getList();
                        this.sendNt(animation.IMPORT_SUCCESS);
                    }
                    if (msg.res == mod.PublishCode.id_exists) {
                        alert("动画id已存在！");
                    }
                };
                AnimationProxy.prototype.getList = function () {
                    this._model.play = false;
                    this._model.isImport = false;
                    var p = "";
                    if (this._model.importDir.length > 0) {
                        p = this._model.importDir.join("/");
                    }
                    this.sendMsg(MsgId.getAnimationList, { p: p });
                };
                AnimationProxy.prototype.onGetList = function (n) {
                    if (!this._model.isAnimation) {
                        return;
                    }
                    var msg = n.body;
                    this._model.importId = msg.id;
                    this.sendNt(animation.ON_ID_CHANGED);
                    if (msg.p != undefined) {
                        this._model.importDir = msg.p == "" ? [] : msg.p.split("/");
                    }
                    if (msg.time != undefined) {
                        this._model.duration = msg.time;
                        this._model.origindur = [].concat(msg.time);
                        this._model.loadCfg();
                        return;
                    }
                    if (msg.list != undefined) {
                        var list = msg.list;
                        var idx = this._model.importDir.length;
                        this.sendNt(animation.ON_GET_LIST, { idx: idx, list: list });
                    }
                };
                return AnimationProxy;
            }(EditorPB));
            animation.AnimationProxy = AnimationProxy;
            __reflect(AnimationProxy.prototype, "tool.mod.animation.AnimationProxy");
        })(animation = mod.animation || (mod.animation = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=AnimationProxy.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
