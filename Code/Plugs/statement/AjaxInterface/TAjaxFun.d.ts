declare namespace IAjax {

    namespace TFun {
        /**请求规范 */
        interface RequestFun {
            /**登录相关 */
            'LoginAction': Request.Login
            "LoginAction/Reg": Request.Register
            'LoginAction/GetVCode': Request.GetVcode
            /**用户操作 */
            'UserAction/modifyPass': Request.ModifyPass
            "UserAction/getUserInfo": Request.GetUserInfo
            /**好友列表操作 */
            'FriendAction/getFriendGroup': Request.GetList
            "FriendAction/getFriendList": Request.GetList
            "FriendAction/getAddFriendList": Request.GetAddFriendList
            "FriendAction/addFriendGroup": Request.AddFriendGroup
            "FriendAction/moveFriend": Request.MoveFriend
            "FriendAction/renameFriendGroup": Request.RenameFriendGroup
            "FriendAction/delFriendGroup": Request.DelFriendAction
            "FriendAction/modifyRemark": Request.ModifyRemark
            "FriendAction/getFriendOffLineMsg": Request.GetAddFriendList
            "FriendAction/setReadID": Request.SetReadID
            "FriendAction/searchFriend": Request.SearchList
            "FriendAction/setAddFriendStat": Request.SetAddFriendState
            /**群组操作 */
            "GroupAction/getGroupList": Request.GetList
            "GroupAction/getGroupInfo": Request.GetMemberList
            "GroupAction/getMemberList": Request.GetMemberList
            "GroupAction/searchGroup": Request.SearchList
        }
        /**响应规范 */
        interface ResponseFun {
            /**登录相关 */
            'LoginAction': Response.Login
            "LoginAction/Reg": Response.Register
            'LoginAction/GetVCode': Response.ResponseBase
            /**用户操作 */
            'UserAction/modifyPass': Response.ResponseBase
            "UserAction/getUserInfo": Response.GetUserInfo
            /**好友列表操作 */
            'FriendAction/getFriendGroup': Response.GetFriendGroup
            "FriendAction/getFriendList": Response.GetFriendList
            "FriendAction/getAddFriendList": Response.GetAddFriendList
            "FriendAction/addFriendGroup": Response.AddFriendGroup
            "FriendAction/moveFriend": Response.ResponseBase
            "FriendAction/renameFriendGroup": Response.Rename
            "FriendAction/delFriendGroup": Response.ResponseBase
            "FriendAction/modifyRemark": Response.Rename
            "FriendAction/getFriendOffLineMsg": Response.FriendOffLineMsg
            "FriendAction/setReadID": Response.ResponseBase
            "FriendAction/searchFriend": Response.SearchFriendList
            "FriendAction/setAddFriendStat": Response.ResponseBase
            /**群组操作 */
            "GroupAction/getGroupList": Response.GetGroupList
            "GroupAction/getGroupInfo": Response.GetGroupList
            "GroupAction/getMemberList": Response.GetMemberList
            "GroupAction/searchGroup": Response.SearchFriendList
        }
        /**错误回调 */
        interface TAjaxErrFun {
            /**错误详情 */
            ErrMsg: string
            /**错误代码 */
            ErrCode: number
        }
        /**回调 */
        interface CallBack<T extends keyof ResponseFun> {
            /**接口执行成功回调 */
            OkFun: (ret: ResponseFun[T]) => void

            /**接口执行失败回调 */
            ErrFun?: (err: TAjaxErrFun) => void

            /**网络错误回调 */
            NetWorkErr?: (err: any) => void

            /**成功或失败都调用 */
            Done?: () => void
        }
        /**Ajaxs配置 */
        interface AjaxsCnofig<T extends keyof IAjax.TFun.RequestFun> {
            Controller: T
        }
    }
}