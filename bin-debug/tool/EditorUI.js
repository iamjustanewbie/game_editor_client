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
    var Sprite = egret.Sprite;
    var TouchEvent = egret.TouchEvent;
    var UILayer = eui.UILayer;
    var LayerIndex;
    (function (LayerIndex) {
        LayerIndex[LayerIndex["window"] = 0] = "window";
        LayerIndex[LayerIndex["upper"] = 1] = "upper";
        LayerIndex[LayerIndex["top"] = 2] = "top";
        LayerIndex[LayerIndex["tip"] = 3] = "tip";
    })(LayerIndex || (LayerIndex = {}));
    var EditorUI = (function (_super) {
        __extends(EditorUI, _super);
        function EditorUI() {
            var _this = _super.call(this) || this;
            _super.prototype.addChild.call(_this, _this._window = new GameUILayer(LayerIndex.window));
            _super.prototype.addChild.call(_this, _this._upper = new GameUILayer(LayerIndex.upper));
            _super.prototype.addChild.call(_this, _this._top = new GameUILayer(LayerIndex.top));
            _super.prototype.addChild.call(_this, _this._tip = new GameUILayer(LayerIndex.tip));
            return _this;
        }
        Object.defineProperty(EditorUI, "Ins", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EditorUI.init = function () {
            if (this._instance) {
                return this._instance;
            }
            this._instance = new EditorUI();
            return this._instance;
        };
        Object.defineProperty(EditorUI, "window", {
            get: function () {
                return this._instance._window;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorUI, "upper", {
            get: function () {
                return this._instance._upper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorUI, "top", {
            get: function () {
                return this._instance._top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorUI, "tip", {
            get: function () {
                return this._instance._tip;
            },
            enumerable: true,
            configurable: true
        });
        EditorUI.remove = function () {
            this._instance.remChl(this._instance._window);
            this._instance.remChl(this._instance._upper);
        };
        EditorUI.add = function () {
            this._instance.addChl(this._instance._window);
            this._instance.addChl(this._instance._upper);
        };
        EditorUI.hideAllMdr = function () {
            this._instance._window.hideMdr();
            this._instance._upper.hideMdr();
            this._instance._top.hideMdr();
            this._instance._tip.hideMdr();
        };
        EditorUI.prototype.addChl = function (layer) {
            _super.prototype.addChildAt.call(this, layer, layer._idx);
        };
        EditorUI.prototype.remChl = function (layer) {
            if (this.contains(layer)) {
                _super.prototype.removeChild.call(this, layer);
            }
        };
        return EditorUI;
    }(UILayer));
    tool.EditorUI = EditorUI;
    __reflect(EditorUI.prototype, "tool.EditorUI");
    var GameUILayer = (function (_super) {
        __extends(GameUILayer, _super);
        function GameUILayer(idx) {
            var _this = _super.call(this) || this;
            _this._idx = idx;
            _this.touchEnabled = false;
            _this.name = "GameUILayer_" + _this._idx;
            _this.verticalCenter = 0;
            _this.horizontalCenter = 0;
            return _this;
        }
        GameUILayer.prototype.$childAdded = function (child, index) {
            _super.prototype.$childAdded.call(this, child, index);
            if (child == GameUILayer.modalSp) {
                return;
            }
            if (this._idx == LayerIndex.top || this._idx == LayerIndex.upper) {
                this.hideMdr(child);
                this.addModal();
            }
        };
        GameUILayer.prototype.$childRemoved = function (child, index) {
            _super.prototype.$childRemoved.call(this, child, index);
            if (child == GameUILayer.modalSp) {
                return;
            }
            if (this._idx == LayerIndex.top || this._idx == LayerIndex.upper) {
                this.remModal();
            }
            if (this._idx == LayerIndex.top) {
                var upper = EditorUI.upper;
                upper.updateModal();
            }
        };
        GameUILayer.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            if (this._idx == LayerIndex.top || this._idx == LayerIndex.upper) {
                this.updateModal();
            }
        };
        GameUILayer.prototype.updateModal = function () {
            if (this.numChildren > 0 && this.getChildAt(0) != GameUILayer.modalSp) {
                this.addModal();
            }
        };
        GameUILayer.prototype.addModal = function () {
            if (gso.gameStage == null) {
                return;
            }
            var modalSp = GameUILayer.modalSp;
            if (modalSp == null) {
                GameUILayer.modalSp = modalSp = new Sprite();
                modalSp.touchEnabled = true;
            }
            if (this.contains(modalSp)) {
                return;
            }
            modalSp.graphics.clear();
            modalSp.graphics.beginFill(0, 0.5);
            var sw = gso.gameStage.stageWidth;
            var sh = gso.gameStage.stageHeight;
            modalSp.graphics.drawRect(0, 0, sw, sh);
            modalSp.graphics.endFill();
            this.addChildAt(modalSp, 0);
            modalSp.addEventListener(TouchEvent.TOUCH_TAP, GameUILayer.onSpTap, GameUILayer);
        };
        GameUILayer.prototype.remModal = function () {
            var modalSp = GameUILayer.modalSp;
            if (modalSp == null) {
                return;
            }
            if (!this.contains(modalSp)) {
                return;
            }
            this.removeChild(modalSp);
            modalSp.removeEventListener(TouchEvent.TOUCH_TAP, GameUILayer.onSpTap, GameUILayer);
        };
        GameUILayer.onSpTap = function (e) {
            var layer = GameUILayer.modalSp.parent;
            if (layer && layer._idx == LayerIndex.upper) {
                layer.hideMdr();
            }
        };
        GameUILayer.prototype.getViewMdr = function (view) {
            var property = Object.getOwnPropertyDescriptor(view, "__mdr__");
            if (property) {
                return property.value;
            }
            return null;
        };
        GameUILayer.prototype.hideMdr = function (exclude) {
            for (var i = 0; i < this.numChildren; i++) {
                var tmp = this.getChildAt(i);
                if (tmp == GameUILayer.modalSp || tmp == exclude) {
                    continue;
                }
                var mdr = this.getViewMdr(tmp);
                if (mdr) {
                    mdr.hide();
                    i--;
                }
            }
        };
        return GameUILayer;
    }(UILayer));
    __reflect(GameUILayer.prototype, "GameUILayer");
})(tool || (tool = {}));
//# sourceMappingURL=EditorUI.js.map