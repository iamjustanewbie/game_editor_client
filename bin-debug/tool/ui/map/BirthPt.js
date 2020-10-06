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
            var Sprite = egret.Sprite;
            var TextField = egret.TextField;
            var Shape = egret.Shape;
            var HorizontalAlign = egret.HorizontalAlign;
            var VerticalAlign = egret.VerticalAlign;
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var ProxyType = tool.mod.ProxyType;
            var DEL_BIRTH_PT = tool.mod.map.DEL_BIRTH_PT;
            var BirthPt = (function (_super) {
                __extends(BirthPt, _super);
                function BirthPt(r, c, i) {
                    var _this = _super.call(this) || this;
                    _this._model = facade.retMod(ModName.Map).retProxy(ProxyType.Map).getData();
                    _this.width = _this._model.curMapData.cellWidth;
                    _this.height = _this._model.curMapData.cellHeight;
                    _this._sp = new Shape();
                    _this._sp.graphics.beginFill(0xffff00, 0.7);
                    _this._sp.graphics.drawRect(0, 0, _this.width, _this.height);
                    _this._sp.graphics.endFill();
                    _this.addChild(_this._sp);
                    _this._lab = new TextField();
                    _this._lab.width = _this.width;
                    _this._lab.height = _this.height;
                    _this._lab.size = 20;
                    _this._lab.textColor = 0x0;
                    _this._lab.textAlign = HorizontalAlign.CENTER;
                    _this._lab.verticalAlign = VerticalAlign.MIDDLE;
                    _this.addChild(_this._lab);
                    _this._del = new TextField();
                    _this._del.width = _this.width * 0.3;
                    _this._del.height = _this.height * 0.3;
                    _this._del.text = "×";
                    _this._del.size = 20;
                    _this._del.x = _this.width * 0.7;
                    _this._del.textAlign = HorizontalAlign.CENTER;
                    _this._del.verticalAlign = VerticalAlign.MIDDLE;
                    _this._del.background = true;
                    _this._del.backgroundColor = 0xff0000;
                    _this._del.touchEnabled = true;
                    _this.addChild(_this._del);
                    _this.updateLab(i);
                    _this.updatePos(c, r);
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                    return _this;
                }
                Object.defineProperty(BirthPt.prototype, "c", {
                    get: function () {
                        return this._c;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BirthPt.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BirthPt.prototype, "idx", {
                    get: function () {
                        return this._idx;
                    },
                    enumerable: true,
                    configurable: true
                });
                BirthPt.prototype.onAddToStage = function () {
                    this._del.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                };
                BirthPt.prototype.onRemoveFromStage = function () {
                    this._del.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
                };
                BirthPt.prototype.updateLab = function (i) {
                    this._idx = i;
                    this._lab.text = i + 1 + "";
                };
                BirthPt.prototype.updatePos = function (c, r) {
                    if (r != undefined) {
                        this._r = r;
                    }
                    if (c != undefined) {
                        this._c = c;
                    }
                    this.x = this._c * this.width;
                    this.y = this._r * this.height;
                };
                BirthPt.prototype.onDel = function (e) {
                    e.stopPropagation();
                    if (this.parent) {
                        this.parent.dispatchEventWith(DEL_BIRTH_PT, false, this._idx);
                        this.parent.removeChild(this);
                    }
                };
                BirthPt.prototype.dispose = function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                return BirthPt;
            }(Sprite));
            map.BirthPt = BirthPt;
            __reflect(BirthPt.prototype, "tool.ui.map.BirthPt");
        })(map = ui.map || (ui.map = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=BirthPt.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
