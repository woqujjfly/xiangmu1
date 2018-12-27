import Vue from '../../Plugs/Module/Vue/Vue';
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
let SocketPro: WebSocketPro = new WebSocketPro()
export default new Vue({
    el: '#SocketCloseApp',
    data: {
        userinfo: <IAjax.Response.Login>(Me.Param && JSON.parse(Me.Param)),
        /**倒计时秒数 */
        CountDown: 15,
        Linking: false,
        timeout: 0,
        linkTime: 1,
        errmsg: ''
    },
    methods: {
        /**立即重连 */
        Open() {
            SocketPro.Open()
            this.Linking = true;
            var timeout: any = document.getElementById('timeout');
            if (this.Linking) {
                timeout.style.pointerEvents = 'none';
            }
            clearInterval(this.timeout)
            SocketPro.Opend = () => {
                this.send()
            }
            SocketPro.Closed = () => {
                this.reconnection()
            }
        },
        /**请求重新连接 */
        send() {
            SocketPro.Send('Login',{Token: this.userinfo.Token, OnlineType: Number(this.userinfo.onlineType) }, (msg)=>{
                if (msg.ErrCode == 0) {
                    System.Ipc.Send('index', JSON.stringify({ IpcCom: "LoginSuccess" }))
                    Me.Close(true)
                } else {
                    this.errmsg = msg.ErrMsg
                }
            })
        },
        /**连接倒计时 */
        reconnection() {
            ++this.linkTime
            this.CountDown = this.linkTime * 15
            setTimeout(() => {
                this.Linking = false;
                var timeout: any = document.getElementById('timeout');
                if (!this.Linking) {
                    timeout.style.pointerEvents = 'auto';
                }
                this.countDown()
            }, 1500)
            SocketPro.Closed = <any>null
        },
        countDown() {
            this.timeout = setInterval(() => {
                this.CountDown--;
            }, 1000);
        }
    },
    watch: {
        CountDown(newval) {
            if (newval == 0) {
                clearInterval(this.timeout)
                this.Linking = true;
                // var timeout: any = document.getElementById('timeout');
                // if (this.Linking) {
                //     timeout.style.pointerEvents = 'none';
                // }
                SocketPro.Open()
                SocketPro.Opend = () => {
                    this.send()
                }
                SocketPro.Closed = () => {
                    this.reconnection()
                }
            }
        }
    },
    mounted() {
        this.countDown()
    }
});