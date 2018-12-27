declare namespace ISocket {
    namespace Request {
        /**添加好友 */
        interface AddFriend extends RequestBase {
            /**添加好友的ID */
            Id: number

            /**好友分组ID */
            GId: number

            /**好友备注 */
            Remark: string

            /**验证信息 */
            MyVerify: string
        }

        /** 同意添加的好友*/
        interface AgreeFriend extends RequestBase {
            /**需要同意的ID */
            Id: number

            /**好友分组ID */
            GId: number

            /**好友备注 */
            Remark: string
        }

        /**拒绝添加好友 */
        interface DenyFriend extends RequestBase {
            /**要拒绝的ID */
            Id: number
        }

        /**删除好友 */
        interface DelFriend extends RequestBase {
            /**
             * 好友ID
             * <JsonField(Must:=True, MaxArrayLenth:=1000, MinArrayLenth:=1)>
             */
            Value: Array<number>
        }
    }
}