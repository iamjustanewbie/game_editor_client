var tool;
(function (tool) {
    var mod;
    (function (mod) {
        mod.ModName = {
            Editor: "editor",
            Map: "map",
            Animation: "animation",
            Effect: "effect",
        };
        var ProxyType;
        (function (ProxyType) {
            ProxyType[ProxyType["Editor"] = 1] = "Editor";
            ProxyType[ProxyType["Map"] = 2] = "Map";
            ProxyType[ProxyType["Animation"] = 3] = "Animation";
            ProxyType[ProxyType["Effect"] = 4] = "Effect";
            ProxyType[ProxyType["Scene"] = 5] = "Scene";
        })(ProxyType = mod.ProxyType || (mod.ProxyType = {}));
        mod.EftViewType = {
            EftEditor: "01",
            EdtPanel: "02",
            EftImport: "03",
        };
        mod.EditorViewType = {
            Start: "01",
            List: "02",
            Alert: "03",
            Font: "04",
        };
        mod.MapViewType = {
            MapMask: "01",
            MapEditor: "02",
            TopBar: "03",
            MonsterList: "04",
            Teleport: "05",
            TeleportPanel: "06",
            Edit: "07",
            SceneTopBar: "08",
            Import: "09",
            SpecificPointPanel: "10",
            ListSwitch: "11",
            NPCList: "12",
            SceneHelp: "13",
<<<<<<< HEAD
            CutMap: "14",
            CutMapPanel: "15",
=======
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
        };
        mod.AnimationViewType = {
            Animation: "01",
            Frame: "02",
            Import: "03",
        };
        mod.PublishCode = {
            start: -1,
            success: 0,
            busy: 1,
            not_exists: 2,
            not_init: 3,
<<<<<<< HEAD
            id_exists: 4,
            input_error: 5 //输入有误
=======
            id_exists: 4 //id已存在
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
        };
        mod.ON_KEY_UPDATE = "on_key_update";
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=EditorDef.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
