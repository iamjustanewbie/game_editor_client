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
            var MsgId = tool.mod.editor.MsgId;
            var EditorPB = tool.mod.editor.EditorPB;
            var EftProxy = (function (_super) {
                __extends(EftProxy, _super);
                function EftProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EftProxy.prototype.getData = function () {
                    return this._model;
                };
                EftProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new effect.EftModel();
                    this.onMsg(MsgId.getAnimationList, this.onGetAnimation, this);
                    this.onMsg(MsgId.getEftList, this.onGetEft, this);
                };
                EftProxy.prototype.publishEft = function (eft) {
                    var data = JSON.stringify(eft, null, "    ");
                    var id = eft.id;
                    this.sendMsg(MsgId.publishEft, { id: id, data: data });
                };
                EftProxy.prototype.delEft = function (id) {
                    var data = null;
                    this.sendMsg(MsgId.publishEft, { id: id, data: data });
                };
                EftProxy.prototype.getEft = function () {
                    this.sendMsg(MsgId.getEftList);
                };
                EftProxy.prototype.onGetEft = function (n) {
                    var msg = n.body;
                    var eft = [];
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var i = _a[_i];
                        eft.push(JSON.parse(i));
                    }
                    this._model.allEft = eft;
                    this.sendNt(effect.ON_GET_EFT);
                };
                EftProxy.prototype.getAnimation = function (eftName) {
                    var p = "effect" + (eftName ? "/" + eftName : "");
                    this.sendMsg(MsgId.getAnimationList, { p: p, eft: true });
                };
                EftProxy.prototype.onGetAnimation = function (n) {
                    if (!this._model.isEft) {
                        return;
                    }
                    var msg = n.body;
                    if (msg.id != undefined && this._model.eftIdMap != undefined) {
                        this._model.eftIdMap[msg.p] = msg.id;
                        return;
                    }
                    if (msg.list != undefined) {
                        this.sendNt(effect.ON_GET_ANIMATION, msg.list);
                        if (!this._model.eftIdMap) {
                            this._model.eftIdMap = {};
                            for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                                var i = _a[_i];
                                this.getAnimation(i);
                            }
                        }
                    }
                };
                return EftProxy;
            }(EditorPB));
            effect.EftProxy = EftProxy;
            __reflect(EftProxy.prototype, "tool.mod.effect.EftProxy");
        })(effect = mod.effect || (mod.effect = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EftProxy.js.map