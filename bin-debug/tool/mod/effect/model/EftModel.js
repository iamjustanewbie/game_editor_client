var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var effect;
        (function (effect) {
            var EftModel = (function () {
                function EftModel() {
                    this.isEft = false;
                }
                return EftModel;
            }());
            effect.EftModel = EftModel;
            __reflect(EftModel.prototype, "tool.mod.effect.EftModel");
            var EftData = (function () {
                function EftData(id) {
                    if (!id) {
                        return;
                    }
                    this.id = id;
                    this.children = [];
                }
                return EftData;
            }());
            effect.EftData = EftData;
            __reflect(EftData.prototype, "tool.mod.effect.EftData");
        })(effect = mod.effect || (mod.effect = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
