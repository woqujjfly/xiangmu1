define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueDialog"], function (require, exports, WinBase_1, VueDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Dialog extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueDialog_1.default;
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
    new Dialog;
});
