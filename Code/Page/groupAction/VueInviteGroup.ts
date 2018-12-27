import Vue from "../../Plugs/Module/Vue/Vue";
import * as layer from "../../Plugs/Module/layer/layer";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as VueComponent from "../../Plugs/Module/VueComponent";
let WebSockets = new WebSocketPro();
VueComponent;
export default new Vue({
	el: "#inviteGroup",
	data: {
		groupInfo: <number & { contactGroup: FriendGroup; ShareGroup: string }>(
			(Me.Param && JSON.parse(Me.Param))
		),
		/**邀请列表 */
		shareLi: <{ [key: string]: FriendInfo }>{},
		/**搜索好友的显示 */
		searchLi: <{ [key: string]: FriendInfo }>{},
		/**是否显示搜索列表 */
		showFriendClass: false,
		/**监听搜索变化 */
		showP: false,
		/**填写信息或邀请成员 */
		showMember: true,
		/**搜索 */
		searchVal: "",
		//**分享群的ID */
		shareGroupId: 0,
		//**该群成员 */
		groupMember: [],
		friendInfo: 1
	},
	methods: {
		angle(index: number) {
			$(".shareItem").removeClass("active");
			$(".shareItem").eq(index).addClass("active");
			let contactItem: any = document.querySelectorAll(".sub-contacts")[index];
			let contactAngle: any = document.querySelectorAll(".contactAngle")[index];
			if (contactItem.style.display == "none") {
				contactItem.style.display = "block";
				contactAngle.style.transform = "rotate(90deg)";
			} else {
				contactItem.style.display = "none";
				contactAngle.style.transform = "rotate(0deg)";
			}
		},
		/**分享列表 */
		moveLi(index: number, friend: FriendInfo) {
			let self = this;
			if (!self.shareLi[friend.ID] && Object.keys(self.shareLi).length < 9) {
				self.shareLi[friend.ID] = friend;
			}
			self.shareLi = Object.assign({}, self.shareLi);
		},
		/**去掉某个分享内容 */
		deleteLi(item: FriendInfo) {
			delete this.shareLi[item.ID];
			this.shareLi = Object.assign({}, this.shareLi);
		},
		action() {
			let groupName = $(".groupName")
				.val()
				.trim();
			if (!groupName) {
				layer.msg("群名称不能为空");
			} else {
				this.showMember = !this.showMember;
			}
		},
		confirm() {
			let self = this;
			let groupName = $(".groupName").val().trim();
			let groupNotice = $(".groupNotice").val().trim();
			let addVerify = $(".addVerify input:checked").val();
			if (!groupName) {
				layer.msg("群名称不能为空");
			} else {
				let IdList: Array<number> = [];
				for (let i in self.shareLi) {
					IdList.push(self.shareLi[i].ID);
				}
				WebSockets.Send(
					"CreateQ", { Name: groupName, Notice: groupNotice, IdList: IdList, Config: { AllowSay: true, Verify: parseInt(addVerify) } },
					function (msg) {
						if (msg.ErrCode == 0) {
							Me.Close(true)
							System.Ipc.Send(JSON.stringify({ IpcCom: "CreateGroup", GroupID: msg.Id }));
						} else {
							console.error(msg.ErrMsg);
						}
					}
				);
			}
		},
		join() {
			let self = this;
			if (Object.keys(self.shareLi).length > 0) {
				let freindIdArr = <Array<number>>[];
				for (let i in self.shareLi) {
					freindIdArr.push(self.shareLi[i].ID);
				}
				console.log(self.shareLi)
				WebSockets.Send("JoinQ", { Qid: self.shareGroupId, UidList: freindIdArr },
					function (msg) {
						if (msg.ErrCode == 0) {
							let inviteList = <MemberList>{};
							for (let key in self.shareLi) {
								inviteList[parseInt(key)] = {
									GroupID: self.shareGroupId,
									MemberID: parseInt(key),
									Nick: self.shareLi[key].Nick,
									IsAdmin: 0,
									VisitingCard: '',
								};
							}
							console.log(inviteList)
							Me.Close(true)
							System.Ipc.Send(JSON.stringify({ IpcCom: 'InviteList', data: inviteList, groupId: self.shareGroupId }))
							Me.Close()
						} else {
							console.error(msg.ErrMsg);
						}
					}
				);
			} else {
				layer.msg("请选择需要邀请的好友");
			}
		}
	},
	watch: {
		searchVal(n) {
			let self = this;
			let val = n.trim();
			if (val) {
				self.searchLi = {};
				self.showFriendClass = true;
				for (let i in self.groupInfo.contactGroup) {
					for (let j in self.groupInfo.contactGroup[i].List) {
						let list = self.groupInfo.contactGroup[i].List[j];
						if (
							list.ID.toString().indexOf(val) > -1 ||
							list.Remark.indexOf(val) > -1 ||
							list.Nick.indexOf(val) > -1
						) {
							self.searchLi[list.ID] = list;
						}
					}
				}
				self.searchLi = Object.assign({}, self.searchLi);
			} else {
				self.showFriendClass = false;
			}
		}
	},
	mounted() {
		let self = this;
		if (typeof self.groupInfo != "object") {
			System.Ipc.Send(
				"index",
				JSON.stringify({ IpcCom: "FriendList", Qid: self.groupInfo })
			);
		}
	}
});
