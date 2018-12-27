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
            whicthkey: 0,
            allChoosed: false,
            operationList: ["昵称", "账号", "备注", "分组", "最后登录时间"],
            whitchSort: 0,
            ifSort: false
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
                    paramer = JSON.parse(JSON.stringify(self.Param.contactList[item.ID]));
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
            modifyRemark(item) {
                let self = this;
                Ajaxs_1.default({ Controller: "FriendAction/modifyRemark" }, { T: self.Param.userData.Sign, FriendID: item.ID, Remark: item.Remark }, {
                    OkFun(response) {
                        self.Param.contactList[item.ID].Remark = response.Name;
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
            rightMenu(item, key) {
                let self = this;
                let FriendContextMenu = [];
                let moveFriend = [];
                let SubItem = [];
                for (let i in self.Param.contactGroup) {
                    if (item.FriendGroupID != i) {
                        moveFriend.push({
                            Key: i,
                            Label: self.Param.friendGroup[i],
                            Type: 1,
                            Enabled: true,
                        });
                    }
                }
                FriendContextMenu = [
                    {
                        Key: "查看资料",
                        Label: "查看资料",
                        Type: 1,
                        Enabled: true,
                    },
                    {
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
                            case '删除好友':
                                self.deleteFriends();
                                break;
                            case '添加分组':
                                self.addFriendGroup();
                                break;
                            case '重命名':
                                self.renameFriendGroup();
                                break;
                        }
                        for (let i in self.Param.friendGroup) {
                            if (i == Key) {
                                self.MoveFriend(Number(i));
                            }
                        }
                    },
                    SubItem: SubItem
                });
                self.getContactInfo = item;
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
                    Ajaxs_1.default({ Controller: "FriendAction/renameFriendGroup" }, { T: self.Param.userData.Sign, FGID: self.getContactInfo.ID, Name: val }, {
                        OkFun(response) {
                            layer.close(index);
                            self.Param.contactGroup[self.getContactInfo.ID].Name = response.Name;
                            self.Param.contactGroup = Object.assign({}, self.Param.contactGroup);
                            layer.msg("修改成功");
                            let friendG = self.Param.contactGroup;
                            friendG.IpcCom = "ChangefriendG";
                            System.Ipc.Send(JSON.stringify(self.Param.contactGroup));
                            delete self.Param.contactGroup.IpcCom;
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
            MoveFriend(FGID) {
                let self = this;
                console.log(FGID);
                let idList = self.selectList.join(',');
                Ajaxs_1.default({ Controller: "FriendAction/moveFriend" }, { T: self.Param.userData.Sign, FriendID: idList, FriendGroupID: FGID }, {
                    OkFun(response) {
                        for (let i = 0; i < self.selectList.length; i++) {
                            self.Param.contactGroup[FGID].List[self.selectList[i]] = self.Param.contactGroup[self.Param.contactList[self.selectList[i]].FriendGroupID].List[self.selectList[i]];
                            delete self.Param.contactGroup[self.Param.contactList[self.selectList[i]].FriendGroupID].List[self.selectList[i]];
                            self.Param.contactList[self.selectList[i]].FriendGroupID = FGID;
                        }
                        self.Param.contactGroup = Object.assign({}, self.Param.contactGroup);
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
                let idList = self.selectList;
                layer.open({
                    title: '删除好友',
                    content: '您确定删除该好友吗?',
                    yes(index, layero) {
                        SocketPro.Send("DelFriend", { Value: idList }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                for (let i = 0; i < self.selectList.length; i++) {
                                    delete self.Param.contactList[self.selectList[i]].ID;
                                    self.Param.contactGroup = Object.assign({}, self.Param.contactGroup);
                                }
                            }
                            else {
                                console.error(msg.ErrMsg);
                            }
                        });
                    }
                });
            },
            addFriendGroup() {
                let self = this;
                layer.prompt({
                    title: "添加好友分组",
                    value: "未命名",
                    formType: 0,
                    success: layero => { layero.find(".layui-layer-input").focus().select(); }
                }, function (val, index, el) {
                    Ajaxs_1.default({ Controller: "FriendAction/addFriendGroup" }, { T: self.Param.userData.Sign, Name: val }, {
                        OkFun(response) {
                            layer.close(index);
                            self.Param.contactGroup[(response.ID)] = {
                                ID: response.ID,
                                Name: response.Name,
                                List: {},
                                OnlineNum: 0
                            };
                            self.Param.contactGroup = Object.assign({}, self.Param.contactGroup);
                            layer.msg("添加成功");
                            let friendG = self.Param.contactGroup;
                            friendG.IpcCom = "ChangefriendG";
                            System.Ipc.Send(JSON.stringify(self.Param.contactGroup));
                            delete self.Param.contactGroup.IpcCom;
                            self.Param.contactGroup = Object.assign({}, self.Param.contactGroup);
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
            sortFriend(index) {
                let self = this;
                self.whitchSort = index;
                self.ifSort = !self.ifSort;
                function compare(pro) {
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
                if (index == 0 && self.ifSort == true) {
                    self.hetsort.sort(compare("Nick"));
                }
                else if (index == 1 && self.ifSort == true) {
                    self.hetsort.sort(compare("ID"));
                }
                else if (index == 2 && self.ifSort == true) {
                    self.hetsort.sort(compare("Remark"));
                }
                else if (index == 3 && self.ifSort == true) {
                    self.hetsort.sort(compare("FriendGroupID"));
                }
            },
        },
        watch: {
            allChoosed(n) {
                let self = this;
                for (let i in self.Param.contactList) {
                    if (n && self.Param.contactList[i].FriendGroupID == Number(self.whicthkey)) {
                        self.selectList.push(self.Param.contactList[i].ID);
                    }
                    else {
                        self.selectList = [];
                    }
                }
            }
        },
        computed: {
            hetsort: function () {
                let self = this;
                let arr = [];
                for (let i in self.Param.contactList) {
                    self.Param.contactList[i].FriendGroupID == Number(self.whicthkey) && arr.push(self.Param.contactList[i]);
                }
                return arr;
            }
        }
    });
});
