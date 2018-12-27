define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
        el: "#memberCenter",
        data: {
            monthNumber: 1,
            salechance: ['微信', '支付宝'],
            moneyNumber: [3, 6, 12],
            onlychance: "微信",
            saleIndex: 0,
            whitch: 0,
            downSale: 3,
            customed: false
        },
        methods: {
            moneyReduce() {
                let self = this;
                self.monthNumber -= 1;
                if (self.monthNumber < 1) {
                    self.monthNumber = 1;
                }
            },
            moneyAdd() {
                let self = this;
                self.monthNumber += 1;
            },
            change() {
            },
            custom() {
                let self = this;
                self.downSale = self.monthNumber;
                self.customed = true;
                self.whitch = -1;
            },
        }
    });
});
