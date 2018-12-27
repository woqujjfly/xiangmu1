define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueGroupData"], function (require, exports, WinBase_1, VueGroupData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GroupData extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueGroupData_1.default;
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
        MemberList(msg) {
            console.log(msg);
            console.log(groupData.VuePage.Params);
        }
        ExitMemberList(msg) {
            Me.Close(true);
        }
        ChangeMemberList(msg) {
            delete groupData.VuePage.Params.MemberList[msg.UserID];
            groupData.VuePage.Params = Object.assign({}, groupData.VuePage.Params);
        }
        InviteList(msg) {
            console.log(msg);
            groupData.VuePage.Params.MemberList = Object.assign(groupData.VuePage.Params.MemberList, msg.data);
            groupData.VuePage.Params = Object.assign({}, groupData.VuePage.Params);
            console.log(groupData.VuePage.Params);
        }
    }
    let groupData = new GroupData();
});
