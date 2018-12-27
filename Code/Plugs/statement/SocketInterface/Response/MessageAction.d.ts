declare namespace ISocket {
    namespace Response {
        /**返回发送的消息 */
        interface PushMsg extends ResponseBase {
            /**来自于谁 */
            From: number

            /**消息类型 */
            Type: MsgType

            /**消息内容 */
            Msg: string

            /**消息ID */
            MsgId: number
        }

        /**消息接收回执 成功后的回执 */
        interface ReceiveMsg extends ResponseBase {
            MsgId: number
        }

        /**返回发送的群消息 */
        interface PushQMsg extends PushMsg {
            /**群ID */
            Qid: number
            
        }
    }
}