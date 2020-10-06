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
        var animation;
        (function (animation) {
            var facade = base.module.facade;
            var ModName = tool.mod.ModName;
            var ProxyType = tool.mod.ProxyType;
            var EditorDurationRenderer = (function (_super) {
                __extends(EditorDurationRenderer, _super);
                function EditorDurationRenderer() {
                    var _this = _super.call(this) || this;
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
                    _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                    return _this;
                }
                EditorDurationRenderer.prototype.onAdd = function () {
                    this.lab.addEventListener(egret.Event.CHANGE, this.onEditor, this);
                    this.lab.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
                };
                EditorDurationRenderer.prototype.onRemove = function () {
                    this.lab.addEventListener(egret.Event.CHANGE, this.onEditor, this);
                    this.lab.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
                };
                EditorDurationRenderer.prototype.onFocusOut = function () {
                    if (this.lab.text.trim() == "") {
                        this.lab.text = "0";
                        this.onEditor();
                    }
                };
                EditorDurationRenderer.prototype.onEditor = function () {
                    if (this.lab.text.trim() == "") {
                        return;
                    }
                    var _model = facade.retMod(ModName.Animation).retProxy(ProxyType.Animation).getData();
                    var d = parseInt(this.lab.text);
                    _model.duration[this.itemIndex] = +d | 0;
                    if (_model.curFrame <= _model.duration.length) {
                        _model.curDuration = _model.duration[_model.curFrame - 1];
                    }
                };
                EditorDurationRenderer.prototype.dataChanged = function () {
                };
                return EditorDurationRenderer;
            }(eui.ItemRenderer));
            animation.EditorDurationRenderer = EditorDurationRenderer;
            __reflect(EditorDurationRenderer.prototype, "tool.ui.animation.EditorDurationRenderer");
        })(animation = ui.animation || (ui.animation = {}));
    })(ui = tool.ui || (tool.ui = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=EditorDurationRenderer.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
