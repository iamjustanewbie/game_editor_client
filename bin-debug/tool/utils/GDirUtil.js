var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var utils;
    (function (utils) {
        var GDirUtil = (function () {
            function GDirUtil() {
            }
            GDirUtil.getMir = function (dir) {
                if (utils.MirDir[dir]) {
                    return utils.MirDir[dir];
                }
                return dir;
            };
            GDirUtil.reversalDir = function (dir) {
                return utils.ReversalDir[dir];
            };
            GDirUtil.randDir = function () {
                return Math.floor(Math.random() * 8 + 1);
            };
            GDirUtil.calcTan = function (x0, y0, x1, y1) {
                return (y1 - y0) / (x1 - x0);
            };
            GDirUtil.calcDirection = function (pt0, pt1) {
                if (pt0.equals(pt1)) {
                    return 0 /* NONE */;
                }
                return this.directionByTan(pt0.x, pt0.y, pt1.x, pt1.y);
            };
            GDirUtil.directionByTan = function (x0, y0, x1, y1) {
                var self = this;
                var tan = self.calcTan(x0, y0, x1, y1);
                var absTan = Math.abs(tan);
                var tan22_5 = self.tan22_5;
                var tan67_5 = self.tan67_5;
                if (absTan >= tan67_5 && y1 <= y0) {
                    return 1 /* UP */;
                }
                else if (absTan > tan22_5 && absTan < tan67_5 && x1 > x0 && y1 < y0) {
                    return 2 /* RIGHT_UP */;
                }
                else if (absTan <= tan22_5 && x1 >= x0) {
                    return 3 /* RIGHT */;
                }
                else if (absTan > tan22_5 && absTan < tan67_5 && x1 > x0 && y1 > y0) {
                    return 4 /* RIGHT_DOWN */;
                }
                else if (absTan >= tan67_5 && y1 >= y0) {
                    return 5 /* DOWN */;
                }
                else if (absTan > tan22_5 && absTan < tan67_5 && x1 < x0 && y1 > y0) {
                    return 6 /* LEFT_DOWN */;
                }
                else if (absTan <= tan22_5 && x1 <= x0) {
                    return 7 /* LEFT */;
                }
                else if (absTan > tan22_5 && absTan < tan67_5 && x1 < x0 && y1 < y0) {
                    return 8 /* LEFT_UP */;
                }
                else {
                    return self.randDir();
                }
            };
            GDirUtil.PI8 = Math.PI / 8;
            GDirUtil.tan22_5 = Math.tan(GDirUtil.PI8);
            GDirUtil.tan67_5 = Math.tan(GDirUtil.PI8 * 3);
            GDirUtil.dir2idx = [
                3 /* RIGHT */,
                2 /* RIGHT_UP */,
                1 /* UP */,
                8 /* LEFT_UP */,
                7 /* LEFT */,
                6 /* LEFT_DOWN */,
                5 /* DOWN */,
                4 /* RIGHT_DOWN */,
            ];
            return GDirUtil;
        }());
        utils.GDirUtil = GDirUtil;
        __reflect(GDirUtil.prototype, "tool.utils.GDirUtil");
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
