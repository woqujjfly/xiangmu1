declare namespace IAjax {
    namespace Request {
        /** 获取好友 分组 列表*/
        interface GetList extends RequestUserBase {

        }

        /**添加好友分组 */
        interface AddFriendGroup extends RequestUserBase {
            /**分组名称 或 用户备注*/
            Name: string
        }

        /**好友分组重命名 */
        interface RenameFriendGroup extends RequestUserBase {
            /**分组ID */
            FGID: number

            /**分组名称 */
            Name: string
        }
        /**删除好友分组*/
        interface DelFriendAction extends RequestUserBase {
            /**分组ID 或好友ID*/
            ID: number
        }

        /**搜索好友或群 */
        interface SearchList extends RequestUserBase {
            /**搜索的内容 */
            Search: string | number
        }

        /**修改好友备注 */
        interface ModifyRemark extends RequestUserBase {
            /**好友ID */
            FriendID: number

            /**备注名称 */
            Remark: string
        }

        /**添加好友操作 */
        interface SetAddFriendState extends RequestUserBase {
            /**请求添加好友ID */
            FriendID: number
        }

        /**获取离线状态下的好友请求 */
        interface GetAddFriendList extends RequestUserBase {

        }

        /**移动好友到某个分组 */
        interface MoveFriend extends RequestUserBase {
            /**好友ID */
            FriendID: string

            /**分组ID */
            FriendGroupID: number
        }

        /**设置最后的未读ID */
        interface SetReadID extends RequestUserBase {
            /**好友ID */
            FriendID: number
        }
    }
}