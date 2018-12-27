define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Ajaxs(Cnofig, Data, CallBack) {
        let paramName = [];
        let resVal = [];
        let signVal = [];
        signVal.unshift("IiYRHOILIFauk5oS");
        for (let key in Data) {
            paramName.push(key);
            resVal.push(`${key}=${Data[key]}`);
        }
        paramName = paramName.sort();
        for (let key in paramName) {
            signVal.push(Data[paramName[key]]);
            if (paramName[key] == "T") {
                let i = resVal.indexOf(`${paramName[key]}=${Data[paramName[key]]}`);
                resVal.splice(i, 1);
                Data[paramName[key]] = encodeURIComponent(Data[paramName[key]]);
                resVal.splice(i, 0, `${paramName[key]}=${Data[paramName[key]]}`);
            }
        }
        let Sign = System.md5(signVal.join(""));
        resVal.push(`Sign=${Sign}`);
        let url = "http://port.chat555.com:9078/" + Cnofig.Controller + "?" + resVal.join("&");
        $.ajax({
            url: url,
            success(ret) {
                if (CallBack) {
                    if (ret["ErrCode"] == 0) {
                        CallBack.OkFun(ret);
                    }
                    else {
                        CallBack.ErrFun && CallBack.ErrFun(ret);
                    }
                }
            }, error(jqXHR, textStatus, errorThrown) {
                CallBack && CallBack.NetWorkErr && CallBack.NetWorkErr(errorThrown);
            }, complete() {
                CallBack && CallBack.Done && CallBack.Done();
            }
        });
    }
    exports.default = Ajaxs;
});
