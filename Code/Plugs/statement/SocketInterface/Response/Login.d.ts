declare namespace ISocket {
    namespace Response {
        interface LoginOut extends ResponseBase {
        }

        enum ErrType {
            帐号或密码错误 = 100,
            帐号在其他位置登陆,
            无权执行此操作,
            无效签名,
            请先登陆,
            已登陆操作失败,
            缺少参数,
            参数错误,
            对方不是你的好友,
            对方已是你的好友,
            群不存在,
            用户不存在,
            系统错误 = 1000
        }
    }
}