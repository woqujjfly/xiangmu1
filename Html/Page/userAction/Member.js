define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueMember"], function (require, exports, WinBase_1, VueMember_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Member extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueMember_1.default;
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
    new Member;
});
