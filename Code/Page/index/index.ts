import WinBase from "../../Plugs/WinBase/WinBase";
import { VuePage } from "./VuePage";
import * as layer from "../../Plugs/Module/layer/layer";
import * as VueComponent from "../../Plugs/Module/VueComponent";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import Ajaxs from '../../Plugs/Module/Ajaxs';
let WebSockets = new WebSocketPro();
let NotifyIcon = System.Require("NotifyIcon");
let DB = System.Require('Db')
let Menu = System.Require("Menu");
let shoter = System.Require("Screen")
let res: IAjax.Response.Login = Me.Param && JSON.parse(Me.Param);
VueComponent;
class Index extends WinBase {
	protected Activated(): void { }
	protected Deactivate(): void { }
	public VuePage = VuePage;
	private MessageController = new MessageController();
	private IpcController = new IpcController();
	constructor() {
		super();
		let self = this;
		self.VuePage.userData = res;
		self.VuePage.onlineType = res.onlineType;
		NotifyIcon.Click(function (e) {
			if (e.Button == 1048576) {
				Me.Show()
				Me.Activate()
			}
			if (e.Button == 2097152) {
				Menu.Popup({
					FontColor: "#000000",
					BgColor: "#ffffff",
					HoverColor: "#e2e2e3",
					Height: 30,
					Click: (Key: string, Checked: boolean) => {
						console.log(Key, Checked);
						switch (Key) {
							case '0':
							case '1':
							case '2':
								index.VuePage.selectStatus(Number(Key)); break;
							case '退出': System.Exit(); break;
						}
					},
					SubItem: [
						{
							Key: "0",
							Label: "我在线上",
							Type: 1,
							Enabled: true,
							Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZjAyNmY3OS1jOWRhLTMyNGUtYTlhMy0yZmE3Y2E3MDdkOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVCOThBQ0FFOEI3MTFFOEI3RUZGNEQ1NDE5M0NBNzUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVCOThBQzlFOEI3MTFFOEI3RUZGNEQ1NDE5M0NBNzUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2RDNGQjkyRTg3RTExRThCNjg3OTk3NDA2NzhDNTkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ2RDNGQjkzRTg3RTExRThCNjg3OTk3NDA2NzhDNTkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HyglUAAAAJdJREFUeNpiYPjPwICERYC4DYgvAfEPKL4AxE1QOYRaJE4wEH8AYlzwI1QNikaQwD88mmDwH1wzkBCFmkYsBKkVYwJqzQViPgbiAUhtAQPU86TCS4zgkGNgYGcgDfxiYiAPgDXeIEPjPZDGTWRo3AoKHDFyooOiBADDIUD8CY+mT9iSHHoivwzEv4D4CxCfA+Jm9EQOEGAAmpTa7Q8GBBUAAAAASUVORK5CYII=',
						}, {
							Key: "1",
							Label: "隐身",
							Type: 1,
							Enabled: true,
							Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZjAyNmY3OS1jOWRhLTMyNGUtYTlhMy0yZmE3Y2E3MDdkOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY4ODgzRkRFOEI3MTFFOEIwQ0JFM0MzREQ3MTc3QkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY4ODgzRkNFOEI3MTFFOEIwQ0JFM0MzREQ3MTc3QkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2RDNGQjkyRTg3RTExRThCNjg3OTk3NDA2NzhDNTkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ2RDNGQjkzRTg3RTExRThCNjg3OTk3NDA2NzhDNTkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UaK5HAAAANJJREFUeNpifLfcmAEJiABxERD7ALEaVOwGEG8C4klA/AamkBFJYzAQzwVifgbs4BMQJwHxWhCHCUnTajyaQIAPqiYYplEUiOeBbGcgDBihasVAGnOhphELQGoLWICEH0xEMOIMXh3vV5jAmD6gwPkBZLAzkAZ+sSDzSLARrBEUT/poEoTAPSZo5JIKtoI0ToFGLrEApHYCSOMraIr4T4Sm/1C1r2ApB5SMwoD4Mx5NILlQ9CQHAmuAWAmI24H4ChD/BuKvQHweiFugcmthigECDABhGTFb2EY/KwAAAABJRU5ErkJggg==',
						}, {
							Key: "2",
							Label: "离线",
							Type: 1,
							Enabled: true,
							Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZjAyNmY3OS1jOWRhLTMyNGUtYTlhMy0yZmE3Y2E3MDdkOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjM4Mjk3RDBFOEI3MTFFODlBRTQ5MTkxQTc4OTRGMDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjM4Mjk3Q0ZFOEI3MTFFODlBRTQ5MTkxQTc4OTRGMDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2RDNGQjkyRTg3RTExRThCNjg3OTk3NDA2NzhDNTkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ2RDNGQjkzRTg3RTExRThCNjg3OTk3NDA2NzhDNTkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FigHowAAAMNJREFUeNpinDlzJgMSEAHiIiD2AWI1qNgNIN4ExJOA+A1MIQuSpmAgngvE/AyoQB+K84E4CYjXggSZkDStxqIJGfBB1QTDNIoC8TwgZmQgDBihasVAGnOhphELQGoLQBr9GEgHPiCNGmRoVGdiIA/8YoLGE6ngHhM0ckkFW0EapwDxJxI0gdROAGl8BU0R/4nQ9B+q9hUscEDJKAyIP+PRBJILRU9yILAGiJWAuB2IrwDxbyD+CsTngbgFKrcWphggwAB/WSQD6BF9AgAAAABJRU5ErkJggg=='
						}, {
							Type: 0
						}, {
							Key: "退出",
							Label: "退出",
							Enabled: true,
							Type: 1,
						}
					]
				});
			}
		});
		NotifyIcon.Text(`橙聊: ${res.Nick}(${res.ID})`);
		WebSockets.Closed = CloseReasons => {
			for (let i in index.VuePage.contactList) {
				index.VuePage.contactList[i].OnlineType = self.VuePage.OnlineType.离线;
			}
			for (let i in index.VuePage.contactGroup) {
				index.VuePage.contactGroup[i].OnlineNum = 0;
			}
			self.VuePage.onlineType = self.VuePage.OnlineType.离线;
			if (CloseReasons == 2) {
				System.Open({
					Name: "socketClose",
					Text: '连接断开',
					Url: "Page/socketClose/socketClose.html",
					Size: { Width: 280, Height: 200 },
					Resize: false,
					Delay: true,
					Param: JSON.stringify(res),
					TopMost: true,
					Location: { X: screen.availWidth - 280, Y: screen.availHeight - 200 }
				});
			}
		};
		WebSockets.Message = msg => {
			self.MessageController[msg.Com] && self.MessageController[msg.Com](msg)
		};
		System.Ipc.On((msg: string) => {
			let data: IpcI = JSON.parse(msg)
			self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data)
		});
		System.Ipc.Send(JSON.stringify({ IpcCom: "CurrentUserID", UserID: res.ID }));
		let sessionPerson = <Array<FriendInfo>><any>DB.GetTable(res.ID,
			`SELECT DISTINCT ID, Phone, Remark, Nick, Headp, FriendGroupID, Vsign, Vipout, Viplevel, Sex, Age, BloodType, Birthday, HomeTown, 
             School, PersonalInfo, Company, Profession, OnlineType, LastMsg, SendTime FROM chatlist JOIN user WHERE Type=0 ORDER BY SendTime desc`
		);
		let sessionGroup = <Array<GroupInfo>><any>DB.GetTable(res.ID,
			'SELECT DISTINCT ID, GroupOwnerID, Name, Size, Notice, Introduce, GroupHead, CreateTime, LastMsg, SendTime FROM chatlist JOIN groups WHERE Type=1 ORDER BY SendTime desc'
		);
		if (sessionPerson.length > 0) {
			let session = <FriendList>self.VuePage.sessionList
			for (let i = 0, l = sessionPerson.length; i < l; i++) {
				let unread = DB.GetTable(res.ID, 'SELECT * FROM ChatRec WHERE MsgId > @p0', (<any>sessionPerson[i]).SendTime.toString())
				if (!session[sessionPerson[i].ID + "Friend"]) {
					session[sessionPerson[i].ID + "Friend"] = sessionPerson[i];
					session[sessionPerson[i].ID + "Friend"].IsPerson = true;
				}
				unread && (session[sessionPerson[i].ID + "Friend"].UnRead = unread.length)
			}
			self.VuePage.sessionList = Object.assign({}, session);
		}
		if (sessionGroup.length > 0) {
			let session = <GroupList>self.VuePage.sessionList
			for (let i = 0, l = sessionGroup.length; i < l; i++) {
				if (!session[sessionGroup[i].ID + "Group"]) {
					session[sessionGroup[i].ID + "Group"] = sessionGroup[i];
					session[sessionGroup[i].ID + "Group"].IsPerson = false;
				}
			}
			self.VuePage.sessionList = Object.assign({}, session);
		}
	}

	protected OnClose(): boolean {
		return true;
	}
	protected OnResize(): void { }
	protected OnWindowState(State: "Max" | "Normal"): void { }
}
/**Socket处理 */
class MessageController {
	//'T':keyof MessageController
	[key: string]: (msg: any) => void;
	/**重新登录 */
	public LoginOut(msg: ISocket.Response.LoginOut) {
		System.Open({
			Name: "dialog",
			Text: '重新登录',
			Url: "Page/dialog/dialog.html",
			Size: { Width: 330, Height: 220 },
			Resize: false,
			Delay: true,
			TopMost: true,
			Param: JSON.stringify({ Token: res.Sign, OnlineType: index.VuePage.oldonlineType }),
			Location: { X: (screen.availWidth - 330) / 2, Y: (screen.availHeight - 220) / 2 }
		});
	}
	/**是否在线 */
	public UserOnline(msg: ISocket.Response.UserOnline) {
		// let s: ISocket.Response.ResponseBase
		// s = msg
		if (index.VuePage.contactList[msg.Id] && index.VuePage.contactList[msg.Id].OnlineType != msg.Type) {
			index.VuePage.contactList[msg.Id].OnlineType = msg.Type;
			if (index.VuePage.sessionList[msg.Id + "Friend"]) {
				(<FriendInfo>index.VuePage.sessionList[msg.Id + "Friend"]).OnlineType = msg.Type;
				DB.ExecuteNonQuery(res.ID, 'UPDATE user SET OnlineType=@p0 WHERE Id=@p1', msg.Type, msg.Id);
			}
			if (index.VuePage.contactList[msg.Id].OnlineType == 0) {
				index.VuePage.contactGroup[index.VuePage.contactList[msg.Id].FriendGroupID].OnlineNum++;
			} else {
				index.VuePage.contactGroup[index.VuePage.contactList[msg.Id].FriendGroupID].OnlineNum--;
			}
			index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
		}
	}
	/**发送消息 */
	public PushMsg(msg: ISocket.Response.PushMsg) {
		console.log('发送消息响应');
		WebSockets.Send("ReceiveMsg", { MsgId: msg.MsgId }, function (msg) {
			if (msg.ErrCode != 0) {
				console.error(msg.ErrMsg);
			}
		})
		let item = index.VuePage.contactList[msg.From]
		if (msg.Type == 3) {
			// let isShake = localStorage.getItem(res.ID + 'isShake')
			// if (isShake) {
			if (!System.FindWinBool(msg.From + 'Friend')) {
				let paramer: MyAndUserInfo = JSON.parse(JSON.stringify(item));
				paramer.MyID = res.ID
				paramer.Action = "Shake"
				System.Open({
					Name: item.ID + "Friend",
					Text: item.Remark ? item.Remark : item.Nick,
					Url: "Page/chatMain/chat.html",
					Size: { Width: 920, Height: 750 },
					MinSize: { Width: 920, Height: 750 },
					Resize: true,
					Delay: true,
					Param: JSON.stringify(paramer),
					Location: { X: ((screen.availWidth - 920) / 2), Y: (screen.availHeight - 750) / 2 }
				});
			} else {
				System.Ipc.Send(msg.From + 'Friend', JSON.stringify({ IpcCom: "Shake", From: item.Remark ? item.Remark : item.Nick }))
			}
			// }
		} else {
			let msgs = msg.Msg
			msgs = msgs.replace(/<img.*?(?:>|\/>)/gi, '[图片]');
			if (msg.Type == 2) {
				msgs = '接收文件' + msgs.split('=')[1]
			}
			if (msg.Type == 4) {
				msgs = '推荐了:' + msgs.split('-')[1]
			}
			let session = <FriendList>index.VuePage.sessionList
			if (!session[msg.From + "Friend"]) {
				session[msg.From + "Friend"] = JSON.parse(JSON.stringify(item))
				session[msg.From + "Friend"].IsPerson = true
				session[msg.From + "Friend"].UnRead = 1
				DB.ExecuteNonQuery(res.ID, 'INSERT INTO chatrec VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)',
					msg.MsgId.toString(), msg.From, res.ID, msg.Type, msg.Msg, 1, '')
			} else {
				if (!System.FindWinBool(msg.From + "Friend")) {
					(<any>session[msg.From + "Friend"]).UnRead++
					DB.ExecuteNonQuery(res.ID, 'INSERT INTO chatrec VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)',
						msg.MsgId.toString(), msg.From, res.ID, msg.Type, msg.Msg, 1, '')
				}
			}
			localStorage.setItem(res.ID + "UnRead", msg.MsgId.toString())
			session[msg.From + "Friend"].LastMsg = msgs
			session[msg.From + "Friend"].SendTime = msg.MsgId
			DB.ExecuteNonQuery(res.ID, 'UPDATE user SET LastMsg=@p0 WHERE ID=@p1', msgs, item.ID);
			index.VuePage.sessionList = Object.assign({}, session)
		}
	}
	/**发送群消息 */
	public PushQMsg(msg: ISocket.Response.PushQMsg) {
		console.log('这是群消息');
		console.log(msg);
		WebSockets.Send("ReceiveMsg", { MsgId: msg.MsgId }, function (msg) {
			if (msg.ErrCode != 0) {
				console.error(msg.ErrMsg);
			}
		})
	}
	/**添加好友 */
	public AddFriend(msg: ISocket.Response.AddFriend) {
		getUserInfo(msg.Id);
	}
	/**拒绝添加好友 */
	public DenyFriend(msg: ISocket.Response.DenyFriend) {
		getUserInfo(msg.Id, true);
	}
	/**同意添加好友 */
	public AgreeFriend(msg: ISocket.Response.AgreeFriend) {
		insertFriendInfo(msg);
	}
	/**退群 */
	public ExitQ(msg: ISocket.Response.ExitQ) {
		let del = () => {
			if (msg.Type == 100 || msg.Type == 0) {
				index.VuePage.groupMemberList[msg.Qid] = {};
				delete index.VuePage.groups[msg.Qid];
				index.VuePage.groups = Object.assign({}, index.VuePage.groups);
			} else {
				if (index.VuePage.groupMemberList[msg.Qid]) {
					delete index.VuePage.groupMemberList[msg.Qid][msg.Uid];
					index.VuePage.groupMemberList = Object.assign({}, index.VuePage.groupMemberList);
				}
			}
			if (index.VuePage.sessionList[msg.Qid + "Group"]) {
				delete index.VuePage.sessionList[msg.Qid + "Group"];
				index.VuePage.sessionList = Object.assign({}, index.VuePage.sessionList);
				DB.ExecuteNonQuery(res.ID, "DELETE FROM chatlist WHERE ChatID=@p0 AND Type=@p1", msg.Qid, 1);
				DB.ExecuteNonQuery(res.ID, "DELETE FROM groups WHERE ID=@p0", msg.Qid);
			}
		};
		console.log(msg)
		let name = index.VuePage.groups[msg.Qid].Name;
		let GroupOwnerID = index.VuePage.groups[msg.Qid].GroupOwnerID;
		if (msg.Type == 100) {
			del();
			getUserInfo(GroupOwnerID, false, "Group", ExitQEnum.群解散, name);
			System.Ipc.Send(JSON.stringify({ IpcCom: "ExitMemberList" }));
		} else if (msg.Type == 1) {
			for (let i in index.VuePage.groups[msg.Qid].MemberList) {
				if (index.VuePage.groups[msg.Qid].MemberList[i].IsAdmin > 0) {
					getUserInfo(msg.Uid, false, "Group", ExitQEnum.主动退出, name);
				}
			}
			del();
			System.Ipc.Send(JSON.stringify({ IpcCom: "ChangeMemberList", UserID: msg.Uid }));
		} else if (msg.Type == 0) {
			if (index.VuePage.userData.ID == index.VuePage.groups[msg.Qid].GroupOwnerID || index.VuePage.userData.ID == msg.Uid) {
				getGroupInfo(msg.Qid, true, true)
			}
			System.Ipc.Send(JSON.stringify({ IpcCom: "ChangeMemberList", UserID: msg.Uid }));
			del();
		}
	}
	/**加群 */
	public JoinQ(msg: ISocket.Response.JoinQ) {
		getGroupInfo(msg.Id);
	}
	/**删除好友 */
	public DelFriend(msg: ISocket.Response.DelFriend) {
		let groupId = index.VuePage.contactList[msg.Id].FriendGroupID;
		index.VuePage.contactGroup[groupId].OnlineNum--;
		delete index.VuePage.contactGroup[groupId].List[msg.Id];
		delete index.VuePage.contactList[msg.Id]
		index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
		console.log('删除好友');
		console.log(msg);
	}
	/**编辑资料*/
	public EditInfo(msg: ISocket.Response.EditInfo) {
		console.log(msg);
		if (index.VuePage.contactList[msg.Id]) {
			let groupId = index.VuePage.contactList[msg.Id].FriendGroupID;
			msg.Nick && (index.VuePage.contactGroup[groupId].List[msg.Id].Nick = msg.Nick);
			msg.Vsign && (index.VuePage.contactGroup[groupId].List[msg.Id].Vsign = msg.Vsign);
			index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
		}
		if (index.VuePage.sessionList[msg.Id + 'Friend']) {
			msg.Nick && ((<FriendInfo>index.VuePage.sessionList[msg.Id + 'Friend']).Nick = msg.Nick)
			index.VuePage.sessionList = Object.assign({}, index.VuePage.sessionList);
		}
	}
	/**修改群名片 */
	public EditQNick(msg: ISocket.Response.EditQNick) {
		if (index.VuePage.groupMemberList[msg.Id]) {
			index.VuePage.groupMemberList[msg.Id][msg.Uid].VisitingCard = msg.Nick
		}
	}
	/**设置群管理员 */
	public SetQAdmin(msg: ISocket.Response.SetQAdmin) {
		if (index.VuePage.groupMemberList[msg.Id]) {
			index.VuePage.groupMemberList[msg.Id][msg.Uid].IsAdmin = msg.Admin ? 1 : 0
		}
		if (index.VuePage.userData.ID == msg.Uid) {
			let IsAdmin = msg.Admin ? true : false;
			let groups = index.VuePage.groups[msg.Id];
			console.log(groups)
			System.Open({
				Name: msg.Uid + "friendVerification",
				Text: "验证信息",
				Url: "Page/userAction/friendVerification.html",
				Size: { Width: 600, Height: 600 },
				Delay: true,
				Param: JSON.stringify({ List: { groups: groups }, Type: 3, VerifyType: "Group", IsAdmin: IsAdmin })
			});
		}
	}
}
enum ExitQEnum {
	被踢 = 0,
	主动退出,
	群解散 = 100
}
/**添加好友信息 */
function insertFriendInfo(msg: ISocket.Response.AgreeFriend) {
	Ajaxs({ Controller: "UserAction/getUserInfo" }, { T: res.Sign, ID: msg.Id }, {
		OkFun(response) {
			let info: FriendInfo = JSON.parse(JSON.stringify(response.Info[0]));
			let SendTime = new Date().getTime()
			info.Remark = msg.Remark;
			info.FriendGroupID = msg.GId;
			info.OnlineType = index.VuePage.OnlineType.离线;
			let session = index.VuePage.sessionList
			session[msg.Id + "Friend"] = JSON.parse(JSON.stringify(info));
			session[msg.Id + "Friend"].IsPerson = true
			session[msg.Id + "Friend"].LastMsg = '我们已经是好友啦，一起来聊天吧!'
			session[msg.Id + "Friend"].SendTime = SendTime
			session[msg.Id + "Friend"].UnRead = 1
			insertDBFriend(info, { Msg: '我们已经是好友啦，一起来聊天吧!', SendTime: SendTime, ReadID: SendTime })
			DB.ExecuteNonQuery(res.ID, 'INSERT INTO chatrec VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)', SendTime.toString(), res.ID, msg.Id, '0', '我们已经是好友啦，一起来聊天吧!', 1, '')
			index.VuePage.contactList[info.ID] = info;
			index.VuePage.contactGroup[msg.GId].List[info.ID] = info;
			index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
			index.VuePage.sessionList = Object.assign({}, session);
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
}
function insertDBFriend(item: FriendInfo, msg: { Msg: string, SendTime: number, ReadID: number }) {
	DB.ExecuteNonQuery(res.ID, "INSERT INTO user values(@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10, @p11, @p12, @p13, @p14, @p15, @p16, @p17, @p18, @p19, @p20, @p21)",
		item.ID,
		item.Phone.toString(),
		item.Remark,
		item.Nick,
		item.Headp,
		item.FriendGroupID,
		item.Vsign,
		item.VipOut,
		item.VipLevel,
		item.Sex,
		item.Age,
		item.BloodType,
		item.Birthday,
		item.HomeTown,
		item.School,
		item.PersonalInfo,
		item.Company,
		item.Profession,
		index.VuePage.OnlineType.离线,
		msg.Msg,
		msg.SendTime.toString(),
		msg.ReadID.toString()
	);
	DB.ExecuteNonQuery(res.ID, "INSERT INTO chatlist (ChatID, Type) VALUES(@p0, @p1)", item.ID, 0);
}
/**获取用户信息 打开验证页面*/
function getUserInfo(ID: number, Action?: boolean, VerifyType?: string, Type?: number, Name?: string) {
	Ajaxs({ Controller: "UserAction/getUserInfo" }, { T: res.Sign, ID: ID }, {
		OkFun(response) {
			System.Open({
				Name: ID + "friendVerification",
				Text: "验证信息",
				Url: "Page/userAction/friendVerification.html",
				Size: { Width: 600, Height: 600 },
				Delay: true,
				Param: JSON.stringify({
					List: response.Info,
					Token: res.Sign,
					Action: Action,
					MyID: res.ID,
					VerifyType: VerifyType,
					Type: Type,
					Name: Name
				})
			});
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
}
getAddFriendList();
/**获取离线状态下的好友请求 */
function getAddFriendList() {
	Ajaxs({ Controller: "FriendAction/getAddFriendList" }, { T: res.Sign }, {
		OkFun(response) {
			if (response.List.length > 0) {
				System.Open({
					Name: "friendVerification",
					Text: "验证信息",
					Url: "Page/userAction/friendVerification.html",
					Size: { Width: 600, Height: 600 },
					Delay: true,
					Param: JSON.stringify({ List: response.List, MyID: res.ID })
				});
			}
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
}
/**获取离线消息 */
function getFriendOffLineMsg() {
	Ajaxs({ Controller: "FriendAction/getFriendOffLineMsg" }, { T: res.Sign }, {
		OkFun(response) {
			if (response.List) {
				let data: Array<string> = [];
				let val: Array<string | number> = [];
				let unread: Dict<{ UnRead: number, LastMsg: string, SendTime: number, ReadID: number }> = {}
				let write = localStorage.getItem(res.ID + "UnRead")
				for (let i in response.List) {
					let SendTime = response.List[i].SendTime.split('-')[0]
					if (write && SendTime > write) {
						data.push(`(${SendTime}, ${response.List[i].FriendID}, ${res.ID}, ${response.List[i].Type}, @p${i}, 1, '')`);
						val.push(response.List[i].Msg)
					}
					if (!unread[response.List[i].FriendID]) {
						unread[response.List[i].FriendID] = <any>{}
						unread[response.List[i].FriendID].UnRead = 1
						unread[response.List[i].FriendID].LastMsg = response.List[i].Msg
						unread[response.List[i].FriendID].SendTime = parseInt(SendTime)
						unread[response.List[i].FriendID].ReadID = response.List[i].ReadID
					} else {
						unread[response.List[i].FriendID].UnRead++
						unread[response.List[i].FriendID].LastMsg = response.List[i].Msg
						unread[response.List[i].FriendID].SendTime = parseInt(SendTime)
						unread[response.List[i].FriendID].ReadID = response.List[i].ReadID
					}
					let session = <FriendList>index.VuePage.sessionList
					if (!session[response.List[i].FriendID + "Friend"]) {
						let item = index.VuePage.contactList[response.List[i].FriendID]
						session[response.List[i].FriendID + "Friend"] = JSON.parse(JSON.stringify(item))
						let exist = DB.ExecuteScalar(res.ID, "SELECT * FROM chatlist WHERE chatid=@p0 AND type=@p1", item.ID, 0);
						if (!exist) {
							insertDBFriend(item, { Msg: unread[response.List[i].FriendID].LastMsg, SendTime: unread[response.List[i].FriendID].SendTime, ReadID: unread[response.List[i].FriendID].ReadID })
						}
					}
					session[response.List[i].FriendID + "Friend"].IsPerson = true
					session[response.List[i].FriendID + "Friend"].UnRead = unread[response.List[i].FriendID].UnRead
					session[response.List[i].FriendID + "Friend"].LastMsg = unread[response.List[i].FriendID].LastMsg
					session[response.List[i].FriendID + "Friend"].SendTime = unread[response.List[i].FriendID].SendTime
					index.VuePage.sessionList = Object.assign({}, session)
				}
				if (data.length > 0) {
					DB.ExecuteNonQuery(res.ID, `INSERT INTO chatrec VALUES ${data.join(",")}`, ...val)
				}
			}
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
}
/**获取在线列表 */
function getOnlineList() {
	WebSockets.Send("GetOnline", {}, function (msg) {
		if (msg.ErrCode == 0) {
			for (let i in msg.List) {
				index.VuePage.sessionList[msg.List[i] + "Friend"] && ((<FriendInfo>index.VuePage.sessionList[msg.List[i] + "Friend"]).OnlineType = index.VuePage.OnlineType.在线);
				DB.ExecuteNonQuery(res.ID, "UPDATE user SET onlineType=@p0 WHERE ID=@p1", index.VuePage.OnlineType.在线, msg.List[i]);
				index.VuePage.contactList[msg.List[i]].OnlineType = index.VuePage.OnlineType.在线;
				index.VuePage.contactGroup[index.VuePage.contactList[msg.List[i]].FriendGroupID].OnlineNum++;
			}
		} else {
			layer.msg(msg.ErrMsg);
		}
	})
}
/**获取群信息 */
function getGroupInfo(GroupID: number, Action?: boolean, Type?: boolean) {
	Ajaxs({ Controller: "GroupAction/getGroupInfo" }, { T: res.Sign, GroupID: GroupID }, {
		OkFun(response) {
			if (Action) {
				let list = Type ? response.List : response.List[0]
				System.Open({
					Name: "friendVerification",
					Text: "验证信息",
					Url: "Page/userAction/friendVerification.html",
					Size: { Width: 600, Height: 600 },
					Delay: true,
					Param: JSON.stringify({
						List: list,
						VerifyType: "Group",
						Type: ExitQEnum.被踢
					})
				});
			} else {
				index.VuePage.groups[response.List[0].ID] = response.List[0];
				index.VuePage.groups = Object.assign({}, index.VuePage.groups);
			}
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
}
class IpcController {
	[key: string]: (msg: IpcI) => void;
	public SendMsg(msg: IpcI) {
		if (msg.Type == 3) {
			if (msg.From) {
				msg.Msg = msg.From + '给您发送了一个抖动窗口'
			} else {
				msg.Msg = '您发送了一个抖动窗口'
			}
		}
		let item = index.VuePage.contactList[msg.FriendId]
		if (!index.VuePage.sessionList[msg.FriendId + "Friend"]) {
			index.VuePage.sessionList[msg.FriendId + "Friend"] = JSON.parse(JSON.stringify(item));
			index.VuePage.sessionList[msg.FriendId + "Friend"].IsPerson = true
			let exist = DB.ExecuteScalar(res.ID, "SELECT * FROM chatlist WHERE chatid=@p0 AND type=@p1", item.ID, 0);
			if (!exist) {
				insertDBFriend(item, { Msg: msg.Msg, SendTime: msg.MsgId, ReadID: msg.MsgId })
			}
		} else {
			DB.ExecuteNonQuery(res.ID, 'UPDATE user SET LastMsg=@p0, SendTime=@p1, ReadID=@p1 WHERE ID=@p2 AND SendTime < @p1', msg.Msg, msg.MsgId.toString(), msg.FriendId);
		}
		index.VuePage.sessionList[msg.FriendId + "Friend"].LastMsg = msg.Msg
		index.VuePage.sessionList[msg.FriendId + "Friend"].SendTime = msg.MsgId
		index.VuePage.sessionList = Object.assign({}, index.VuePage.sessionList)
	}
	public SendQMsg(msg: IpcI) {
		let item = index.VuePage.groups[msg.GroupId];
		if (!index.VuePage.sessionList[msg.FriendId + "Group"]) {
			index.VuePage.sessionList[msg.FriendId + "Group"] = JSON.parse(JSON.stringify(item));
			index.VuePage.sessionList[msg.FriendId + "Group"].IsPerson = false;
			// 	let exist = DB.ExecuteScalar(res.ID, "SELECT * FROM chatlist WHERE chatid=@p0 AND type=@p1", item.ID, 1);
			// 	if (!exist) {
			// 		DB.ExecuteNonQuery(res.ID, 'INSERT INTO groups VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10)',
			// 			item.ID,
			// 			item.GroupOwnerID,
			// 			item.Name,
			// 			item.Size,
			// 			item.Notice,
			// 			item.Introduce,
			// 			item.GroupHead,
			// 			item.CreateTime,
			// 			msg.Msg,
			// 			msg.MsgId.toString(),
			// 		);
			// 		DB.ExecuteNonQuery(res.ID, 'INSERT INTO chatlist (ChatID, Type) VALUES(@p0, @p1)', item.ID, 1);
		}
		// } else {
		// 	DB.ExecuteNonQuery(res.ID, 'UPDATE groups SET LastMsg=@p0, SendTime=@p1 WHERE ID=@p2 AND SendTime < @p1', msg.Msg, msg.MsgId.toString(), msg.FriendId);
		// }
		index.VuePage.sessionList[msg.FriendId + "Group"].LastMsg = msg.Msg;
		index.VuePage.sessionList[msg.FriendId + "Group"].SendTime = msg.MsgId;
		index.VuePage.sessionList = Object.assign({}, index.VuePage.sessionList);
	}
	public CreateGroup(msg: IpcI) {
		getGroupInfo(msg.GroupID);
	}
	public AddFriend(msg: any) {
		console.log("ipc add");
		insertFriendInfo(msg);
	}
	public FiendGroup(msg: IpcI) {
		delete msg.IpcCom;
		index.VuePage.contactGroup = Object.assign(index.VuePage.contactGroup, msg);
		index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
		for (let key in msg) {
			index.VuePage.friendGroup[key] = msg[key].Name;
		}
	}
	public ChangeFriengGroup(msg: IpcI) {
		delete msg.IpcCom;
		index.VuePage.contactGroup = Object.assign(index.VuePage.contactGroup, msg);
	}
	public Edithead(msg: IpcI) {
		console.log(msg.HeadP)
		$(".user-avatar .selfData").css('background-image', msg.HeadP);
		$(".user-avatar .selfData").css('background-size', 'contain');
	}
	public FriendList(msg: IpcI) {
		let friendInfo: any = {};
		friendInfo.contactGroup = index.VuePage.contactGroup;
		friendInfo.ID = index.VuePage.userData.ID;
		friendInfo.ShareGroup = "邀请进群";
		friendInfo.Qid = msg.Qid;
		friendInfo.groupMember = Object.keys(index.VuePage.groupMemberList[msg.Qid]);
		console.log(msg.Qid)
		friendInfo.IpcCom = "friendL";
		setTimeout(function () {
			System.Ipc.Send("inviteEnterGroup", JSON.stringify(friendInfo));
		}, 100)

		console.log("发送完毕");
	}
	public InviteList(msg: IpcI) {
		index.VuePage.groupMemberList[msg.groupId] = Object.assign(index.VuePage.groupMemberList[msg.groupId], msg.data);
		console.log(index.VuePage.groupMemberList[msg.groupId])
	}
	public LoginSuccess(msg: IpcI) {
		getOnlineList();
		index.VuePage.onlineType = index.VuePage.oldonlineType;
	}
	public Remark(msg: IpcI) {
		index.VuePage.contactGroup[msg.FriendGroupID].List[msg.ID].Remark = msg.Remark;
		index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
	}
	public MoveGroups(msg: IpcI) {
		index.VuePage.contactGroup[msg.FriendGroupID].OnlineNum--
		delete index.VuePage.contactGroup[msg.FriendGroupID].List[msg.ID];
		index.VuePage.contactGroup[msg.newGroup].OnlineNum++
		msg.FriendGroupID = parseInt(msg.newGroup);
		let msg1: any = {};
		msg1[msg.ID] = msg;
		index.VuePage.contactList[msg.ID].FriendGroupID = parseInt(msg.newGroup);
		index.VuePage.contactList = Object.assign({}, index.VuePage.contactList);
		console.log(index.VuePage.contactList)
		index.VuePage.contactGroup[msg.newGroup].List = Object.assign(index.VuePage.contactGroup[msg.newGroup].List, msg1);
		delete msg.groups;
		delete msg.newGroup;
		delete msg.IpcCom;
		index.VuePage.contactGroup = Object.assign({}, index.VuePage.contactGroup);
	}
	public GetFriendGroup(msg: IpcI) {
		let FriendGroup = index.VuePage.friendGroup;
		FriendGroup.IpcCom = "FriendGroup";
		System.Ipc.Send(JSON.stringify(FriendGroup));
	}
	public GetFriendGroupList(msg: IpcI) {
		let FriendGroupList: any = {};
		FriendGroupList.friendGroup = index.VuePage.friendGroup;
		FriendGroupList.friendList = index.VuePage.contactList;
		FriendGroupList.userData = index.VuePage.userData;
		FriendGroupList.IpcCom = "FriendGroupList";
		System.Ipc.Send(JSON.stringify(FriendGroupList));
	}
	public GetMemberList(msg: IpcI) {
		System.Ipc.Send(JSON.stringify({ groupMemberList: index.VuePage.groupMemberList[index.VuePage.getContactInfo.ID], IpcCom: "MemberList", MyID: res.ID }));
		console.log("发送完毕");
	}
	public setMinsizeOrClose(msg: IpcI) {
		console.log(msg);
		// var cl= document.getElementsByClassName('close');
		if (msg.Close) {
			index.VuePage.win = ['hide', 'close']
		} else {
			index.VuePage.win = ['hide', 'close', 'CloseOrmin']
		}
	}
	public topMost(msg: IpcI) {
		console.log(msg);
		Me.TopMost = msg.topmost;
	}

	public DeleteGroup(msg: IpcI) {
		console.log('删除退出群组');
		delete index.VuePage.groups[msg.groupId];
		index.VuePage.groups = Object.assign({}, index.VuePage.groups);
		console.log(index.VuePage.groups);
	}
	public ChangeCard(msg: IpcI) {
		if (Object.keys(index.VuePage.groupMemberList).length != 0) {
			index.VuePage.groupMemberList[msg.Id][msg.Uid].VisitingCard = msg.Nick
		}
	}

	public E(msg: IpcI) {
		console.log('删除退出群组');
		delete index.VuePage.groups[msg.groupId];
		index.VuePage.groups = Object.assign({}, index.VuePage.groups);
		console.log(index.VuePage.groups);
	}
	public ChangeSign(msg: IpcI) {
		index.VuePage.userData.Vsign = msg.sign;
		index.VuePage.userData = Object.assign({}, index.VuePage.userData)

	}
	public KickqQ(msg: IpcI) {
		console.log(msg);
		console.log(index.VuePage.groupMemberList[msg.Qid]);
		delete index.VuePage.groupMemberList[msg.Qid][msg.Uid];
	}
	public ShareFriend(msg: IpcI) {
		System.Ipc.Send('groupShare', JSON.stringify({ IpcCom: 'ContactGroup', data: index.VuePage.contactGroup }))
	}
}
let index = new Index();

/**获取好友分组 */
function getFriendGroup() {
	Ajaxs({ Controller: "FriendAction/getFriendGroup" }, { T: res.Sign }, {
		OkFun(response) {
			index.VuePage.contactGroup[0] = {
				ID: 0,
				Name: "我的好友",
				List: {},
				OnlineNum: 0
			};
			for (let i = 0, l = response.List.length; i < l; i++) {
				index.VuePage.contactGroup[response.List[i].ID] = {
					ID: response.List[i].ID,
					Name: response.List[i].Name,
					List: {},
					OnlineNum: 0
				};
			}
			getFriendList();
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
}
getFriendGroup();

/**获取好友列表 */
function getFriendList() {
	Ajaxs({ Controller: "FriendAction/getFriendList" }, { T: res.Sign }, {
		OkFun(response) {
			for (let i = 0, l = response.List.length; i < l; i++) {
				index.VuePage.contactList[response.List[i].ID] = response.List[i];
				index.VuePage.contactGroup[response.List[i].FriendGroupID].List[response.List[i].ID] = index.VuePage.contactList[response.List[i].ID];
			}
			getOnlineList();
			getFriendOffLineMsg();
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
}
/**获取群列表 */
function getGroupList() {
	Ajaxs({ Controller: "GroupAction/getGroupList" }, { T: res.Sign }, {
		OkFun(response) {
			for (let i = 0, l = response.List.length; i < l; i++) {
				index.VuePage.groups[response.List[i].ID] = {
					ID: response.List[i].ID,
					Name: response.List[i].Name,
					GroupOwnerID: response.List[i].GroupOwnerID,
					Size: response.List[i].Size,
					Config: response.List[i].Config,
					MemberList: {},
					Introduce: response.List[i].Introduce,
					GroupHead: response.List[i].GroupHead,
					CreateTime: response.List[i].CreateTime,
					Notice: response.List[i].Notice,
					Label: response.List[i].Label
				};
			}
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
}
getGroupList();

/**截屏 Ctrl + Alt + D */
let isShot: boolean = false
var hotIdDevTool = System.RegHotKey({
	Key: 68,
	KeyModifiers: 2 | 1,
	CallBack: function (Id) {
		if (!isShot) {
			isShot = true
			shoter.GetScreen(function (str) {
				isShot = false
				System.Ipc.Send(JSON.stringify({ IpcCom: "Shot", Base64: str }))
			})
		}

	}
})
/**是否显示主窗口 Ctrl + Alt + C */
System.RegHotKey({
	Key: 67,
	KeyModifiers: 2 | 1,
	CallBack: function (Id) {
		Me.Visible ? Me.Visible = false : Me.Visible = true
	}
})
console.log("热键绑定成功 ID=" + hotIdDevTool);