declare interface GameGlobalObject {
    webReqGet(url: string, data?: any, onSuccess?: (obj: any) => any, onFail?: () => any): void;

    encodeUriData(obj: any): string;

    loadScriptList(list: string[], onProgress: (number) => void, onComplete: () => void): void;

    loadImage(url: string, key: string, onComplete: (data: egret.BitmapData) => void, onFail?: () => void): void;
}

declare interface GameShareObject {
    gameStage: egret.Stage;
}

declare var ggo: GameGlobalObject;
declare var gso: GameShareObject;