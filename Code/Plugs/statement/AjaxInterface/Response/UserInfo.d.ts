declare namespace IAjax {
    namespace Response {
        /**获取用户信息 */
        interface GetUserInfo extends ResponseBase {
            Info: Array<UserInfoCommon>
        }
    }
}