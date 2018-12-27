declare namespace IAjax {
    namespace Response {
        /** 获取好友分组*/
        interface GetFriendGroup extends ResponseBase {
            List: Array<{
                /**好友分组ID */
                ID: number

                /**好友分组名称 */
                Name: string
            }>
        }

        /**获取好友列表 */
        interface GetFriendList extends ResponseBase {
            List: Array<FriendInfo>
        }

        /**添加好友分组 */
        interface AddFriendGroup extends ResponseBase {
            /**好友分组ID */
            ID: number

            /**好友分组名称 */
            Name: string
        }

        /**修改备注 重命名 */
        interface Rename extends ResponseBase {
            /**名称或 备注 */
            Name: string
        }

        /**搜索或群 */
        interface SearchFriendList extends ResponseBase {
            List: Array<UserInfoCommon>
        }

        /**请求的好友列表 */
        interface GetAddFriendList extends ResponseBase {
            List: Array<UserInfoCommon>
        }
        /**离线消息 */
        interface FriendOffLineMsg extends ResponseBase {
            List: Array<{
                /**好友ID */
                FriendID: number

                /**消息*/
                Msg: string

                /**发送时间 */
                SendTime: string

                /**消息类型 */
                Type: MsgType

                /**未读 */
                ReadID: number
            }>
        }
    }
}