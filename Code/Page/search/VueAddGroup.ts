import Vue from "../../Plugs/Module/Vue/Vue";
import * as layer from "../../Plugs/Module/layer/layer";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as VueComponent from "../../Plugs/Module/VueComponent";
let WebSockets = new WebSocketPro();
VueComponent;
export default new Vue({
	el: "#addGroupApp",
	data: {
		/**需要添加的群的信息 */
		groupInfo: <GroupInfo>(Me.Param && JSON.parse(Me.Param)),
		/**加群步骤下一步 */
		addGroups: true,
		winActionName: "关闭"
	},
	methods: {
		nextStep() {
			let self = this;
			self.addGroups = false
			WebSockets.Send("JoinQ",{   Qid: self.groupInfo.ID, UidList: [] },
				function (msg) {
					if (msg.ErrCode == 0) {
						self.winActionName = "完成"
						System.Ipc.Send(JSON.stringify({ IpcCom: "CreateGroup", GroupID: self.groupInfo.ID }))
						console.log(msg)
					} else {
						layer.msg(msg.ErrMsg)
					}
				}
			)
		},
	},
});