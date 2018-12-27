define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueAdminRecord"], function (require, exports, WinBase_1, VueAdminRecord_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AdminRecord extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueAdminRecord_1.default;
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
    new AdminRecord;
});
