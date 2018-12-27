import Vue from "../../Plugs/Module/Vue/Vue";
import * as layer from "../../Plugs/Module/layer/layer";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as VueComponent from "../../Plugs/Module/VueComponent";
import Ajaxs from '../../Plugs/Module/Ajaxs';
let WebSockets = new WebSocketPro();
VueComponent;
export var VueVerify = new Vue({
    el: "#friendVerification",
    data: {
        /**离线状态的家好友请求 */
        offlineRequest: {},
        /**好友分组 */
        friendGroup: <{ [key: string]: string }>{},
        /**好友 还是群 验证 */
        showSearchType: true,
        /**请求添加好友的信息*/
        requestFriend: <{ List: Array<UserInfoCommon>, MyID: number, Token: string, Action: boolean, VerifyType?: string }>(Me.Param && JSON.parse(Me.Param)),
        /**验证群的信息 */
        requestGroup: {},
        /**同意 */
        agree: false,
        /**同意的好友 */
        agreeFriend: <{ ID: number, index: number }>{}
    },
    methods: {
        move(event: any, index: number) {
            let tri: any = document.querySelector('.triangle');
            let target: any = event.target;
            tri.style.left = target.offsetLeft + (target.offsetWidth / 2) - tri.offsetWidth / 2 + 'px';
            index == 0 ? (this.showSearchType = true) : (this.showSearchType = false);
        },
        /**添加好友操作 */
        selectResponse(e: any, item: UserInfoCommon, index: number) {
            let self = this;
            let target = e.target.value
            if (target == "拒绝") {
                $(".verifyList .btn").eq(index).css("display", "none")
                $(".verifyList .actionResult").eq(index).html("已拒绝")
                WebSockets.Send("DenyFriend", { Id: item.ID })
            } else if (target == "同意") {
                self.agree = true
                self.agreeFriend = { ID: item.ID, index: index }
            }
        },
        /**忽略 */
        ignore(item: UserInfoCommon, index: number) {
            let self = this;
            $(".verifyList .btn").eq(index).css("display", "none")
            $(".verifyList .actionResult").eq(index).html("已忽略")
            Ajaxs({ Controller: "FriendAction/setAddFriendStat" }, { T: self.requestFriend.Token, FriendID: self.requestFriend.MyID }, {
                OkFun(response) {

                }, ErrFun(response) {
                    if (response.ErrMsg) {
                        layer.alert(response.ErrMsg)
                    } else {
                        layer.alert("服务器内部错误")
                    }
                }, NetWorkErr() {
                    layer.alert("网络连接失败")
                }
            })
        },
        /**确定添加 */
        confirm() {
            let self = this
            let remark = $("#remark").val().trim();
            let friendGroup = $("#friendGroup").val().trim();
            WebSockets.Send("AgreeFriend", { Id: self.agreeFriend.ID, GId: Number(friendGroup), Remark: remark }, (msg) => {
                if (msg.ErrCode == 0) {
                    self.agree = false
                    $(".verifyList .btn").eq(self.agreeFriend.index).css("display", "none")
                    $(".verifyList .actionResult").eq(self.agreeFriend.index).html("已同意")
                    System.Ipc.Send("index", JSON.stringify({ IpcCom: "AddFriend", Id: self.agreeFriend.ID, GId: friendGroup, Remark: remark }))
                } else {
                    layer.alert(msg.ErrMsg)
                }
            })
        },
        addFriendGroup() {
            let self = this;
            console.log(self.requestFriend)
            layer.prompt({
                title: '添加好友分组',
                value: "未命名",
                formType: 0,
            }, function (val, index, el) {
                Ajaxs({ Controller: "FriendAction/addFriendGroup" }, { T: self.requestFriend.Token, Name: val }, {
                    OkFun(response) {
                        layer.close(index);
                        self.friendGroup[response.ID] = response.Name
                        self.friendGroup = Object.assign({}, self.friendGroup)
                        layer.msg("添加成功");
                        let ChangeFriengGroup: any = response;
                        ChangeFriengGroup.IpcCom = "ChangeFriengGroup"
                        System.Ipc.Send("index", JSON.stringify(ChangeFriengGroup));
                    }, ErrFun(response) {
                        layer.close(index);
                        if (response.ErrMsg) {
                            layer.alert(response.ErrMsg)
                        } else {
                            layer.alert("服务器内部错误")
                        }
                    }, NetWorkErr() {
                        layer.close(index);
                        layer.alert("网络连接失败")
                    }
                })
            });
        }
    },
    mounted() {
        let self = this;
        let tri: any = document.querySelector('.triangle');
        setTimeout(() => {
            System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetFriendGroup" }))
        }, 1000)
        if (this.requestFriend.Action) {
            $(".btn").css("display", "none")
            $(".actionResult").html("已拒绝你的请求")
        }
        if (self.requestFriend.VerifyType) {
            self.showSearchType = false;
            tri.style.left = 186 + 'px';
        } else {
            self.showSearchType = true;
            tri.style.left = 58 + 'px';
        }

    }
})