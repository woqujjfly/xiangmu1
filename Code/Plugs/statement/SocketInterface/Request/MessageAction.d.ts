declare namespace ISocket {
    namespace Request {
        /**发送消息 分享名片*/
        interface SendMsg extends RequestBase {
            /**消息类型 */
            Type: MsgType

            /**消息内容 */
            Msg: string

            /**发送目标 */
            To: number

            /**消息Id [毫秒级时间戳],不可重复 */
            MsgId: number
        }

        /**消息接收回执 */
        interface ReceiveMsg extends RequestBase {
            MsgId: number
        }

        /**发送群消息 */
        interface SendQMsg extends SendMsg {

        }
    }
}