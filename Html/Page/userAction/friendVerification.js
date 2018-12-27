define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueFriendVerification"], function (require, exports, WinBase_1, VueFriendVerification_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FriendVerification extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueFriendVerification_1.VueVerify;
            this.IpcController = new IpcController;
            let self = this;
            System.Ipc.On((msg) => {
                let data = JSON.parse(msg);
                self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data);
            });
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
    class IpcController {
        ChangefriendG(msg) {
            delete msg.IpcCom;
        }
    }
    new FriendVerification;
});
