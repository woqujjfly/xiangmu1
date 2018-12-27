define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueEditInfo"], function (require, exports, WinBase_1, VueEditInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class editInfo extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueEditInfo_1.default;
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
    new editInfo;
});
