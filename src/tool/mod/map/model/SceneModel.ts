module tool.mod.map {

    import Handler = base.utils.Handler;

    export class SceneModel {
        sceneList: number[] = [];
        curSceneId: number = 0;

        sceneInfo: SceneInfo;

        change = false;
    }

    export interface SceneInfo {
        mapid: number

        teleports: TeleportPtData[]

        birthPts: BirthPtData[]

        npcs: NPCData[]

        points: { [id: number]: { x: number, y: number, id: number } }
    }

    export class BirthPtData {
        x: number;
        y: number;
        monsters: MonsterData[];

        constructor(x, y, monsters?: { x, y, idx, dir}[]) {
            this.x = x;
            this.y = y;
            this.monsters = [];
            if (monsters) {
                for (let m of monsters) {
                    this.monsters.push(new MonsterData(m.x, m.y, m.idx, m.dir));
                }
            }
        }

        public setTo(x, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    export class MonsterData {
        x: number;
        y: number;
        idx: number;
        dir: number;

        constructor(x, y, idx, dir) {
            this.x = x;
            this.y = y;
            this.idx = idx;
            this.dir = dir;
        }
    }

    export interface TeleportPtData {
        x: number;
        y: number;
        tx: number;
        ty: number;
        toscene: number;
        type: TeleportType;
        dir: number;
        hide: boolean;
    }

    export interface NPCData {
        x: number;
        y: number;
        id: number;
        dir: number;
        autoCreate: boolean;
    }
}