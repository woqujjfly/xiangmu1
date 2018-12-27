define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueShowAvatar"], function (require, exports, WinBase_1, VueShowAvatar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShowAvatar extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueShowAvatar_1.default;
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
    new ShowAvatar;
});
