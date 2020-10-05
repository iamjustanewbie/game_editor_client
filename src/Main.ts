module tool {
    import Base = base.Base;
    import EditorMod = tool.mod.editor.EditorMod;
    import Event = egret.Event;
    import MapMod = tool.mod.map.MapMod;
    import AnimationMod = tool.mod.animation.AnimationMod;
    import EditorPB = tool.mod.editor.EditorPB;
    import TimeMgr = base.time.TimeMgr;
    import EftMod = tool.mod.effect.EftMod;

    export class Main extends Base {
        private static _ins: Main;

        constructor() {
            super();
            base.network.webRequest = ggo.webReqGet;
            Main._ins = this;
        }

        protected onInit(): void {
            TimeMgr.needPause = false;
            egret.registerImplementation("eui.IAssetAdapter", {getAsset: new AssetAdapter().getAsset});
            egret.registerImplementation("eui.IThemeAdapter", {getTheme: new ThemeAdapter().getTheme});

            egret.Event["create"] = Main.eventCreate;
            egret.Event["release"] = Main.eventRelease;

            gso.gameStage = this.stage;
            EditorUI.init();
            RES.loadConfig("default.res.json", "resource/").then(() => {
                this.loadTheme().then(() => {
                    this.initMod();
                    this.showStartView();
                });
            });
        }

        private initMod() {
            new MapMod();
            new EditorMod();
            new AnimationMod();
            new EftMod();
        }

        private loadTheme() {
            return new Promise((resolve, reject) => {
                let theme = new eui.Theme("resource/default.thm.json", gso.gameStage);
                theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                    resolve();
                }, this);
            });
        }

        private showStartView(): void {
            EditorPB.startConnect();
            gso.gameStage.addChild(EditorUI.Ins);
        }

        private static _eventMap: { [key: string]: any[] } = {};

        private static eventCreate<T extends Event>(EventClass: { new(type: string, bubbles?: boolean, cancelable?: boolean): T; eventPool?: Event[] },
                                                    type: string, bubbles?: boolean, cancelable?: boolean): T {
            let name: string = egret.getQualifiedClassName(EventClass);
            let list: T[] = Main._eventMap[name];
            let obj: T;
            if (null != list && 0 < list.length) {
                obj = <T>list.pop();
                obj.$type = type;
                obj.$bubbles = !!bubbles;
                obj.$cancelable = !!cancelable;
                obj.$isDefaultPrevented = false;
                obj.$isPropagationStopped = false;
                obj.$isPropagationImmediateStopped = false;
                obj.$eventPhase = 2;
            } else {
                obj = new EventClass(type, bubbles, cancelable);
            }
            return obj;
        }

        private static eventRelease<T extends Event>(event: T): void {
            event["clean"]();
            let name: string = egret.getQualifiedClassName(event);
            let list: T[] = Main._eventMap[name];
            if (null == list) {
                Main._eventMap[name] = list = [];
            }
            if (list.indexOf(event) < 0) {
                list[list.length] = event;
            }
        }

        protected onResize(e?: Event): void {
            if (this.stage) {
            }
        }

        protected onActivate(e: egret.Event): void {
            base.module.facade.sendNt("on_activate");
        }

        protected onDeActivate(e: egret.Event): void {
            base.module.facade.sendNt("on_deactivate");
        }


    }

}