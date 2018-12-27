define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueInviteGroup"], function (require, exports, WinBase_1, VueInviteGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InviteGroup extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueInviteGroup_1.default;
            this.IpcController = new IpcController();
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
        friendL(msg) {
            inviteGroup.VuePage.shareGroupId = msg.Qid;
        }
    }
    let inviteGroup = new InviteGroup;
});
