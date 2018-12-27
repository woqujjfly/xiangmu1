define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/WebSocketPro", "../../Plugs/Module/layer/layer", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, WebSocketPro_1, layer, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    VueComponent;
    exports.default = new Vue_1.default({
        el: '#showAvatar',
        data: {},
        methods: {
            suggestAvatar() {
                System.Open({
                    Name: 'createGroup',
                    Text: '推荐头像',
                    Url: 'Page/userAction/suggestAvatar.html',
                    Size: { Width: 600, Height: 400 },
                    Delay: true
                });
            },
            selectImg() {
            },
            recommendImg(index) {
                $('.useImg').css('background-image', 'url(../../static/images/userHead/prospect_' + index + '.webp)');
            },
            usedImg(index) {
                $('.useImg').css('background-image', 'url(../../static/images/userHead/dream_' + index + '.webp)');
            },
            confirm() {
                let HeadP = $('.useImg').css('background-image');
                System.Ipc.Send(JSON.stringify({ IpcCom: "Edithead", HeadP: HeadP }));
                SocketPro.Send('EditInfo', { HeadP: HeadP }, function (msg) {
                    if (msg.ErrCode == 0) {
                        layer.msg('修改成功!');
                    }
                    else {
                        console.error(msg.ErrMsg);
                    }
                });
            }
        }
    });
});
