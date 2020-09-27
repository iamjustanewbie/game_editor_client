var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var utils;
    (function (utils) {
        var Point = egret.Point;
        var Pool = base.pool.Pool;
        var PointUtil = (function () {
            function PointUtil() {
            }
            PointUtil.distance = function (x0, y0, x1, y1) {
                var dx = (x0 - x1);
                var dy = (y0 - y1);
                return Math.sqrt(dx * dx + dy * dy);
            };
            PointUtil.distancePt = function (p0, p1) {
                return Math.sqrt(this.distanceSquare(p0.x, p0.y, p1.x, p1.y));
            };
            PointUtil.distance1 = function (p0, x1, y1) {
                return Math.sqrt(this.distanceSquare(p0.x, p0.y, x1, y1));
            };
            PointUtil.distanceSquare = function (x0, y0, x1, y1) {
                var dx = x0 - x1;
                var dy = y0 - y1;
                return dx * dx + dy * dy;
            };
            PointUtil.distanceSquarePt = function (p0, p1) {
                return this.distanceSquare(p0.x, p0.y, p1.x, p1.y);
            };
            PointUtil.distanceSquare1 = function (p0, x1, y1) {
                return this.distanceSquare(p0.x, p0.y, x1, y1);
            };
            PointUtil.getDistancePoint = function (fromPt, angleRadians, dist, res) {
                res = res || Pool.alloc(Point);
                dist = +dist | 0;
                var xInc = Math.cos(angleRadians) * dist;
                var yInc = Math.sin(angleRadians) * dist;
                res.x = fromPt.x + xInc;
                res.y = fromPt.y + yInc;
                return res;
            };
            PointUtil.anglePt = function (sPt, ePt) {
                return this.angle(sPt.x, sPt.y, ePt.x, ePt.y);
            };
            PointUtil.angle1 = function (sx, sy, ePt) {
                return this.angle(sx, sy, ePt.x, ePt.y);
            };
            PointUtil.angle = function (sx, sy, ex, ey) {
                var a = Math.atan2(ey - sy, ex - sx);
                return a >= 0 ? a : 2 * Math.PI + a;
            };
            return PointUtil;
        }());
        utils.PointUtil = PointUtil;
        __reflect(PointUtil.prototype, "tool.utils.PointUtil");
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
//# sourceMappingURL=PointUtil.js.map