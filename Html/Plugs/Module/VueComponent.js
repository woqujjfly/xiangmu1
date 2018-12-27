define(["require", "exports", "../Module/Vue/Vue"], function (require, exports, Vue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Vue_1.default.component("win-setting", {
        props: ["win"],
        template: `
    <ul class="win-setting">
		<li class="minsize" @click="winMini(win)"></li>
		<li class="max" v-if="win.indexOf('max') > -1" @click="winMax(this)"></li>
        <li class="close" @click="winClose(win)"></li>
    </ul>`,
        methods: {
            winMini(win) {
                win.indexOf("hide") > -1 ? Me.Hide() : (Me.WindowState = 1);
            },
            winClose(win) {
                win.indexOf("closeCurrent") > -1 ? Me.Close() : (win.indexOf("CloseOrmin") > -1 ? Me.Hide() : System.Exit());
            },
            winMax(e) {
                let max = document.querySelector(".max");
                if (max.className == "max") {
                    max.className = "max max_restore";
                    Me.WindowState = 2;
                }
                else {
                    max.className = "max";
                    Me.WindowState = 0;
                }
            }
        }
    });
    Vue_1.default.component("win-header", {
        props: ["header"],
        template: `
    <div class="win-top">
        <div class="logo">
            <span class="img"></span>
            <span class="logoName">{{header.logo}}</span>
        </div>
        <win-setting :win="header.win"></win-setting>
    </div>`
    });
    Vue_1.default.component('pl-lazy', {
        props: ['time'],
        template: `
    <div><slot v-if="initSuccess"></slot></div>`,
        data() {
            return {
                initSuccess: false
            };
        },
        created() {
            this.initSlot();
        },
        methods: {
            initSlot() {
                let vm = this;
                setTimeout(function () {
                    vm.initSuccess = true;
                }, (Number(vm.time || 0)));
            }
        }
    });
    Date.prototype.Format = function (fmt, timestamp) {
        let date;
        if (timestamp) {
            date = new Date(timestamp);
        }
        else {
            date = this;
        }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    };
});
