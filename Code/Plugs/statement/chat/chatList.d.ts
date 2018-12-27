interface ChatList {
    [key: string]: Array<ChatInfo>
}
interface ChatInfo {
    /**消息内容 */
    Msg: string

    /**消息类型 */
    Type: MsgType

    /**消息的方向 0自己发 1别人发*/
    Dir: 0 | 1

    /**消息ID 毫秒时间戳 */
    MsgId: number

    /**发送状态 */
    MsgStatus: MsgStatusEnum

    /**接受成功true */
    Receive: boolean

    /**失败原因 */
    ErrMsg: string
}
declare enum MsgStatusEnum {
    尝试发送 = -1,
    正在发送,
    发送成功,
    发送失败
}
interface HistroyChatinfo {
    /**消息内容 */
    Msg: string

    /**消息类型 */
    Type: MsgType

    /**发送者ID */
    MyId: number

    /**消息ID 毫秒时间戳 */
    MsgId: number

    /**发送状态 */
    MsgStatus: MsgStatusEnum
}