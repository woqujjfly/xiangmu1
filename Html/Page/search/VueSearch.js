define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent", "../../Plugs/Module/Ajaxs"], function (require, exports, Vue_1, layer, VueComponent, Ajaxs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#searchApp",
        data: {
            userData: Me.Param && JSON.parse(Me.Param),
            showSearchType: true,
            searchPerson: {},
            searchGroup: {},
            personTitle: false,
            groupTitle: false,
        },
        methods: {
            search() {
                let self = this;
                let input = $("#input")
                    .val()
                    .trim();
                if (!input) {
                    if (self.showSearchType) {
                        self.searchPerson = {};
                        self.personTitle = false;
                    }
                    else {
                        self.searchGroup = {};
                        self.groupTitle = false;
                    }
                    return;
                }
                if (input == self.userData.userData) {
                    layer.msg("请不要搜索自己");
                    return;
                }
                else {
                    let searchUrl;
                    if (self.showSearchType) {
                        searchUrl = "FriendAction/searchFriend";
                        self.searchPerson = {};
                    }
                    else {
                        searchUrl = "GroupAction/searchGroup";
                        self.searchGroup = {};
                    }
                    Ajaxs_1.default({ Controller: searchUrl }, { T: self.userData.Sign, Search: input }, {
                        OkFun(response) {
                            for (let i in response.List) {
                                if (self.showSearchType) {
                                    if (response.List[i].ID != self.userData.userData) {
                                        self.searchPerson[response.List[i].ID] = response.List[i];
                                    }
                                }
                                else {
                                    self.searchGroup[response.List[i].ID] = response.List[i];
                                }
                            }
                            self.searchPerson = Object.assign({}, self.searchPerson);
                            self.searchGroup = Object.assign({}, self.searchGroup);
                        }, ErrFun(response) {
                            self.showSearchType ? (self.personTitle = true) : (self.groupTitle = true);
                        }, NetWorkErr() {
                            layer.alert("网络连接失败");
                        }
                    });
                }
            },
            selectType(event, index) {
                let tri = document.getElementsByClassName("triangle")[0];
                let target = event.target;
                tri.style.left =
                    target.offsetLeft + target.offsetWidth / 2 - tri.offsetWidth / 2 + "px";
                index == 0 ? (this.showSearchType = true) : (this.showSearchType = false);
            },
            addFriend(e, ID) {
                let self = this;
                let target = e.target.innerText;
                let total = {};
                let title = "";
                console.log(ID);
                if (target == "+好友") {
                    if (Object.keys(self.userData.contactList).indexOf(ID) != -1) {
                        layer.msg("该用户已经是您的好友");
                    }
                    else {
                        total = this.searchPerson[ID];
                        total.MyID = this.userData.userData.ID;
                        title = this.userData.userData.Nick + "-添加好友";
                    }
                }
                else if (target == "+加群") {
                    if (Object.keys(self.userData.groups).indexOf(ID) != -1) {
                        layer.msg("您已经加入该群");
                    }
                    else {
                        total = this.searchGroup[ID];
                        total.MyID = this.userData.ID;
                        title = "添加群";
                    }
                }
                if (Object.keys(total).length != 0) {
                    System.Open({
                        Name: total.ID + "addFriend",
                        Text: title,
                        Url: target == "+加群" ? "Page/search/addGroup.html" : "Page/search/addFriend.html",
                        Size: { Width: 450, Height: 360 },
                        Delay: true,
                        Param: JSON.stringify(total)
                    });
                }
            },
            openPersonalData(item) {
                let self = this;
                if (Object.keys(self.userData.contactList).indexOf(item.ID.toString()) !=
                    -1) {
                    item.Remark = self.userData.contactList[item.ID].Remark;
                    item.FriendGroupID = self.userData.contactList[item.ID].FriendGroupID;
                    item.groups = self.userData.friendGroup;
                    item.UserId = self.userData.userData;
                }
                let title = item.Nick + "的资料";
                System.Open({
                    Name: "openPersonalFile",
                    Text: title,
                    Url: "Page/userAction/openPersonalFile.html",
                    Size: { Width: 720, Height: 520 },
                    Delay: true,
                    Param: JSON.stringify(item)
                });
            }
        },
    });
});
