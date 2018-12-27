import Vue from "../../Plugs/Module/Vue/Vue";
import * as layer from "../../Plugs/Module/layer/layer";
import * as VueComponent from "../../Plugs/Module/VueComponent";
import Ajaxs from '../../Plugs/Module/Ajaxs';
VueComponent;
// import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
// let WebSockets = new WebSocketPro();
export default new Vue({
	el: "#searchApp",
	data: {
		/**用户信息 */
		userData: Me.Param && JSON.parse(Me.Param),
		/**找人找群切换 */
		showSearchType: true,
		/**搜索人的信息 */
		searchPerson: <Array<UserInfoCommon>>{},
		/**搜索群的信息 */
		searchGroup: <Array<GroupInfo>>{},
		/**没有搜索到人时的提示 */
		personTitle: false,
		/**没有搜索到群时的提示 */
		groupTitle: false,
	},
	methods: {
		//**搜索人和群 */
		search() {
			let self = this;
			let input = $("#input")
				.val()
				.trim();
			if (!input) {
				if (self.showSearchType) {
					self.searchPerson = <Array<UserInfoCommon>>{};
					self.personTitle = false;
				} else {
					self.searchGroup = <Array<GroupInfo>>{};
					self.groupTitle = false;
				}
				return;
			}
			if (input == self.userData.userData) {
				layer.msg("请不要搜索自己");
				return;
			} else {
				let searchUrl;
				if (self.showSearchType) {
					searchUrl = "FriendAction/searchFriend";
					self.searchPerson = <Array<UserInfoCommon>>{};
				} else {
					searchUrl = "GroupAction/searchGroup";
					self.searchGroup = <Array<GroupInfo>>{};
				}
				Ajaxs({ Controller: <any>searchUrl }, { T: self.userData.Sign, Search: input }, {
					OkFun(response) {
						for (let i in response.List) {
							if (self.showSearchType) {
								if (response.List[i].ID != self.userData.userData) {
									self.searchPerson[response.List[i].ID] = response.List[i];
								}
							} else {
								self.searchGroup[response.List[i].ID] = response.List[i];
							}
						}
						self.searchPerson = Object.assign({}, self.searchPerson);
						self.searchGroup = Object.assign({}, self.searchGroup);

					}, ErrFun(response) {
						self.showSearchType ? (self.personTitle = true) : (self.groupTitle = true);
					}, NetWorkErr() {
						layer.alert("网络连接失败")
					}
				})
			}
		},
		//**找人 找群切换 */
		selectType(event: any, index: number) {
			let tri: any = document.getElementsByClassName("triangle")[0];
			let target = event.target;
			tri.style.left =
				target.offsetLeft + target.offsetWidth / 2 - tri.offsetWidth / 2 + "px";
			index == 0 ? (this.showSearchType = true) : (this.showSearchType = false);
		},
		//**添加好友 */
		addFriend(e: any, ID: any) {
			let self = this;
			let target = e.target.innerText;
			let total: any = {};
			let title: string = "";
			console.log(ID);
			if (target == "+好友") {
				if (Object.keys(self.userData.contactList).indexOf(ID) != -1) {
					layer.msg("该用户已经是您的好友");
				} else {
					total = this.searchPerson[ID];
					total.MyID = this.userData.userData.ID;
					title = this.userData.userData.Nick + "-添加好友";
				}
			} else if (target == "+加群") {
				if (Object.keys(self.userData.groups).indexOf(ID) != -1) {
					layer.msg("您已经加入该群");
				} else {
					total = this.searchGroup[ID];
					total.MyID = this.userData.ID;
					title = "添加群";
				}
			}
			if (Object.keys(total).length != 0) {
				System.Open({
					Name: total.ID + "addFriend",
					Text: title,
					Url: target == "+加群" ? "Page/search/addGroup.html" : "Page/search/addFriend.html",
					Size: { Width: 450, Height: 360 },
					Delay: true,
					Param: JSON.stringify(total)
				});
			}
		},
		//**查看个人资料 */
		openPersonalData(item: any) {
			let self = this;

			if (
				Object.keys(self.userData.contactList).indexOf(item.ID.toString()) !=
				-1
			) {
				item.Remark = self.userData.contactList[item.ID].Remark
				item.FriendGroupID = self.userData.contactList[item.ID].FriendGroupID;
				item.groups = self.userData.friendGroup;
				item.UserId = self.userData.userData;
			}
			let title = item.Nick + "的资料";
			System.Open({
				Name: "openPersonalFile",
				Text: title,
				Url: "Page/userAction/openPersonalFile.html",
				Size: { Width: 720, Height: 520 },
				Delay: true,
				Param: JSON.stringify(item)
			});
		}
	},
});
