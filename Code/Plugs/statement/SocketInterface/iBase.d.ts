/**服务器Socket协议规范 */
declare namespace ISocket {
    namespace TFun {
        /**请求规范 */
        interface RequestFun {
            /**登录相关 */
            'Login': Request.Login
            /**用户相关 */
            "EditInfo": Request.EditInfo
            /**消息相关 */
            "ReceiveMsg": Request.ReceiveMsg
            /**在线信息 */
            "GetOnline": Request.GetOnline
            "SetOnline": Request.SetOnline
            /**好友 */
            "DelFriend": Request.DelFriend
            /**群组 */
            "ExitQ": Request.ExitQ
            /**删除群 */
            "DelQ": Request.ExitQ
            /**群踢人 */
            "KickQ": Request.KickQ
            /**编辑群资料 */
            "EditQNick": Request.EditQNick
            /**编辑群信息 */
            "EditQInfo": Request.EditQInfo
            /**设置群管理员 */
            "SetQAdmin": Request.SetQAdmin
            /**发送消息 */
            "SendMsg": Request.SendMsg
            /**发送群消息 */
            "SendQMsg": Request.SendQMsg
            /**创建群 */
            "CreateQ": Request.CreateQ
            /**加入群 */
            "JoinQ": Request.JoinQ
            /**添加好友 */
            "AddFriend": Request.AddFriend
            /**删除好友 */
            "DenyFriend": Request.DenyFriend
            "AgreeFriend": Request.AgreeFriend
        }
        /**响应规范 */
        interface ResponseFun {
            /**登录相关 */
            'Login': Response.ResponseBase
            /**用户相关 */
            "EditInfo": Response.EditInfo
            /**消息相关 */
            "ReceiveMsg": Response.ResponseBase
            /**在线信息 */
            "GetOnline": Response.GetOnline
            "SetOnline": Request.RequestBase
            /**好友 */
            "DelFriend": Response.DelFriend
            /**群组 */
            "ExitQ": Response.ExitQ
            /**删除群 */
            "DelQ": Response.ResponseBase
            /**群踢人 */
            "KickQ": Response.ResponseBase
            /**保存编辑资料*/
            "EditQNick": Response.EditQNick
            /**编辑群信息 */
            'EditQInfo': Response.EditQInfo
            /**设置群管理员 */
            "SetQAdmin": Response.ResponseBase
            /**发送消息 */
            "SendMsg": Response.ResponseBase
            /**发送群消息 */
            "SendQMsg": Response.ResponseBase
            /**创建群 */
            "CreateQ": Response.CreateQ
            /**加入群 */
            "JoinQ": Response.JoinQ
            /**添加好友 */
            "AddFriend": Response.AddFriend
            "DenyFriend": Response.DenyFriend
            "AgreeFriend": Response.AgreeFriend
        }
    }
}
/**消息类型 */
declare enum MsgType {
    图文,
    图片,
    文件,
    抖动,
    名片,
    语音,
    视频,
    撤回
}