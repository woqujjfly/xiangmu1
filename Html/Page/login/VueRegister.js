define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent", "../../Plugs/Module/Ajaxs"], function (require, exports, Vue_1, layer, VueComponent, Ajaxs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#registerApp",
        data: {
            telephone: '',
            Vcode: '',
            clause: false,
            timer: 0
        },
        methods: {
            register() {
                let self = this;
                let Phone = parseInt(self.telephone);
                let Nick = $("#username").val().trim();
                let Pass = $("#password").val().trim();
                let confirmPass = $("#againPass").val().trim();
                let VCode = parseInt(self.Vcode);
                let check = self.isValid(Phone);
                if (Nick.length < 2) {
                    layer.alert("用户名不能小于3位");
                }
                else if (!Pass || Pass.length < 3) {
                    layer.alert("密码为空或小于3位");
                }
                else if (confirmPass != Pass) {
                    layer.alert("两次输入密码不一致");
                }
                else if (!check) {
                    layer.alert("请输入正确的手机号码");
                }
                else if (!VCode) {
                    layer.alert("请输入验证码");
                }
                else if (!self.clause) {
                    layer.alert("请同意接受条款");
                }
                else {
                    Ajaxs_1.default({ Controller: "LoginAction/Reg" }, { Phone: Phone, Pass: Pass, Nick: Nick, VCode: VCode }, {
                        OkFun(response) {
                            localStorage.removeItem("countDown");
                            clearInterval(self.timer);
                            $("#getVcode").html("获取验证码").css("pointerEvents", "auto");
                            layer.alert("注册成功, 您的账号为" + response.Id);
                            $("#password").val('');
                            $("#againPass").val('');
                            self.telephone = '';
                            self.Vcode = '';
                        }, ErrFun(response) {
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
                }
            },
            isValid(num) {
                let regPhone = /1[34578]\d{9}/g;
                return regPhone.test(num);
            },
            getCode() {
                let self = this;
                var check = self.isValid(self.telephone);
                if (!check) {
                    layer.msg("请输入正确的手机号码");
                }
                else {
                    Ajaxs_1.default({ Controller: "LoginAction/GetVCode" }, { Phone: parseInt(self.telephone) }, {
                        OkFun(response) {
                            layer.msg("验证码已发送到您的手机,请注意查收");
                            let s = 60;
                            self.timeOut(s);
                        }, ErrFun(response) {
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
                }
            },
            timeOut(s) {
                let self = this;
                self.timer = setInterval(() => {
                    s--;
                    localStorage.setItem("countDown", s);
                    s < 10 ? "0" + s : s;
                    if (s == "00") {
                        $("#getVcode").html("获取验证码").css("pointerEvents", "auto");
                        localStorage.removeItem("countDown");
                        clearInterval(self.timer);
                    }
                    else {
                        localStorage.getItem("countDown");
                        $("#getVcode").html(s + "s").css("pointerEvents", "none");
                    }
                }, 1000);
            }
        },
        mounted() {
            let countDown = localStorage.getItem("countDown");
            if (countDown) {
                this.timeOut(countDown);
            }
        }
    });
});
