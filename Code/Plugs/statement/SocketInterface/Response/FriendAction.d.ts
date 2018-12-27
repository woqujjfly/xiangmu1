declare namespace ISocket {
    namespace Response {
        /**添加好友 */
        interface AddFriend extends ResponseBase {
            /**好友ID */
            Id: number

            /**验证信息 */
            Verify: string
        }

        /**同意添加好友 */
        interface AgreeFriend extends ResponseBase {
            /**同意的好友ID */
            Id: number

            /**好友分组ID */
            GId: number

            /**好友备注 */
            Remark: string
        }

        /**拒绝添加好友 */
        interface DenyFriend extends ResponseBase {
            /**已拒绝的ID */
            Id: number
        }

        interface DelFriend extends ResponseBase {
            /**好友的ID */
            Id: number
        }
    }
}