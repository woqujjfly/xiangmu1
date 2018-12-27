define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/Ajaxs", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, Ajaxs_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#modifyPassApp",
        data: {
            userdata: (Me.Param && JSON.parse(Me.Param))
        },
        methods: {
            oldCheck() {
                let oldPsd = $('#originalPsd').val().trim();
                if (!oldPsd) {
                    $("#tip1").html("<font color='red' size='2'>请输入原密码</font>");
                }
            },
            verificationNew() {
                let num = $("#password1").val().trim();
                if (num) {
                    if (num.length < 3) {
                        $("#tip2").html("<font color='red' size='2'>  密码不能小于3位</font>");
                    }
                    else {
                        $("#tip2").html("<font color='green' size='2'> OK</font>");
                    }
                }
                else {
                    $("#tip2").html('');
                }
            },
            confirm() {
                let newPsd = $("#password1").val().trim();
                let confirmPsd = $("#password2").val().trim();
                if (confirmPsd) {
                    if (newPsd != confirmPsd) {
                        $("#tip3").html("<font color='red' size=''2>  两次输入的密码不一致</font>");
                    }
                    else {
                        $("#tip3").html("<font color='green' size='2'> OK</font>");
                    }
                }
                else {
                    $("#tip3").html('');
                }
            },
            submit() {
                let originalPsd = $("#originalPsd").val().trim();
                let newPsd = $("#password1").val().trim();
                let confirmPsd = $("#password2").val().trim();
                if (originalPsd && newPsd == confirmPsd) {
                    Ajaxs_1.default({ Controller: "UserAction/modifyPass" }, {
                        T: this.userdata.Token, ID: this.userdata.ID,
                        OldPass: originalPsd,
                        NewPass: newPsd
                    }, {
                        OkFun(response) {
                            localStorage.removeItem("Pass");
                        }, ErrFun(response) {
                            if (response.ErrMsg) {
                                alert(response.ErrMsg);
                            }
                            else {
                                alert('服务器错误');
                            }
                        }, NetWorkErr() {
                            alert("网络连接失败");
                        }
                    });
                }
            }
        }
    });
});
