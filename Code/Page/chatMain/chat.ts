import WinBase from "../../Plugs/WinBase/WinBase"
import { VueChat } from "./VueChat"
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import { layer } from "../../Plugs/Module/layer/layer";
import * as VueComponent from "../../Plugs/Module/VueComponent";
import Ajaxs from "../../Plugs/Module/Ajaxs"
let WebSockets = new WebSocketPro();
let DB = System.Require('Db')
let isFocus: boolean
VueComponent;
class ChatMain extends WinBase {
    public VuePage = VueChat;
    private MessageController = new MessageController

    protected Activated(): void {
        isFocus = true
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
        isFocus = false
    }
    private IpcController = new IpcController
    // throw new Error("Method not implemented.");
    constructor() {
        super()
        window.Synchronous.Closing = this.OnClose.bind(this)
        let self = this
        WebSockets.Message = msg => {
            self.MessageController[msg.Com] && self.MessageController[msg.Com](msg)
        };
        System.Ipc.On((msg: string) => {
            let data: IpcI = JSON.parse(msg)
            self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data)
        });
        $(document).keyup((e) => {
            e.keyCode == 27 && Me.Close(false)
        })
    }
    protected OnClose(): boolean {
        Me.Hide()
        let self = this
        Ajaxs({ Controller: "FriendAction/setReadID" }, { T: self.VuePage.userInfo.Token, FriendID: self.VuePage.userInfo.ID }, {
            OkFun(response) {
                Me.Close(true)
            }, ErrFun(response) {
                if (response.ErrMsg) {
                    layer.alert(response.ErrMsg)
                } else {
                    layer.alert("服务器内部错误")
                }
            }, NetWorkErr() {
                layer.alert("网络连接失败")
            }
        })
        return false
        // throw new Error("Method not implemented.");
    }
    protected OnResize(): void {
        console.log(Me.WindowState, window.screen.width, document.body.clientWidth)
        // throw new Error("Method not implemented.");
    }
    public OnWindowState(State: "Max" | "Normal"): void {
        let max: any = document.querySelector(".max");
        State == "Max" ? (max.className = "max max_restore") : (max.className = "max")
    }
}
class MessageController {
    [key: string]: (msg: any) => void
    public PushMsg(msg: ISocket.Response.PushMsg) {
        if (msg.Type != 3) {
            if (!VueChat.chatList[VueChat.userInfo.ID]) {
                VueChat.chatList[VueChat.userInfo.ID] = []
                VueChat.chatList[VueChat.userInfo.ID].push({
                    Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
                    Type: msg.Type,
                    Dir: 1,
                    MsgId: msg.MsgId,
                    MsgStatus: 1,
                    Receive: true,
                    ErrMsg: ''
                })
            } else {
                VueChat.chatList[VueChat.userInfo.ID].push({
                    Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
                    Type: msg.Type,
                    Dir: 1,
                    MsgId: msg.MsgId,
                    MsgStatus: 1,
                    Receive: true,
                    ErrMsg: ''
                })
            }
            chatMain.VuePage.chatList = Object.assign({}, chatMain.VuePage.chatList)
            DB.ExecuteNonQuery(chatMain.VuePage.userInfo.MyID, 'INSERT INTO chatrec VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)',
                msg.MsgId.toString(), chatMain.VuePage.userInfo.ID, chatMain.VuePage.userInfo.MyID, msg.Type, msg.Msg, 1, '')
        }
    }
}
class IpcController {
    [key: string]: (msg: IpcI) => void
    public Shake(msg: IpcI) {
        chatMain.VuePage.shake(event, msg.From)
    }
    public Shot(msg: IpcI) {
        if (isFocus) {
            let msgs: any = document.querySelector('#message');
            msgs.focus()
            chatMain.VuePage.screenshot(msg.Base64)
        }
    }
    public SendCrad(msg: IpcI) {
        chatMain.VuePage
    }
}
window.imgLoad = (str) => {
    let src: any = str.getAttribute("data-src")
    str.setAttribute('src', src)
    if (window.isBottom) {
        let last: any = document.querySelector(".chat-list li:last-child")
        last && last.scrollIntoView()
    }
}
let chatMain = new ChatMain