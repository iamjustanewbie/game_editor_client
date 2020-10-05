var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var tool;
(function (tool) {
    var Base = base.Base;
    var EditorMod = tool.mod.editor.EditorMod;
    var MapMod = tool.mod.map.MapMod;
    var AnimationMod = tool.mod.animation.AnimationMod;
    var EditorPB = tool.mod.editor.EditorPB;
    var TimeMgr = base.time.TimeMgr;
    var EftMod = tool.mod.effect.EftMod;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this) || this;
            base.network.webRequest = ggo.webReqGet;
            Main._ins = _this;
            return _this;
        }
        Main.prototype.onInit = function () {
            var _this = this;
            TimeMgr.needPause = false;
            egret.registerImplementation("eui.IAssetAdapter", { getAsset: new AssetAdapter().getAsset });
            egret.registerImplementation("eui.IThemeAdapter", { getTheme: new ThemeAdapter().getTheme });
            egret.Event["create"] = Main.eventCreate;
            egret.Event["release"] = Main.eventRelease;
            gso.gameStage = this.stage;
            tool.EditorUI.init();
            RES.loadConfig("default.res.json", "resource/").then(function () {
                _this.loadTheme().then(function () {
                    _this.initMod();
                    _this.showStartView();
                });
            });
        };
        Main.prototype.initMod = function () {
            new MapMod();
            new EditorMod();
            new AnimationMod();
            new EftMod();
        };
        Main.prototype.loadTheme = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var theme = new eui.Theme("resource/default.thm.json", gso.gameStage);
                theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                    resolve();
                }, _this);
            });
        };
        Main.prototype.showStartView = function () {
            EditorPB.startConnect();
            gso.gameStage.addChild(tool.EditorUI.Ins);
        };
        Main.eventCreate = function (EventClass, type, bubbles, cancelable) {
            var name = egret.getQualifiedClassName(EventClass);
            var list = Main._eventMap[name];
            var obj;
            if (null != list && 0 < list.length) {
                obj = list.pop();
                obj.$type = type;
                obj.$bubbles = !!bubbles;
                obj.$cancelable = !!cancelable;
                obj.$isDefaultPrevented = false;
                obj.$isPropagationStopped = false;
                obj.$isPropagationImmediateStopped = false;
                obj.$eventPhase = 2;
            }
            else {
                obj = new EventClass(type, bubbles, cancelable);
            }
            return obj;
        };
        Main.eventRelease = function (event) {
            event["clean"]();
            var name = egret.getQualifiedClassName(event);
            var list = Main._eventMap[name];
            if (null == list) {
                Main._eventMap[name] = list = [];
            }
            if (list.indexOf(event) < 0) {
                list[list.length] = event;
            }
        };
        Main.prototype.onResize = function (e) {
            if (this.stage) {
            }
        };
        Main.prototype.onActivate = function (e) {
            base.module.facade.sendNt("on_activate");
        };
        Main.prototype.onDeActivate = function (e) {
            base.module.facade.sendNt("on_deactivate");
        };
        Main._eventMap = {};
        return Main;
    }(Base));
    tool.Main = Main;
    __reflect(Main.prototype, "tool.Main");
})(tool || (tool = {}));
