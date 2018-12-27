define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueSystem"], function (require, exports, WinBase_1, VueSystem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Setting extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueSystem_1.default;
        }
        Activated() {
        }
        Deactivate() {
        }
        OnResize() {
        }
        OnWindowState(State) {
        }
        OnClose() {
            return true;
        }
    }
    new Setting;
});
