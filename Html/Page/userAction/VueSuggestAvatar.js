define(["require", "exports", "../../Plugs/Module/Vue/Vue", "../../Plugs/Module/VueComponent"], function (require, exports, Vue_1, VueComponent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    VueComponent;
    exports.default = new Vue_1.default({
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
        methods: {}
    });
});
