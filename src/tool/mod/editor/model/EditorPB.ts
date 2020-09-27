module tool.mod.editor {
    import ProxyBase = base.module.ProxyBase;
    import Handler = base.utils.Handler;
    import ByteArray = egret.ByteArray;
    import facade = base.module.facade;
    import ON_CONNECT_CREATE = base.network.ON_CONNECT_CREATE;
    import ON_CONNECT_LOST = base.network.ON_CONNECT_LOST;
    import ON_CONNECT_ERROR = base.network.ON_CONNECT_ERROR;
    import GameNT = base.module.GameNT;
    import Socket = base.network.Socket;

    export class EditorPB extends ProxyBase {
        private static _conn: Socket;

        public static startConnect(): void {
            this._conn = new Socket();
            this._conn.onMessage = Handler.alloc(this, this.onRecvMsg);
            this._conn.onOpen = Handler.alloc(this, this.onConnected);
            this._conn.onClose = Handler.alloc(this, this.onLost);
            this._conn.onError = Handler.alloc(this, this.onError);
            this._conn.connect(ServerHost);
        }

        constructor() {
            super();
        }

        protected onMsg(id: number, method: (ntfy: GameNT) => void, context: any) {
            facade.onNt("msg_" + id, method, context);
        }

        protected offMsg(id: any, method: (ntfy: GameNT) => void, context: any) {
            facade.offNt("msg_" + id, method, context);
        }

        public sendMsg(id: number, data?: any): void {
            EditorPB._conn.send(EditorPB.encode({id, data}).buffer);
        }

        private static onConnected() {
            facade.sendNt(ON_CONNECT_CREATE);
        }

        private static onLost() {
            facade.sendNt(ON_CONNECT_LOST);
        }

        private static onError() {
            facade.sendNt(ON_CONNECT_ERROR);
        }

        private static onRecvMsg(buffer: ArrayBuffer): void {
            let msg: { id: number, data: any } = this.decode(new ByteArray(buffer));
            facade.sendNt("msg_" + msg.id, msg.data);
        }

        private static encode(proto: { id: number, data: any }): ByteArray {
            let bytes: ByteArray = new ByteArray();
            bytes.writeInt(proto.id);
            if (proto.data) {
                let str = JSON.stringify(proto.data);
                bytes.writeUTFBytes(str);
            }
            return bytes;
        }

        private static decode(bytes: ByteArray): any {
            let id: number = bytes.readInt();
            let data: string = undefined;
            if (bytes.bytesAvailable) {
                let str = bytes.readUTFBytes(bytes.bytesAvailable);
                data = JSON.parse(str);
            }
            return {id, data};
        }

    }
}
