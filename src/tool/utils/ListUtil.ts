module tool.utils {

    import DisplayObject = egret.DisplayObject;
    import Handler = base.utils.Handler;
    import EditorViewType = tool.mod.EditorViewType;
    import ModName = tool.mod.ModName;
    import facade = base.module.facade;

    export class ListUtil {
        public static show(src: any[], display: DisplayObject, handle?: Handler) {
            let data = {
                src: src,
                display: display,
                handle: handle
            };
            facade.showView(ModName.Editor, EditorViewType.List, data);
        }
    }
}