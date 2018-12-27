declare namespace IAjax {
    namespace Response {
        /**登录返回参数 */
        interface Login extends ResponseBase, UserInfo {
            onlineType: number
        }
        interface Register extends ResponseBase {
            /**用户ID */
            Id: number
        }
    }
}