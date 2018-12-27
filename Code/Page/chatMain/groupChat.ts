import WinBase from "../../Plugs/WinBase/WinBase"
import { VueGroupChat } from "./VueGroupChat"
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as VueComponent from "../../Plugs/Module/VueComponent";
VueComponent;
let WebSockets = new WebSocketPro();
let DB = System.Require('Db')
class GroupChat extends WinBase {
	protected Activated(): void {
		// throw new Error("Method not implemented.");
	}
	protected Deactivate(): void {
		// throw new Error("Method not implemented.");
	}
	public VuePage = VueGroupChat;
	private MessageController = new MessageController()
	private IpcController = new IpcController
	constructor() {
		super();
		let self = this;
		WebSockets.Message = msg => {
			self.MessageController[msg.Com] && self.MessageController[msg.Com](msg)
		};
		System.Ipc.On((msg: string) => {
			let data: IpcI = JSON.parse(msg)
			self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data)
		});
	}
	protected OnClose(): boolean {
		// throw new Error("Method not implemented.");
		return true;
	}
	protected OnResize(): void {
		// throw new Error("Method not implemented.");
	}
	protected OnWindowState(State: "Max" | "Normal"): void {
		// throw new Error("Method not implemented.");
	}
}
class MessageController {
	[key: string]: (msg: any) => void;
	public PushQMsg(msg: ISocket.Response.PushQMsg) {
		if (msg.Type != 3) {
			if (!VueGroupChat.chatList[VueGroupChat.Params.ID]) {
				VueGroupChat.chatList[VueGroupChat.Params.ID] = []
				VueGroupChat.chatList[VueGroupChat.Params.ID].push({
					Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
					Type: msg.Type,
					Dir: 1,
					MsgId: msg.MsgId,
					MsgStatus: 1,
					Receive: true,
					ErrMsg: ''
				})
			} else {
				VueGroupChat.chatList[VueGroupChat.Params.ID].push({
					Msg: msg.Msg.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src="),
					Type: msg.Type,
					Dir: 1,
					MsgId: msg.MsgId,
					MsgStatus: 1,
					Receive: true,
					ErrMsg: ''
				})
			}
			groupChat.VuePage.chatList = Object.assign({}, groupChat.VuePage.chatList)
			DB.ExecuteNonQuery(groupChat.VuePage.Params.MyID, 'INSERT INTO GroupMsg VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)',
				msg.MsgId.toString(), groupChat.VuePage.Params.MyID, groupChat.VuePage.Params.ID, msg.Type, msg.Msg, 1, '')
		}
	}
	public EditQNick(msg: ISocket.Response.EditQNick) {
		groupChat.VuePage.Params.MemberList[msg.Uid].VisitingCard = msg.Nick;
		groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params)

	}
	public SetQAdmin(msg: ISocket.Response.SetQAdmin) {
		if (msg.Admin) {
			groupChat.VuePage.Params.MemberList[msg.Uid].IsAdmin = 1;
		} else {
			groupChat.VuePage.Params.MemberList[msg.Uid].IsAdmin = 0;
		}
		groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params);

	}
}
class IpcController {
	[key: string]: (msg: IpcI) => void
	public MemberList(msg: IpcI) {
		groupChat.VuePage.MemberSort(msg.groupMemberList);
		groupChat.VuePage.Params.MyID = msg.MyID;
		groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params)
		console.log(groupChat.VuePage.Params)
	}
	public ExitMemberList(msg: IpcI) {
		Me.Close(true)
	}
	public ChangeMemberList(msg: IpcI) {
		delete groupChat.VuePage.Params.MemberList[msg.UserID]
		groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params)
		// VueGroupChat.$set(groupChat.VuePage, "Params", groupChat.VuePage.Params)
	}
	public ChangeCard(msg: IpcI) {
		groupChat.VuePage.Params.MemberList[msg.Uid].VisitingCard = msg.Nick;
		groupChat.VuePage.Params = Object.assign({}, groupChat.VuePage.Params)
	}

}

let groupChat = new GroupChat;