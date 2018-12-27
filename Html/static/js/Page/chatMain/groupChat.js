define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueGroupChat", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/VueComponent"], function (require, exports, WinBase_1, VueGroupChat_1, WebSocketPro_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    let WebSockets = new WebSocketPro_1.WebSocketPro();
    let DB = System.Require('Db');
    class GroupChat extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueGroupChat_1.VueGroupChat;
            this.MessageController = new MessageController();
            this.IpcController = new IpcController;
            let self = this;
            WebSockets.Message = msg => {
                self.MessageController[msg.Com] && self.MessageController[msg.Com](msg);
            };
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
    class MessageController {
        PushQMsg(msg) {
            if (msg.Type != 3) {
                if (!VueGroupChat_1.VueGroupChat.chatList[VueGroupChat_1.VueGroupChat.Params.ID]) {
                    VueGroupChat_1.VueGroupChat.chatList[VueGroupChat_1.VueGroupChat.Params.ID] = [];
                    VueGroupChat_1.VueGroupChat.chatList[VueGroupChat_1.VueGroupChat.Params.ID].push({
                        Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
                        Type: msg.Type,
                        Dir: 1,
                        MsgId: msg.MsgId,
                        MsgStatus: 1,
                        Receive: true,
                        ErrMsg: ''
                    });
                }
                else {
                    VueGroupChat_1.VueGroupChat.chatList[VueGroupChat_1.VueGroupChat.Params.ID].push({
                        Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
                        Type: msg.Type,
                        Dir: 1,
                        MsgId: msg.MsgId,
                        MsgStatus: 1,
                        Receive: true,
                        ErrMsg: ''
                    });
                }
                groupChat.VuePage.chatList = Object.assign({}, groupChat.VuePage.chatList);
                DB.ExecuteNonQuery(groupChat.VuePage.Params.MyID, 'INSERT INTO GroupMsg VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)', msg.MsgId.toString(), groupChat.VuePage.Params.MyID, groupChat.VuePage.Params.ID, msg.Type, msg.Msg, 1, '');
            }
        }
        EditQNick(msg) {
            groupChat.VuePage.Params.MemberList[msg.Uid].VisitingCard = msg.Nick;
            groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params);
        }
        SetQAdmin(msg) {
            if (msg.Admin) {
                groupChat.VuePage.Params.MemberList[msg.Uid].IsAdmin = 1;
            }
            else {
                groupChat.VuePage.Params.MemberList[msg.Uid].IsAdmin = 0;
            }
            groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params);
        }
    }
    class IpcController {
        MemberList(msg) {
            groupChat.VuePage.MemberSort(msg.groupMemberList);
            groupChat.VuePage.Params.MyID = msg.MyID;
            groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params);
            console.log(groupChat.VuePage.Params);
        }
        ExitMemberList(msg) {
            Me.Close(true);
        }
        ChangeMemberList(msg) {
            delete groupChat.VuePage.Params.MemberList[msg.UserID];
            groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params);
        }
        ChangeCard(msg) {
            groupChat.VuePage.Params.MemberList[msg.Uid].VisitingCard = msg.Nick;
            groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params);
        }
    }
    let groupChat = new GroupChat;
});
