define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueSuggestAvatar"], function (require, exports, WinBase_1, VueSuggestAvatar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SuggestAvatar extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueSuggestAvatar_1.default;
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
    new SuggestAvatar;
});
