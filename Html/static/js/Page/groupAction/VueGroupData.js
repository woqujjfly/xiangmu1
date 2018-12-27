define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent", "../../Plugs/Module/chatemotion", "../../Plugs/Module/WebSocketPro"], function (require, exports, Vue_1, layer, VueComponent, chatemotion_1, WebSocketPro_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#groupData",
        data: {
            Params: (Me.Param && JSON.parse(Me.Param)),
            number: -1,
            showBg: -1,
            showList: ["首页", "成员", "设置"],
            listType: "首页",
            searchList: true,
            allowList: true,
            showEdit: false,
            groupIntroduce: "",
            groupLabel: [],
            showEmoji: false,
            emojiList: chatemotion_1.emotion,
            memberArr: [],
            isAdmin: 0
        },
        methods: {
            showSearch(element) {
                let searchWay = $("." + element).is(":checked");
                element == "searchWay" ? searchWay ? (this.searchList = true) : (this.searchList = false) : searchWay ? (this.allowList = true) : (this.allowList = false);
            },
            getFocus(index) {
                setTimeout(() => {
                    $(".focus").select().focus();
                }, 0);
            },
            changeCard(item, index) {
                let card = $(".changeCard").eq(index).val();
                if (card != item.VisitingCard) {
                    SocketPro.Send("EditQNick", { Id: item.GroupID, Uid: item.MemberID, Nick: card }, function (msg) {
                        if (msg.ErrCode == 0) {
                            System.Ipc.Send(JSON.stringify({ IpcCom: 'ChangeCard', Id: item.GroupID, Uid: item.MemberID, Nick: card }));
                        }
                        else {
                            layer.msg(msg.ErrMsg);
                        }
                    });
                }
                item.VisitingCard = card;
            },
            lookData(item) {
                System.Open({
                    Name: item.MemberID + "checkOutData",
                    Text: item.Nick,
                    Url: "Page/userAction/openPersonalFile.html",
                    Size: { Width: 720, Height: 520 },
                    Delay: true,
                    Param: JSON.stringify(item.MemberID)
                });
            },
            adminRecord() {
                System.Open({
                    Name: "adminRecord",
                    Text: '管理记录',
                    Url: "Page/groupAction/adminRecord.html",
                    Size: { Width: 380, Height: 300 },
                    Delay: true
                });
            },
            inviteEnterGroup() {
                System.Open({
                    Name: "inviteEnterGroup",
                    Text: "邀请集群",
                    Url: "Page/groupAction/inviteGroup.html",
                    Size: { Width: 490, Height: 471 },
                    Delay: true,
                    Param: JSON.stringify(this.Params.ID)
                });
            },
            saveEditData() {
                let self = this;
                let groupName = $('#groupNa').val();
                let groupIntroduce = $('#content').val();
                self.showEdit = false;
                SocketPro.Send("EditQInfo", { Id: self.Params.ID, Name: groupName, Photo: ['abc', 'abc'], Label: self.groupLabel, Introduce: groupIntroduce }, function (msg) {
                    if (msg.ErrCode == 0) {
                    }
                    else {
                        console.error(msg.ErrMsg);
                    }
                });
            },
            stickOn() {
                let self = this;
                let labelVal = $("#lableText").val().trim();
                if (labelVal && self.groupLabel.length < 3 && self.groupLabel.indexOf(labelVal) < 0) {
                    self.groupLabel.push(labelVal);
                }
                else {
                    layer.msg('最多存在三个标签或标签已存在');
                }
                $("#lableText").val("");
            },
            sendInfo() {
                let self = this;
                let ID = self.Params.ID;
                System.Open({
                    Name: ID + "Group",
                    Text: self.Params.Name,
                    Url: "Page/chatMain/groupChat.html",
                    Size: { Width: 920, Height: 750 },
                    Delay: true,
                    Param: JSON.stringify(self.Params)
                });
            },
            selectEmoji: function (item, text) {
                let msg = document.querySelector("#content");
                let img = `<img class="emotion" src="../../static/images/emotion/${item}.png" data-emoji="${text.replace("[", "").replace("]", "")}">`;
                insertAtCursor(msg, img);
                this.showEmoji = false;
            },
            setAdminer(item) {
                let self = this;
                let title, admin;
                if (item.IsAdmin == 1) {
                    title = "确定取消" + item.Nick + "(" + item.MemberID + ")" + "的管理员";
                    admin = false;
                }
                else {
                    title = "确定设置" + item.Nick + "(" + item.MemberID + ")" + "为管理员";
                    admin = true;
                }
                layer.alert(title, (index) => {
                    SocketPro.Send("SetQAdmin", { Id: item.GroupID, Uid: item.MemberID, Admin: admin }, function (msg) {
                        layer.close(index);
                        if (msg.ErrCode == 0) {
                            self.Params.MemberList[item.MemberID].IsAdmin = item.IsAdmin == 1 ? 0 : 1;
                            self.Params = Object.assign({}, self.Params);
                            console.log(msg);
                        }
                        else {
                            layer.msg(msg.ErrMsg);
                        }
                    });
                });
            },
            valMatch(n) {
            },
            MemberSort(groupMemberList) {
                let self = this;
                let arr = [];
                for (let key in groupMemberList) {
                    arr.push(groupMemberList[key]);
                    if (Number(key) == self.Params.GroupOwnerID) {
                        groupMemberList[key].IsAdmin = 2;
                    }
                }
                if (arr.length > 1) {
                    arr.sort(compare("IsAdmin"));
                }
                for (let i in arr) {
                    self.Params.MemberList[arr[i].MemberID] = arr[i];
                }
                console.log(self.Params.MemberList);
                self.isAdmin = groupMemberList[self.Params.MyID].IsAdmin;
            },
            kick(item) {
                let self = this;
                layer.alert(`您确定将${item.Nick}(${item.MemberID}从本群中删除吗`, {
                    btn: ['确定', '取消'],
                    yes(index) {
                        SocketPro.Send("KickQ", { Qid: self.Params.ID, Uid: item.MemberID }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                delete self.Params.MemberList[item.MemberID];
                                self.Params = Object.assign({}, self.Params);
                                System.Ipc.Send('index', JSON.stringify({ IpcCom: "KickqQ", Qid: self.Params.ID, Uid: item.MemberID }));
                            }
                            else {
                                console.error(msg.ErrMsg);
                            }
                            layer.close(index);
                        });
                    }
                });
            },
            quitGroup(e) {
                let self = this;
                let actionName = e.target.title;
                console.log(actionName);
                let title = actionName == "退出该群" ? "你确定退出该群吗? (退群通知仅群管理员可见)" : "你确定解散该群吗?";
                layer.alert(title, (index, layero) => {
                    let ID = Number(self.Params.ID);
                    if (actionName == "退出该群") {
                        SocketPro.Send("ExitQ", { Id: ID }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                System.Ipc.Send("index", JSON.stringify({ IpcCom: "DeleteGroup", groupId: self.Params.ID }));
                                Me.Close();
                            }
                            else {
                                layer.msg(msg.ErrMsg);
                            }
                        });
                    }
                    else if (actionName == "解散该群") {
                        SocketPro.Send("DelQ", { Id: ID }, function (msg) {
                            layer.close(index);
                            if (msg.ErrCode == 0) {
                                System.Ipc.Send("index", JSON.stringify({ IpcCom: "DeleteGroup", groupId: self.Params.ID }));
                                Me.Close();
                            }
                            else {
                                layer.msg(msg.ErrMsg);
                            }
                        });
                    }
                });
            }
        },
        watch: {
            groupIntroduce(n, o) {
                let len = 300;
                $("#result").html("还可以输入" + (len - n.length) + "字");
            }
        },
        mounted() {
            let self = this;
            if (!self.Params.MemberList || Object.keys(self.Params.MemberList).length == 0) {
                setTimeout(() => {
                    System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetMemberList" }));
                }, 0);
            }
            else {
                self.MemberSort(self.Params.MemberList);
            }
            $("#result").html("还可以输入" + (300 - self.groupIntroduce.length) + "字");
        }
    });
    function compare(pro) {
        return function (obj1, obj2) {
            var val1 = obj1[pro];
            var val2 = obj2[pro];
            return val2 - val1;
        };
    }
    function insertAtCursor(jsDom, html) {
        if (jsDom != document.activeElement) {
            jsDom.innerHTML = jsDom.innerHTML + html;
            return;
        }
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement("span");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }
});
