import Vue from '../../Plugs/Module/Vue/Vue';
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import { globalAppInfo } from '../../Plugs/WinBase/global';
import { layer } from '../../Plugs/Module/layer/layer';
import Ajaxs from '../../Plugs/Module/Ajaxs';
import * as VueComponent from "../../Plugs/Module/VueComponent";
let SocketPro = new WebSocketPro();
VueComponent;
export default new Vue({
    el: '#personalBackground',
    data: {
        /**好友信息 */
        friendInfo: (Me.Param && JSON.parse(Me.Param)),
        //**好友分组 */
        friendGroups: <{ [ID: string]: string }>{},
        //**好友列表 */
        friendList: <{ [ID: number]: string }>{},
        /**当前用户信息 */
        userData: <{ [ID: string]: string }>{},
        inputClass: false
    },
    methods: {
        editInfo() {
            console.log(this.friendInfo)
            System.Open({
                Name: "editInfo",
                Text: globalAppInfo.AppName,
                Url: "Page/userAction/editInfo.html",
                Size: { Width: 380, Height: 500 },
                Delay: true,
                Param: JSON.stringify(this.friendInfo)
            });
        },
        changeSign() {
            let Sign = $("#personalSign").val();
            SocketPro.Send("EditInfo", { Vsign: Sign }, function (msg) {
                if (msg.ErrCode == 0) {
                    System.Ipc.Send('index', JSON.stringify({ IpcCom: 'ChangeSign', sign: Sign }))
                } else {
                    layer.msg('网络错误')
                }
            }
            );
        },
        sendMsg() {
            System.Open({
                Name: this.friendInfo.ID + 'Friend',
                Text: this.friendInfo.Remark ? this.friendInfo.Remark : this.friendInfo.Nick,
                Url: "Page/chatMain/chat.html",
                Size: { Width: 920, Height: 750 },
                MinSize: { Width: 920, Height: 750 },
                Resize: true,
                Delay: true,
                Param: JSON.stringify(this.friendInfo),
                Location: { X: ((screen.availWidth - 920) / 2), Y: ((screen.availHeight - 750) / 2) }
            });
        },
        amend() {
            let input = $('#amendRemark');
            input.css('width', 208);
            input.removeAttr('readonly');
            input[0].focus();
            this.inputClass = true;
        },
        amendRemark() {
            let self = this;
            let input = $('#amendRemark');
            input.attr('readonly', 'readonly');
            let inputValue = input.val();
            Ajaxs({ Controller: "FriendAction/modifyRemark" }, { T: self.friendInfo.token, FriendID: self.friendInfo.ID, Remark: inputValue, }, {
                OkFun(response) {
                    self.friendInfo.Remark = inputValue;
                    let objData = JSON.parse(JSON.stringify(self.friendInfo));
                    objData.IpcCom = 'Remark'
                    System.Ipc.Send('index', JSON.stringify(objData))
                    console.log('发送成功')
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

            input.css("width", inputValue.length * 18)
            this.inputClass = false;
        },
        moveGroups() {
            let self = this;
            let friendGroupsId = $('#friendgroup').val();
            Ajaxs({ Controller: "FriendAction/moveFriend" }, { T: self.friendInfo.token, FriendID: self.friendInfo.ID, FriendGroupID: friendGroupsId, }, {
                OkFun(response) {
                    console.log(self.friendInfo)
                    let friendData = JSON.parse(JSON.stringify(self.friendInfo));
                    delete friendData.index
                    delete friendData.UserId
                    friendData.newGroup = friendGroupsId;
                    friendData.IpcCom = 'MoveGroups'
                    console.log(friendData)
                    System.Ipc.Send('index', JSON.stringify(friendData))
                    self.friendInfo.FriendGroupID = friendGroupsId;
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
    },
    mounted() {
        let self = this;
        setTimeout(() => {
            System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetFriendGroupList" }));
        }, 50);
        setTimeout(function () {
            if (typeof (self.friendInfo) != "object" && (Object.keys(self.friendList).indexOf(self.friendInfo.toString()) == -1 && self.friendInfo != self.userData.ID)) {
                console.log('发送AJAX');
                Ajaxs({ Controller: "UserAction/getUserInfo" }, { T: self.friendInfo.token, ID: self.friendInfo }, {
                    OkFun(response) {
                        self.friendInfo = response.Info[0];
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
            } else if (typeof (self.friendInfo) != "object" && self.friendInfo == self.userData.ID) {
                self.friendInfo = self.userData;
            } else if (typeof (self.friendInfo) != "object" && Object.keys(self.friendList).indexOf(self.friendInfo.toString()) != -1) {
                self.friendInfo = self.friendList[self.friendInfo];
            }
        }, 500);
    },
});

