import Vue from '../../Plugs/Module/Vue/Vue';
import * as VueComponent from "../../Plugs/Module/VueComponent";
VueComponent;
export default new Vue({
    el: '#suggestAvatar',
    data: {
        label: 'cartoon',
        labelList: {
            cartoon: '卡通',
            beautiful: '唯美',
            prospect: '意境',
            dream: '梦幻',
        }
    },
    methods: {
       
    }
});

