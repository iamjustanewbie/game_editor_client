var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var editor;
        (function (editor) {
<<<<<<< HEAD
            editor.ServerHost = "ws://127.0.0.1:3001";
            editor.ResUrl = "http://127.0.0.1:81/res";
            editor.ResUrlC1 = "http://127.0.0.1:81";
=======
            editor.ServerHost = "ws://192.168.3.75:3001";
            editor.ResUrl = "http://192.168.3.75:88/res";
            editor.ResUrlC1 = "http://192.168.3.75:88";
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
            editor.MsgId = {
                getMapList: 101,
                getMapInfo: 102,
                setMapInfo: 103,
                publishMap: 104,
                autoPublish: 200,
                getAnimationList: 202,
                importAnimation: 203,
                publishAnimation: 204,
                getEftList: 205,
                publishEft: 206,
                saveDur: 207,
                getMonsterList: 301,
                publishMonster: 302,
                publishTeleport: 401,
                getTeleportList: 402,
                saveInfo: 501,
                getSceneInfo: 502,
                getSceneList: 503,
                publishScene: 504,
<<<<<<< HEAD
                cutMap: 601,
                cutMapList: 602,
=======
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
            };
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=MsgId.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
