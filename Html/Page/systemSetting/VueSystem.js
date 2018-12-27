define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#settingApp",
        data: {
            MyID: Me.Param,
            itemList: ["登录", "主面板", "信息提示", "会话窗口", "文件管理"],
            authority_settingList: ["个人资料", "防骚扰", "临时会话", "个人状态", "远程桌面"],
            activeClass: 0,
            activeC: 0,
            autoLogin: localStorage.getItem(Me.Param + "autoLogin") ? true : false,
            showBasicSetting: true,
            showQuestion: false,
            topmost: localStorage.getItem(Me.Param + 'topmost') ? false : true,
            Close: !localStorage.getItem(Me.Param + "setMinsizeOrClose") || localStorage.getItem(Me.Param + "setMinsizeOrClose") == 'close' ? true : false,
            isShake: localStorage.getItem(Me.Param + 'isShake') ? true : false
        },
        methods: {
            change(index, event) {
                let tar = event.target;
                let height = $(tar).height();
                $(tar).siblings('.slid').animate({ top: index * height }, 200);
            },
            locationLogin() {
                if (this.autoLogin) {
                    localStorage.setItem(this.MyID + "autoLogin", '1');
                }
                else {
                    localStorage.removeItem(this.MyID + "autoLogin");
                }
            },
            setTopmost() {
                console.log(this.MyID);
                if (this.topmost) {
                    localStorage.removeItem(this.MyID + "topmost");
                }
                else {
                    localStorage.setItem(this.MyID + "topmost", '1');
                }
                System.Ipc.Send(JSON.stringify({ IpcCom: "topMost", topmost: this.topmost }));
            },
            setMinsizeOrClose(index, event) {
                event.stopPropagation();
                let self = this;
                index == 1 ? self.Close = true : self.Close = false;
                if (index == 1) {
                    localStorage.setItem(this.MyID + 'setMinsizeOrClose', 'close');
                }
                else {
                    localStorage.setItem(this.MyID + 'setMinsizeOrClose', 'min');
                }
                System.Ipc.Send(JSON.stringify({ IpcCom: "setMinsizeOrClose", Close: self.Close }));
            }
        },
        watch: {
            isShake(n) {
                if (n) {
                    localStorage.setItem(this.MyID + 'isShake', '1');
                }
                else {
                    localStorage.removeItem(this.MyID + 'isShake');
                }
            }
        }
    });
});
