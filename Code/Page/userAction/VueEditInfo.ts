import Vue from '../../Plugs/Module/Vue/Vue';
import * as layer from "../../Plugs/Module/layer/layer";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as VueComponent from "../../Plugs/Module/VueComponent";
VueComponent;
let SocketPro = new WebSocketPro();
export default new Vue({
	el: '#editInfo',
	data: {
		Info: (Me.Param && JSON.parse(Me.Param)),
	},
	methods: {
		/**修改个人资料 */
		submit() {
			let self = this;
			let Nick = self.Info.Nick;
			let Vsign = self.Info.Vsign;
			console.log(self.Info);
			let EditInfo: Dict<any> = self.Info;
			EditInfo.IpcCom = "EditInfo";
			System.Ipc.Send(JSON.stringify(self.Info));
			SocketPro.Send('EditInfo', { Nick: Nick, Vsign: Vsign }, (msg: ISocket.Response.EditInfo) => {
				if (msg.ErrCode == 0) {
					layer.alert('修改成功!');
				} else {
					console.error(msg.ErrMsg)
				}
			})
		}
	}
});

