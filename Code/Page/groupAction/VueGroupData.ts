import Vue from "../../Plugs/Module/Vue/Vue";
import * as layer from "../../Plugs/Module/layer/layer";
import * as VueComponent from "../../Plugs/Module/VueComponent";
import { emotion } from "../../Plugs/Module/chatemotion";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
let SocketPro = new WebSocketPro();
VueComponent;
export default new Vue({
	el: "#groupData",
	data: {
		/**窗体传参*/
		Params: <MyAndGroupInfo>(Me.Param && JSON.parse(Me.Param)),
		/**显示哪一个群成员*/
		number: -1,
		/**点击时显示背景色*/
		showBg: -1,
		/**显示标签页列表*/
		showList: ["首页", "成员", "设置"],
		/**显示初始化标签页*/
		listType: "首页",
		/**设置标签页中，显示是否允许被搜索*/
		searchList: true,
		/**邀请方式*/
		allowList: true,
		/**是否显示编辑资料*/
		showEdit: false,
		/**群介绍内容*/
		groupIntroduce: "",
		/**群标签*/
		groupLabel: <Array<string>>[],
		/**显示表情图*/
		showEmoji: false,
		/**表情图列表*/
		emojiList: <{ [k: string]: string }>emotion,
		//**成员数组 */
		memberArr: <any>[],
		isAdmin: 0
	},
	methods: {
		/**好友查找方式和邀请方式*/
		showSearch(element: string) {
			let searchWay: any = $("." + element).is(":checked");
			element == "searchWay" ? searchWay ? (this.searchList = true) : (this.searchList = false) : searchWay ? (this.allowList = true) : (this.allowList = false);
		},
		/**修改群名片选中并聚焦*/
		getFocus(index: number) {
			setTimeout(() => {
				$(".focus").select().focus();
			}, 0);
		},
		/**修改群名片SocketPro */
		changeCard(item: MemberInfo, index: number) {
			let card = $(".changeCard").eq(index).val();
			if (card != item.VisitingCard) {
				SocketPro.Send("EditQNick", { Id: item.GroupID, Uid: item.MemberID, Nick: card }, function (msg) {
					if (msg.ErrCode == 0) {
						System.Ipc.Send(JSON.stringify({ IpcCom: 'ChangeCard', Id: item.GroupID, Uid: item.MemberID, Nick: card }))
					} else {
						layer.msg(msg.ErrMsg)
					}
				})


				// SocketPro.send(<ISocket.Request.EditQNick>{ Com: "EditQNick", Id: item.GroupID, Uid: item.MemberID, Nick: card },
				// 	(msg: ISocket.Response.ResponseBase) => {
				// 		if (msg.ErrCode == 0) {
				// 			System.Ipc.Send(JSON.stringify({ IpcCom: 'ChangeCard', Id: item.GroupID, Uid: item.MemberID, Nick: card }))
				// 		} else {
				// 			layer.msg(msg.ErrMsg)
				// 		}
				// 	}
				// );
			}
			item.VisitingCard = card;
		},
		/**查看每个群成员资料*/
		lookData(item: MemberInfo) {
			System.Open({
				Name: item.MemberID + "checkOutData",
				Text: item.Nick,
				Url: "Page/userAction/openPersonalFile.html",
				Size: { Width: 720, Height: 520 },
				Delay: true,
				Param: JSON.stringify(item.MemberID)
			});
		},
		/**管理员记录*/
		adminRecord() {
			System.Open({
				Name: "adminRecord",
				Text: '管理记录',
				Url: "Page/groupAction/adminRecord.html",
				Size: { Width: 380, Height: 300 },
				Delay: true
			});
		},
		/**邀请好友加入群*/
		inviteEnterGroup() {
			System.Open({
				Name: "inviteEnterGroup",
				Text: "邀请集群",
				Url: "Page/groupAction/inviteGroup.html",
				Size: { Width: 490, Height: 471 },
				Delay: true,
				Param: JSON.stringify(this.Params.ID)
			});
		},
		/**保存编辑资料*/
		saveEditData() {
			let self = this;
			let groupName = $('#groupNa').val();
			let groupIntroduce = $('#content').val();
			self.showEdit = false;
			SocketPro.Send("EditQInfo", { Id: self.Params.ID, Name: groupName, Photo: ['abc', 'abc'], Label: self.groupLabel, Introduce: groupIntroduce }, function (msg) {
				if (msg.ErrCode == 0) {
					// delete self.Params.MemberList[item.MemberID];
					// self.Params = Object.assign({}, self.Params);
					// System.Ipc.Send('index', JSON.stringify({ IpcCom: "KickqQ", Qid: self.Params.ID, Uid: item.MemberID }))
				} else {
					console.error(msg.ErrMsg);
				}
			})
		},
		/**贴上标签*/
		stickOn() {
			let self = this
			let labelVal: any = $("#lableText").val().trim();
			if (labelVal && self.groupLabel.length < 3 && self.groupLabel.indexOf(labelVal) < 0) {
				self.groupLabel.push(labelVal);
			} else {
				layer.msg('最多存在三个标签或标签已存在')
			}
			$("#lableText").val("");
		},
		/**发消息*/
		sendInfo() {
			let self = this;
			let ID = self.Params.ID;
			System.Open({
				Name: ID + "Group",
				Text: self.Params.Name,
				Url: "Page/chatMain/groupChat.html",
				Size: { Width: 920, Height: 750 },
				Delay: true,
				Param: JSON.stringify(self.Params)
			});
		},
		/**选择表情图*/
		selectEmoji: function (item: string, text: string) {
			let msg: any = document.querySelector("#content");
			let img = `<img class="emotion" src="../../static/images/emotion/${item}.png" data-emoji="${text.replace("[", "").replace("]", "")}">`;
			insertAtCursor(msg, img);
			this.showEmoji = false;
		},
		/**设置成管理员*/
		setAdminer(item: MemberInfo) {
			let self = this;
			let title: string, admin: boolean
			if (item.IsAdmin == 1) {
				title = "确定取消" + item.Nick + "(" + item.MemberID + ")" + "的管理员"
				admin = false
			} else {
				title = "确定设置" + item.Nick + "(" + item.MemberID + ")" + "为管理员"
				admin = true
			}
			layer.alert(title, (index) => {
				SocketPro.Send("SetQAdmin", { Id: item.GroupID, Uid: item.MemberID, Admin: admin },
					function (msg) {
						layer.close(index);
						if (msg.ErrCode == 0) {
							self.Params.MemberList[item.MemberID].IsAdmin = item.IsAdmin == 1 ? 0 : 1
							self.Params = Object.assign({}, self.Params)
							console.log(msg);
						} else {
							layer.msg(msg.ErrMsg);
						}
					}
				);
			})
		},
		/**监听群介绍框*/
		valMatch(n: string) {
			// let max = 300;
			// if (this.groupIntroduce) {
			// 	let len = this.groupIntroduce.length;
			// 	let en: any = [],
			// 		zh: any = [];
			// 	n.replace(/[^\u4e00-\u9fa5]/gi, (val): any => {
			// 		en.push(val);
			// 	});
			// 	n.replace(/[\u4e00-\u9fa5]/gi, (val): any => {
			// 		zh.push(val);
			// 	});
			// 	if (en.length > 0 && zh.length > 0) {
			// 		len = max - Math.ceil(en.length / 3) - zh.length;
			// 	} else if (en.length > 0) {
			// 		len = this.len - Math.ceil(en.length / 3);
			// 	} else {
			// 		len = max - len;
			// 	}
			// 	return len;
			// }
		},
		MemberSort(groupMemberList: MemberList) {
			let self = this;
			let arr = [];
			for (let key in groupMemberList) {
				arr.push(groupMemberList[key]);
				if (Number(key) == self.Params.GroupOwnerID) {
					groupMemberList[key].IsAdmin = 2;
				}
			}
			if (arr.length > 1) {
				arr.sort(compare("IsAdmin"));
			}
			for (let i in arr) {
				self.Params.MemberList[arr[i].MemberID] = arr[i];
			}
			console.log(self.Params.MemberList);
			self.isAdmin = groupMemberList[self.Params.MyID].IsAdmin;
		},
		//**踢出群 */
		kick(item: MemberInfo) {
			let self = this;
			layer.alert(`您确定将${item.Nick}(${item.MemberID}从本群中删除吗`, {
				btn: ['确定', '取消'],
				yes(index) {
					SocketPro.Send("KickQ", { Qid: self.Params.ID, Uid: item.MemberID }, function (msg) {
						layer.close(index)
						if (msg.ErrCode == 0) {
							delete self.Params.MemberList[item.MemberID];
							self.Params = Object.assign({}, self.Params);
							System.Ipc.Send('index', JSON.stringify({ IpcCom: "KickqQ", Qid: self.Params.ID, Uid: item.MemberID }))
						} else {
							console.error(msg.ErrMsg);
						}
						layer.close(index);
					})
				}
			})
		},
		//**退出群 */
		quitGroup(e: any) {
			let self = this;
			let actionName = e.target.title;
			console.log(actionName);
			let title = actionName == "退出该群" ? "你确定退出该群吗? (退群通知仅群管理员可见)" : "你确定解散该群吗?";
			layer.alert(title, (index, layero) => {
				let ID = Number(self.Params.ID);
				if (actionName == "退出该群") {
					SocketPro.Send("ExitQ", { Id: ID }, function (msg) {
						layer.close(index);
						if (msg.ErrCode == 0) {
							System.Ipc.Send("index", JSON.stringify({ IpcCom: "DeleteGroup", groupId: self.Params.ID }));
							Me.Close();
						} else {
							layer.msg(msg.ErrMsg);
						}
					});
				} else if (actionName == "解散该群") {
					SocketPro.Send("DelQ", { Id: ID }, function (msg) {
						layer.close(index);
						if (msg.ErrCode == 0) {
							System.Ipc.Send("index", JSON.stringify({ IpcCom: "DeleteGroup", groupId: self.Params.ID }));
							Me.Close();
						} else {
							layer.msg(msg.ErrMsg);
						}
					});
				}
			});
		}
	},
	watch: {
		groupIntroduce(n, o) {
			let len = 300
			$("#result").html("还可以输入" + (len - n.length) + "字");
		}
	},
	mounted() {
		let self = this;
		if (!self.Params.MemberList || Object.keys(self.Params.MemberList).length == 0) {
			setTimeout(() => {
				System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetMemberList" }));
			}, 0);
		} else {
			self.MemberSort(self.Params.MemberList);
		}
		$("#result").html("还可以输入" + (300 - self.groupIntroduce.length) + "字");
	}
});
function compare(pro: string | number) {
	return function (obj1: any, obj2: any) {
		var val1 = obj1[pro];
		var val2 = obj2[pro];
		return val2 - val1;
	};
}
function insertAtCursor(jsDom: HTMLElement, html: string) {
	if (jsDom != document.activeElement) {
		// 如果dom没有获取到焦点，追加
		jsDom.innerHTML = jsDom.innerHTML + html;
		return;
	}
	var sel, range;
	if (window.getSelection) {
		// IE9 或 非IE浏览器
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = document.createElement("span");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(),
				node,
				lastNode;
			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}
}
