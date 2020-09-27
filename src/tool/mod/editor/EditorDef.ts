module tool.mod {

    export const ModName = {
        Editor: "editor",
        Map: "map",
        Animation: "animation",
        Effect: "effect",
    };

    export enum ProxyType {
        Editor = 1,
        Map,
        Animation,
        Effect,
        Scene,
    }

    export const EftViewType = {
        EftEditor: "01",
        EdtPanel: "02",
        EftImport: "03",
    };

    export const EditorViewType = {
        Start: "01",
        List: "02",
        Alert: "03",
        Font: "04",
    };

    export const MapViewType = {
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
    };

    export const AnimationViewType = {
        Animation: "01",
        Frame: "02",
        Import: "03",
    };

    export const PublishCode = {
        start: -1, //开始发布
        success: 0, // 成功
        busy: 1, // 当前正在发布
        not_exists: 2, // 地图不存在
        not_init: 3,// 没有编辑过
        id_exists: 4 //id已存在
    };

    export const ON_KEY_UPDATE: string = "on_key_update";

}