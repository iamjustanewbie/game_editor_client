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
    var mod;
    (function (mod) {
        var editor;
        (function (editor) {
            var ProxyBase = base.module.ProxyBase;
            var Handler = base.utils.Handler;
            var ByteArray = egret.ByteArray;
            var facade = base.module.facade;
            var ON_CONNECT_CREATE = base.network.ON_CONNECT_CREATE;
            var ON_CONNECT_LOST = base.network.ON_CONNECT_LOST;
            var ON_CONNECT_ERROR = base.network.ON_CONNECT_ERROR;
            var Socket = base.network.Socket;
            var EditorPB = (function (_super) {
                __extends(EditorPB, _super);
                function EditorPB() {
                    return _super.call(this) || this;
                }
                EditorPB.startConnect = function () {
                    this._conn = new Socket();
                    this._conn.onMessage = Handler.alloc(this, this.onRecvMsg);
                    this._conn.onOpen = Handler.alloc(this, this.onConnected);
                    this._conn.onClose = Handler.alloc(this, this.onLost);
                    this._conn.onError = Handler.alloc(this, this.onError);
                    this._conn.connect(editor.ServerHost);
                };
                EditorPB.prototype.onMsg = function (id, method, context) {
                    facade.onNt("msg_" + id, method, context);
                };
                EditorPB.prototype.offMsg = function (id, method, context) {
                    facade.offNt("msg_" + id, method, context);
                };
                EditorPB.prototype.sendMsg = function (id, data) {
                    EditorPB._conn.send(EditorPB.encode({ id: id, data: data }).buffer);
                };
                EditorPB.onConnected = function () {
                    facade.sendNt(ON_CONNECT_CREATE);
                };
                EditorPB.onLost = function () {
                    facade.sendNt(ON_CONNECT_LOST);
                };
                EditorPB.onError = function () {
                    facade.sendNt(ON_CONNECT_ERROR);
                };
                EditorPB.onRecvMsg = function (buffer) {
                    var msg = this.decode(new ByteArray(buffer));
                    facade.sendNt("msg_" + msg.id, msg.data);
                };
                EditorPB.encode = function (proto) {
                    var bytes = new ByteArray();
                    bytes.writeInt(proto.id);
                    if (proto.data) {
                        var str = JSON.stringify(proto.data);
                        bytes.writeUTFBytes(str);
                    }
                    return bytes;
                };
                EditorPB.decode = function (bytes) {
                    var id = bytes.readInt();
                    var data = undefined;
                    if (bytes.bytesAvailable) {
                        var str = bytes.readUTFBytes(bytes.bytesAvailable);
                        data = JSON.parse(str);
                    }
                    return { id: id, data: data };
                };
                return EditorPB;
            }(ProxyBase));
            editor.EditorPB = EditorPB;
            __reflect(EditorPB.prototype, "tool.mod.editor.EditorPB");
        })(editor = mod.editor || (mod.editor = {}));
    })(mod = tool.mod || (tool.mod = {}));
})(tool || (tool = {}));
//# sourceMappingURL=EditorPB.js.map