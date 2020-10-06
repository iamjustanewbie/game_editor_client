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
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var ProxyType = tool.mod.ProxyType;
            var DEL_SPECIFIC_PT = tool.mod.map.DEL_SPECIFIC_PT;
            var SpecificPt = (function (_super) {
                __extends(SpecificPt, _super);
                function SpecificPt(r, c, i) {
                    var _this = _super.call(this) || this;
                    _this._model = facade.retMod(ModName.Map).retProxy(ProxyType.Map).getData();
                    _this.skinName = "skins.map.SpecificPointSkin";
                    _this.width = _this._model.curMapData.cellWidth;
                    _this.height = _this._model.curMapData.cellHeight;
                    _this.updateLab(i);
                    _this.updatePos(c, r);
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                Object.defineProperty(SpecificPt.prototype, "c", {
                    get: function () {
                        return this._c;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpecificPt.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpecificPt.prototype, "idx", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                SpecificPt.prototype.onAddToStage = function () {
                    this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                };
                SpecificPt.prototype.onRemoveFromStage = function () {
                    this.btnDel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                };
                SpecificPt.prototype.updateLab = function (i) {
                    this.id = i;
                    this.lab_idx.text = i + "";
                };
                SpecificPt.prototype.updatePos = function (c, r) {
                    if (r != undefined) {
                        this._r = r;
                    }
                    if (c != undefined) {
                        this._c = c;
                    }
                    this.x = this._c * this.width;
                    this.y = this._r * this.height;
                };
                SpecificPt.prototype.onDel = function (e) {
                    e.stopPropagation();
                    if (this.parent) {
                        this.parent.dispatchEventWith(DEL_SPECIFIC_PT, false, this.id);
                    }
                };
                SpecificPt.prototype.dispose = function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                return SpecificPt;
            }(eui.Component));
            map.SpecificPt = SpecificPt;
            __reflect(SpecificPt.prototype, "tool.ui.map.SpecificPt");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=SpecificPt.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
