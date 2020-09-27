module tool.utils {
    import Point = egret.Point;
    import Pool = base.pool.Pool;

    export class PointUtil {
        public static distance(x0: number, y0: number, x1: number, y1: number): number {
            let dx: number = (x0 - x1);
            let dy: number = (y0 - y1);
            return Math.sqrt(dx * dx + dy * dy);
        }

        public static distancePt(p0: Point, p1: Point): number {
            return Math.sqrt(this.distanceSquare(p0.x, p0.y, p1.x, p1.y));
        }

        public static distance1(p0: Point, x1: number, y1: number): number {
            return Math.sqrt(this.distanceSquare(p0.x, p0.y, x1, y1));
        }

        public static distanceSquare(x0: number, y0: number, x1: number, y1: number): number {
            let dx: number = x0 - x1;
            let dy: number = y0 - y1;
            return dx * dx + dy * dy;
        }

        public static distanceSquarePt(p0: Point, p1: Point): number {
            return this.distanceSquare(p0.x, p0.y, p1.x, p1.y);
        }

        public static distanceSquare1(p0: Point, x1: number, y1: number): number {
            return this.distanceSquare(p0.x, p0.y, x1, y1);
        }

        public static getDistancePoint(fromPt: Point, angleRadians: number, dist: number, res?: Point): Point {
            res = res || Pool.alloc(Point);
            dist = +dist | 0;
            let xInc: number = Math.cos(angleRadians) * dist;
            let yInc: number = Math.sin(angleRadians) * dist;
            res.x = fromPt.x + xInc;
            res.y = fromPt.y + yInc;
            return res;
        }

        public static anglePt(sPt: Point, ePt: Point): number {
            return this.angle(sPt.x, sPt.y, ePt.x, ePt.y);
        }

        public static angle1(sx: number, sy: number, ePt: Point): number {
            return this.angle(sx, sy, ePt.x, ePt.y);
        }

        public static angle(sx: number, sy: number, ex: number, ey: number): number {
            let a: number = Math.atan2(ey - sy, ex - sx);
            return a >= 0 ? a : 2 * Math.PI + a;
        }

    }
}
