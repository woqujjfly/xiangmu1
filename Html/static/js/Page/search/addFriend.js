define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueAddFriend"], function (require, exports, WinBase_1, VueAddFriend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AddFriend extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueAddFriend_1.default;
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
        FriendGroup(msg) {
            delete msg.IpcCom;
            addFriend.VuePage.friendGroup = msg;
        }
        ChangefriendG(msg) {
            delete msg.IpcCom;
            addFriend.VuePage.friendGroup = msg;
        }
    }
    let addFriend = new AddFriend;
});
