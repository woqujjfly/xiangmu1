define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/Ajaxs"], function (require, exports, Vue_1, layer, VueComponent, WebSocketPro_1, Ajaxs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let WebSockets = new WebSocketPro_1.WebSocketPro();
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#addFriendApp",
        data: {
            friendInfo: (Me.Param && JSON.parse(Me.Param)),
            friendGroup: {},
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            winActionName: "关闭"
        },
        methods: {
            nextStep() {
                let self = this;
                let remark = $("#remark").val().trim();
                let friendGroup = $("#friendGroup").val().trim();
                let ValidationMsg = $("#ValidationMsg").val().trim();
                if (self.stepOne) {
                    self.stepOne = false;
                    self.stepTwo = true;
                }
                else if (self.stepTwo) {
                    WebSockets.Send("AddFriend", { Id: self.friendInfo.ID, GId: parseInt(friendGroup), Remark: remark, MyVerify: ValidationMsg }, function (msg) {
                        if (msg.ErrCode == 0) {
                            self.stepTwo = false;
                            self.stepThree = true;
                            self.winActionName = "完成";
                            console.log(msg);
                        }
                        else {
                            layer.msg(msg.ErrMsg);
                        }
                    });
                }
            },
            addFriendGroup() {
                let self = this;
                layer.prompt({
                    title: "添加好友分组",
                    value: "未命名",
                    formType: 0
                }, function (val, index, el) {
                    Ajaxs_1.default({ Controller: "FriendAction/addFriendGroup" }, { T: self.friendInfo.Token, Name: val }, {
                        OkFun(response) {
                            layer.close(index);
                            self.friendGroup[response.ID] = response.Name;
                            self.friendGroup = Object.assign({}, self.friendGroup);
                            layer.msg("添加成功");
                            let newFriendGroups = {};
                            newFriendGroups.IpcCom = "FiendGroup";
                            newFriendGroups[response.ID] = {
                                ID: response.ID,
                                Name: response.Name,
                                List: {}
                            };
                            System.Ipc.Send("index", JSON.stringify(newFriendGroups));
                            delete self.friendGroup.IpcCom;
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
            },
        },
        mounted() {
            setTimeout(() => {
                System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetFriendGroup" }));
            }, 0);
        }
    });
});
