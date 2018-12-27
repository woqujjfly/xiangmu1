define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, layer, WebSocketPro_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    exports.default = new Vue_1.default({
        el: '#editInfo',
        data: {
            Info: (Me.Param && JSON.parse(Me.Param)),
        },
        methods: {
            submit() {
                let self = this;
                let Nick = self.Info.Nick;
                let Vsign = self.Info.Vsign;
                console.log(self.Info);
                let EditInfo = self.Info;
                EditInfo.IpcCom = "EditInfo";
                System.Ipc.Send(JSON.stringify(self.Info));
                SocketPro.Send('EditInfo', { Nick: Nick, Vsign: Vsign }, (msg) => {
                    if (msg.ErrCode == 0) {
                        layer.alert('修改成功!');
                    }
                    else {
                        console.error(msg.ErrMsg);
                    }
                });
            }
        }
    });
});
