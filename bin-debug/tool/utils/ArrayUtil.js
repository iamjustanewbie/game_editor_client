var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var utils;
    (function (utils) {
        var ArrayUtil = (function () {
            function ArrayUtil() {
            }
            ArrayUtil.insertAt = function (array, index, object) {
                var i;
                var length = array.length;
                if (index < 0) {
                    index += length + 1;
                }
                if (index < 0) {
                    index = 0;
                }
                for (i = index - 1; i >= length; --i) {
                    array[i] = null;
                }
                for (i = length; i > index; --i) {
                    array[i] = array[Math.floor(i - 1)];
                }
                array[index] = object;
            };
            ArrayUtil.removeAt = function (array, index) {
                var i;
                var length = array.length;
                if (index < 0) {
                    index += length;
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index >= length) {
                    index = length - 1;
                }
                var object = array[index];
                for (i = index + 1; i < length; ++i) {
                    array[Math.floor(i - 1)] = array[i];
                }
                array.length = length - 1;
                return object;
            };
            return ArrayUtil;
        }());
        utils.ArrayUtil = ArrayUtil;
        __reflect(ArrayUtil.prototype, "tool.utils.ArrayUtil");
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
