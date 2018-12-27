define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/Ajaxs"], function (require, exports, Vue_1, layer, WebSocketPro_1, Ajaxs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    let DB = System.Require('Db');
    let Menu = System.Require("Menu");
    var OnlineTypeEnum;
    (function (OnlineTypeEnum) {
        OnlineTypeEnum[OnlineTypeEnum["\u5728\u7EBF"] = 0] = "\u5728\u7EBF";
        OnlineTypeEnum[OnlineTypeEnum["\u9690\u8EAB"] = 1] = "\u9690\u8EAB";
        OnlineTypeEnum[OnlineTypeEnum["\u79BB\u7EBF"] = 2] = "\u79BB\u7EBF";
    })(OnlineTypeEnum || (OnlineTypeEnum = {}));
    exports.VuePage = new Vue_1.default({
        el: "#indexApp",
        data: {
            win: ['hide', 'close'],
            OnlineType: OnlineTypeEnum,
            userData: {},
            showList: ["session", "contacts", "group"],
            listType: "session",
            sessionList: {},
            contactGroup: {},
            contactList: {},
            groups: {},
            sessionIndex: -1,
            contactNum: -1,
            groupNum: -1,
            settingMenu: false,
            getContactInfo: {},
            searchPerson: {},
            searchGroup: {},
            searchPersonActive: -1,
            searchGroupActive: -1,
            examine: true,
            examineP: true,
            onlineType: OnlineTypeEnum.在线,
            oldonlineType: OnlineTypeEnum.在线,
            showStatusList: false,
            groupMemberList: {},
            searchVal: "",
            friendGroup: {},
            GroupContextMenu: []
        },
        methods: {
            angle(e, index) {
                let contactItem = document.querySelectorAll(".sub-contacts")[index];
                let contactAngle = document.querySelectorAll(".contactAngle")[index];
                if (this.listType == "contacts" && contactItem.style.display == "none") {
                    contactItem.style.display = "block";
                    contactAngle.style.transform = "rotate(90deg)";
                }
                else {
                    contactItem.style.display = "none";
                    contactAngle.style.transform = "rotate(0deg)";
                }
            },
            date(date) {
                let currentTime = new Date(date);
                if (currentTime.setDate(currentTime.getDate() - 1)) {
                    return '昨天';
                }
                else {
                    return new Date().Format("MM-dd", date);
                }
            },
            openASession(item) {
                let self = this;
                item ? item : (item = self.getContactInfo);
                let paramer = JSON.parse(JSON.stringify(item));
                paramer.MyID = self.userData.ID;
                paramer.MyNick = self.userData.Nick;
                paramer.UnRead = item.UnRead;
                paramer.Token = self.userData.Sign;
                System.Open({
                    Name: item.ID + "Friend",
                    Text: item.Remark ? item.Remark : item.Nick,
                    Url: "Page/chatMain/chat.html",
                    Size: { Width: 920, Height: 750 },
                    MinSize: { Width: 920, Height: 750 },
                    Resize: true,
                    Delay: true,
                    Param: JSON.stringify(paramer),
                    Location: { X: ((screen.availWidth - 920) / 2), Y: (screen.availHeight - 750) / 2 }
                });
                if (item.UnRead)
                    item.UnRead = 0;
                DB.ExecuteNonQuery(self.userData.ID, 'UPDATE user SET SendTime=@p0 WHERE ID=@p1', new Date().getTime().toString(), item.ID);
            },
            openGroupChat(item) {
                let self = this;
                item ? item : (item = self.getContactInfo);
                if (item.UnRead)
                    item.UnRead = 0;
                self.getContactInfo.ID = item.ID;
                if (!self.groupMemberList[item.ID]) {
                    self.getGroupMemberList(item.ID);
                }
                item.MemberList = self.groupMemberList[item.ID];
                let paramer = JSON.parse(JSON.stringify(item));
                paramer.MyID = self.userData.ID;
                System.Open({
                    Name: item.ID + "Group",
                    Text: item.Name,
                    Url: "Page/chatMain/groupChat.html",
                    Size: { Width: 920, Height: 750 },
                    MinSize: { Width: 920, Height: 750 },
                    Resize: true,
                    Delay: true,
                    Param: JSON.stringify(paramer),
                    Location: { X: ((screen.availWidth - 920) / 2), Y: (screen.availHeight - 750) / 2 }
                });
            },
            groupData() {
                let self = this;
                let paramer = JSON.parse(JSON.stringify(self.getContactInfo));
                if (self.groupMemberList[self.getContactInfo.ID]) {
                    paramer.MemberList = self.groupMemberList[self.getContactInfo.ID];
                }
                paramer.MyID = self.userData.ID;
                console.log(paramer);
                System.Open({
                    Name: paramer.ID + "-GroupInfo",
                    Text: paramer.Name,
                    Url: "Page/groupAction/groupData.html",
                    Size: { Width: 724, Height: 524 },
                    Delay: true,
                    Param: JSON.stringify(paramer)
                });
            },
            openSearch() {
                let paramer = {};
                paramer.MyID = this.userData.ID;
                paramer.Sign = this.userData.Sign;
                paramer.contactList = this.contactList;
                paramer.groups = this.groups;
                System.Open({
                    Name: "search",
                    Text: "查找",
                    Url: "Page/search/search.html",
                    Size: { Width: 600, Height: 400 },
                    Delay: true,
                    Param: JSON.stringify(paramer)
                });
            },
            showAvatar() {
                System.Open({
                    Name: "showAvatar",
                    Text: "更换头像",
                    Url: "Page/userAction/showAvatar.html",
                    Size: { Width: 600, Height: 480 },
                    Delay: true,
                });
            },
            modifyPass() {
                System.Open({
                    Name: "modifyPass",
                    Text: "修改密码",
                    Url: "Page/userAction/modifyPass.html",
                    Size: { Width: 430, Height: 330 },
                    Delay: true,
                    Param: JSON.stringify(this.userData)
                });
            },
            openSetting() {
                System.Open({
                    Name: "setting",
                    Text: "系统设置",
                    Url: "Page/systemSetting/systemSetting.html",
                    Size: { Width: 650, Height: 400 },
                    Delay: true,
                    Param: this.userData.ID.toString()
                });
            },
            friendVerification() {
            },
            groupShare() {
                let data = {};
                data.contactGroup = this.contactGroup;
                data.userData = { MyID: this.userData.ID, MyNick: this.userData.Nick };
                data.getContactInfo = this.getContactInfo;
                System.Open({
                    Name: "groupShare",
                    Text: "分享名片",
                    Url: "Page/groupAction/groupShare.html",
                    Size: { Width: 550, Height: 410 },
                    Delay: true,
                    Param: JSON.stringify(data)
                });
            },
            MoveFriend(item, FGID) {
                console.log(item);
                console.log(FGID);
                let self = this;
                console.log(self.contactGroup[item.FriendGroupID].List[item.ID]);
                Ajaxs_1.default({ Controller: "FriendAction/moveFriend" }, { T: self.userData.Sign, FriendID: item.ID.toString(), FriendGroupID: FGID }, {
                    OkFun(response) {
                        self.contactGroup[item.FriendGroupID].OnlineNum--;
                        self.contactGroup[FGID].OnlineNum++;
                        delete self.contactGroup[item.FriendGroupID].List[item.ID];
                        self.contactGroup[FGID].List[item.ID] = item;
                        self.contactList[item.ID].FriendGroupID = FGID;
                        self.contactGroup = Object.assign({}, self.contactGroup);
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
            rightMenu(item) {
                let self = this;
                let FriendContextMenu = [];
                let moveFriend = [];
                let SubItem = [];
                for (let i in self.friendGroup) {
                    if (item.FriendGroupID != i) {
                        moveFriend.push({
                            Key: i,
                            Label: self.friendGroup[i],
                            Type: 1,
                            Enabled: true,
                        });
                    }
                }
                FriendContextMenu = [
                    {
                        Key: "发送即时消息",
                        Label: "发送即时消息",
                        Type: 1,
                        Enabled: true,
                    }, {
                        Key: "消息记录",
                        Label: "消息记录",
                        Type: 1,
                        Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NUM5RDdCNUU5NDUxMUU4OEQ0OEU4MzhDRUU1RDNFRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NUM5RDdCNkU5NDUxMUU4OEQ0OEU4MzhDRUU1RDNFRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU1QzlEN0IzRTk0NTExRTg4RDQ4RTgzOENFRTVEM0VFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1QzlEN0I0RTk0NTExRTg4RDQ4RTgzOENFRTVEM0VFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+psXNcgAAATpJREFUeNqc071KA0EUhuHsEoU00c7aFBI0VxGbSAQL/zpBEYwgAUtvQkEksVDSCoogKFgIXoRB1CKQykIRfxAhjb5HvpFx2YUkAw9kz8yZnJk9GyytrKUiYxyrmMKoYi1c4gC3/uLQ+z2IPVzjCQsYkkXFbG4fGZeU9pIv8I4xvEWqupEaDnGuCjuugh18YC4m2R82N49XbLsKJjCrf/6OJNhzEBNbxj3qoS6spvK7HbZ213JtgxLOUr0Pu4eSbZDDXR8b2BFy6S4WRu8l8N7c71uwJsknJAcx3LDK26E6bKaPI5RxFaox1pHtIdnWVq21bYMmTtGIeedJx2oop+k6cVO7nqj3k4bNHWNYOX8fU0dnesQDtlDAgG67oJjNPWNaOf++RgtsoIgRVfOJFxwpNokKvlzSjwADAMx8Qg4mYKsGAAAAAElFTkSuQmCC',
                        Enabled: true,
                    }, {
                        Key: "查看资料",
                        Label: "查看资料",
                        Type: 1,
                        Enabled: true,
                    }, {
                        Key: "分享他(她)的名片",
                        Label: "分享他(她)的名片",
                        Type: 1,
                        Enabled: true,
                    }, {
                        Key: "修改备注名称",
                        Label: "修改备注名称",
                        Type: 1,
                        Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDRDE5QzgxQzA5QzExRThCNEJERkI1OTI5NTM0OUU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDRDE5QzgyQzA5QzExRThCNEJERkI1OTI5NTM0OUU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNEMTlDN0ZDMDlDMTFFOEI0QkRGQjU5Mjk1MzQ5RTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNEMTlDODBDMDlDMTFFOEI0QkRGQjU5Mjk1MzQ5RTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5o5jkzAAAAuUlEQVR42mI0NjZmIAKYAHE7EIcA8UeQABORmrYB8Vcg3g3E/MRoBGnaCsSJQBwIxEdhmpmI0JQEpf8DcSEQPwXiVSxEaoIBfyC2BGIvJhI1zQRpAuJzLDgCIhGfJvTAIVoTskYjUjQhaywH4mZiNcE0sgKxKxCvJlYTCIACxwaIbwHxCyCWAeJQqAtwaoLZ6AfEXFBF54HYEIjd8WmC2agCxNuBeDMQHwfiv8SkekZg7vjPQAYACDAAnqAzJ6W13UgAAAAASUVORK5CYII=',
                        Enabled: true,
                    }, {
                        Key: "移动联系人至",
                        Label: "移动联系人至",
                        Type: 1,
                        Enabled: true,
                        Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRjJDRTYwM0U4QkQxMUU4OEE0OThFQzI3QzE3RTc5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRjJDRTYwNEU4QkQxMUU4OEE0OThFQzI3QzE3RTc5NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBGMkNFNjAxRThCRDExRTg4QTQ5OEVDMjdDMTdFNzk1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBGMkNFNjAyRThCRDExRTg4QTQ5OEVDMjdDMTdFNzk1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MwMLDAAAAQxJREFUeNpijEtKZ8AC4oC4GIjVgfgnEJ8F4jYg3oOukAmLZl8grgfiLCDmBWIZIJ4ExIuB2BpdMQsWA0AaK4D4KJT/G4g3ALEgEJcgieN0gSEQH8EivguIzYjxghgQv8Qi/gKIxYkx4BcQc2MRZ4fKETTgChAbYxEHOf8aMQaAQrsIi3g5EC8jxoBp0HCYjSQ2GYiFgHgKMQYIAPEzIJZDi24zaKLCa0AIEF8E4ttA7I8kngnEjFDMAE1YLMgJSRTqPF0gDgTikwz4QS4QawBxOBPU1gtAfB+IjfBo/o+EQcAViN+BXLAaiC2IsJURzbDdMBcwEKEZHYC86wXE71mQTCQWMELDAAwAAgwAuywwygQ/WKwAAAAASUVORK5CYII=',
                        RightIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAYAAADjXQYbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0QTZEN0JGQzJFNjExRThCM0QyQUI1MEI3MTE5OUE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0QTZEN0MwQzJFNjExRThCM0QyQUI1MEI3MTE5OUE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzRBNkQ3QkRDMkU2MTFFOEIzRDJBQjUwQjcxMTk5QTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzRBNkQ3QkVDMkU2MTFFOEIzRDJBQjUwQjcxMTk5QTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5sIKgTAAAAoElEQVR42mzPPQoCMRCG4WQ3NjZewMafa4iNxV7Bzi28g3gCvYGptPMECl7FRe9gY7er78AE4uAHD4R8gcz4GKMjBTpnIpcTPDD8V0pxwBUDW0r2uOCGvi0lW9xxRrDlB7WeT/CFmaHFEiPsbJlSymq27OmfjcyQlx5HPa9khpCVss4YC/3bpXKDCjO80+ugr9eY45UPIOUTU93zJ18BBgCspxrdv7KnPAAAAABJRU5ErkJggg==',
                        SubItem: moveFriend
                    }, {
                        Key: "删除好友",
                        Label: "删除好友",
                        Type: 1,
                        Enabled: true,
                        Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OTUwQjJBNkU5NDUxMUU4OUMzRUJGRDRGMDA0Qjg1NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OTUwQjJBN0U5NDUxMUU4OUMzRUJGRDRGMDA0Qjg1NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5NTBCMkE0RTk0NTExRTg5QzNFQkZENEYwMDRCODU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5NTBCMkE1RTk0NTExRTg5QzNFQkZENEYwMDRCODU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+AweX0wAAAE9JREFUeNpijEtKZ8AC/jNgB4zoAiwMuAEjMYay4LHtPzFiLEg2/cfmRDyGg9UyMVAImAjYQihQaeuCUQOoYAAjvjxANRewEJkLcQKAAAMALvQLSlRx0VUAAAAASUVORK5CYII='
                    }
                ];
                self.GroupContextMenu = [
                    {
                        Key: "发送群消息",
                        Label: "发送群消息",
                        Type: 1,
                        Enabled: true,
                    }, {
                        Key: "消息记录",
                        Label: "消息记录",
                        Type: 1,
                        Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NUM5RDdCNUU5NDUxMUU4OEQ0OEU4MzhDRUU1RDNFRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NUM5RDdCNkU5NDUxMUU4OEQ0OEU4MzhDRUU1RDNFRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU1QzlEN0IzRTk0NTExRTg4RDQ4RTgzOENFRTVEM0VFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1QzlEN0I0RTk0NTExRTg4RDQ4RTgzOENFRTVEM0VFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+psXNcgAAATpJREFUeNqc071KA0EUhuHsEoU00c7aFBI0VxGbSAQL/zpBEYwgAUtvQkEksVDSCoogKFgIXoRB1CKQykIRfxAhjb5HvpFx2YUkAw9kz8yZnJk9GyytrKUiYxyrmMKoYi1c4gC3/uLQ+z2IPVzjCQsYkkXFbG4fGZeU9pIv8I4xvEWqupEaDnGuCjuugh18YC4m2R82N49XbLsKJjCrf/6OJNhzEBNbxj3qoS6spvK7HbZ213JtgxLOUr0Pu4eSbZDDXR8b2BFy6S4WRu8l8N7c71uwJsknJAcx3LDK26E6bKaPI5RxFaox1pHtIdnWVq21bYMmTtGIeedJx2oop+k6cVO7nqj3k4bNHWNYOX8fU0dnesQDtlDAgG67oJjNPWNaOf++RgtsoIgRVfOJFxwpNokKvlzSjwADAMx8Qg4mYKsGAAAAAElFTkSuQmCC',
                        Enabled: true,
                    }, {
                        Key: "群消息设置",
                        Label: "群消息设置",
                        Type: 1,
                        RightIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAYAAADjXQYbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0QTZEN0JGQzJFNjExRThCM0QyQUI1MEI3MTE5OUE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0QTZEN0MwQzJFNjExRThCM0QyQUI1MEI3MTE5OUE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzRBNkQ3QkRDMkU2MTFFOEIzRDJBQjUwQjcxMTk5QTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzRBNkQ3QkVDMkU2MTFFOEIzRDJBQjUwQjcxMTk5QTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5sIKgTAAAAoElEQVR42mzPPQoCMRCG4WQ3NjZewMafa4iNxV7Bzi28g3gCvYGptPMECl7FRe9gY7er78AE4uAHD4R8gcz4GKMjBTpnIpcTPDD8V0pxwBUDW0r2uOCGvi0lW9xxRrDlB7WeT/CFmaHFEiPsbJlSymq27OmfjcyQlx5HPa9khpCVss4YC/3bpXKDCjO80+ugr9eY45UPIOUTU93zJ18BBgCspxrdv7KnPAAAAABJRU5ErkJggg==',
                        Enabled: true,
                        SubItem: [
                            {
                                Key: "接收并提醒",
                                Label: "接收并提醒",
                                Type: 1,
                                Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MEY1QUVGQzJFNjExRTg4QzVGODg3QzExNjE0QUFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MEY1QUYwQzJFNjExRTg4QzVGODg3QzExNjE0QUFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDkwRjVBRURDMkU2MTFFODhDNUY4ODdDMTE2MTRBQUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDkwRjVBRUVDMkU2MTFFODhDNUY4ODdDMTE2MTRBQUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz441Rl2AAAAh0lEQVR42mL8//8/AyFgYmIiAKQ2AHECExGKDYDUeSBecObMmQcMIBtwYWNj4wAgfg/ECTAxfIobgPg/smIQZgQKPABaNx9oXSOSe/tB7gXiRKD4AmQngjSA3HgAiO8DcQMUG2BTDNYAsgbqMZAmfqg4VsUgAA4loOQFIOUAxB/xKQYBgAADABY8Z+AOItwcAAAAAElFTkSuQmCC',
                                Enabled: true,
                                Checked: true
                            }, {
                                Key: "接收但不提醒",
                                Label: "接收但不提醒",
                                Type: 1,
                                Enabled: true,
                            }, {
                                Key: "屏蔽群消息",
                                Label: "屏蔽群消息",
                                Type: 1,
                                Enabled: true,
                            }
                        ]
                    }, {
                        Key: "置顶",
                        Label: "设为置顶群",
                        Type: 1,
                        Enabled: true,
                    }, {
                        Key: '退群',
                        Label: self.userData.ID == item.GroupOwnerID ? '解散该群' : '退出该群',
                        Type: 1,
                        Enabled: true,
                    }
                ];
                let delSession = {
                    Key: "从会话列表删除",
                    Label: "从会话列表删除",
                    Type: 1,
                    Enabled: true,
                };
                if (item.GroupOwnerID) {
                    if (!self.groupMemberList[item.ID] && item.GroupOwnerID) {
                        self.getGroupMemberList(item.ID, item.GroupOwnerID);
                    }
                    else {
                        let isAdmin = 0;
                        for (let i in self.groupMemberList[item.ID]) {
                            if (self.userData.ID == self.groupMemberList[item.ID][i].MemberID) {
                                isAdmin = self.groupMemberList[item.ID][i].IsAdmin;
                            }
                        }
                        if (isAdmin > 0) {
                            self.GroupContextMenu.splice(2, 0, {
                                Key: "成员管理",
                                Label: "成员管理",
                                Type: 1,
                                Enabled: true,
                            });
                        }
                        self.GroupContextMenu.splice(2, 0, {
                            Key: '查看群资料',
                            Label: isAdmin > 0 ? '查看/修改群资料' : '查看资料',
                            Type: 1,
                            Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MjM0OUFGQzJFNjExRTg5QkM2RjIzMzZFNDhDMzIzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4MjM0OUIwQzJFNjExRTg5QkM2RjIzMzZFNDhDMzIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjgyMzQ5QURDMkU2MTFFODlCQzZGMjMzNkU0OEMzMjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjgyMzQ5QUVDMkU2MTFFODlCQzZGMjMzNkU0OEMzMjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lM9nfAAAAkUlEQVR42mI0Njb2ZGBgmAvEkgzEg+dAnMwE1RgGxIwkYJD6uSxQG4+cPXuWaGuBrj0C0seCJj4DiJcC8WEg3o1DryuMga5ZAYgFoGwlQi5A1+yBxFYmWjPQHwykArhmEgMMq7PvEqFXGZef75HlbPRoIFYzKKnZQCOeWGANxC9AmlOAeDUQS5Cg+SkobQMEGAA0NhlI8u5adQAAAABJRU5ErkJggg==',
                            Enabled: true,
                        });
                        if (isAdmin > 0 && !item.IsPerson && self.listType == 'session') {
                            self.GroupContextMenu.splice(4, 0, delSession);
                        }
                        if (self.listType == 'group') {
                            self.GroupContextMenu.splice(4, 0, {
                                Key: "创建群",
                                Label: "创建群",
                                Type: 1,
                                Enabled: true,
                            });
                        }
                        SubItem = self.GroupContextMenu;
                        Menu.Popup({
                            FontColor: '#000000',
                            BgColor: "#ffffff",
                            HoverColor: '#e2e2e3',
                            Height: 30,
                            Radius: 2,
                            Click: (Key, Checked) => {
                                console.log(Key, Checked);
                                switch (Key) {
                                    case '发送群消息':
                                        self.openGroupChat(item);
                                        break;
                                    case '群消息记录': break;
                                    case '查看群资料':
                                        self.groupData();
                                        break;
                                    case '成员管理': break;
                                    case '退群':
                                        Key = self.userData.ID == item.GroupOwnerID ? '解散该群' : '退出该群';
                                        self.leaveGroup(Key);
                                        break;
                                    case '创建群':
                                        self.inviteGroup();
                                        break;
                                    case '接收并提醒': break;
                                    case '接收但不提醒': break;
                                    case '屏蔽群消息': break;
                                }
                            },
                            SubItem: SubItem
                        });
                    }
                }
                else {
                    let addFriendGroup = {
                        Key: '添加分组',
                        Label: '添加分组',
                        Type: 1,
                        Enabled: true,
                    };
                    let friendManagement = {
                        Key: '好友管理',
                        Label: '好友管理',
                        Type: 1,
                        Enabled: true,
                    };
                    if (self.listType == "session") {
                        if (item.IsPerson) {
                            FriendContextMenu.splice(3, 0, {
                                Key: "置顶",
                                Label: "会话置顶",
                                Type: 1,
                                Enabled: true,
                            }, delSession);
                            SubItem = FriendContextMenu;
                        }
                    }
                    else if (self.listType == 'contacts') {
                        if (item.OnlineNum || item.OnlineNum == 0) {
                            if (item.ID == 0) {
                                SubItem = [addFriendGroup, friendManagement];
                            }
                            else {
                                SubItem = [addFriendGroup, friendManagement, {
                                        Key: '重命名',
                                        Label: '重命名',
                                        Type: 1,
                                        Enabled: true,
                                    }, {
                                        Key: '删除分组',
                                        Label: '删除分组',
                                        Type: 1,
                                        Enabled: true,
                                    }];
                            }
                        }
                        else {
                            SubItem = FriendContextMenu;
                        }
                    }
                    Menu.Popup({
                        FontColor: '#000000',
                        BgColor: "#ffffff",
                        HoverColor: '#e2e2e3',
                        Height: 30,
                        Radius: 2,
                        Click: (Key, Checked) => {
                            console.log(Key, Checked);
                            switch (Key) {
                                case '发送即时消息':
                                    self.openASession(item);
                                    break;
                                case '消息记录': break;
                                case '查看资料':
                                    self.openPersonalFile(item);
                                    break;
                                case '置顶':
                                    self.sessionStick();
                                    break;
                                case '从会话列表删除':
                                    self.delSession();
                                    break;
                                case '分享他(她)的名片':
                                    self.groupShare();
                                    break;
                                case '修改备注名称':
                                    self.modifyRemark();
                                    break;
                                case '删除好友':
                                    self.deleteFriends();
                                    break;
                                case '添加分组':
                                    self.addFriendGroup();
                                    break;
                                case '好友管理':
                                    self.friendManagement();
                                    break;
                                case '重命名':
                                    self.renameFriendGroup();
                                    break;
                                case '删除分组':
                                    self.delFriendGroup();
                                    break;
                            }
                            for (let i in self.friendGroup) {
                                if (i == Key) {
                                    self.MoveFriend(item, Number(i));
                                }
                            }
                        },
                        SubItem: SubItem
                    });
                }
                self.getContactInfo = item;
            },
            addFriendGroup() {
                let self = this;
                layer.prompt({
                    title: "添加好友分组",
                    value: "未命名",
                    formType: 0,
                    success: layero => { layero.find(".layui-layer-input").focus().select(); }
                }, function (val, index, el) {
                    Ajaxs_1.default({ Controller: "FriendAction/addFriendGroup" }, { T: self.userData.Sign, Name: val }, {
                        OkFun(response) {
                            layer.close(index);
                            self.contactGroup[response.ID] = {
                                ID: response.ID,
                                Name: response.Name,
                                List: {},
                                OnlineNum: 0
                            };
                            self.contactGroup = Object.assign({}, self.contactGroup);
                            layer.msg("添加成功");
                            let friendG = self.contactGroup;
                            friendG.IpcCom = "ChangefriendG";
                            System.Ipc.Send(JSON.stringify(self.contactGroup));
                            delete self.contactGroup.IpcCom;
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
            friendManagement() {
                let self = this;
                let Management = {};
                Management.contactList = self.contactList;
                Management.userData = self.userData;
                Management.friendGroup = self.friendGroup;
                Management.contactGroup = self.contactGroup;
                System.Open({
                    Name: "friendManagement",
                    Text: "好友管理",
                    Url: "Page/userAction/friendManagement.html",
                    Size: { Width: 750, Height: 500 },
                    Delay: true,
                    Param: JSON.stringify(Management)
                });
            },
            renameFriendGroup() {
                let self = this;
                $(".layui-layer-content input").select();
                layer.prompt({
                    title: "重命名好友分组",
                    value: self.getContactInfo.Name,
                    formType: 0,
                    success: layero => { layero.find(".layui-layer-input").focus().select(); }
                }, function (val, index, el) {
                    Ajaxs_1.default({ Controller: "FriendAction/renameFriendGroup" }, { T: self.userData.Sign, FGID: self.getContactInfo.ID, Name: val }, {
                        OkFun(response) {
                            layer.close(index);
                            self.contactGroup[self.getContactInfo.ID].Name = response.Name;
                            self.contactGroup = Object.assign({}, self.contactGroup);
                            layer.msg("修改成功");
                            let friendG = self.contactGroup;
                            friendG.IpcCom = "ChangefriendG";
                            System.Ipc.Send(JSON.stringify(self.contactGroup));
                            delete self.contactGroup.IpcCom;
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
            delFriendGroup() {
                let self = this;
                Ajaxs_1.default({ Controller: "FriendAction/delFriendGroup" }, { T: self.userData.Sign, ID: self.getContactInfo.ID }, {
                    OkFun(response) {
                        delete self.contactGroup[self.getContactInfo.ID];
                        self.contactGroup = Object.assign({}, self.contactGroup);
                        layer.msg("删除成功");
                        let friendG = self.contactGroup;
                        friendG.IpcCom = "ChangefriendG";
                        System.Ipc.Send(JSON.stringify(self.contactGroup));
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
            deleteFriends() {
                let self = this;
                let friendId = self.getContactInfo.ID;
                layer.open({
                    title: '删除好友',
                    content: '您确定删除该好友吗?',
                    yes(index, layero) {
                        SocketPro.Send("DelFriend", { Value: friendId }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                self.contactGroup[self.contactList[friendId].FriendGroupID].OnlineNum--;
                                delete self.contactList[friendId];
                                self.contactGroup = Object.assign({}, self.contactGroup);
                            }
                            else {
                                console.error(msg.ErrMsg);
                            }
                        });
                    }
                });
            },
            modifyRemark() {
                let self = this;
                layer.prompt({
                    title: "修改备注名",
                    value: self.getContactInfo.Remark,
                    formType: 0,
                    success: layero => { layero.find(".layui-layer-input").focus().select(); },
                    yes(index, layero) {
                        let val = layero.find(".layui-layer-input").val();
                        Ajaxs_1.default({ Controller: "FriendAction/modifyRemark" }, { T: self.userData.Sign, FriendID: self.getContactInfo.ID, Remark: val }, {
                            OkFun(response) {
                                layer.close(index);
                                if (self.sessionList[self.getContactInfo.ID + "Friend"]) {
                                    self.sessionList[self.getContactInfo.ID + "Friend"].Remark = response.Name;
                                    self.sessionList = Object.assign({}, self.sessionList);
                                    DB.ExecuteNonQuery(self.userData.ID, "UPDATE user SET Remark=@p0 WHERE ID=@p1", val, self.getContactInfo.ID);
                                }
                                self.contactList[self.getContactInfo.ID].Remark = response.Name;
                                layer.msg("修改成功");
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
                    }
                });
            },
            openPersonalFile(item) {
                let self = this;
                console.log(item);
                let paramer;
                let title = "";
                if (!item) {
                    paramer = JSON.parse(JSON.stringify(self.userData));
                    title = "我的资料";
                    paramer.MyID = self.userData.ID;
                }
                else {
                    paramer = JSON.parse(JSON.stringify(self.getContactInfo));
                    title = paramer.Remark ? paramer.Remark + "的资料" : paramer.Nick + "的资料";
                    paramer.Sign = self.userData.Sign;
                }
                System.Open({
                    Name: paramer.ID + "openPersonalFile",
                    Text: title,
                    Url: "Page/userAction/openPersonalFile.html",
                    Size: { Width: 720, Height: 520 },
                    Delay: true,
                    Param: JSON.stringify(paramer)
                });
            },
            getGroupMemberList(ID, GroupOwnerID) {
                let self = this;
                console.log("发送群成员列表请求");
                if (!self.groupMemberList[ID])
                    self.groupMemberList[ID] = {};
                Ajaxs_1.default({ Controller: "GroupAction/getMemberList" }, { T: self.userData.Sign, GroupID: ID }, {
                    OkFun(response) {
                        let isAdmin = 0;
                        let SubItem = [];
                        for (let i = 0, l = response.List.length; i < l; i++) {
                            if (!self.groupMemberList[ID][response.List[i].MemberID]) {
                                self.groupMemberList[ID][response.List[i].MemberID] = response.List[i];
                            }
                            if (self.userData.ID == response.List[i].MemberID) {
                                isAdmin = response.List[i].IsAdmin;
                            }
                        }
                        if (isAdmin > 0) {
                            self.GroupContextMenu.splice(2, 0, {
                                Key: "成员管理",
                                Label: "成员管理",
                                Type: 1,
                                Enabled: true,
                            });
                        }
                        self.GroupContextMenu.splice(2, 0, {
                            Key: '查看群资料',
                            Label: isAdmin > 0 ? '查看/修改群资料' : '查看资料',
                            Type: 1,
                            Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MjM0OUFGQzJFNjExRTg5QkM2RjIzMzZFNDhDMzIzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4MjM0OUIwQzJFNjExRTg5QkM2RjIzMzZFNDhDMzIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjgyMzQ5QURDMkU2MTFFODlCQzZGMjMzNkU0OEMzMjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjgyMzQ5QUVDMkU2MTFFODlCQzZGMjMzNkU0OEMzMjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lM9nfAAAAkUlEQVR42mI0Njb2ZGBgmAvEkgzEg+dAnMwE1RgGxIwkYJD6uSxQG4+cPXuWaGuBrj0C0seCJj4DiJcC8WEg3o1DryuMga5ZAYgFoGwlQi5A1+yBxFYmWjPQHwykArhmEgMMq7PvEqFXGZef75HlbPRoIFYzKKnZQCOeWGANxC9AmlOAeDUQS5Cg+SkobQMEGAA0NhlI8u5adQAAAABJRU5ErkJggg==',
                            Enabled: true,
                        });
                        if (isAdmin > 0 && self.listType == 'session') {
                            self.GroupContextMenu.splice(4, 0, {
                                Key: "从会话列表删除",
                                Label: "从会话列表删除",
                                Type: 1,
                                Enabled: true,
                            });
                        }
                        SubItem = self.GroupContextMenu;
                        Menu.Popup({
                            FontColor: '#000000',
                            BgColor: "#ffffff",
                            HoverColor: '#e2e2e3',
                            Height: 30,
                            Radius: 2,
                            Click: (Key, Checked) => {
                                console.log(Key, Checked);
                                switch (Key) {
                                    case '发送群消息':
                                        self.openGroupChat(self.getContactInfo);
                                        break;
                                    case '群消息记录': break;
                                    case '查看群资料':
                                        self.groupData();
                                        break;
                                    case '成员管理': break;
                                    case '退群':
                                        Key = self.userData.ID == GroupOwnerID ? '解散该群' : '退出该群';
                                        self.leaveGroup(Key);
                                        break;
                                    case '创建群':
                                        self.inviteGroup();
                                        break;
                                    case '接收并提醒': break;
                                    case '接收但不提醒': break;
                                    case '屏蔽群消息': break;
                                }
                            },
                            SubItem: SubItem
                        });
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
            inviteGroup() {
                let allInfo = {};
                allInfo.contactGroup = this.contactGroup;
                allInfo.ShareGroup = "创建群";
                System.Open({
                    Name: "groupAction",
                    Text: "创建群",
                    Url: "Page/groupAction/inviteGroup.html",
                    Size: { Width: 660, Height: 470 },
                    Delay: true,
                    Param: JSON.stringify(allInfo)
                });
            },
            openMember() {
                let perMember = {};
                perMember;
                System.Open({
                    Name: "memberOpen",
                    Text: "会员中心",
                    Url: "Page/userAction/memberCenter.html",
                    Size: { Width: 660, Height: 470 },
                    Delay: true
                });
            },
            delSession() {
                let self = this;
                let listID = Object.keys(self.sessionList);
                let ID = parseInt(listID[self.sessionIndex]);
                let Type = listID[self.sessionIndex].split(/\d+/gi)[1];
                Type = Type == "Friend" ? '0' : '1';
                delete self.sessionList[listID[self.sessionIndex]];
                self.sessionList = Object.assign({}, self.sessionList);
                DB.ExecuteNonQuery(self.userData.ID, 'DELETE FROM chatlist WHERE ChatID=@p0 AND Type=@p1', ID, Type);
            },
            leaveGroup(key) {
                let self = this;
                let actionName = key;
                let title = actionName == "退出该群" ? "你确定退出该群吗? (退群通知仅群管理员可见)" : "你确定解散该群吗?";
                layer.alert(title, (index, layero) => {
                    let ID = Number(self.getContactInfo.ID);
                    if (actionName == "退出该群") {
                        SocketPro.Send("ExitQ", { Id: ID }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                del(ID);
                            }
                            else {
                                console.error(msg.ErrMsg);
                            }
                        });
                    }
                    else if (actionName == "解散该群") {
                        SocketPro.Send("DelQ", { Id: ID }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                del(ID);
                            }
                            else {
                                console.error(msg.ErrMsg);
                            }
                        });
                    }
                });
                let del = (ID) => {
                    delete self.groups[ID];
                    self.groups = Object.assign({}, self.groups);
                    if (self.groupMemberList[ID]) {
                        delete self.groupMemberList[ID];
                        self.groupMemberList = Object.assign({}, self.groupMemberList);
                    }
                    if (self.sessionList[ID + "Group"]) {
                        delete self.sessionList[ID + "Group"];
                        self.sessionList = Object.assign({}, self.sessionList);
                        DB.ExecuteNonQuery(self.userData.ID, 'DELETE FROM chatlist WHERE ChatID=@p0 AND Type=@p1', ID, 1);
                        DB.ExecuteNonQuery(self.userData.ID, 'DELETE FROM groups WHERE ID=@p0', ID);
                    }
                    System.Ipc.Send(JSON.stringify({ IpcCom: "ExitMemberList" }));
                };
            },
            sessionStick() {
                let self = this;
                console.log(self.sessionList);
                console.log(self.sessionIndex);
                let session_List = [];
                for (var i in self.sessionList) {
                    session_List.push([i, self.sessionList[i]]);
                }
                console.log(session_List);
                let freshList = session_List.splice(self.sessionIndex, 1);
                console.log(freshList[0]);
                session_List.unshift(freshList[0]);
                console.log(session_List);
            },
            changeSign() {
                let self = this;
                let Sign = $("#personalSign").val();
                SocketPro.Send("EditInfo", { Vsign: Sign }, function (msg) {
                    if (msg.ErrCode == 0) {
                        self.userData.Vsign = Sign;
                        self.userData = Object.assign({}, self.userData);
                    }
                    else {
                        layer.msg(msg.ErrMsg);
                    }
                });
            },
            showHidden(judge) {
                judge == "groups"
                    ? (this.examine = !this.examine)
                    : (this.examineP = !this.examineP);
            },
            selectStatus(index) {
                let self = this;
                self.showStatusList = false;
                if (index == self.onlineType)
                    return;
                if (index == OnlineTypeEnum.离线) {
                    self.onlineType = index;
                }
                else if (self.onlineType == OnlineTypeEnum.离线) {
                    SocketPro.Opend = () => {
                        SocketPro.Opend = null;
                        SocketPro.Send("Login", { Token: self.userData.Sign, OnlineType: Number(index) }, function (msg) {
                            if (msg.ErrCode == 0) {
                                self.onlineType = index;
                            }
                            else {
                                self.onlineType = OnlineTypeEnum.离线;
                            }
                        });
                    };
                    SocketPro.Open();
                }
                else {
                    self.onlineType = index;
                    SocketPro.Send("SetOnline", { Type: Number(index) });
                }
            },
            compare(pro) {
                return function (obj1, obj2) {
                    var val1 = obj1[pro];
                    var val2 = obj2[pro];
                    if (val1 < val2) {
                        return 1;
                    }
                    else if (val1 > val2) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                };
            }
        },
        watch: {
            onlineType(newval, oldval) {
                if (newval != oldval) {
                    if (newval == OnlineTypeEnum.离线) {
                        SocketPro.Close();
                    }
                    else {
                        this.oldonlineType = newval;
                    }
                    System.Ipc.Send(JSON.stringify({ IpcCom: "Online", Online: newval }));
                }
            },
            searchVal(n) {
                let self = this;
                n = n.trim();
                self.searchPerson = {};
                self.searchGroup = {};
                if (n) {
                    for (let k in self.contactList) {
                        if (self.contactList[k].ID.toString().indexOf(n) > -1 || self.contactList[k].Nick.indexOf(n) > -1 || self.contactList[k].Remark.indexOf(n) > -1) {
                            self.searchPerson[self.contactList[k].ID] = self.contactList[k];
                        }
                    }
                    for (let key in self.groups) {
                        if (self.groups[key].ID.toString().indexOf(n) > -1 || self.groups[key].Name.indexOf(n) > -1) {
                            self.searchGroup[self.groups[key].ID] = self.groups[key];
                        }
                    }
                }
            }
        },
        mounted() {
            let self = this;
            setTimeout(() => {
                localStorage.getItem(self.userData.ID + 'setMinsizeOrClose') == 'min' ? self.win = ['hide', 'close', 'CloseOrmin'] : ['hide', 'close'];
                localStorage.getItem(self.userData.ID + 'topmost') ? Me.TopMost = false : Me.TopMost = true;
            }, 0);
            if (SocketPro.State == WebSocketPro_1.WsState.Closed) {
                this.onlineType = OnlineTypeEnum.离线;
            }
            setTimeout(() => {
                for (var key in self.contactGroup) {
                    self.friendGroup[key] = self.contactGroup[key].Name;
                }
            }, 1000);
        }
    });
});
