define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/VueComponent", "../../Plugs/Module/layer/layer", "../../Plugs/Module/Ajaxs", "../../Plugs/Module/WebSocketPro"], function (require, exports, Vue_1, VueComponent, layer, Ajaxs_1, WebSocketPro_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    let Menu = System.Require("Menu");
    exports.default = new Vue_1.default({
        el: "#friendManage",
        data: {
            Param: (Me.Param && JSON.parse(Me.Param)),
            getContactInfo: {},
            expressInput: -1,
            selectList: [],
            whicthkey: "0",
            allChoosed: false
        },
        methods: {
            openPersonalFile(item) {
                let self = this;
                console.log(item);
                let paramer;
                let title = "";
                if (!item) {
                    paramer = JSON.parse(JSON.stringify(self.Param.userData));
                    title = "我的资料";
                    paramer.MyID = self.Param.userData.ID;
                }
                else {
                    paramer = JSON.parse(JSON.stringify(self.getContactInfo));
                    title = paramer.Remark ? paramer.Remark + "的资料" : paramer.Nick + "的资料";
                    paramer.Sign = self.Param.userData.Sign;
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
            changeSign(key) {
            },
            rightMenu(item, key) {
                let self = this;
                let FriendContextMenu = [];
                let moveFriend = [];
                let SubItem = [];
                FriendContextMenu = [
                    {
                        Key: "查看资料",
                        Label: "查看资料",
                        Type: 1,
                        Enabled: true,
                    },
                    {
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
                let addFriendGroup = {
                    Key: '添加分组',
                    Label: '添加分组',
                    Type: 1,
                    Enabled: true,
                };
                if (item.OnlineNum || item.OnlineNum == 0) {
                    if (item.ID == 0) {
                        SubItem = [addFriendGroup];
                    }
                    else {
                        SubItem = [addFriendGroup, {
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
                Menu.Popup({
                    FontColor: '#000000',
                    BgColor: "#ffffff",
                    HoverColor: '#e2e2e3',
                    Height: 30,
                    Radius: 2,
                    Click: (Key, Checked) => {
                        console.log(Key, Checked);
                        switch (Key) {
                        }
                    },
                    SubItem: SubItem
                });
                self.getContactInfo = item;
            },
            MoveFriend(FGID) {
                let self = this;
                let idList = self.selectList.join(',');
                Ajaxs_1.default({ Controller: "FriendAction/moveFriend" }, { T: self.Param.userData.Sign, FriendID: idList, FriendGroupID: FGID }, {
                    OkFun(response) {
                        for (let i = 0; i < self.selectList.length; i++) {
                            let item = self.Param;
                        }
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
            delGrounp() {
                let self = this;
            },
            delAllFriends() {
                let self = this;
            },
        },
        watch: {
            allChoosed(n) {
                let self = this;
                for (let i in self.Param.contactList) {
                    if (n) {
                        self.selectList.push(self.Param.contactList[i].ID);
                    }
                    else {
                        self.selectList = [];
                    }
                }
            }
        }
    });
});
