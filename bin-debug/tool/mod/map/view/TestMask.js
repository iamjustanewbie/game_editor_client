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
            var Sprite = egret.Sprite;
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var ProxyType = tool.mod.ProxyType;
            var SliceStatus = tool.mod.map.SliceStatus;
            var TestMask = (function (_super) {
                __extends(TestMask, _super);
                function TestMask() {
                    var _this = _super.call(this) || this;
                    _this._model = facade.retMod(ModName.Map).retProxy(ProxyType.Map).getData();
                    return _this;
                }
                TestMask.prototype.init = function (cellWidth, cellHeight, numCol, numRow) {
                    this._cw = cellWidth;
                    this._ch = cellHeight;
                    this._numCol = numCol;
                    this._numRow = numRow;
                };
                TestMask.prototype.updateCur = function () {
                    this.graphics.clear();
                    for (var i = this._sx; i <= this._ex; i++) {
                        for (var j = this._sy; j <= this._ey; j++) {
                            var data = this._model.curMapData.data[this._model.getIdx(j, i)];
                            var isBlock = !data || data == SliceStatus.Disable;
                            var color = isBlock ? 0xff0000 : 0x00ff00;
                            var isShelter = data == SliceStatus.Shelter;
                            var alpha = isBlock || isShelter ? 0.5 : 0;
                            this.graphics.beginFill(color, alpha);
                            this.graphics.drawRect(i * this._cw + 1, j * this._ch + 1, this._cw - 2, this._ch - 2);
                        }
                    }
                };
                TestMask.prototype.updateView = function (viewPort) {
                    if (this._cw == 0 || this._ch == 0) {
                        return;
                    }
                    var sx = Math.floor(viewPort.x / this._cw);
                    var ex = sx + Math.ceil(viewPort.width / this._cw);
                    if (ex > this._numCol - 1) {
                        ex = this._numCol - 1;
                    }
                    var sy = Math.floor(viewPort.y / this._ch);
                    var ey = sy + Math.ceil(viewPort.height / this._ch);
                    if (ey > this._numRow - 1) {
                        ey = this._numRow - 1;
                    }
                    this._sx = sx;
                    this._sy = sy;
                    this._ex = ex;
                    this._ey = ey;
                    this.updateCur();
                };
                TestMask.prototype.clean = function () {
                    this._cw = this._ch = 0;
                    this.graphics.clear();
                };
                return TestMask;
            }(Sprite));
            map.TestMask = TestMask;
            __reflect(TestMask.prototype, "tool.mod.map.TestMask");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=TestMask.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
