define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueSearch"], function (require, exports, WinBase_1, VueSearch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Search extends WinBase_1.default {
        constructor() {
            super(...arguments);
            this.VuePage = VueSearch_1.default;
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
    new Search;
});
