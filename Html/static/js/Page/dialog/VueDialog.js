define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/layer/layer"], function (require, exports, Vue_1, WebSocketPro_1, layer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    exports.default = new Vue_1.default({
        el: '#dialogApp',
        data: {
            userinfo: Me.Param && JSON.parse(Me.Param)
        },
        methods: {
            Open() {
                layer.msg('正在重新登录请稍等...', { icon: 16, shade: 0.3, time: 0, shadeClose: true });
                SocketPro.Send("Login", { Token: this.userinfo.Token, OnlineType: this.userinfo.OnlineType }, function (msg) {
                    if (msg.ErrCode == 0) {
                        Me.Close(true);
                    }
                    else {
                        layer.alert(msg.ErrMsg);
                    }
                });
            }
        }
    });
});
