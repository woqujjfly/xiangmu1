import AjaxsCnofig = IAjax.TFun.AjaxsCnofig
import RequestFun = IAjax.TFun.RequestFun
import CallBack = IAjax.TFun.CallBack
import ResponseBase = IAjax.Response.ResponseBase
/**
 * 请求接口封装的通用方法
 * 实现自动签名 和确定接口使用类型
 * @param Cnofig 启动配置
 * @param Data 参数
 * @param CallBack 回调
 */
export default function Ajaxs<T extends keyof RequestFun, D extends RequestFun[T]>(Cnofig: AjaxsCnofig<T>, Data: D, CallBack?: CallBack<T>) {
    /**排序的参数名称 */
    let paramName: Array<string> = []
    /**提交的数据 */
    let resVal: Array<string> = []
    /**待签名的值 */
    let signVal: Array<string> = []
    /**将KEY加入到待签名的值的第一位 */
    signVal.unshift("IiYRHOILIFauk5oS")
    for (let key in Data) {
        paramName.push(key)
        resVal.push(`${key}=${Data[key]}`)
    }
    paramName = paramName.sort()
    for (let key in paramName) {
        signVal.push((<any>Data)[paramName[key]])
        if (paramName[key] == "T") {
            let i = resVal.indexOf(`${paramName[key]}=${(<any>Data)[paramName[key]]}`)
            resVal.splice(i, 1);
            (<any>Data)[paramName[key]] = encodeURIComponent((<any>Data)[paramName[key]])
            resVal.splice(i, 0, `${paramName[key]}=${(<any>Data)[paramName[key]]}`)
        }
    }
    let Sign = System.md5(signVal.join(""))
    resVal.push(`Sign=${Sign}`)
    let url = "http://port.chat555.com:9078/" + Cnofig.Controller + "?" + resVal.join("&")
    $.ajax({
        url: url,
        success(ret: ResponseBase) {
            if (CallBack) {
                if (ret["ErrCode"] == 0) {
                    CallBack.OkFun(<any>ret)
                } else {
                    CallBack.ErrFun && CallBack.ErrFun(<any>ret)
                }
            }
        }, error(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
            CallBack && CallBack.NetWorkErr && CallBack.NetWorkErr(errorThrown)
        }, complete() {
            CallBack && CallBack.Done && CallBack.Done()
        }
    })
}