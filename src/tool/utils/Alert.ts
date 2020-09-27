module tool.utils {

    import facade = base.module.facade;
    import ModName = tool.mod.ModName;
    import EditorViewType = tool.mod.EditorViewType;
    import ITextElement = egret.ITextElement;
    import Handler = base.utils.Handler;

    export class Alert {

        public static show(lab: string | ITextElement) {
            facade.showView(ModName.Editor, EditorViewType.Alert, {lab: lab, state: "default"});
        }

        public static confirm(lab: string | ITextElement, confirm?: Handler) {
            facade.showView(ModName.Editor, EditorViewType.Alert, {lab: lab, state: "confirm", confirm: confirm});
        }

        public static cancel(lab: string | ITextElement, confirm?: Handler, cancel?: Handler) {
            let data = {
                state: "cancel",
                lab: lab,
                confirm: confirm,
                cancel: cancel,
            };
            facade.showView(ModName.Editor, EditorViewType.Alert, data);
        }
    }
}