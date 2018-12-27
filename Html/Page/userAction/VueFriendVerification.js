define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/VueComponent", "../../Plugs/Module/Ajaxs"], function (require, exports, Vue_1, layer, WebSocketPro_1, VueComponent, Ajaxs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let WebSockets = new WebSocketPro_1.WebSocketPro();
    VueComponent;
    exports.VueVerify = new Vue_1.default({
        el: "#friendVerification",
        data: {
            offlineRequest: {},
            friendGroup: {},
            showSearchType: true,
            requestFriend: (Me.Param && JSON.parse(Me.Param)),
            requestGroup: {},
            agree: false,
            agreeFriend: {}
        },
        methods: {
            move(event, index) {
                let tri = document.querySelector('.triangle');
                let target = event.target;
                tri.style.left = target.offsetLeft + (target.offsetWidth / 2) - tri.offsetWidth / 2 + 'px';
                index == 0 ? (this.showSearchType = true) : (this.showSearchType = false);
            },
            selectResponse(e, item, index) {
                let self = this;
                let target = e.target.value;
                if (target == "拒绝") {
                    $(".verifyList .btn").eq(index).css("display", "none");
                    $(".verifyList .actionResult").eq(index).html("已拒绝");
                    WebSockets.Send("DenyFriend", { Id: item.ID });
                }
                else if (target == "同意") {
                    self.agree = true;
                    self.agreeFriend = { ID: item.ID, index: index };
                }
            },
            ignore(item, index) {
                let self = this;
                $(".verifyList .btn").eq(index).css("display", "none");
                $(".verifyList .actionResult").eq(index).html("已忽略");
                Ajaxs_1.default({ Controller: "FriendAction/setAddFriendStat" }, { T: self.requestFriend.Token, FriendID: self.requestFriend.MyID }, {
                    OkFun(response) {
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
            },
            confirm() {
                let self = this;
                let remark = $("#remark").val().trim();
                let friendGroup = $("#friendGroup").val().trim();
                WebSockets.Send("AgreeFriend", { Id: self.agreeFriend.ID, GId: Number(friendGroup), Remark: remark }, (msg) => {
                    if (msg.ErrCode == 0) {
                        self.agree = false;
                        $(".verifyList .btn").eq(self.agreeFriend.index).css("display", "none");
                        $(".verifyList .actionResult").eq(self.agreeFriend.index).html("已同意");
                        System.Ipc.Send("index", JSON.stringify({ IpcCom: "AddFriend", Id: self.agreeFriend.ID, GId: friendGroup, Remark: remark }));
                    }
                    else {
                        layer.alert(msg.ErrMsg);
                    }
                });
            },
            addFriendGroup() {
                let self = this;
                console.log(self.requestFriend);
                layer.prompt({
                    title: '添加好友分组',
                    value: "未命名",
                    formType: 0,
                }, function (val, index, el) {
                    Ajaxs_1.default({ Controller: "FriendAction/addFriendGroup" }, { T: self.requestFriend.Token, Name: val }, {
                        OkFun(response) {
                            layer.close(index);
                            self.friendGroup[response.ID] = response.Name;
                            self.friendGroup = Object.assign({}, self.friendGroup);
                            layer.msg("添加成功");
                            let ChangeFriengGroup = response;
                            ChangeFriengGroup.IpcCom = "ChangeFriengGroup";
                            System.Ipc.Send("index", JSON.stringify(ChangeFriengGroup));
                        }, ErrFun(response) {
                            layer.close(index);
                            if (response.ErrMsg) {
                                layer.alert(response.ErrMsg);
                            }
                            else {
                                layer.alert("服务器内部错误");
                            }
                        }, NetWorkErr() {
                            layer.close(index);
                            layer.alert("网络连接失败");
                        }
                    });
                });
            }
        },
        mounted() {
            let self = this;
            let tri = document.querySelector('.triangle');
            setTimeout(() => {
                System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetFriendGroup" }));
            }, 1000);
            if (this.requestFriend.Action) {
                $(".btn").css("display", "none");
                $(".actionResult").html("已拒绝你的请求");
            }
            if (self.requestFriend.VerifyType) {
                self.showSearchType = false;
                tri.style.left = 186 + 'px';
            }
            else {
                self.showSearchType = true;
                tri.style.left = 58 + 'px';
            }
        }
    });
});
