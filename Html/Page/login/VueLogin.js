define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/WinBase/global", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/Ajaxs", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, global_1, WebSocketPro_1, Ajaxs_1, layer, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    VueComponent;
    var OnlineTypeEnum;
    (function (OnlineTypeEnum) {
        OnlineTypeEnum[OnlineTypeEnum["\u5728\u7EBF"] = 0] = "\u5728\u7EBF";
        OnlineTypeEnum[OnlineTypeEnum["\u9690\u8EAB"] = 1] = "\u9690\u8EAB";
    })(OnlineTypeEnum || (OnlineTypeEnum = {}));
    exports.default = new Vue_1.default({
        el: '#loginApp',
        data: {
            userinfo: {
                ID: localStorage.getItem("ID"),
                Pass: localStorage.getItem("Pass"),
            },
            remPass: localStorage.getItem("Pass") ? true : false,
            autoLogin: localStorage.getItem("autoLogin") ? true : false,
            OnlineType: OnlineTypeEnum,
            showStatusList: false,
            onlineType: 0
        },
        methods: {
            socket() {
                let self = this;
                if (System.FindProc(global_1.globalAppInfo.AppName + " - " + self.userinfo.ID)) {
                    layer.alert("你已在橙聊登陆了" + self.userinfo.ID + ", 不能重复登录");
                }
                else {
                    if (!self.userinfo.ID || !self.userinfo.Pass) {
                        layer.alert("账号或密码为空");
                    }
                    else if (self.userinfo.Pass.length < 5) {
                        layer.alert("密码长度不能小于5");
                    }
                    else {
                        layer.msg('正在登陆请稍等...', { icon: 16, shade: 0.3, time: 0, shadeClose: false });
                        if (SocketPro.State == WebSocketPro_1.WsState.Open) {
                            self.startLogin();
                        }
                        else {
                            SocketPro.Open();
                        }
                        SocketPro.Closed = () => {
                            setTimeout(() => {
                                SocketPro.Open();
                            }, 1000);
                            SocketPro.Closed = () => {
                                layer.msg('连接服务器失败, 请稍后重试', { icon: 2, shade: 0.3, time: 0, btn: ["确定"], yes(index) { layer.close(index); } });
                                SocketPro.Closed = null;
                            };
                        };
                        SocketPro.Opend = () => {
                            self.startLogin();
                            SocketPro.Opend = null;
                            SocketPro.Closed = null;
                        };
                    }
                }
            },
            showPass(e) {
                $("#password").attr("type", "text");
            },
            hidePass() {
                $("#password").attr("type", "password");
            },
            register() {
                System.Open({
                    Name: "register",
                    Text: global_1.globalAppInfo.AppName,
                    Url: "Page/login/register.html",
                    Size: { Width: 430, Height: 380 },
                    Delay: true
                });
            },
            startLogin() {
                let self = this;
                Ajaxs_1.default({ Controller: "LoginAction" }, { ID: self.userinfo.ID, Pass: self.userinfo.Pass, DeviceType: 1 }, {
                    OkFun(response) {
                        if (self.remPass) {
                            localStorage.setItem("ID", self.userinfo.ID);
                            localStorage.setItem("Pass", self.userinfo.Pass);
                        }
                        else {
                            localStorage.removeItem("ID");
                            localStorage.removeItem("Pass");
                        }
                        if (self.autoLogin) {
                            localStorage.setItem("autoLogin", '1');
                        }
                        else {
                            localStorage.removeItem("autoLogin");
                        }
                        SocketPro.Send("Login", { Token: response.Token, OnlineType: Number(self.onlineType) }, function (msg) {
                            layer.closeAll();
                            if (msg.ErrCode == 0) {
                                let res = response;
                                res['onlineType'] = self.onlineType;
                                var topmost = localStorage.getItem('topMost') ? false : true;
                                System.Open({
                                    Name: "index",
                                    Text: global_1.globalAppInfo.AppName + " - " + response.ID,
                                    Url: "Page/index/index.html",
                                    Size: { Width: 280, Height: 750 },
                                    MinSize: { Width: 280, Height: 750 },
                                    MaxSize: { Width: 600, Height: window.screen.height },
                                    Resize: true,
                                    Delay: true,
                                    Param: JSON.stringify(res),
                                    Location: { X: screen.availWidth - 400, Y: ((screen.availHeight - 750) / 2) },
                                    ShowInTaskbar: false,
                                    TopMost: topmost
                                });
                                Me.Close(true);
                            }
                            else {
                                layer.alert(msg.ErrMsg);
                            }
                        });
                    }, ErrFun(response) {
                        self.userinfo.Pass = '';
                        if (response.ErrMsg) {
                            layer.alert(response.ErrMsg);
                        }
                        else {
                            layer.alert("服务器内部错误");
                        }
                    }, NetWorkErr() {
                        layer.alert("网络连接失败");
                    }
                });
            },
            selectStatus(index) {
                this.showStatusList = false;
                this.onlineType = index;
            }
        },
        watch: {
            autoLogin(n) {
                n && (this.remPass = true);
            },
            remPass(n) {
                !n && (this.autoLogin = false);
            }
        }
    });
});
