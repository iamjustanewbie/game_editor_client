var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var utils;
    (function (utils) {
        var facade = base.module.facade;
        var ModName = tool.mod.ModName;
        var EditorViewType = tool.mod.EditorViewType;
        var Alert = (function () {
            function Alert() {
            }
            Alert.show = function (lab) {
                facade.showView(ModName.Editor, EditorViewType.Alert, { lab: lab, state: "default" });
            };
            Alert.confirm = function (lab, confirm) {
                facade.showView(ModName.Editor, EditorViewType.Alert, { lab: lab, state: "confirm", confirm: confirm });
            };
            Alert.cancel = function (lab, confirm, cancel) {
                var data = {
                    state: "cancel",
                    lab: lab,
                    confirm: confirm,
                    cancel: cancel,
                };
                facade.showView(ModName.Editor, EditorViewType.Alert, data);
            };
            return Alert;
        }());
        utils.Alert = Alert;
        __reflect(Alert.prototype, "tool.utils.Alert");
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=Alert.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
