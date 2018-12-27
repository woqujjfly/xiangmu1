define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueOpenPersonalFile"], function (require, exports, WinBase_1, VueOpenPersonalFile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OpenPersonalFile extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueOpenPersonalFile_1.default;
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
        EditUserInfo(msg) {
            openPersonalFile.VuePage.friendInfo = msg.data;
        }
        ChangefriendG(data) {
            delete data.IpcCom;
            openPersonalFile.VuePage.friendInfo.Groups = {};
            for (let key in data) {
                openPersonalFile.VuePage.friendGroups[key] = data[key].Name;
            }
            openPersonalFile.VuePage.friendGroups = Object.assign({}, openPersonalFile.VuePage.friendGroups);
        }
        FriendGroupList(data) {
            delete data.IpcCom;
            console.log(data);
            openPersonalFile.VuePage.friendGroups = data.friendGroup;
            openPersonalFile.VuePage.friendList = data.friendList;
            openPersonalFile.VuePage.userData = data.userData;
            console.log(openPersonalFile.VuePage.friendList);
        }
    }
    let openPersonalFile = new OpenPersonalFile;
});
