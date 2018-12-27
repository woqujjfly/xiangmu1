import RequestFun = ISocket.TFun.RequestFun
import ResponseFun = ISocket.TFun.ResponseFun
/**WebSocket 加强版 */
export class WebSocketPro {

    /**接受消息时触发 */
    public Message: (Data: ISocket.Response.ResponseBase) => void = <any>null
    /**建立连接后触发 */
    public Opend: () => void = <any>null
    /**关闭连接后触发 */
    public Closed: (CloseReasons: CloseReasonsEnum) => void = <any>null
    private Ws: SocketPro = <any>null
    private CallBack: iCallBackList = {}

    constructor() {
        let th = this
        this.Ws = System.Require("WebSocketPro")
        th.Ws.Opend(function () {
            if (typeof th.Opend === "function") th.Opend()
        })
        th.Ws.Closed(function (CloseReasons) {
            if (typeof th.Closed === "function") th.Closed(CloseReasons)
        })
        th.Ws.Message(function (msg: string) {
            console.log("Push", msg)
            let str = JSON.parse(msg)
            if (str.CallBack) {
                if (th.CallBack[str.CallBack]) {
                    th.CallBack[str.CallBack].CallBack(str)
                    clearTimeout(th.CallBack[str.CallBack].StartTime)
                    delete th.CallBack[str.CallBack]
                }
                return
            }
            if (typeof th.Message === "function") {
                th.Message(str)
            }
        })
    }
    /**发送数据 */
    // private send(data: ISocket.Request.RequestBase, CallBack?: (msg: any) => void, OverTimeCallBack?: () => void, OverTime?: number): void {
    //     let th = this
    //     console.log("Send:", data)
    //     let arr: any = data
    //     if (CallBack) {
    //         arr["CallBack"] = [th.timestamp(), th.random(10000, 99999)].join("")
    //         if (OverTimeCallBack) {
    //             OverTime = OverTime || 5000
    //             th.CallBack[arr["CallBack"]] = {
    //                 CallBack: CallBack,
    //                 StartTime: setTimeout(() => {
    //                     delete th.CallBack[arr["CallBack"]]
    //                     OverTimeCallBack()
    //                 }, OverTime)
    //             }
    //         } else {
    //             th.CallBack[arr["CallBack"]] = { CallBack: CallBack, StartTime: 0 }
    //         }
    //     }
    //     this.Ws.Send(JSON.stringify(arr))
    // }

    /**
     * 通过Socket发送数据
     * @param Com 接口名称
     * @param Data 提交的数据
     * @param CallBack 服务器返回后的回调
     * @param OverTimeCallBack 服务器响应超时回调
     * @param OverTime 超时时间
     */
    public Send<T extends keyof RequestFun>(Com: T, Data: RequestFun[T], CallBack?: (msg: ResponseFun[T]) => void, OverTimeCallBack?: () => void, OverTime?: number) {
        (<any>Data).Com = Com
        let self = this
        console.log("Send:", Data)
        let arr: any = Data
        if (CallBack) {
            arr["CallBack"] = [self.timestamp(), self.random(10000, 99999)].join("")
            if (OverTimeCallBack) {
                OverTime = OverTime || 5000
                self.CallBack[arr["CallBack"]] = {
                    CallBack: CallBack,
                    StartTime: setTimeout(() => {
                        delete self.CallBack[arr["CallBack"]]
                        OverTimeCallBack()
                    }, OverTime)
                }
            } else {
                self.CallBack[arr["CallBack"]] = { CallBack: CallBack, StartTime: 0 }
            }
        }
        this.Ws.Send(JSON.stringify(arr))
    }

    public Open(): void {
        this.Ws.Open()
    }
    public Close(): void {
        this.Ws.Close()
    }

    public get State(): WsState {
        return this.Ws.State()
    }

    private timestamp(): Number {
        return Date.parse(<any>new Date()) / 1000
    }

    private random(min: number, max: number): Number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
interface iCallBackList {
    [key: string]: iCallBackField
}
interface iCallBackField {
    CallBack: (msg: any) => void
    StartTime: number
}

/**Ws连接状态 */
export enum WsState {
    /**从未建立过连接 */
    None = -1,
    /**正在建立连接 */
    Connecting,
    /**打开Socket连接 */
    Open,
    /**正在关闭  */
    Closing,
    /**关闭之后 */
    Closed
}