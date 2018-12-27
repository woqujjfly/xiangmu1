declare namespace ISocket {
    namespace Request {
        /**设置当前的在线状态 */
        interface SetOnline extends RequestBase {
            /** 在线状态*/
            Type: number
        }
        /**获取在线人数 */
        interface GetOnline extends RequestBase {
        }
        /**  修改用户信息 有变更的字段才提交 提交null 或 不提交字段 则不修改某一项*/
        interface EditInfo extends RequestBase {
            /**用户头像 */
            HeadP?: string

            /**昵称 */
            Nick?: string

            /**个性签名 */ 
            Vsign?: string
        }
    }
}