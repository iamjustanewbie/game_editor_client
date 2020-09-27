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
    var Editor = (function (_super) {
        __extends(Editor, _super);
        function Editor() {
            var _this = _super.call(this) || this;
            base.network.webRequest = ggo.webReqGet;
            Editor._ins = _this;
            return _this;
        }
        Editor.prototype.onInit = function () {
            var _this = this;
            TimeMgr.needPause = false;
            egret.registerImplementation("eui.IAssetAdapter", { getAsset: this.getAsset });
            egret.registerImplementation("eui.IThemeAdapter", { getTheme: this.getTheme });
            egret.Event["create"] = Editor.eventCreate;
            egret.Event["release"] = Editor.eventRelease;
            gso.gameStage = this.stage;
            tool.EditorUI.init();
            RES.loadConfig("default.res.json", "resource/").then(function () {
                _this.loadTheme().then(function () {
                    _this.initMod();
                    _this.showStartView();
                });
            });
        };
        Editor.prototype.initMod = function () {
            new MapMod();
            new EditorMod();
            new AnimationMod();
            new EftMod();
        };
        Editor.prototype.loadTheme = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var theme = new eui.Theme("resource/default.thm.json", gso.gameStage);
                theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                    resolve();
                }, _this);
            });
        };
        Editor.prototype.getAsset = function (source, compFunc, thisObject) {
            function onGetRes(data) {
                compFunc.call(thisObject, data, source);
            }
            if (RES.hasRes(source)) {
                var data = RES.getRes(source);
                if (data) {
                    onGetRes(data);
                }
                else {
                    RES.getResAsync(source, onGetRes, this);
                }
            }
            else {
                RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        Editor.prototype.getTheme = function (source, onSuccess, onError, thisObject) {
            ggo.webReqGet(source, null, function (txt) {
                onSuccess.call(thisObject, txt);
            }, function () {
                onError.call(thisObject);
            });
        };
        Editor.prototype.showStartView = function () {
            EditorPB.startConnect();
            gso.gameStage.addChild(tool.EditorUI.Ins);
        };
        Editor.eventCreate = function (EventClass, type, bubbles, cancelable) {
            var name = egret.getQualifiedClassName(EventClass);
            var list = Editor._eventMap[name];
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
        Editor.eventRelease = function (event) {
            event["clean"]();
            var name = egret.getQualifiedClassName(event);
            var list = Editor._eventMap[name];
            if (null == list) {
                Editor._eventMap[name] = list = [];
            }
            if (list.indexOf(event) < 0) {
                list[list.length] = event;
            }
        };
        Editor.prototype.onResize = function (e) {
            if (this.stage) {
            }
        };
        Editor.prototype.onActivate = function (e) {
            base.module.facade.sendNt("on_activate");
        };
        Editor.prototype.onDeActivate = function (e) {
            base.module.facade.sendNt("on_deactivate");
        };
        Editor._eventMap = {};
        return Editor;
    }(Base));
    tool.Editor = Editor;
    __reflect(Editor.prototype, "tool.Editor");
})(tool || (tool = {}));
//# sourceMappingURL=Editor.js.map