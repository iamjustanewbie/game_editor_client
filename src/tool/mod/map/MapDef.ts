module tool.mod.map {


    export enum SliceStatus {
        Disable = 0,
        Enable = 1,
        Shelter = 2,
    }

    export const SliceStatusName: string[] = ["障碍", "行走", "遮挡"];

    export const SliceColor: { [type: number]: number } = {
        0: 0xFF0000,
        1: 0x00FF00,
        2: 0x00FF00,
    };

    export enum MapType {
        Mask = 1,
        Scene = 2,
    }

    export enum TeleportType {
        Normal = 0,
        Seamless = 1,
        Layer = 2,
        Jump = 3,
    }

    export const ON_MAP_CHANGE: string = "on_map_change";
    export const ON_SLICE_UPDATE: string = "on_slice_update";
    export const ON_MAP_LIST: string = "on_map_list";
    export const ON_XY_CHANGE: string = "on_xy_change";
    export const ON_MAP_SCALE_CHANGE: string = "on_map_scale_change";
    export const ON_SHOW_LINE_CHANGE: string = "on_show_line_change";

    export const DEL_BIRTH_PT: string = "del_birth_pt";
    export const DEL_MONSTER_PT: string = "del_monster_pt";
    export const DEL_NPC_PT: string = "DEL_NPC_PT";
    export const ON_GET_MONSTERS: string = "on_get_monsters";

    export const PUBLISH_BIRTH_PT: string = "publish_birth_pt";
    export const TELEPORT_CHANGE: string = "teleport_change";

    export const NEW_SCENE: string = "new_scene";
    export const SCENE_LIST: string = "scene_list";
    export const SCENE_INFO: string = "scene_info";
    export const BEFORE_SAVE: string = "before_save";

    export const CHANGE_SPECIFIC_PT: string = "CHANGE_SPECIFIC_PT";
    export const DEL_SPECIFIC_PT: string = "DEL_SPECIFIC_PT";

    export const CUT_MAP_LIST = Symbol();
}