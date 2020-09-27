module tool.utils {
    import Point = egret.Point;

    export class GDirUtil {
        private static PI8: number = Math.PI / 8;
        private static tan22_5: number = Math.tan(GDirUtil.PI8);
        private static tan67_5: number = Math.tan(GDirUtil.PI8 * 3);

        public static dir2idx: number[] = [
            Direction.RIGHT,
            Direction.RIGHT_UP,
            Direction.UP,
            Direction.LEFT_UP,
            Direction.LEFT,
            Direction.LEFT_DOWN,
            Direction.DOWN,
            Direction.RIGHT_DOWN,
        ];

        public static getMir(dir: number): number {
            if (MirDir[dir]) {
                return MirDir[dir];
            }
            return dir;
        }

        public static reversalDir(dir: number): number {
            return ReversalDir[dir];
        }

        public static randDir(): number {
            return Math.floor(Math.random() * 8 + 1);
        }

        private static calcTan(x0: number, y0: number, x1: number, y1: number): number {
            return (y1 - y0) / (x1 - x0);
        }

        public static calcDirection(pt0: Point, pt1: Point): number {
            if (pt0.equals(pt1)) {
                return Direction.NONE;
            }
            return this.directionByTan(pt0.x, pt0.y, pt1.x, pt1.y);
        }

        public static directionByTan(x0: number, y0: number, x1: number, y1: number): number {
            let self = this;
            let tan: number = self.calcTan(x0, y0, x1, y1);
            let absTan: number = Math.abs(tan);
            let tan22_5 = self.tan22_5;
            let tan67_5 = self.tan67_5;
            if (absTan >= tan67_5 && y1 <= y0) {
                return Direction.UP;
            } else if (absTan > tan22_5 && absTan < tan67_5 && x1 > x0 && y1 < y0) {
                return Direction.RIGHT_UP;
            } else if (absTan <= tan22_5 && x1 >= x0) {
                return Direction.RIGHT;
            } else if (absTan > tan22_5 && absTan < tan67_5 && x1 > x0 && y1 > y0) {
                return Direction.RIGHT_DOWN;
            } else if (absTan >= tan67_5 && y1 >= y0) {
                return Direction.DOWN;
            } else if (absTan > tan22_5 && absTan < tan67_5 && x1 < x0 && y1 > y0) {
                return Direction.LEFT_DOWN;
            } else if (absTan <= tan22_5 && x1 <= x0) {
                return Direction.LEFT;
            } else if (absTan > tan22_5 && absTan < tan67_5 && x1 < x0 && y1 < y0) {
                return Direction.LEFT_UP;
            } else {
                return self.randDir();
            }
        }

    }

}
