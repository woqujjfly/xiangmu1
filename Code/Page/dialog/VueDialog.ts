import Vue from '../../Plugs/Module/Vue/Vue';
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as layer from "../../Plugs/Module/layer/layer";
let SocketPro: WebSocketPro = new WebSocketPro()
export default new Vue({
	el: '#dialogApp',
	data: {
		userinfo: Me.Param && JSON.parse(Me.Param)
	},
	methods: {
		/**重新登录 */
		Open() {
			layer.msg('正在重新登录请稍等...', { icon: 16, shade: 0.3, time: 0, shadeClose: true });
			SocketPro.Send("Login", { Token: this.userinfo.Token, OnlineType: this.userinfo.OnlineType }, function (msg) {
				if (msg.ErrCode == 0) {
					Me.Close(true)
				} else {
					layer.alert(msg.ErrMsg)
				}
			})
		}
	}
});