declare module base {
    class Base extends egret.DisplayObjectContainer {
        protected onInit(): void;

        protected onResize(e?: egret.Event): void;

        protected onActivate(e: egret.Event): void;

        protected onDeActivate(e: egret.Event): void;
    }

    class ObjBase extends egret.HashObject {
    }

    module module {
        import Handler = base.utils.Handler;
        import DisposeObject = base.pool.DisposeObject;
        const facade: Facade;
        let loadGroupList: (groups: string[], onComp: Handler) => void;

        class GameNT extends ObjBase implements base.pool.PoolObject {
            public static alloc(type: string, body?: any): GameNT;

            public readonly type: string;

            public readonly body: any;

            public onAlloc(): void;

            public onRelease(): void;

            public dispose(): void;

        }

        class Notifier extends ObjBase {
            public sendNt(notify: string, data?: any): void;
        }

        class CmdBase extends Notifier {
            public exec(n: GameNT): void;

            protected readonly owner: ModBase;

            protected retProxy<T extends ProxyBase>(type: number): T;
        }

        class ProxyBase extends Notifier {

            public getData(): any;

            public initialize(): void;

            public onStartReconnect(): void;

            protected onProto(protoT: any, method: (ntfy: GameNT) => void, context: any): void;

            protected offProto(protoT: any, method: (ntfy: GameNT) => void, context: any): void;

            protected sendProto(proto: any): void;

            public readonly gameService: base.network.GameService;

            public readonly webService: base.network.WebService;

        }

        type MdrClsList = (new(p: egret.DisplayObjectContainer) => MdrBase)[];

        interface MdrTab extends DisposeObject {
            hide(): void;
        }

        class MdrBase extends Notifier {
            protected _asset: string[];
            protected _showArgs: any;
            public isEasyHide: boolean;

            constructor(parent: egret.DisplayObjectContainer);

            public $setOwner(base: ModBase): void;

            protected mark<T extends egret.DisplayObject>(key: string, type: new() => T): T;

            protected newView(): void;

            protected getView(): egret.DisplayObject;

            protected onNt(notify: string, method: Function, context: any): void;

            protected offNt(notify: string): void;

            protected offNtAll(): void;

            public show(obj?: any): void;

            public hide(): void;

            protected onAssetLoaded(): void;

            protected onInit(): void;

            protected addListeners(): void;

            protected removeListeners(): void;

            protected onShow(): void;

            protected onHide(): void;

            protected showView(type: string, data?: any): void;

            protected retProxy<T extends ProxyBase>(type: number): T;

            protected genMdrTab<T extends MdrTab>(t: new(m: ModBase, p: egret.DisplayObjectContainer, l: MdrClsList) => T, list: MdrClsList): T;

        }

        class ModBase extends ObjBase {
            constructor(name: string);

            public getName(): string;

            public onRegister(): void;

            protected initCmd(): void;

            protected initModel(): void;

            protected initView(): void;

            public regCmd<T extends CmdBase>(notify: string, cls: new () => T): void;

            public unregCmd(notify: string): void;

            public regProxy<T extends ProxyBase>(type: number, cls: new () => T): void;

            public retProxy<T extends ProxyBase>(type: number): T;

            public regMdr<T extends MdrBase>(type: string, mdr: new (c: any) => T): void;

            public showView(type: string, data?: any): void;

            public hideView(type: string): void;

            public onConnectLost(): void;

        }

        class Facade {
            public regMod(o: ModBase): void;

            public retMod(name: string): ModBase;

            public showView(moduleName: string, viewType: string, data?: any): void;

            public hideView(moduleName: string, viewType: string): void;

            public sendNt(notify: string, data?: any): void;

            public onNt(notify: string, method: (ntfy: GameNT) => void, context: any): void;

            public offNt(notify: string, method: (ntfy: GameNT) => void, context: any): void;

            public onConnectLost(): void;
        }
    }

    module network {
        import GameNT = base.module.GameNT;
        import Handler = base.utils.Handler;
        const ON_CONNECT_CREATE: string;
        const ON_CONNECT_LOST: string;
        const ON_CONNECT_ERROR: string;

        let traceProto: (type: string, proto?: any) => void;
        let webRequest: (url: string, data?: any, onSuccess?: (obj: any) => any, onFail?: () => any) => void;
        let reqPS: number;
        let rspdPS: number;
        let onMsg: (proto: any) => void;

        function __reg(id, c): void;

        function getProtoName(proto: any): string;

        class NetworkService extends ObjBase {
            public readonly game: GameService;
            public readonly web: WebService;
        }

        class WebService extends ObjBase {
            public request(url: string, data?: any, thisObj?: any, complete?: Function, error?: Function, method?: string): void;
        }

        class GameService extends ObjBase {
            public isConnected(): boolean;

            public connectTo(host: string, port: number): void;

            public close(): void;

            public setWhiteList(list: any[]): void;

            public startBlock(rule: string): void;

            public endBlock(): void;

            public onNt(protoT: any, method: (ntfy: GameNT) => void, context: any): void;

            public offNt(protoT: any, method: (ntfy: GameNT) => void, context: any): void;

            public sendProto(proto: any): void;

        }

        class Connection extends ObjBase {
            public onMsgReceive: Handler;
            public onCreated: Handler;
            public onLost: Handler;
            public onError: Handler;
            public readonly isConnected: boolean;

            public connect(url: string): void;

            public disconnect(): void;

            public send(proto: any): void;

            public dispose(): void;
        }

        export class Socket {
            public onOpen: Handler;
            public onClose: Handler;
            public onError: Handler;
            public onMessage: Handler;

            public readonly connected: boolean;

            public connect(url: string): void;

            public close(): void;

            public send(buffer: ArrayBuffer): void;

            public dispose(): void;
        }

    }

    module pool {
        interface DisposeObject {
            dispose(): void;
        }

        interface PoolObject extends DisposeObject {
            onAlloc(): void;

            onRelease(): void;
        }

        class Pool {
            public static alloc<T>(cls: new () => T): T;

            public static release<T>(obj: T): void;
        }

    }

    module time {
        import Handler = base.utils.Handler;

        interface UpdateItem {
            update(time: Time): void;
        }

        export function delayCall(handler: Handler, delay?: number): number;

        export function clearDelay(key: number): void;

        class Time {
            /**
             * 游戏运行经过的时间，毫秒，getTimer()
             */
            public readonly time: number;

            /**
             * 当前服务器时间，毫秒
             */
            public readonly serverTime: number;

            /**
             * 当前服务器时间，秒
             */
            public readonly serverTimeSecond: number;
        }

        class TimeMgr {
            public static init(): void;

            public static readonly isActivate: boolean;

            public static readonly time: Time;

            public static needPause: boolean;

            public static addUpdateItem(item: UpdateItem, interval?: number): void;

            public static removeUpdateItem(item: UpdateItem): void;

            public static setServerTime(now: number, startTime?: number): void;

            public static getCount(item: UpdateItem): number;

            public static getElapseTime(item: UpdateItem): number;

            public static setWorker(worker: Worker): void;

        }
    }

    module tween {
        import Handler = base.utils.Handler;

        module easing {
            export class Back {
                public static easeIn(t: number, b: number, c: number, d: number, s?: number): number;

                public static easeOut(t: number, b: number, c: number, d: number, s?: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number, s?: number): number;

                public static easeOutExtra(t: number, b: number, c: number, d: number, s?: number): number;
            }

            export class Bounce {
                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Circ {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Cubic {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Elastic {
                public static easeIn(t: number, b: number, c: number, d: number, a?: number, p?: number): number;

                public static easeOut(t: number, b: number, c: number, d: number, a?: number, p?: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number, a?: number, p?: number): number;
            }

            export class Expo {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class IntegerSine {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Linear {
                public static easeNone(t: number, b: number, c: number, d: number): number;

                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Quad {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Quart {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }


            export class Quint {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Sine {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }

            export class Strong {
                public static easeIn(t: number, b: number, c: number, d: number): number;

                public static easeOut(t: number, b: number, c: number, d: number): number;

                public static easeInOut(t: number, b: number, c: number, d: number): number;
            }
        }

        export type EaseFun = (t: number, b: number, c: number, d: number) => number;

        export class Tween {
            /**
             * 获取一个新的缓动对象
             * @param target 缓动目标
             * @param {{loop?: boolean}} vars 额外参数
             * @param {boolean?} vars.loop 是否循环缓动
             * @return {base.tween.Tween}
             */
            public static get(target: any, vars?: { loop?: boolean }): Tween;

            /**
             * 移除一个对象所有的缓动
             * @param target 缓动目标
             */
            public static remove(target: any): void;

            /**
             * 开始缓动，从当前值变化到目标值
             * @param {{onUpdate?: base.utils.Handler}} vars 变更的目标值合集
             * @param {number} duration 持续时间，毫秒
             * @param {Handler} [onUpdate=null] 更新时回调
             * @param {base.tween.EaseFun} [ease=Linear.easeNone] 缓动函数
             * @return {base.tween.Tween}
             */
            public to(vars: any, duration: number, onUpdate?: Handler, ease?: EaseFun): Tween;

            /**
             * 开始缓动，从目标值变化到当前值
             * @param {{onUpdate?: base.utils.Handler}} vars 变更的目标值合集
             * @param {number} duration 持续时间，毫秒
             * @param {Handler} [onUpdate=null] 更新时回调
             * @param {base.tween.EaseFun} [ease=Linear.easeNone] 缓动函数
             * @return {base.tween.Tween}
             */
            public from(vars: any, duration: number, onUpdate?: Handler, ease?: EaseFun): Tween;

            /**
             * 延迟
             * @param {number} duration 延迟时间，毫秒
             * @return {base.tween.Tween}
             */
            public delay(duration: number): Tween;

            /**
             * 执行回调
             * @param {base.utils.Handler} handler 回调
             * @return {base.tween.Tween}
             */
            public exec(handler: Handler): Tween;
        }

    }

    module utils {
        class Handler extends ObjBase implements base.pool.PoolObject {
            public static alloc(context: any, method: Function, args?: any[]): Handler;

            public static equalMethod(handler: Handler, method: Function, context: any): boolean;

            public static equal(handler: Handler, other: Handler): boolean;

            public readonly context: any;

            public readonly method: Function;

            public exec(data?: any): any;

            public dispose(): void;

            public onAlloc(): void;

            public onRelease(): void;

        }

    }

}
