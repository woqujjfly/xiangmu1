define(["require", "exports", "../../Plugs/WinBase/WinBase", "./VueChat", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent", "../../Plugs/Module/Ajaxs"], function (require, exports, WinBase_1, VueChat_1, WebSocketPro_1, layer_1, VueComponent, Ajaxs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let WebSockets = new WebSocketPro_1.WebSocketPro();
    let DB = System.Require('Db');
    let isFocus;
    VueComponent;
    class ChatMain extends WinBase_1.default {
        constructor() {
            super();
            this.VuePage = VueChat_1.VueChat;
            this.MessageController = new MessageController;
            this.IpcController = new IpcController;
            window.Synchronous.Closing = this.OnClose.bind(this);
            let self = this;
            WebSockets.Message = msg => {
                self.MessageController[msg.Com] && self.MessageController[msg.Com](msg);
            };
            System.Ipc.On((msg) => {
                let data = JSON.parse(msg);
                self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data);
            });
            $(document).keyup((e) => {
                e.keyCode == 27 && Me.Close(false);
            });
        }
        Activated() {
            isFocus = true;
        }
        Deactivate() {
            isFocus = false;
        }
        OnClose() {
            Me.Hide();
            let self = this;
            Ajaxs_1.default({ Controller: "FriendAction/setReadID" }, { T: self.VuePage.userInfo.Token, FriendID: self.VuePage.userInfo.ID }, {
                OkFun(response) {
                    Me.Close(true);
                }, ErrFun(response) {
                    if (response.ErrMsg) {
                        layer_1.layer.alert(response.ErrMsg);
                    }
                    else {
                        layer_1.layer.alert("服务器内部错误");
                    }
                }, NetWorkErr() {
                    layer_1.layer.alert("网络连接失败");
                }
            });
            return false;
        }
        OnResize() {
            console.log(Me.WindowState, window.screen.width, document.body.clientWidth);
        }
        OnWindowState(State) {
            let max = document.querySelector(".max");
            State == "Max" ? (max.className = "max max_restore") : (max.className = "max");
        }
    }
    class MessageController {
        PushMsg(msg) {
            if (msg.Type != 3) {
                if (!VueChat_1.VueChat.chatList[VueChat_1.VueChat.userInfo.ID]) {
                    VueChat_1.VueChat.chatList[VueChat_1.VueChat.userInfo.ID] = [];
                    VueChat_1.VueChat.chatList[VueChat_1.VueChat.userInfo.ID].push({
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
                    VueChat_1.VueChat.chatList[VueChat_1.VueChat.userInfo.ID].push({
                        Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
                        Type: msg.Type,
                        Dir: 1,
                        MsgId: msg.MsgId,
                        MsgStatus: 1,
                        Receive: true,
                        ErrMsg: ''
                    });
                }
                chatMain.VuePage.chatList = Object.assign({}, chatMain.VuePage.chatList);
                DB.ExecuteNonQuery(chatMain.VuePage.userInfo.MyID, 'INSERT INTO chatrec VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)', msg.MsgId.toString(), chatMain.VuePage.userInfo.ID, chatMain.VuePage.userInfo.MyID, msg.Type, msg.Msg, 1, '');
            }
        }
    }
    class IpcController {
        Shake(msg) {
            chatMain.VuePage.shake(event, msg.From);
        }
        Shot(msg) {
            if (isFocus) {
                let msgs = document.querySelector('#message');
                msgs.focus();
                chatMain.VuePage.screenshot(msg.Base64);
            }
        }
        SendCrad(msg) {
            chatMain.VuePage;
        }
    }
    window.imgLoad = (str) => {
        let src = str.getAttribute("data-src");
        str.setAttribute('src', src);
        if (window.isBottom) {
            let last = document.querySelector(".chat-list li:last-child");
            last && last.scrollIntoView();
        }
    };
    let chatMain = new ChatMain;
});
