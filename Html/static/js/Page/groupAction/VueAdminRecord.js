define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/WinBase/global"], function (require, exports, Vue_1, global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    global_1.globalAppInfo;
    exports.default = new Vue_1.default({
        el: '#adminRecord',
        data: {
            operaInfo: [{
                    operator: "Lily",
                    operaTime: "2018/10/19",
                    operaItem: "设置 芳华 为管理员"
                }, {
                    operator: "Mike",
                    operaTime: "2018/10/22",
                    operaItem: "设置 LIly 为管理员"
                }]
        },
        methods: {
            closeCurrent() {
                Me.Close();
            }
        }
    });
});
