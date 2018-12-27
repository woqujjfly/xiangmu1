define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueAddGroup"], function (require, exports, WinBase_1, VueAddGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VueAddGroup extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueAddGroup_1.default;
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
    new VueAddGroup;
});
