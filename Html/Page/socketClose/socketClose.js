define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueSocketClose"], function (require, exports, WinBase_1, VueSocketClose_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SocketClose extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueSocketClose_1.default;
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
    new SocketClose;
});
