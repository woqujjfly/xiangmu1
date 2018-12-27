import Vue from '../../Plugs/Module/Vue/Vue';
import * as VueComponent from "../../Plugs/Module/VueComponent";
VueComponent;
export default new Vue({
    el: "#memberCenter",
    data: {
        /*充值月数选择默认值*/
        monthNumber: 1,
        //支付方式选择
        salechance:['微信', '支付宝'],
        //支付月份选择
        moneyNumber:[3,6,12],
        //支付方式提示
        onlychance:"微信",
        //支付数组下标
        saleIndex: 0,
        //支付多少
        whitch:0,
        //下面支付多少
        downSale:3,
        //是否自定义
        customed:false
    },
    methods: {
        moneyReduce(){
            let self=this;
            self.monthNumber-=1;
            if(self.monthNumber<1){
                self.monthNumber=1
            }
        },
        moneyAdd(){
            let self=this;
            self.monthNumber+=1;
        },
        change(){

        },
        custom(){
            let self=this;
            self.downSale=self.monthNumber;
            self.customed=true;
            self.whitch=-1;
        },


    }
})
