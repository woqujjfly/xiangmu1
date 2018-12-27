define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, layer, WebSocketPro_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let WebSockets = new WebSocketPro_1.WebSocketPro();
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#addGroupApp",
        data: {
            groupInfo: (Me.Param && JSON.parse(Me.Param)),
            addGroups: true,
            winActionName: "关闭"
        },
        methods: {
            nextStep() {
                let self = this;
                self.addGroups = false;
                WebSockets.Send("JoinQ", { Qid: self.groupInfo.ID, UidList: [] }, function (msg) {
                    if (msg.ErrCode == 0) {
                        self.winActionName = "完成";
                        System.Ipc.Send(JSON.stringify({ IpcCom: "CreateGroup", GroupID: self.groupInfo.ID }));
                        console.log(msg);
                    }
                    else {
                        layer.msg(msg.ErrMsg);
                    }
                });
            },
        },
    });
});
