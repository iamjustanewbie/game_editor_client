module tool.utils {

    import facade = base.module.facade;
    import ON_KEY_UPDATE = tool.mod.ON_KEY_UPDATE;

    export class KeyUtil {

        public static keyDown: { [key: string]: boolean };

        public static init() {
            KeyUtil.keyDown = {};
            document.addEventListener("keyup", (ev: KeyboardEvent) => {
                delete KeyUtil.keyDown[ev.key];
                facade.sendNt(ON_KEY_UPDATE, ev.key);
            });
            document.addEventListener("keydown", (ev: KeyboardEvent) => {
                KeyUtil.keyDown[ev.key] = true;
                facade.sendNt(ON_KEY_UPDATE, ev.key);
            });
        }

    }
}