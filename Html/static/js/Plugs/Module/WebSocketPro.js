define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebSocketPro {
        constructor() {
            this.Message = null;
            this.Opend = null;
            this.Closed = null;
            this.Ws = null;
            this.CallBack = {};
            let th = this;
            this.Ws = System.Require("WebSocketPro");
            th.Ws.Opend(function () {
                if (typeof th.Opend === "function")
                    th.Opend();
            });
            th.Ws.Closed(function (CloseReasons) {
                if (typeof th.Closed === "function")
                    th.Closed(CloseReasons);
            });
            th.Ws.Message(function (msg) {
                console.log("Push", msg);
                let str = JSON.parse(msg);
                if (str.CallBack) {
                    if (th.CallBack[str.CallBack]) {
                        th.CallBack[str.CallBack].CallBack(str);
                        clearTimeout(th.CallBack[str.CallBack].StartTime);
                        delete th.CallBack[str.CallBack];
                    }
                    return;
                }
                if (typeof th.Message === "function") {
                    th.Message(str);
                }
            });
        }
        Send(Com, Data, CallBack, OverTimeCallBack, OverTime) {
            Data.Com = Com;
            let self = this;
            console.log("Send:", Data);
            let arr = Data;
            if (CallBack) {
                arr["CallBack"] = [self.timestamp(), self.random(10000, 99999)].join("");
                if (OverTimeCallBack) {
                    OverTime = OverTime || 5000;
                    self.CallBack[arr["CallBack"]] = {
                        CallBack: CallBack,
                        StartTime: setTimeout(() => {
                            delete self.CallBack[arr["CallBack"]];
                            OverTimeCallBack();
                        }, OverTime)
                    };
                }
                else {
                    self.CallBack[arr["CallBack"]] = { CallBack: CallBack, StartTime: 0 };
                }
            }
            this.Ws.Send(JSON.stringify(arr));
        }
        Open() {
            this.Ws.Open();
        }
        Close() {
            this.Ws.Close();
        }
        get State() {
            return this.Ws.State();
        }
        timestamp() {
            return Date.parse(new Date()) / 1000;
        }
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
    exports.WebSocketPro = WebSocketPro;
    var WsState;
    (function (WsState) {
        WsState[WsState["None"] = -1] = "None";
        WsState[WsState["Connecting"] = 0] = "Connecting";
        WsState[WsState["Open"] = 1] = "Open";
        WsState[WsState["Closing"] = 2] = "Closing";
        WsState[WsState["Closed"] = 3] = "Closed";
    })(WsState = exports.WsState || (exports.WsState = {}));
});
