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
    var ui;
    (function (ui) {
        var map;
        (function (map) {
            var DEL_MONSTER_PT = tool.mod.map.DEL_MONSTER_PT;
            var ProxyType = tool.mod.ProxyType;
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var Pool = base.pool.Pool;
            var ResUrlC1 = tool.mod.editor.ResUrlC1;
            var UIAnim = tool.comp.UIAnim;
            var DisplayObjectContainer = egret.DisplayObjectContainer;
            var TeleportPt = (function (_super) {
                __extends(TeleportPt, _super);
                function TeleportPt(r, c) {
                    var _this = _super.call(this) || this;
                    _this._proxy = facade.retMod(ModName.Map).retProxy(ProxyType.Map);
                    _this._model = _this._proxy.getData();
                    _this._c = c;
                    _this._r = r;
                    _this.x = (_this._c + 0.5) * _this._model.curMapData.cellWidth;
                    _this.y = (_this._r + 0.5) * _this._model.curMapData.cellWidth;
                    var url = ResUrlC1 + "/assets/anim/effect/portal.png";
                    _this._anim = Pool.alloc(UIAnim);
                    _this._anim.setSource(url, 0);
                    _this._anim.touchEnabled = false;
                    _this.addChild(_this._anim);
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                Object.defineProperty(TeleportPt.prototype, "c", {
                    get: function () {
                        return this._c;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TeleportPt.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    enumerable: true,
                    configurable: true
                });
                TeleportPt.prototype.updatePos = function (c, r) {
                    if (r != undefined) {
                        this._r = r;
                    }
                    if (c != undefined) {
                        this._c = c;
                    }
                    this.x = (this._c + 0.5) * this._model.curMapData.cellWidth;
                    this.y = (this._r + 0.5) * this._model.curMapData.cellWidth;
                };
                TeleportPt.prototype.onAddToStage = function () {
                };
                TeleportPt.prototype.onRemoveFromStage = function () {
                };
                TeleportPt.prototype.onDel = function (e) {
                    e.stopPropagation();
                    if (this.parent) {
                        this.parent.dispatchEventWith(DEL_MONSTER_PT, false, this);
                    }
                    this.dispose();
                };
                TeleportPt.prototype.dispose = function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                    Pool.release(this._anim);
                    this._anim = null;
                };
                return TeleportPt;
            }(DisplayObjectContainer));
            map.TeleportPt = TeleportPt;
            __reflect(TeleportPt.prototype, "tool.ui.map.TeleportPt");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=teleportPt.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
