var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var utils;
    (function (utils) {
        var EditorViewType = tool.mod.EditorViewType;
        var ModName = tool.mod.ModName;
        var facade = base.module.facade;
        var ListUtil = (function () {
            function ListUtil() {
            }
            ListUtil.show = function (src, display, handle) {
                var data = {
                    src: src,
                    display: display,
                    handle: handle
                };
                facade.showView(ModName.Editor, EditorViewType.List, data);
            };
            return ListUtil;
        }());
        utils.ListUtil = ListUtil;
        __reflect(ListUtil.prototype, "tool.utils.ListUtil");
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
