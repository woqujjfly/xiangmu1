define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/WebSocketPro"], function (require, exports, Vue_1, WebSocketPro_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SocketPro = new WebSocketPro_1.WebSocketPro();
    exports.default = new Vue_1.default({
        el: '#SocketCloseApp',
        data: {
            userinfo: (Me.Param && JSON.parse(Me.Param)),
            CountDown: 15,
            Linking: false,
            timeout: 0,
            linkTime: 1,
            errmsg: ''
        },
        methods: {
            Open() {
                SocketPro.Open();
                this.Linking = true;
                var timeout = document.getElementById('timeout');
                if (this.Linking) {
                    timeout.style.pointerEvents = 'none';
                }
                clearInterval(this.timeout);
                SocketPro.Opend = () => {
                    this.send();
                };
                SocketPro.Closed = () => {
                    this.reconnection();
                };
            },
            send() {
                SocketPro.Send('Login', { Token: this.userinfo.Token, OnlineType: Number(this.userinfo.onlineType) }, (msg) => {
                    if (msg.ErrCode == 0) {
                        System.Ipc.Send('index', JSON.stringify({ IpcCom: "LoginSuccess" }));
                        Me.Close(true);
                    }
                    else {
                        this.errmsg = msg.ErrMsg;
                    }
                });
            },
            reconnection() {
                ++this.linkTime;
                this.CountDown = this.linkTime * 15;
                setTimeout(() => {
                    this.Linking = false;
                    var timeout = document.getElementById('timeout');
                    if (!this.Linking) {
                        timeout.style.pointerEvents = 'auto';
                    }
                    this.countDown();
                }, 1500);
                SocketPro.Closed = null;
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
                    clearInterval(this.timeout);
                    this.Linking = true;
                    SocketPro.Open();
                    SocketPro.Opend = () => {
                        this.send();
                    };
                    SocketPro.Closed = () => {
                        this.reconnection();
                    };
                }
            }
        },
        mounted() {
            this.countDown();
        }
    });
});
