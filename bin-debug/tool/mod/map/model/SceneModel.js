var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var SceneModel = (function () {
                function SceneModel() {
                    this.sceneList = [];
                    this.curSceneId = 0;
                    this.change = false;
                }
                return SceneModel;
            }());
            map.SceneModel = SceneModel;
            __reflect(SceneModel.prototype, "tool.mod.map.SceneModel");
            var BirthPtData = (function () {
                function BirthPtData(x, y, monsters) {
                    this.x = x;
                    this.y = y;
                    this.monsters = [];
                    if (monsters) {
                        for (var _i = 0, monsters_1 = monsters; _i < monsters_1.length; _i++) {
                            var m = monsters_1[_i];
                            this.monsters.push(new MonsterData(m.x, m.y, m.idx, m.dir));
                        }
                    }
                }
                BirthPtData.prototype.setTo = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                return BirthPtData;
            }());
            map.BirthPtData = BirthPtData;
            __reflect(BirthPtData.prototype, "tool.mod.map.BirthPtData");
            var MonsterData = (function () {
                function MonsterData(x, y, idx, dir) {
                    this.x = x;
                    this.y = y;
                    this.idx = idx;
                    this.dir = dir;
                }
                return MonsterData;
            }());
            map.MonsterData = MonsterData;
            __reflect(MonsterData.prototype, "tool.mod.map.MonsterData");
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=SceneModel.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
