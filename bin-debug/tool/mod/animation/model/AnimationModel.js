var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var mod;
    (function (mod) {
        var animation;
        (function (animation) {
            var facade = base.module.facade;
            var SpriteSheet = egret.SpriteSheet;
            var Texture = egret.Texture;
            var TYPE_JSON = RES.ResourceItem.TYPE_JSON;
            var ResUrl = tool.mod.editor.ResUrl;
            var AnimationModel = (function () {
                function AnimationModel() {
                    this.isAnimation = false;
                    this.importDir = []; //导入弹框缓存目录
                    this.duration = [];
                    this.origindur = [];
                    this.isLoop = true;
                    this._play = false;
                    this.isImport = false;
                    this._sheetLoaderMap = {};
                    this._sheetMap = {};
                    this._jsonMap = {};
                    this.curFrame = 1;
                }
                Object.defineProperty(AnimationModel.prototype, "play", {
                    get: function () {
                        return this._play;
                    },
                    set: function (v) {
                        if (this._play == v) {
                            return;
                        }
                        this._play = v;
                        facade.sendNt(animation.ANIMATION_PLAY_CHANGE);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnimationModel.prototype, "curFrame", {
                    get: function () {
                        return this._curFrame;
                    },
                    set: function (v) {
                        this._curFrame = v;
                        if (this._curFrame <= this.duration.length) {
                            this.curDuration = this.duration[this._curFrame - 1];
                        }
                        else {
                            this.curDuration = null;
                        }
                        facade.sendNt(animation.ON_FRAME_CHANGE);
                    },
                    enumerable: true,
                    configurable: true
                });
                AnimationModel.prototype.loadCfg = function () {
                    var _this = this;
                    var url = this.getUrl();
                    var key = this.importDir.join("/");
                    var jsonUrl = url + ".json";
                    var cfg = this._jsonMap[key];
                    if (!cfg) {
                        RES.getResByUrl(jsonUrl, function (data) {
                            cfg = _this._jsonMap[key] = data;
                            _this.updateCurImgSrc(cfg);
                            var imgUrl = url + ".png";
                            var imgLoad = _this._sheetLoaderMap[key] = new egret.ImageLoader();
                            imgLoad.crossOrigin = "anonymous";
                            imgLoad.addEventListener(egret.Event.COMPLETE, _this.onLoadedImg, _this);
                            imgLoad.load(imgUrl);
                        }, this, TYPE_JSON);
                    }
                    else {
                        this.updateCurImgSrc(cfg);
                        this.isImport = true;
                        facade.sendNt(animation.ON_IMPORT_ANIMATION);
                    }
                };
                AnimationModel.prototype.onLoadedImg = function (e) {
                    var loader = e.currentTarget;
                    loader.removeEventListener(egret.Event.COMPLETE, this.onLoadedImg, this);
                    var data = loader.data;
                    var tex = new Texture();
                    tex._setBitmapData(data);
                    var sp = new SpriteSheet(tex);
                    for (var k in this._sheetLoaderMap) {
                        if (this._sheetLoaderMap[k] == loader) {
                            this._sheetMap[k] = sp;
                        }
                    }
                    this.isImport = true;
                    facade.sendNt(animation.ON_IMPORT_ANIMATION);
                };
                AnimationModel.prototype.updateCurImgSrc = function (json) {
                    var config = json["frames"];
                    this._configs = [];
                    var keys = Object.keys(config);
                    keys.sort(function (a, b) {
                        return parseInt(a) - parseInt(b);
                    });
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        this._configs.push(config[k]);
                    }
                    this.maxFrame = this._configs.length;
                };
                AnimationModel.prototype.getImgConfig = function () {
                    return this._configs[this._curFrame - 1];
                };
                AnimationModel.prototype.getImgTex = function (frame) {
                    if (!this.isImport) {
                        return;
                    }
                    var key = this.importDir.join("/");
                    var sheet = this._sheetMap[key];
                    var config = this._configs[frame - 1];
                    var texture = sheet.getTexture(frame.toString());
                    if (texture) {
                        return texture;
                    }
                    else {
                        var w = config["w"];
                        var h = config["h"];
                        var x = config["x"];
                        var y = config["y"];
                        return sheet.createTexture(frame.toString(), x, y, w, h);
                    }
                };
                AnimationModel.prototype.getUrl = function () {
                    return ResUrl + "/anim/" + this.importDir.join("/");
                };
                return AnimationModel;
            }());
            animation.AnimationModel = AnimationModel;
            __reflect(AnimationModel.prototype, "tool.mod.animation.AnimationModel");
        })(animation = mod.animation || (mod.animation = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
<<<<<<< HEAD
=======
//# sourceMappingURL=AnimationModel.js.map
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
