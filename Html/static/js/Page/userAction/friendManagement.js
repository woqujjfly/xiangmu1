define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueFriendManagement"], function (require, exports, WinBase_1, VueFriendManagement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class friendManagment extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueFriendManagement_1.default;
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
    new friendManagment;
});
