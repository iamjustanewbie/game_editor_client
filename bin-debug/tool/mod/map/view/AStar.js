var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var Point = egret.Point;
            var Pool = base.pool.Pool;
            var ArrayUtil = tool.utils.ArrayUtil;
            var AStar = (function () {
                function AStar() {
                }
                AStar.initialize = function (numCols, numRows) {
                    var self = this;
                    self._numCols = numCols;
                    self._numRows = numRows;
                    self._isInit = false;
                    if (self._nodes != null) {
                        for (var col = 0, cNum = self._nodes.length; col < cNum; col++) {
                            var obj = self._nodes[col];
                            for (var row = 0, rNum = obj.length; row < rNum; row++) {
                                var node = obj[row];
                                if (node) {
                                    Pool.release(node);
                                }
                            }
                        }
                        self._nodes = null;
                    }
                };
                AStar.excInit = function () {
                    var self = this;
                    self._isInit = true;
                    self._nodes = [];
                    for (var i = 0; i < self._numCols; i++) {
                        self._nodes[i] = new Array(self._numRows);
                    }
                };
                AStar.getNode = function (x, y) {
                    var node = this._nodes[x][y];
                    if (node != null) {
                        return node;
                    }
                    node = AStarNode.alloc(x, y, !this.ckIsBlock.exec([x, y]));
                    this._nodes[x][y] = node;
                    return node;
                };
                AStar.findPath = function (sx, sy, ex, ey) {
                    var self = this;
                    sx = +sx | 0;
                    sy = +sy | 0;
                    ex = +ex | 0;
                    ey = +ey | 0;
                    if (!self._isInit) {
                        self.excInit();
                    }
                    var start = self.getNode(sx, sy);
                    var end = self.getNode(ex, ey);
                    if (!start.walkable || !end.walkable) {
                        return null;
                    }
                    // if (self.isLinePassable(sx, sy, ex, ey)) {
                    //     return [Pool.allocPoint(sx, sy), Pool.allocPoint(ex, ey)];
                    // }
                    self._nowversion++;
                    var open = new AStarBinaryHeap();
                    start.g = 0;
                    var node = start;
                    node.version = self._nowversion;
                    while (node != end) {
                        if (!node.linkInited) {
                            self.initNodeLink8(node);
                            node.linkInited = true;
                        }
                        var len = node.linkNodes.length;
                        for (var i = 0; i < len; i++) {
                            var test = node.linkNodes[i];
                            var cost = node.linkCost[i];
                            var g = node.g + cost;
                            var h = self.euclidian2(test, end);
                            var f = g + h;
                            if (test.version == self._nowversion) {
                                if (test.f > f) {
                                    test.f = f;
                                    test.g = g;
                                    test.h = h;
                                    test.parent = node;
                                }
                            }
                            else {
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
                };
                /** 此方法会修改传入的path */
                AStar.floyd = function (path) {
                    if (path == null) {
                        return null;
                    }
                    var len = path.length;
                    var i;
                    if (len > 2) {
                        var vector = Pool.alloc(Point);
                        var tempVector = Pool.alloc(Point);
                        this.floydVector(vector, path[len - 1], path[len - 2]);
                        for (i = path.length - 3; i >= 0; i--) {
                            var point = path[i + 1];
                            this.floydVector(tempVector, point, path[i]);
                            if (vector.x == tempVector.x && vector.y == tempVector.y) {
                                Pool.release(ArrayUtil.removeAt(path, i + 1));
                            }
                            else {
                                vector.x = tempVector.x;
                                vector.y = tempVector.y;
                            }
                        }
                        Pool.release(vector);
                        Pool.release(tempVector);
                    }
                    len = path.length;
                    for (i = len - 1; i >= 0; i--) {
                        for (var j = 0; j <= i - 2; j++) {
                            if (this.isPassable(path[i], path[j])) {
                                for (var k = i - 1; k > j; k--) {
                                    Pool.release(ArrayUtil.removeAt(path, k));
                                }
                                i = j;
                                len = path.length;
                                break;
                            }
                        }
                    }
                    return path;
                };
                AStar.floydVector = function (target, n1, n2) {
                    target.x = n1.x - n2.x;
                    target.y = n1.y - n2.y;
                };
                AStar.isPassable = function (p1, p2) {
                    return this.isLinePassable(p1.x, p1.y, p2.x, p2.y);
                };
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
                AStar.initNodeLink8 = function (node) {
                    var startX = Math.max(0, node.x - 1);
                    var endX = Math.min(this._numCols - 1, node.x + 1);
                    var startY = Math.max(0, node.y - 1);
                    var endY = Math.min(this._numRows - 1, node.y + 1);
                    if (node.linkNodes == null) {
                        node.linkNodes = [];
                    }
                    if (node.linkCost == null) {
                        node.linkCost = [];
                    }
                    for (var i = startX; i <= endX; i++) {
                        for (var j = startY; j <= endY; j++) {
                            var test = this.getNode(i, j);
                            if (test == node || !test.walkable) {
                                continue;
                            }
                            node.linkNodes.push(test);
                            node.linkCost.push(1);
                        }
                    }
                };
                // private static pushNodeLink(node: AStarNode, test: AStarNode) {
                //     if (test.walkable) {
                //         node.linkNodes.push(test);
                //         node.linkCost.push(1);
                //     }
                // }
                AStar.isLinePassable = function (x0, y0, x1, y1) {
                    x0 = +x0 | 0;
                    y0 = +y0 | 0;
                    x1 = +x1 | 0;
                    y1 = +y1 | 0;
                    var x = x0;
                    var y = y0;
                    if (this.ckIsBlock.exec([x0, y0]) || this.ckIsBlock.exec([x1, y1]))
                        return false;
                    var dx = x1 - x0;
                    var dy = y1 - y0;
                    var MaxStep = Math.max(Math.abs(dx), Math.abs(dy));
                    var stepX = dx / MaxStep;
                    var stepY = dy / MaxStep;
                    for (var i = 1; i < MaxStep; ++i) {
                        x += stepX;
                        y += stepY;
                        if (this.ckIsBlock.exec([Math.floor(x), Math.floor(y)]))
                            return false;
                    }
                    return true;
                };
                AStar.buildPath = function (start, end) {
                    var list = [];
                    var node = end;
                    list.push(node.toPoint());
                    while (node != start) {
                        node = node.parent;
                        list.unshift(node.toPoint());
                    }
                    return list;
                };
                AStar.euclidian2 = function (node, end) {
                    var dx = node.x - end.x;
                    var dy = node.y - end.y;
                    return dx * dx + dy * dy;
                };
                AStar._numCols = 0;
                AStar._numRows = 0;
                AStar._nowversion = 1;
                return AStar;
            }());
            map.AStar = AStar;
            __reflect(AStar.prototype, "tool.mod.map.AStar");
            var AStarBinaryHeap = (function () {
                function AStarBinaryHeap() {
                    this.a = [];
                    this.a.push(null);
                }
                AStarBinaryHeap.prototype.ins = function (value) {
                    var self = this;
                    var p = self.a.length;
                    self.a[p] = value;
                    var pp = p >> 1;
                    while (p > 1 && AStarBinaryHeap.justMinFun(self.a[p], self.a[pp])) {
                        var temp = self.a[p];
                        self.a[p] = self.a[pp];
                        self.a[pp] = temp;
                        p = pp;
                        pp = p >> 1;
                    }
                };
                AStarBinaryHeap.prototype.pop = function () {
                    var self = this;
                    var min = self.a[1];
                    self.a[1] = self.a[self.a.length - 1];
                    self.a.pop();
                    var p = 1;
                    var l = self.a.length;
                    var sp1 = p << 1;
                    var sp2 = sp1 + 1;
                    var minp;
                    while (sp1 < l) {
                        if (sp2 < l) {
                            minp = AStarBinaryHeap.justMinFun(self.a[sp2], self.a[sp1]) ? sp2 : sp1;
                        }
                        else {
                            minp = sp1;
                        }
                        if (AStarBinaryHeap.justMinFun(self.a[minp], self.a[p])) {
                            var temp = self.a[p];
                            self.a[p] = self.a[minp];
                            self.a[minp] = temp;
                            p = minp;
                            sp1 = p << 1;
                            sp2 = sp1 + 1;
                        }
                        else {
                            break;
                        }
                    }
                    return min;
                };
                AStarBinaryHeap.justMinFun = function (x, y) {
                    return x.f < y.f;
                };
                return AStarBinaryHeap;
            }());
            __reflect(AStarBinaryHeap.prototype, "AStarBinaryHeap");
            var AStarNode = (function () {
                function AStarNode() {
                    this.x = 0;
                    this.y = 0;
                    this.f = 0;
                    this.g = 0;
                    this.h = 0;
                    this.version = 1;
                    this.linkInited = false;
                }
                AStarNode.alloc = function (x, y, s) {
                    var node = Pool.alloc(AStarNode);
                    node.x = x;
                    node.y = y;
                    node.walkable = s;
                    return node;
                };
                AStarNode.prototype.toString = function () {
                    return "AStarNode:{x:" + this.x + " y:" + this.y + "}";
                };
                AStarNode.prototype.toPoint = function () {
                    return Pool.alloc(Point).setTo(this.x, this.y);
                };
                AStarNode.prototype.dispose = function () {
                    this.onRelease();
                };
                AStarNode.prototype.onAlloc = function () {
                };
                AStarNode.prototype.onRelease = function () {
                    var self = this;
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
                };
                return AStarNode;
            }());
            __reflect(AStarNode.prototype, "AStarNode", ["base.pool.PoolObject", "base.pool.DisposeObject"]);
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=AStar.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
