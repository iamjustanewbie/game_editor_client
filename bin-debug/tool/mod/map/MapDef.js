var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var map;
        (function (map) {
            var SliceStatus;
            (function (SliceStatus) {
                SliceStatus[SliceStatus["Disable"] = 0] = "Disable";
                SliceStatus[SliceStatus["Enable"] = 1] = "Enable";
                SliceStatus[SliceStatus["Shelter"] = 2] = "Shelter";
            })(SliceStatus = map.SliceStatus || (map.SliceStatus = {}));
            map.SliceStatusName = ["障碍", "行走", "遮挡"];
            map.SliceColor = {
                0: 0xFF0000,
                1: 0x00FF00,
                2: 0x00FF00,
            };
            var MapType;
            (function (MapType) {
                MapType[MapType["Mask"] = 1] = "Mask";
                MapType[MapType["Scene"] = 2] = "Scene";
            })(MapType = map.MapType || (map.MapType = {}));
            var TeleportType;
            (function (TeleportType) {
                TeleportType[TeleportType["Normal"] = 0] = "Normal";
                TeleportType[TeleportType["Seamless"] = 1] = "Seamless";
                TeleportType[TeleportType["Layer"] = 2] = "Layer";
                TeleportType[TeleportType["Jump"] = 3] = "Jump";
            })(TeleportType = map.TeleportType || (map.TeleportType = {}));
            map.ON_MAP_CHANGE = "on_map_change";
            map.ON_SLICE_UPDATE = "on_slice_update";
            map.ON_MAP_LIST = "on_map_list";
            map.ON_XY_CHANGE = "on_xy_change";
            map.ON_MAP_SCALE_CHANGE = "on_map_scale_change";
            map.ON_SHOW_LINE_CHANGE = "on_show_line_change";
            map.DEL_BIRTH_PT = "del_birth_pt";
            map.DEL_MONSTER_PT = "del_monster_pt";
            map.DEL_NPC_PT = "DEL_NPC_PT";
            map.ON_GET_MONSTERS = "on_get_monsters";
            map.PUBLISH_BIRTH_PT = "publish_birth_pt";
            map.TELEPORT_CHANGE = "teleport_change";
            map.NEW_SCENE = "new_scene";
            map.SCENE_LIST = "scene_list";
            map.SCENE_INFO = "scene_info";
            map.BEFORE_SAVE = "before_save";
            map.CHANGE_SPECIFIC_PT = "CHANGE_SPECIFIC_PT";
            map.DEL_SPECIFIC_PT = "DEL_SPECIFIC_PT";
        })(map = mod.map || (mod.map = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=MapDef.js.map