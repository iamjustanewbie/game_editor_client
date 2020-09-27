module tool.mod.map {
    import Point = egret.Point;
    import Pool = base.pool.Pool;
    import PoolObject = base.pool.PoolObject;
    import Handler = base.utils.Handler;
    import ArrayUtil = tool.utils.ArrayUtil;

    export class AStar {
        private static _nodes: AStarNode[][];
        private static _numCols: number = 0;
        private static _numRows: number = 0;
        private static _isInit: boolean;

        private static _nowversion: number = 1;

        public static ckIsBlock: Handler;

        public static initialize(numCols: number, numRows: number): void {
            let self = this;
            self._numCols = numCols;
            self._numRows = numRows;
            self._isInit = false;

            if (self._nodes != null) {
                for (let col: number = 0, cNum: number = self._nodes.length; col < cNum; col++) {
                    let obj: AStarNode[] = self._nodes[col];
                    for (let row: number = 0, rNum: number = obj.length; row < rNum; row++) {
                        let node: AStarNode = obj[row];
                        if (node) {
                            Pool.release(node);
                        }
                    }
                }
                self._nodes = null;
            }
        }

        private static excInit(): void {
            let self = this;
            self._isInit = true;
            self._nodes = [];
            for (let i: number = 0; i < self._numCols; i++) {
                self._nodes[i] = new Array(self._numRows);
            }
        }

        private static getNode(x: number, y: number): AStarNode {
            let node: AStarNode = this._nodes[x][y];
            if (node != null) {
                return node;
            }
            node = AStarNode.alloc(x, y, !this.ckIsBlock.exec([x, y]));
            this._nodes[x][y] = node;
            return node;
        }


        public static findPath(sx: number, sy: number, ex: number, ey: number): Point[] {
            let self = this;
            sx = +sx | 0;
            sy = +sy | 0;
            ex = +ex | 0;
            ey = +ey | 0;
            if (!self._isInit) {
                self.excInit();
            }
            let start: AStarNode = self.getNode(sx, sy);
            let end: AStarNode = self.getNode(ex, ey);
            if (!start.walkable || !end.walkable) {
                return null;
            }
            // if (self.isLinePassable(sx, sy, ex, ey)) {
            //     return [Pool.allocPoint(sx, sy), Pool.allocPoint(ex, ey)];
            // }
            self._nowversion++;
            let open: AStarBinaryHeap = new AStarBinaryHeap();
            start.g = 0;

            let node: AStarNode = start;
            node.version = self._nowversion;
            while (node != end) {
                if (!node.linkInited) {
                    self.initNodeLink8(node);
                    node.linkInited = true;
                }
                let len: number = node.linkNodes.length;
                for (let i: number = 0; i < len; i++) {
                    let test: AStarNode = node.linkNodes[i];
                    let cost: number = node.linkCost[i];
                    let g: number = node.g + cost;
                    let h: number = self.euclidian2(test, end);
                    let f: number = g + h;
                    if (test.version == self._nowversion) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    } else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        open.ins(test);
                        test.version = self._nowversion;
                    }
                }
                if (open.a.length == 1) {
                    return null;
                }
                node = open.pop();
                if (node == null) {
                    return null;
                }
            }
            return self.buildPath(start, end);
        }

        /** 此方法会修改传入的path */
        public static floyd(path: Point[]): Point[] {
            if (path == null) {
                return null;
            }
            let len: number = path.length;
            let i: number;
            if (len > 2) {
                let vector: Point = Pool.alloc(Point);
                let tempVector: Point = Pool.alloc(Point);
                this.floydVector(vector, path[len - 1], path[len - 2]);
                for (i = path.length - 3; i >= 0; i--) {
                    let point: Point = path[i + 1];
                    this.floydVector(tempVector, point, path[i]);
                    if (vector.x == tempVector.x && vector.y == tempVector.y) {
                        Pool.release(ArrayUtil.removeAt(path, i + 1));
                    } else {
                        vector.x = tempVector.x;
                        vector.y = tempVector.y;
                    }
                }
                Pool.release(vector);
                Pool.release(tempVector);
            }
            len = path.length;
            for (i = len - 1; i >= 0; i--) {
                for (let j: number = 0; j <= i - 2; j++) {
                    if (this.isPassable(path[i], path[j])) {
                        for (let k: number = i - 1; k > j; k--) {
                            Pool.release(ArrayUtil.removeAt(path, k));
                        }
                        i = j;
                        len = path.length;
                        break;
                    }
                }
            }
            return path;
        }

        private static floydVector(target: Point, n1: Point, n2: Point): void {
            target.x = n1.x - n2.x;
            target.y = n1.y - n2.y;
        }

        public static isPassable(p1: Point, p2: Point): boolean {
            return this.isLinePassable(p1.x, p1.y, p2.x, p2.y);
        }

        // private static initNodeLink4(node: AStarNode): void {
        //     node.linkNodes = [];
        //     node.linkCost = [];
        //     if (node.x > 0) {
        //         this.pushNodeLink(node, this.getNode(node.x - 1, node.y));
        //     }
        //     if (node.x < this._numCols - 1) {
        //         this.pushNodeLink(node, this.getNode(node.x + 1, node.y));
        //     }
        //     if (node.y > 0) {
        //         this.pushNodeLink(node, this.getNode(node.x, node.y - 1));
        //     }
        //     if (node.y < this._numRows - 1) {
        //         this.pushNodeLink(node, this.getNode(node.x, node.y + 1));
        //     }
        // }

        private static initNodeLink8(node: AStarNode): void {
            let startX: number = Math.max(0, node.x - 1);
            let endX: number = Math.min(this._numCols - 1, node.x + 1);
            let startY: number = Math.max(0, node.y - 1);
            let endY: number = Math.min(this._numRows - 1, node.y + 1);
            if (node.linkNodes == null) {
                node.linkNodes = [];
            }
            if (node.linkCost == null) {
                node.linkCost = [];
            }
            for (let i: number = startX; i <= endX; i++) {
                for (let j: number = startY; j <= endY; j++) {
                    let test: AStarNode = this.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    node.linkNodes.push(test);
                    node.linkCost.push(1);
                }
            }
        }

        // private static pushNodeLink(node: AStarNode, test: AStarNode) {
        //     if (test.walkable) {
        //         node.linkNodes.push(test);
        //         node.linkCost.push(1);
        //     }
        // }

        public static isLinePassable(x0: number, y0: number, x1: number, y1: number): boolean {
            x0 = +x0 | 0;
            y0 = +y0 | 0;
            x1 = +x1 | 0;
            y1 = +y1 | 0;
            let x: number = x0;
            let y: number = y0;

            if (this.ckIsBlock.exec([x0, y0]) || this.ckIsBlock.exec([x1, y1])) return false;
            let dx: number = x1 - x0;
            let dy: number = y1 - y0;
            let MaxStep: number = Math.max(Math.abs(dx), Math.abs(dy));

            let stepX: number = dx / MaxStep;
            let stepY: number = dy / MaxStep;

            for (let i: number = 1; i < MaxStep; ++i) {
                x += stepX;
                y += stepY;
                if (this.ckIsBlock.exec([Math.floor(x), Math.floor(y)])) return false;
            }
            return true;
        }

        private static buildPath(start: AStarNode, end: AStarNode): Point[] {
            let list: Point[] = [];
            let node: AStarNode = end;
            list.push(node.toPoint());
            while (node != start) {
                node = node.parent;
                list.unshift(node.toPoint());
            }
            return list;
        }

        private static euclidian2(node: AStarNode, end: AStarNode): number {
            let dx: number = node.x - end.x;
            let dy: number = node.y - end.y;
            return dx * dx + dy * dy;
        }

    }

    class AStarBinaryHeap {
        public a: AStarNode[] = [];

        constructor() {
            this.a.push(null);
        }

        public ins(value: AStarNode): void {
            let self = this;
            let p: number = self.a.length;
            self.a[p] = value;
            let pp: number = p >> 1;
            while (p > 1 && AStarBinaryHeap.justMinFun(self.a[p], self.a[pp])) {
                let temp: AStarNode = self.a[p];
                self.a[p] = self.a[pp];
                self.a[pp] = temp;
                p = pp;
                pp = p >> 1;
            }
        }

        public pop(): AStarNode {
            let self = this;
            let min: AStarNode = self.a[1];
            self.a[1] = self.a[self.a.length - 1];
            self.a.pop();
            let p: number = 1;
            let l: number = self.a.length;
            let sp1: number = p << 1;
            let sp2: number = sp1 + 1;
            let minp: number;
            while (sp1 < l) {
                if (sp2 < l) {
                    minp = AStarBinaryHeap.justMinFun(self.a[sp2], self.a[sp1]) ? sp2 : sp1;
                } else {
                    minp = sp1;
                }
                if (AStarBinaryHeap.justMinFun(self.a[minp], self.a[p])) {
                    let temp: AStarNode = self.a[p];
                    self.a[p] = self.a[minp];
                    self.a[minp] = temp;
                    p = minp;
                    sp1 = p << 1;
                    sp2 = sp1 + 1;
                } else {
                    break;
                }
            }
            return min;
        }

        private static justMinFun(x: AStarNode, y: AStarNode): boolean {
            return x.f < y.f;
        }

    }

    class AStarNode implements PoolObject {
        public x: number = 0;
        public y: number = 0;
        public f: number = 0;
        public g: number = 0;
        public h: number = 0;
        public parent: AStarNode;
        public version: number = 1;

        public linkInited: boolean = false;
        public linkNodes: AStarNode[];
        public linkCost: number[];
        public walkable: boolean;

        public static alloc(x: number, y: number, s: boolean): AStarNode {
            let node: AStarNode = Pool.alloc(AStarNode);
            node.x = x;
            node.y = y;
            node.walkable = s;
            return node;
        }

        public toString(): String {
            return "AStarNode:{x:" + this.x + " y:" + this.y + "}";
        }

        public toPoint(): Point {
            return Pool.alloc(Point).setTo(this.x, this.y);
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            let self = this;
            self.x = 0;
            self.y = 0;
            self.f = 0;
            self.g = 0;
            self.h = 0;
            self.parent = null;
            self.version = 0;

            self.linkInited = false;
            if (self.linkNodes) {
                self.linkNodes.length = 0;
            }
            if (self.linkCost) {
                self.linkCost.length = 0;
            }
            self.walkable = false;
        }

    }

}
