module tool.mod.effect {

    export class EftModel {

        public isEft: boolean = false;

        public eftIdMap: { [p: string]: string };

        public curEditor: EftData;

        public allEft: EftData[];
    }

    export class EftData {
        public id: string;

        public children: EftChildren[];

        constructor(id: string) {
            if (!id) {
                return;
            }
            this.id = id;
            this.children = [];
        }
    }

    export interface EftChildren {
        id;
        x;
        y; //起始坐标
        ex;
        ey; //终点坐标
        sx; //scaleX
        sy; //scaleY
        r;  //旋转角度
        times;//次数
        duration; //次数之间间隔时间
        delay;//延迟
        rDelay; //延迟移除
        tw: number[][],  //[time,x,y,scaleX,scaleY,rotation,alpha]
    }
}