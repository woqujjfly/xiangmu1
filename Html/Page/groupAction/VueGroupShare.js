define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/VueComponent", "../../Plugs/Module/layer/layer"], function (require, exports, Vue_1, VueComponent, layer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#groupShare",
        data: {
            groupInfo: (Me.Param && JSON.parse(Me.Param)),
            user: {},
            shareLi: [],
            shareIndex: [],
            showFriendClass: true,
            showMenu: true,
            showP: false,
            searchVal: ''
        },
        methods: {
            angle(e, index) {
                let contactItem = document.querySelectorAll(".sub-contacts")[index];
                let contactAngle = document.querySelectorAll(".contactAngle")[index];
                if (contactItem.style.display != "block") {
                    contactItem.style.display = "block";
                    contactAngle.style.transform = "rotate(90deg)";
                }
                else {
                    contactItem.style.display = "none";
                    contactAngle.style.transform = "rotate(0deg)";
                }
            },
            moveLi(e, index, friend) {
                if (typeof (friend) == 'object') {
                    $(e.target).attr('data', JSON.stringify(friend));
                }
                else {
                    $(e.target).attr('data', friend);
                }
                let data = $(e.target).attr('data');
                if (this.shareLi.length < 5) {
                    if (this.shareLi.indexOf(data) == -1) {
                        this.shareLi.push(data);
                        this.shareIndex.push(index);
                        console.log(this.shareLi);
                    }
                }
                else if (this.shareLi.length == 5) {
                    layer.msg("最多不可超过五个");
                }
                e.stopPropagation();
            },
            deleteLi(index) {
                this.shareLi.splice(index, 1);
                this.shareIndex.splice(index, 1);
            },
            showDownMenu() {
                let contactAngle = document.querySelectorAll(".contactAngle")[0];
                this.showMenu
                    ? (contactAngle.style.transform = "rotate(90deg)")
                    : (contactAngle.style.transform = "rotate(0deg)");
            },
            search() {
                let self = this;
                self.user = {};
                let friendArr = [];
                let input = $('input').val();
                for (let key in self.groupInfo.contactGroup) {
                    for (let key1 in self.groupInfo.contactGroup[key].List) {
                        if (self.groupInfo.contactGroup[key].List[key1].ID != self.groupInfo.getContactInfo.ID) {
                            friendArr.push(self.groupInfo.contactGroup[key].List[key1]);
                        }
                    }
                }
                for (let key2 in friendArr) {
                    if (friendArr[key2].ID.toString().indexOf(input) > -1 || (friendArr[key2].Remark && friendArr[key2].Remark.indexOf(input) > -1) || friendArr[key2].Nick.indexOf(input) > -1) {
                        self.user[key2] = friendArr[key2];
                    }
                }
                this.showFriendClass = false;
                if (Object.keys(self.user).length == 0) {
                    self.showP = true;
                }
                else {
                    self.showP = false;
                }
                if (input == '') {
                    self.user = {};
                    self.showMenu = true;
                    self.showFriendClass = true;
                    self.showP = false;
                }
            },
            share() {
                let self = this;
                let shareArr = [];
                let msgs = { ShareID: self.groupInfo.getContactInfo.ID, ShareNick: self.groupInfo.getContactInfo.Nick };
                for (let i = 0; i < this.shareLi.length; i++) {
                    shareArr.push(JSON.parse(this.shareLi[i]).ID);
                }
                if (shareArr.length == 0) {
                    layer.msg('请选择需要分享的用户');
                }
                if (shareArr.length != 0) {
                    if (System.FindWinBool(shareArr[0] + 'Friend')) {
                        System.Ipc.Send(JSON.stringify({ IpcCom: "SendCrad", Action: "Share", Share: msgs }));
                        console.log('窗口已打开');
                    }
                    else {
                        console.log('窗口未打开');
                        let Tofriend = JSON.parse(self.shareLi[0]);
                        Tofriend.MyID = self.groupInfo.userData.MyID;
                        Tofriend.MyNick = self.groupInfo.userData.MyNick;
                        Tofriend.Share = msgs;
                        Tofriend.Action = "Share";
                        System.Open({
                            Name: shareArr[0] + "Friend",
                            Text: Tofriend.Remark ? Tofriend.Remark : Tofriend.Nick,
                            Url: "Page/chatMain/chat.html",
                            Size: { Width: 920, Height: 750 },
                            MinSize: { Width: 920, Height: 750 },
                            Resize: true,
                            Delay: true,
                            Param: JSON.stringify(Tofriend),
                            Location: { X: ((screen.availWidth - 920) / 2), Y: (screen.availHeight - 750) / 2 }
                        });
                    }
                }
            }
        },
        mounted() {
            let self = this;
            if (!self.groupInfo.contactGroup) {
                setTimeout(() => {
                    System.Ipc.Send('index', JSON.stringify({ IpcCom: 'ShareFriend' }));
                    console.log('发送IPC');
                }, 100);
            }
        },
        watch: {
            searchVal() {
                this.search();
            }
        }
    });
});
