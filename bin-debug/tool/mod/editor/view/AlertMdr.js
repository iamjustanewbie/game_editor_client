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
        var editor;
        (function (editor) {
            var MdrBase = base.module.MdrBase;
            var AlertView = tool.ui.editor.AlertView;
            var Pool = base.pool.Pool;
            var AlertMdr = (function (_super) {
                __extends(AlertMdr, _super);
                function AlertMdr() {
                    var _this = _super.call(this, tool.EditorUI.top) || this;
                    _this._view = _this.mark("_view", AlertView);
                    return _this;
                }
                AlertMdr.prototype.onInit = function () {
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = -80;
                };
                AlertMdr.prototype.addListeners = function () {
                    this._view.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
                    this._view.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
                };
                AlertMdr.prototype.removeListeners = function () {
                    this._view.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
                    this._view.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
                };
                AlertMdr.prototype.onBtnConfirm = function () {
                    if (this._showArgs.confirm) {
                        this._showArgs.confirm.exec();
                    }
                    this.hide();
                };
                AlertMdr.prototype.onBtnCancel = function () {
                    if (this._showArgs.cancel) {
                        this._showArgs.cancel.exec();
                    }
                    this.hide();
                };
                AlertMdr.prototype.onShow = function () {
                    this._view.currentState = this._showArgs.state;
                    if (typeof this._showArgs.lab == "string") {
                        this._view.lab.text = this._showArgs.lab;
                    }
                    else {
                        this._view.lab.textFlow = this._showArgs.lab;
                    }
                };
                AlertMdr.prototype.onHide = function () {
                    if (this._showArgs.confirm) {
                        Pool.release(this._showArgs.confirm);
                        this._showArgs.confirm = undefined;
                    }
                    if (this._showArgs.cancel) {
                        Pool.release(this._showArgs.cancel);
                        this._showArgs.onCancel = undefined;
                    }
                };
                return AlertMdr;
            }(MdrBase));
            editor.AlertMdr = AlertMdr;
            __reflect(AlertMdr.prototype, "tool.mod.editor.AlertMdr");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=AlertMdr.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
