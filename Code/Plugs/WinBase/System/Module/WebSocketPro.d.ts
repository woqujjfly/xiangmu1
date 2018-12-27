interface Require {
    (ModuleName: "WebSocketPro"): SocketPro
}
/**WebSocket 单例模式 */
interface SocketPro {

    /**打开连接 */
    Open(): void

    /**关闭连接 */
    Close(): void

    /**连接状态 */
    State(): number

    /**连接打开时触发 */
    Opend(CallBack: () => void): void

    /**连接关闭时触发 */
    Closed(CallBack: (CloseReasons: CloseReasonsEnum) => void): void

    /**向服务器发送消息 */
    Send(Data: string): void

    /**接收到消息时触发 */
    Message(CallBack: (Data: string) => void): void
}
declare enum SocketProStateEnum {
    /**从未建立连接 */
    None = -1,
    /**连接中 */
    Connecting = 0,
    /**连接已建立 */
    Open = 1,
    /**连接正在关闭 */
    Closing = 2,
    /**连接已断开 */
    Closed = 3
}
declare enum CloseReasonsEnum {
    /**主动关闭 */
    Initiative = 1,
    /**被动关闭 */
    Passivity
}