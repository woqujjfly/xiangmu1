define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueLogin"], function (require, exports, WinBase_1, VueLogin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Login extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueLogin_1.default;
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
            System.Exit();
            return true;
        }
    }
    let login = new Login;
    if (login.VuePage.autoLogin) {
        setTimeout(() => {
            login.VuePage.socket();
        }, 1000);
    }
});
