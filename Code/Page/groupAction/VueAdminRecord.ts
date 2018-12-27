import Vue from "../../Plugs/Module/Vue/Vue";
import { globalAppInfo } from "../../Plugs/WinBase/global";
// import * as layer from "../../Plugs/Module/layer/layer";
globalAppInfo;
export default new Vue({
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
})