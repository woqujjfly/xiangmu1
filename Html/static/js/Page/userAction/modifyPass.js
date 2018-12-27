define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueModifyPass"], function (require, exports, WinBase_1, VueModifyPass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ModifyPass extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueModifyPass_1.default;
        }
        Activated() {
        }
        Deactivate() {
        }
        OnClose() {
            return true;
        }
        OnResize() {
        }
        OnWindowState(State) {
        }
    }
    new ModifyPass;
});
