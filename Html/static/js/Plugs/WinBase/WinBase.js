define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WinBase {
        constructor() {
            document.addEventListener("EventsResize", (e) => { this.OnResize(); });
            document.addEventListener("EventsMax", (e) => { this.OnWindowState("Max"); });
            document.addEventListener("EventsNormal", (e) => { this.OnWindowState("Normal"); });
            document.addEventListener("Activated", (e) => { this.Activated(); });
            document.addEventListener("Deactivate", (e) => { this.Deactivate(); });
            window.Synchronous = {};
            window.Synchronous.Closing = this.OnClose.bind(this);
        }
        Close(Force) {
            Me.Close(Force);
        }
    }
    exports.default = WinBase;
});
