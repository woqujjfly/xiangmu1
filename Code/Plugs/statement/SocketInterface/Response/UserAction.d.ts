declare namespace ISocket {
    namespace Response {
        /**在线信息 */
        interface UserOnline extends ResponseBase {
            /**用户ID */
            Id: number

            /**0 在线  1不在线 */
            Type: number
        }
        interface GetOnline extends ResponseBase {
            List: Array<number>
        }
        interface SetOnline extends ResponseBase {
        }
        /**用户信息变更通知 没有变更的信息不返回字段 */
        interface EditInfo extends ResponseBase {
            /**修改的用户 */
            Id: number

            /**用户头像 */
            HeadP?: string

            /**昵称 */
            Nick?: string

            /**个性签名 */
            Vsign?: string
        }
    }
}