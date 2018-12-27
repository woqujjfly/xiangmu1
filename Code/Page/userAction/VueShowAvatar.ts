import Vue from '../../Plugs/Module/Vue/Vue';
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import * as layer from "../../Plugs/Module/layer/layer";
import * as VueComponent from "../../Plugs/Module/VueComponent";
let SocketPro = new WebSocketPro();
VueComponent;
export default new Vue({
    el: '#showAvatar',
    data: {
    },
    methods: {
        /*推荐头像页面*/
        suggestAvatar() {
            System.Open({
                Name: 'createGroup',
                Text: '推荐头像',
                Url: 'Page/userAction/suggestAvatar.html',
                Size: { Width: 600, Height: 400 },
                Delay: true
            })
        },
        /**选择图片 */
        selectImg() {

        },
        // 推荐头像
        recommendImg(index: number) {
            $('.useImg').css('background-image', 'url(../../static/images/userHead/prospect_' + index + '.webp)');
        },
        usedImg(index: number) {
            $('.useImg').css('background-image', 'url(../../static/images/userHead/dream_' + index + '.webp)');
        },
        confirm() {
            let HeadP: any = $('.useImg').css('background-image');
            System.Ipc.Send(JSON.stringify({ IpcCom: "Edithead", HeadP: HeadP }));
            SocketPro.Send('EditInfo', { HeadP: HeadP }, function (msg) {
                if (msg.ErrCode == 0) {
                    layer.msg('修改成功!');
                } else {
                    console.error(msg.ErrMsg)
                }
            })

        }
    }
});

