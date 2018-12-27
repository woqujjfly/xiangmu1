define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueGroupshare"], function (require, exports, WinBase_1, VueGroupshare_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GroupShare extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueGroupshare_1.default;
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
        ContactGroup(msg) {
            groupshare.VuePage.groupInfo.contactGroup = msg.data;
        }
    }
    let groupshare = new GroupShare();
});
